import java.util.Random;

public class ArraySum {
    static int SIZE = 1000000;
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

    static long sum(int[] arr, int threadCount) throws InterruptedException {
        Summer[] sums = new Summer[threadCount];
        Thread[] threads = new Thread[threadCount];
        int part = arr.length / threadCount;

        for (int i = 0; i < threadCount; i++) {
            int start = i * part;
            int end;

            if (i == threadCount - 1) {
                end = arr.length;
            } else {
                end = start + part;
            }

            sums[i] = new Summer(arr, start, end);
            threads[i] = new Thread(sums[i]);
            threads[i].start();
        }

        long total = 0;

        for (int i = 0; i < threadCount; i++) {
            threads[i].join();
            total = total + sums[i].getSum();
        }

        return total;
    }

    public static void main(String[] args) throws Exception {
        int[] arr = createArray(SIZE);
        int[] threadCounts = {1, 2, 4, 6, 8};
        long correctSum = sumRange(arr, 0, arr.length);
        double baseline = 0;

        System.out.println("Sum of Cubes Performance Test");
        System.out.println("Array size: " + SIZE);
        System.out.println("Array values: integers less than 100");
        System.out.println("Average of " + RUNS + " runs");
        System.out.println();
        System.out.println("Threads\tExecution Time (ms)\tSpeedup\t\t% Improvement");

        for (int i = 0; i < threadCounts.length; i++) {
            int threadCount = threadCounts[i];
            double totalTime = 0;

            for (int j = 0; j < RUNS; j++) {
                long start = System.nanoTime();
                long result = sum(arr, threadCount);
                long end = System.nanoTime();

                if (result != correctSum) {
                    System.out.println("Error: wrong result with " + threadCount + " threads.");
                }

                totalTime = totalTime + ((end - start) / 1000000.0);
            }

            double averageTime = totalTime / RUNS;

            if (i == 0) {
                baseline = averageTime;
            }

            double speedup = baseline / averageTime;
            double improvement = ((baseline - averageTime) / baseline) * 100;

            System.out.printf("%d\t%.3f\t\t\t%.3f\t\t%.2f%n",
                threadCount, averageTime, speedup, improvement);
        }

        System.out.println();
        System.out.println("Machine Specifications:");
        System.out.println("Processor cores: " + Runtime.getRuntime().availableProcessors());
        System.out.println("Operating system: " + System.getProperty("os.name") + " " + System.getProperty("os.version"));
        System.out.println("Java version: " + System.getProperty("java.version"));
    }
}
