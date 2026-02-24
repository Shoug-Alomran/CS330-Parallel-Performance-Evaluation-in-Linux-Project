
public class Summer implements Runnable {
	private int[] a;
	private int min, max;
	private int sum;
	
	public Summer(int[] a, int min, int max) {
		this.a = a;
		this.min = min;
		this.max = max;
	}
	
	public int getSum() {
		return sum;
	}
	
	public void run() {
		this.sum = ArraySum.sumRange(a, min, max);
	}
}
