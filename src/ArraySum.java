import java.util.Random;

public class ArraySum {
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

    static long singleSum(int[] arr) {
        long sum = 0;

        for (int i = 0; i < arr.length; i++) {
            long value = arr[i];
            sum += value * value * value;
        }

        return sum;
    }

    static long parallelSum(int[] arr, int threadCount) throws InterruptedException {
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
        int size = 1000000;
        int[] data = createArray(size);

        long t1 = System.currentTimeMillis();
        long correct = singleSum(data);
        long t2 = System.currentTimeMillis();

        double baseline = t2 - t1;
        double speedup = 1.0;
        double improvement = 0.0;

        System.out.println("Threads\tExecution Time (ms)\tSpeedup\t% Improvement");
        System.out.printf("1\t%.0f\t\t\t%.2f\t%.2f%n", baseline, speedup, improvement);

        int[] threadTests = {2, 4, 6, 8};

        for (int i = 0; i < threadTests.length; i++) {
            int tc = threadTests[i];
            long start = System.currentTimeMillis();
            long result = parallelSum(data, tc);
            long end = System.currentTimeMillis();

            double time = end - start;
            speedup = baseline / time;
            improvement = ((baseline - time) / baseline) * 100;

            System.out.printf("%d\t%.0f\t\t\t%.2f\t%.2f%n", tc, time, speedup, improvement);

            if (result != correct) {
                System.out.println("ERROR: incorrect result!");
            }
        }
    }
}
