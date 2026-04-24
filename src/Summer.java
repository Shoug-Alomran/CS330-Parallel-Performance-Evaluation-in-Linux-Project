// Worker class used for multithreading.
public class Summer implements Runnable {
	private final int[] a;
	private final int min, max;
	private long sum;
	
	public Summer(int[] a, int min, int max) {
		this.a = a;
		this.min = min;
		this.max = max;
	}

	// Return the partial sum after the thread finishes.
	public long getSum() {
		return sum;
	}

	// Code that runs when the thread starts.
	@Override
	public void run() {
		this.sum = ArraySum.sumRange(a, min, max);
	}
}
