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

    // Sum the cubes using one thread only.
    static long singleSum(int[] arr) {
        long sum = 0;

        for (int i = 0; i < arr.length; i++) {
            long value = arr[i];
            sum += value * value * value;
        }

        return sum;
    }

    // Sum the cubes using multiple threads.
    static long parallelSum(int[] arr, int threadCount) throws InterruptedException {
        Summer[] sums = new Summer[threadCount];
        Thread[] threads = new Thread[threadCount];
        int part = arr.length / threadCount;

        for (int i = 0; i < threadCount; i++) {
            int start = i * part;
            int end;

            if (i == threadCount - 1) { // Check if this is the last thread.
                end = arr.length;
            } else {
                end = start + part; // Other threads handle only their fixed chunk.
            }

            sums[i] = new Summer(arr, start, end); // Create the worker object.
            threads[i] = new Thread(sums[i]);
            threads[i].start();
        }

        long total = 0; // Variable to store the final total.

        for (int i = 0; i < threadCount; i++) { // Wait for all threads to finish.
            threads[i].join(); // Wait for this thread.
            total = total + sums[i].getSum(); // Add this thread's partial sum.
        }

        return total; // Return the final sum.
    }

    public static void main(String[] args) throws Exception {
        int size = 1000000;
        int[] data = createArray(size);

        // Use nanoTime because currentTimeMillis is too coarse for very fast runs and
        // can show 0 ms.
        long StartTime = System.nanoTime();
        long expectedResult = singleSum(data);
        long EndTime = System.nanoTime();

        double timeTakenInMillis = (EndTime - StartTime) / 1000000.0;
        double speedup = 1.0; // Speedup for one thread is always 1.
        double improvement = 0.0; // Improvement for one thread is always 0.

        // Print the table header.
        System.out.printf("%-8s %-20s %-10s %-15s%n",
                "Threads", "Execution Time (ms)", "Speedup", "% Improvement");
        System.out.printf("%-8d %-20.3f %-10.2f %-15.2f%n",
                1, timeTakenInMillis, speedup, improvement);

        int[] threadTests = { 2, 4, 6, 8 }; // Thread counts required

        for (int i = 0; i < threadTests.length; i++) {
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

        System.out.println();
        // Print the machine specs title.
        System.out.println("Machine Specifications:");
        System.out.println("Processor model: Apple M2");
        System.out.println("Number of cores: 8");
        System.out.println("RAM: 8 GB");
        System.out.println("Operating system: macOS Tahoe 26.3.1");
    }
}
