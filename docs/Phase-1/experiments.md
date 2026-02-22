---
hide:
  - toc
---

<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Experimental Design

This page defines the structured methodology used to evaluate
process-based parallelism in matrix multiplication.

The goal is to systematically measure how execution time changes
with varying problem size and degree of parallelism.

</div>
</div>

---

## Experimental Parameters

<div class="grid cards" markdown>

-   :material-ruler: **Matrix Size (N)**

    ---
    Controls computational workload.

    **Values Tested:** 1200, 1800, 2400  
    **Purpose:** Evaluate scaling behavior as problem size increases.

-   :material-source-fork: **Number of Processes (PROCS)**

    ---
    Controls the degree of parallel execution.

    **Values Tested:** 1, 4  
    **Purpose:** Measure impact of parallelization on runtime.

</div>

---

## Experimental Configurations

Total configurations tested: **6**

| Configuration | Matrix Size (N) | Processes (PROCS) | Status   |
|---------------|-----------------|-------------------|----------|
| 1 | 1200 | 1 | Complete |
| 2 | 1200 | 4 | Complete |
| 3 | 1800 | 1 | Complete |
| 4 | 1800 | 4 | Complete |
| 5 | 2400 | 1 | Complete |
| 6 | 2400 | 4 | Complete |

---

## Experimental Procedure

<div class="grid cards" markdown>

-   :material-pencil: **Modify Parameters**

    ---
    Update `#define N` and `#define PROCS` in `matrix_fork.c`.

-   :material-tools: **Compile**

    ---
    ```bash
    gcc -Wall matrix_fork.c -o matrix_fork
    ```

-   :material-play-circle-outline: **Execute (3 Runs)**

    ---
    ```bash
    ./matrix_fork
    ```

-   :material-table: **Record Data**

    ---
    Capture execution time for each run and compute the average.

-   :material-cpu-64-bit: **Maintain Environment Consistency**

    ---
    Ensure no other CPU-intensive processes are running.

</div>

---

## Data Collection Format

| Matrix Size (N) | PROCS | Run 1 | Run 2 | Run 3 | Average (s) |
|-----------------|-------|-------|-------|-------|-------------|
| 1200 | 1 | 0.001 | 0.001 | 0.003 | 0.0016 |
| 1200 | 4 | 0.002 | 0.002 | 0.001 | 0.0016 |
| 1800 | 1 | 0.001 | 0.001 | 0.001 | 0.001 |
| 1800 | 4 | 0.003 | 0.003 | 0.003 | 0.003 |
| 2400 | 1 | 0.002 | 0.001 | 0.001 | 0.0013 |
| 2400 | 4 | 0.004 | 0.003 | 0.003 | 0.003 |

---

## Analysis Plan

<div class="grid cards" markdown>

-   :material-chart-line: **Performance Scaling**

    ---
    Compare execution time vs. `PROCS`  
    Compare execution time vs. `N`

-   :material-timer-sand: **Overhead Analysis**

    ---
    Evaluate process creation and synchronization overhead.

-   :material-speedometer: **Efficiency Metrics**

    ---
    Compute:
    
    - Speedup  
    - Efficiency  
    - Scalability

-   :material-calculator-variant: **Statistical Analysis**

    ---
    Standard deviation and confidence interval calculations.

</div>

---

## Expected Outcomes

<div class="grid cards" markdown>

-   :material-alert-outline: **Small N**

    ---
    Overhead may outweigh parallel benefits.

-   :material-trending-up: **Large N**

    ---
    Parallel execution should reduce runtime.

-   :material-cpu-64-bit: **Optimal PROCS**

    ---
    Best performance expected when `PROCS = 4` (CPU core count).

-   :material-chart-bell-curve: **Diminishing Returns**

    ---
    Additional processes beyond available cores may reduce efficiency.

</div>

---

## Current Status

- Experimental design finalized  
- Data collection completed for all configurations  
- Preliminary observations:
  - N=1200 → Similar performance for 1 and 4 processes
  - N=1800 → 4 processes slower than 1 process
  - N=2400 → 4 processes ~2.3× slower than 1 process
- Detailed statistical analysis in progress

---

## Next Steps

<div class="grid cards" markdown>

-   :material-chart-bar: Generate performance graphs  
-   :material-magnify: Complete statistical analysis  
-   :material-file-document-edit-outline: Document findings  
-   :material-scale-balance: Compare empirical results with theory  

</div>

---

## Tools

- Data analysis: Python / Excel  
- Documentation: Markdown (MkDocs Material)  