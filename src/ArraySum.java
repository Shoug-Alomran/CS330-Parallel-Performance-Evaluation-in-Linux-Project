import java.util.Random;

public class ArraySum {
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

    static int sumRange(int[] a, int min, int max) {
        int sum = 0;
        for (int i = min; i < max; i++) {
            sum += a[i]*a[i]*a[i];
        }
        return sum;
    }
    public static void main(String[] args) throws Exception {

    int size = 1_000_000;
    int[] data = createArray(size);

    long t1 = System.currentTimeMillis();
    int correct = singleSum(data);
    long t2 = System.currentTimeMillis();

    long singleTime = t2 - t1;

    System.out.println("Threads\tExecution Time(ms)\tSpeedup\tImprovement(%)");
    System.out.println("1\t" + singleTime + "\t\t1\t0");

    int[] threadTests = {2, 4, 6, 8};

    for (int tc : threadTests) {

        long start = System.currentTimeMillis();
        int result = parallelSum(data, tc);
        long end = System.currentTimeMillis();

        long execTime = end - start;

        double speedup = (double) singleTime / execTime;
        double improvement = ((double)(singleTime - execTime) / singleTime) * 100;

        System.out.printf("%d\t%d\t\t%.2f\t%.2f%%\n",
                tc, execTime, speedup, improvement);

        if (result != correct) {
            System.out.println("ERROR: incorrect result!");
        }
    }
}
  

            