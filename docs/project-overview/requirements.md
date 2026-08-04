<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Official Project Requirements

This page consolidates the latest course requirements for both project phases.

Phase 2 requirements were updated on **February 28, 2026** based on the instructor's latest brief.

</div>
</div>

---

## Phase I Requirements (Process-Based in Linux)

<div class="grid cards" markdown>

-   :material-linux: **Execution Environment**

    ---
    Ubuntu/Linux environment with reproducible setup.

-   :material-language-c: **Implementation Stack**

    ---
    C program compiled with `gcc` using process creation and synchronization (`fork()` / `wait()`).

-   :material-chart-line: **Experimentation**

    ---
    Run controlled matrix multiplication experiments with varying matrix size and process count.

-   :material-file-document-outline: **Reporting**

    ---
    Document setup, commands, results tables, and performance analysis.

</div>

---

## Phase II Requirements (Multithreaded Java Optimization)

### Core Task

Modify the Java program to compute the **sum of cubes of array elements** and evaluate performance on a multi-core system.

### Implementation Requirements

- Use integer array values strictly less than `100`.
- Support these thread counts: `1`, `2`, `4`, `6`, `8`.
- Measure execution time for each thread count.
- Compute speedup and percentage improvement relative to the single-thread baseline.

### Required Analysis

- Compare execution-time behavior across thread counts.
- Explain why performance improves or degrades.
- Discuss thread creation overhead, scheduling overhead, and CPU core utilization.
- Identify the maximum thread count after which performance starts to decrease.

---

## Phase II Submission Checklist

Submit one ZIP package containing:

- Modified Java source code.
- Results summary in tabular form (multiple tables).
- Main results table (`Threads`, `Execution Time`, `Speedup`, `% Improvement`).
- Short explanation (maximum `1000` words).
- Graphs that show performance trends.
- Maximum thread count after which performance decreases.
- Machine specifications for reproducibility.

### Mandatory Machine Specifications

- Processor model.
- Number of cores.
- RAM.
- Operating system.

---

## Results Table Template (Phase II)

| Threads | Execution Time (ms) | Speedup | % Improvement |
|---|---:|---:|---:|
| 1 |  |  |  |
| 2 |  |  |  |
| 4 |  |  |  |
| 6 |  |  |  |
| 8 |  |  |  |

---

## Marking Scheme (100 Marks)

| Criteria | Marks |
|---|---:|
| Understanding and explanation of provided code | 15 |
| Successful execution and verification of original program | 10 |
| Correct implementation of required mathematical modification | 15 |
| Implementation with multiple thread counts (1,2,4,6,8) | 10 |
| Accurate runtime measurement and data collection | 10 |
| Correct speedup and percentage-improvement calculation | 10 |
| Quality of performance analysis and explanation | 15 |
| Code quality, readability, and documentation | 5 |
| Proper results table and formatting | 5 |
| Machine specifications and reproducibility details | 5 |

---

## Academic Integrity

All submitted work must be original and follow university policy. Proper attribution is required for external references.
