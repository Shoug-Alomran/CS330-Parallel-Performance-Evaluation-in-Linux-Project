<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase 2 Performance Analysis Report

This report summarizes the completed multithreading experiment for the Java sum-of-cubes implementation.

</div>
</div>

---

## 1. Program Understanding

The Java program computes the sum of cubes of array elements while dividing the work across multiple threads.  
Each thread is assigned a portion of the array, performs the local cube-and-sum computation, and contributes to the final total.

The main goal of Phase 2 was to compare how runtime changes when the same workload is executed with `1`, `2`, `4`, `6`, and `8` threads.

## 2. Modification Summary

- The computation was updated to calculate the **sum of cubes** instead of the original baseline behavior.
- Array values were constrained to integers **less than 100**.
- The benchmark was executed with the required thread counts: **1, 2, 4, 6, and 8**.
- The program prints execution time, speedup, percentage improvement, and machine specifications for documentation.

## 3. Measurement Methodology

- Hardware environment: **Apple M2 MacBook Air**, **8 cores**, **8 GB RAM**.
- Software environment: **macOS Tahoe 26.3.1** and **OpenJDK 25 LTS (Temurin)**.
- Timing method: **`System.nanoTime()`**, converted to milliseconds.
- Each thread configuration was measured across **12 recorded runs**, and the average runtime was used for the final comparison.

## 4. Results

### Main Results

| Threads | Avg Execution Time (ms) | Speedup | % Improvement |
|---|---:|---:|---:|
| 1 | 3.754 | 1.00 | 0.00 |
| 2 | 4.335 | 0.87 | -15.48 |
| 4 | 3.111 | 1.21 | 17.14 |
| 6 | 0.698 | 5.38 | 81.41 |
| 8 | 0.649 | 5.79 | 82.72 |

### Result Highlights

- `2` threads were slower than the single-thread baseline.
- `4` threads improved performance slightly.
- `6` and `8` threads gave the strongest speedups.
- `8` threads produced the best average runtime overall.

## 5. Performance Discussion

The speedup trend was not linear at low thread counts. Moving from `1` to `2` threads actually increased runtime, which means the workload was too small for two-thread execution to overcome thread-management overhead. This is consistent with scheduling, synchronization, and task coordination costs.

At `4` threads, performance improved modestly, showing that parallelism began to offset overhead. The largest gains appeared at `6` and `8` threads, where execution time dropped below `1 ms` and speedup exceeded `5x`.

The best-performing configuration was **8 threads**, with an average runtime of **0.649 ms** and **82.72% improvement** over the baseline. However, the raw runs show some variability at `8` threads, including one slower run above `1 ms`. This suggests that while `8` threads produced the best mean time, factors such as scheduling noise, synchronization cost, and the Apple M2 hybrid core layout influenced consistency.

Overall, the data shows that multithreading improved performance significantly once the thread count reached `6` or higher, but early parallel configurations did not automatically help.

## 6. Conclusion

Multithreading improved performance for this workload, but the improvement depended strongly on thread count. `2` threads were slower than the single-thread baseline, `4` threads showed only a small gain, and the strongest results came from `6` and `8` threads.

The best average result was achieved with **8 threads**, while **6 threads** also performed very well and may be considered a strong practical configuration because of its competitive runtime. A useful future improvement would be to test larger array sizes so the project can better observe scaling behavior under heavier computational load.
