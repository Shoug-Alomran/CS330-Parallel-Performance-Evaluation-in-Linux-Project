import java.util.Random;

public class ArraySum {
    static int[] createArray(int size) {
        Random rand = new Random();
        int[] arr = new int[size];

        for (int i = 0; i < size; i++) {
            arr[i] = rand.nextInt(100); // Store a random number from 0 to 99.
        }

        return arr;
    }

    static long sumRange(int[] arr, int min, int max) {
        long sum = 0;

        for (int i = min; i < max; i++) {
            long value = arr[i];
            sum += value * value * value;
        }

        return sum;
    }

    // 1-thread configuration: this is the baseline run with no extra worker threads.
    static long singleSum(int[] arr) {
        long sum = 0;

        for (int i = 0; i < arr.length; i++) {
            long value = arr[i];
            sum += value * value * value;
        }

        return sum;
    }

    // Multi-threaded configurations: this same method is used for the 2-, 4-, 6-, and 8-thread runs.
    static long parallelSum(int[] arr, int threadCount) throws InterruptedException {
        // threadCount tells us which configuration is being tested:
        // 2 -> create 2 threads
        // 4 -> create 4 threads
        // 6 -> create 6 threads
        // 8 -> create 8 threads
        Summer[] sums = new Summer[threadCount];
        Thread[] threads = new Thread[threadCount];
        int part = arr.length / threadCount;

        for (int i = 0; i < threadCount; i++) {
            // For the current configuration, i identifies the specific thread being created.
            // Example:
            // - if threadCount = 2, then i = 0 and 1
            // - if threadCount = 4, then i = 0, 1, 2, and 3
            // - if threadCount = 6, then i = 0 through 5
            // - if threadCount = 8, then i = 0 through 7
            int start = i * part;
            int end;

            if (i == threadCount - 1) { // The last thread takes any remaining elements.
                end = arr.length;
            } else {
                end = start + part; // Other threads handle only their fixed chunk.
            }

            sums[i] = new Summer(arr, start, end); // Create worker i for this range.
            threads[i] = new Thread(sums[i]); // Create the actual Java thread for worker i.
            threads[i].start();
        }

        long total = 0; // Variable to store the final total.

        for (int i = 0; i < threadCount; i++) { // Wait for every thread in the current configuration.
            threads[i].join(); // Wait for thread i to finish.
            total = total + sums[i].getSum(); // Add thread i's partial sum.
        }

        return total; // Return the final sum.
    }

    static void printHeader() {
        System.out.println();
        System.out.printf("%-8s %-20s %-10s %-15s%n",
                "Threads", "Execution Time (ms)", "Speedup", "% Improvement");
    }

    static void printMachineSpecifications() {
        System.out.println();
        System.out.println("Machine Specifications:");
        System.out.println("Processor model: Apple M2");
        System.out.println("Number of cores: 8");
        System.out.println("RAM: 8 GB");
        System.out.println("Operating system: macOS Tahoe 26.3.1");
        System.out.println("Java version: OpenJDK 25 LTS (Temurin)");
        System.out.println();
    }

    public static void main(String[] args) throws Exception {
        int size = 1000000;
        int[] data = createArray(size);

        // 1-thread configuration: measure the baseline first so every other configuration can be compared to it.
        // Use nanoTime because currentTimeMillis is too coarse for very fast runs and can show 0 ms.
        long StartTime = System.nanoTime();
        long expectedResult = singleSum(data);
        long EndTime = System.nanoTime();

        double timeTakenInMillis = (EndTime - StartTime) / 1000000.0;
        double speedup = 1.0; // Speedup for one thread is always 1.
        double improvement = 0.0; // Improvement for one thread is always 0.

        printHeader();
        System.out.printf("%-8d %-20.3f %-10.2f %-15.2f%n",
                1, timeTakenInMillis, speedup, improvement);

        int[] threadTests = { 2, 4, 6, 8 }; // Required multithreaded configurations.

        for (int i = 0; i < threadTests.length; i++) {
            // CurrentThreadCount is the configuration being tested on this loop iteration:
            // 2, then 4, then 6, then 8 threads.
            int CurrentThreadCount = threadTests[i];
            long start = System.nanoTime();
            long result = parallelSum(data, CurrentThreadCount);
            long end = System.nanoTime();

            double time = (end - start) / 1000000.0; // Convert the parallel time to milliseconds.
            speedup = timeTakenInMillis / time;
            improvement = ((timeTakenInMillis - time) / timeTakenInMillis) * 100;

            // Print one result row.
            System.out.printf("%-8d %-20.3f %-10.2f %-15.2f%n",
                    CurrentThreadCount, time, speedup, improvement);

            // Check whether the result matches the single-thread answer.
            if (result != expectedResult) {
                System.out.println("ERROR: incorrect result!");
            }
        }

        printMachineSpecifications();
    }
}
