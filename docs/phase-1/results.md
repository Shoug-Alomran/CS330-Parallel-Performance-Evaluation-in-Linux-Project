<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Results  
**Parallel Performance Evaluation (Process-based Matrix Multiplication)**

This page reports the execution-time results for matrix multiplication under
process-based parallelism using `fork()` and `wait()`.

Across the tested configurations, increasing `PROCS` from **1 → 4** did **not**
reduce execution time. In most cases, runtime increased due to process and
synchronization overhead.

</div>
</div>

---

## Executive Summary

<div class="grid cards" markdown>

-   :material-alert-outline: **Main Finding**

    ---
    Using **4 processes** generally increased execution time compared to **1 process**.

-   :material-source-fork: **Cause**

    ---
    Overhead from process creation (`fork()`), scheduling, and synchronization (`wait()`) dominated at these problem sizes.

-   :material-check-circle-outline: **Data Quality**

    ---
    Low variability across runs (standard deviation ≤ 0.00094s) indicates consistent behavior in the VM environment.

</div>

---

## 1) Complete Experimental Results

### 1.1 Raw Execution Time Data (3 runs)

| Matrix Size (N) | PROCS | Run 1 (s) | Run 2 (s) | Run 3 (s) | Avg (s) | Std Dev |
|---:|---:|---:|---:|---:|---:|---:|
| 1200 | 1 | 0.001 | 0.001 | 0.003 | 0.0016 | 0.00094 |
| 1200 | 4 | 0.002 | 0.002 | 0.001 | 0.0016 | 0.00047 |
| 1800 | 1 | 0.001 | 0.001 | 0.001 | 0.0010 | 0.00000 |
| 1800 | 4 | 0.003 | 0.003 | 0.003 | 0.0030 | 0.00000 |
| 2400 | 1 | 0.002 | 0.001 | 0.001 | 0.0013 | 0.00047 |
| 2400 | 4 | 0.004 | 0.003 | 0.003 | 0.0033 | 0.00047 |

---

### 1.2 Derived Performance Metrics (per N)

**Definitions (per fixed N):**

- **Speedup** = \( T_{1} / T_{p} \)
- **Efficiency** = \( \text{Speedup} / p \)
- **Overhead Factor** = \( (T_{p} - T_{1}) / T_{1} \)

| Matrix Size (N) | Speedup (P=4 vs P=1) | Efficiency (P=4) | Overhead Factor (P=4 vs P=1) |
|---:|---:|---:|---:|
| 1200 | 1.00× | 0.25 | 0% |
| 1800 | 0.33× | 0.083 | 200% |
| 2400 | 0.39× | 0.098 | 154% |

> Interpretation: for N=1800 and N=2400, using 4 processes is slower than using 1 process (speedup < 1), indicating negative scaling.

---

## 2) Key Performance Trends

<div class="grid cards" markdown>

-   :material-view-parallel: **Effect of Increasing PROCS**

    ---
    - **N=1200:** equal performance (0.0016s vs 0.0016s)  
    - **N=1800:** **3× slower** with 4 processes (0.0030s vs 0.0010s)  
    - **N=2400:** **~2.5× slower** with 4 processes (0.0033s vs 0.0013s)

-   :material-ruler: **Effect of Increasing N**

    ---
    - For **P=1**, results are small and not strictly monotonic at this timing scale  
    - For **P=4**, runtime increases notably from N=1200 → 1800 → 2400

-   :material-chart-bell-curve: **Variability**

    ---
    Standard deviations are small relative to the differences between P=1 and P=4 for N=1800 and N=2400, suggesting the slowdown is consistent.

</div>

---

## 3) Visual Analysis (Text-Based)

### 3.1 Execution Time vs. Number of Processes

```
Execution Time (s)
0.004 |                         ● (2400,4)
0.003 |              ● (1800,4)  ● (2400,4)
0.002 | ● (1200,4)
0.001 | ● (1200,1)  ● (1800,1)  ● (2400,1)
+-------------------------------------
1 Process            4 Processes
```

### 3.2 Efficiency Summary

```
Efficiency (P=4)
0.25 | ● N=1200
0.10 |                 ● N=2400
0.08 |         ● N=1800
+-----------------------------
1200       1800      2400
```

---

## 4) Breakdown: Why PROCS=4 Can Be Slower

<div class="grid cards" markdown>

-   :material-source-fork: **Process Creation**

    ---
    `fork()` has non-trivial overhead (process metadata + scheduling + memory mapping behavior), especially noticeable when total runtime is very small.

-   :material-sync: **Synchronization**

    ---
    The parent waits for all children (`wait()`), so total runtime includes coordination overhead.

-   :material-swap-horizontal: **Scheduling / Context Switching**

    ---
    Multiple runnable processes introduce context-switching costs, which can outweigh benefits for fine-grained workloads.

-   :material-memory: **Memory Behavior**

    ---
    With large arrays, memory bandwidth and cache behavior can dominate. Multiple processes may increase contention rather than reduce time.

</div>

---

## 5) Anomalies & Measurement Notes

### 5.1 Observed Anomalies

- **N=1800, P=1** appears faster than **N=1200, P=1**
- **P=1** timings are very small and may be affected by timing resolution and VM noise

### 5.2 Measurement Considerations

- `clock()` measures **CPU time**, not wall-clock time
- At near-millisecond values, small effects (scheduler, VM activity, cache) can produce non-monotonic behavior
- Despite this, the **P=4 slowdowns at N=1800 and N=2400 are large and consistent**

---

## 6) Conclusion

The results show that naive process-based parallelism using `fork()` and `wait()` is inefficient for the tested matrix sizes (N ≤ 2400). Overhead dominates computation, producing **negative scaling** when using 4 processes.

These results support the OS-level principle that **parallelism is only beneficial when the workload is large enough to amortize process management overhead**.

---

*Data collected on: **2026-02-09**  
Environment: Ubuntu 24.04.3 LTS (ARM64), 4 CPU cores, 4 GB RAM  
Compiler: GCC 11.4.0 (`-Wall`)  
Timing: `clock()` with `CLOCKS_PER_SEC` scaling*