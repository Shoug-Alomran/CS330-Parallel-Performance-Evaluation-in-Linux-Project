<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase 2 Results

Use the following tables to record official benchmark outcomes.

</div>
</div>

---

## Main Results Table

| Threads | Avg Execution Time (ms) | Speedup | % Improvement |
|---|---:|---:|---:|
| 1 | 3.754 | 1.00 | 0.00 |
| 2 | 4.335 | 0.87 | -15.48 |
| 4 | 3.111 | 1.21 | 17.14 |
| 6 | 0.698 | 5.38 | 81.41 |
| 8 | 0.649 | 5.79 | 82.72 |

---

## Raw Trial Table (12 Runs)

| Threads | Run 1 | Run 2 | Run 3 | Run 4 | Run 5 | Run 6 | Run 7 | Run 8 | Run 9 | Run 10 | Run 11 | Run 12 | Average (ms) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | 3.921 | 3.671 | 3.813 | 3.690 | 3.759 | 3.702 | 3.704 | 3.740 | 3.724 | 3.924 | 3.725 | 3.680 | 3.754 |
| 2 | 4.560 | 4.207 | 4.273 | 4.252 | 4.244 | 4.217 | 4.362 | 4.771 | 4.240 | 4.205 | 4.347 | 4.348 | 4.335 |
| 4 | 3.022 | 3.077 | 3.171 | 3.116 | 3.139 | 3.113 | 3.071 | 2.823 | 3.446 | 3.139 | 3.119 | 3.094 | 3.111 |
| 6 | 0.747 | 0.634 | 0.685 | 0.678 | 0.592 | 0.708 | 0.848 | 0.616 | 0.631 | 0.758 | 0.772 | 0.707 | 0.698 |
| 8 | 0.537 | 0.788 | 0.588 | 0.773 | 0.611 | 1.013 | 0.567 | 0.571 | 0.650 | 0.639 | 0.515 | 0.533 | 0.649 |

---

## Machine Specifications

| Item | Value |
|---|---|
| Processor Model | Apple M2 |
| Physical Cores | 8 (4 performance + 4 efficiency) |
| Logical Cores (Threads) | 8 |
| RAM | 8 GB |
| Operating System | macOS Tahoe 26.3.1 |
| Java Version | OpenJDK 25 LTS (Temurin) |

---

## Graphs to Include

- Threads vs Average Execution Time (ms)
- Threads vs Speedup
- Optional: Threads vs % Improvement

---

## Interpretation Notes

- Best-performing thread count: **8 threads** with an average runtime of **0.649 ms**.
- First clear improvement beyond baseline appears at **4 threads**, but the major gain begins at **6 threads**.
- `2` threads performed worse than `1` thread, which suggests that thread-management overhead outweighed any parallel benefit for that configuration.
- `8` threads produced the best mean result, but the raw runs show some variability, so synchronization cost, scheduling behavior, and mixed performance/efficiency cores likely influenced the spread.
