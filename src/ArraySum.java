import java.util.Random;

public class ArraySum {
    private static final int ARRAY_SIZE = 1_000_000;
    private static final int[] THREAD_COUNTS = {1, 2, 4, 6, 8};
    private static final int RUNS_PER_TEST = 5;

    static int[] createArray(int size) {
        Random rand = new Random();
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = rand.nextInt(100);
        }
        return arr;
    }

    public static long sumRange(int[] arr, int min, int max) {
        long sum = 0;
        for (int i = min; i < max; i++) {
            long value = arr[i];
            sum += value * value * value;
        }
        return sum;
    }

    static long singleThreadSum(int[] arr) {
        return sumRange(arr, 0, arr.length);
    }

    static long parallelSum(int[] arr, int threadCount) throws InterruptedException {
        Summer[] workers = new Summer[threadCount];
        Thread[] threads = new Thread[threadCount];
        int chunk = arr.length / threadCount;

        for (int i = 0; i < threadCount; i++) {
            int start = i * chunk;
            int end = (i == threadCount - 1) ? arr.length : start + chunk;
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

    static double averageTimeMs(int[] arr, int threadCount, long expected) throws InterruptedException {
        double totalMs = 0.0;

        for (int run = 1; run <= RUNS_PER_TEST; run++) {
            long start = System.nanoTime();
            long result = (threadCount == 1) ? singleThreadSum(arr) : parallelSum(arr, threadCount);
            long end = System.nanoTime();

            if (result != expected) {
                throw new IllegalStateException(
                    "Incorrect result for " + threadCount + " threads on run " + run
                );
            }

            totalMs += (end - start) / 1_000_000.0;
        }

        return totalMs / RUNS_PER_TEST;
    }

    public static void main(String[] args) throws Exception {
        int[] data = createArray(ARRAY_SIZE);
        long expected = singleThreadSum(data);
        double[] averages = new double[THREAD_COUNTS.length];

        System.out.println("Phase 2: Sum of cubes using multithreading");
        System.out.println("Array size: " + ARRAY_SIZE);
        System.out.println("Array values: integers from 0 to 99");
        System.out.println("Runs per configuration: " + RUNS_PER_TEST);
        System.out.println();

        for (int i = 0; i < THREAD_COUNTS.length; i++) {
            int threadCount = THREAD_COUNTS[i];
            averages[i] = averageTimeMs(data, threadCount, expected);
        }

        double baseline = averages[0];

        System.out.printf("%-8s %-20s %-12s %-16s%n",
            "Threads", "Execution Time (ms)", "Speedup", "% Improvement");

        for (int i = 0; i < THREAD_COUNTS.length; i++) {
            int threadCount = THREAD_COUNTS[i];
            double time = averages[i];
            double speedup = baseline / time;
            double improvement = ((baseline - time) / baseline) * 100.0;

            System.out.printf("%-8d %-20.3f %-12.3f %-16.2f%n",
                threadCount, time, speedup, improvement);
        }

        System.out.println();
        System.out.println("Machine information:");
        System.out.println("Available processors: " + Runtime.getRuntime().availableProcessors());
        System.out.println("OS: " + System.getProperty("os.name") + " " + System.getProperty("os.version"));
        System.out.println("Java: " + System.getProperty("java.version"));
    }
}
