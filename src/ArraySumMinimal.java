import java.util.Random;

public class ArraySumMinimal {
    // create random array
    static int[] createArray(int size) {
        Random rand = new Random();
        int[] arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = rand.nextInt(100);   // values 0–99
        }
        return arr;
    }

    // single-thread sum (reference)
    static int singleSum(int[] arr) {
        int sum = 0;
        for (int v : arr) sum += v*v*v;
        return sum;
    }

    // worker thread
    static class Worker extends Thread {
        int[] arr;
        int start, end;
        int partialSum = 0;

        Worker(int[] arr, int start, int end) {
            this.arr = arr;
            this.start = start;
            this.end = end;
        }

        public void run() {
            for (int i = start; i < end; i++) {
                partialSum += arr[i]*arr[i]*arr[i];
            }
        }
    }

    // multithreaded sum
    static int parallelSum(int[] arr, int threadCount) throws InterruptedException {

        Worker[] workers = new Worker[threadCount];
        int chunk = arr.length / threadCount;

        for (int i = 0; i < threadCount; i++) {
            int start = i * chunk;
            int end = (i == threadCount - 1) ? arr.length : start + chunk;
            workers[i] = new Worker(arr, start, end);
            workers[i].start();
        }

        int total = 0;
        for (Worker w : workers) {
            w.join();
            total += w.partialSum;
        }
        return total;
    }

    public static void main(String[] args) throws Exception {

        int size = 1_000_000;
        int[] data = createArray(size);

        // single thread timing
        long t1 = System.currentTimeMillis();
        int correct = singleSum(data);
        long t2 = System.currentTimeMillis();

        System.out.println("Single thread time: " + (t2 - t1) + " ms");

        int[] threadTests = {2, 4, 6, 8};

        for (int tc : threadTests) {
            long start = System.currentTimeMillis();
            int result = parallelSum(data, tc);
            long end = System.currentTimeMillis();

            System.out.println(tc + " threads time: " + (end - start) + " ms");

            if (result != correct) {
                System.out.println("ERROR: incorrect result!");
            }
        }
    }
}
            