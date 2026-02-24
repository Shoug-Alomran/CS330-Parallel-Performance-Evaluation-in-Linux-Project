---
hide:
  - toc
---

<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Experimental Plan

This experiment measures execution time using different thread counts to evaluate scalability and parallel efficiency.

All tests will be performed under identical conditions.

</div>
</div>

---

## Configuration

<div class="grid cards" markdown>

-   :material-code-braces: **Program Task**

    ---
    Compute the sum of cubes of array elements using multithreading.

-   :material-format-list-numbered: **Thread Counts**

    ---
    1, 2, 4, 6, 8 threads

-   :material-database-outline: **Input Control**

    ---
    Fixed array size  
    Values less than 100  
    Same dataset for all runs

-   :material-timer-outline: **Timing Method**

    ---
    Use `System.nanoTime()`  
    Measure computation time only  
    Exclude initialization

</div>

---

## Execution Policy

<div class="grid cards" markdown>

-   :material-repeat: **Repetitions**

    ---
    Each thread configuration will run 5 times.

-   :material-calculator-variant: **Metrics**

    ---
    Execution Time  
    Speedup = T(1) / T(n)  
    Percentage Improvement

-   :material-desktop-classic: **Hardware Control**

    ---
    All official benchmarks will run on one single machine to ensure consistency.

</div>