import java.util.Random;

public class ArraySum {
    static int SIZE = 1_000_000;
    static int RUNS = 5;

    static int[] createArray(int size) {
        Random rand = new Random();
        int[] arr = new int[size];

        for (int i = 0; i < size; i++) {
            arr[i] = rand.nextInt(100);
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

    static long parallelSum(int[] arr, int threadCount) throws InterruptedException {
        Summer[] workers = new Summer[threadCount];
        Thread[] threads = new Thread[threadCount];
        int size = arr.length / threadCount;

        for (int i = 0; i < threadCount; i++) {
            int start = i * size;
            int end = (i == threadCount - 1) ? arr.length : start + size;

            workers[i] = new Summer(arr, start, end);
            threads[i] = new Thread(workers[i]);
            threads[i].start();
        }

        long total = 0;

        for (int i = 0; i < threadCount; i++) {
            threads[i].join();
            total += workers[i].getSum();
        }

        return total;
    }

    static double averageTime(int[] arr, int threadCount, long correctSum) throws InterruptedException {
        double totalTime = 0;

        for (int i = 0; i < RUNS; i++) {
            long start = System.nanoTime();
            long result = parallelSum(arr, threadCount);
            long end = System.nanoTime();

            if (result != correctSum) {
                System.out.println("Error: wrong result with " + threadCount + " threads.");
            }

            totalTime += (end - start) / 1_000_000.0;
        }

        return totalTime / RUNS;
    }

    public static void main(String[] args) throws Exception {
        int[] arr = createArray(SIZE);
        int[] threadCounts = {1, 2, 4, 6, 8};
        double[] times = new double[threadCounts.length];

        long correctSum = sumRange(arr, 0, arr.length);

        for (int i = 0; i < threadCounts.length; i++) {
            times[i] = averageTime(arr, threadCounts[i], correctSum);
        }

        double baseline = times[0];

        System.out.println("Sum of Cubes Performance Test");
        System.out.println("Array size: " + SIZE);
        System.out.println("Array values: integers less than 100");
        System.out.println("Average of " + RUNS + " runs");
        System.out.println();

        System.out.printf("%-10s %-20s %-12s %-15s%n",
                "Threads", "Execution Time (ms)", "Speedup", "% Improvement");

        for (int i = 0; i < threadCounts.length; i++) {
            double speedup = baseline / times[i];
            double improvement = ((baseline - times[i]) / baseline) * 100;

            System.out.printf("%-10d %-20.3f %-12.3f %-15.2f%n",
                    threadCounts[i], times[i], speedup, improvement);
        }

        System.out.println();
        System.out.println("Machine Specifications:");
        System.out.println("Processor cores: " + Runtime.getRuntime().availableProcessors());
        System.out.println("Operating system: " + System.getProperty("os.name") + " " + System.getProperty("os.version"));
        System.out.println("Java version: " + System.getProperty("java.version"));
    }
}
