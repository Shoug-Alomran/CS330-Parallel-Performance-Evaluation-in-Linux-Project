<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase 2 · Multithreaded Performance Optimization

Phase 2 evaluates the impact of Java multithreading on execution time for computing the **sum of cubes of array elements**.

The benchmark was executed on an **Apple M2 MacBook Air** using **OpenJDK 25 LTS (Temurin)** and the official thread counts `1`, `2`, `4`, `6`, and `8`.

</div>
</div>

---

## Phase 2 Navigation

<div class="grid cards" markdown>

-   :material-clipboard-text-outline: **Experimental Plan**

    ---
    Controlled setup, timing method, and repeat policy.

    [Open Plan](plan.md)

-   :material-table: **Results Template**

    ---
    Ready-to-fill tables for timing, speedup, and machine specifications.

    [Open Results](results.md)

-   :material-file-document-outline: **Analysis Report**

    ---
    Structured report outline mapped to submission requirements.

    [Open Report](report.md)

-   :material-account-group: **Work Log**

    ---
    Team responsibilities and progress checkpoints.

    [Open Work Log](work-log.md)

</div>

---

## Required Thread Configurations

<div class="grid cards" markdown>

-   :material-numeric-1-circle: **Single Thread Baseline**

    ---
    Baseline average: **3.754 ms** using `1` thread.

-   :material-numeric-2-circle: **Low Parallelism**

    ---
    `2` threads slowed down to **4.335 ms**, while `4` threads improved to **3.111 ms**.

-   :material-numeric-6-circle: **High Parallelism**

    ---
    `6` threads averaged **0.698 ms** and `8` threads averaged **0.649 ms**.

-   :material-chart-line: **Performance Metrics**

    ---
    Recorded metrics: execution time, speedup, and percentage improvement.

</div>

---

## Requirement Source

The detailed requirement summary is available here:

- [Project Requirements](../Project-Overview/requirements.md)

---

## Benchmark Summary

<div class="grid cards" markdown>

-   :material-speedometer: **Best Average Result**

    ---
    `8` threads achieved the fastest average runtime: **0.649 ms**.

-   :material-chart-bell-curve: **Strong Scaling Region**

    ---
    The largest improvement appeared at `6` and `8` threads, where runtime dropped below **0.7 ms**.

-   :material-alert-outline: **Early Overhead**

    ---
    `2` threads performed worse than the single-thread baseline, indicating overhead on this workload size.

-   :material-counter: **Dataset Size**

    ---
    Each configuration was measured across **12 recorded runs**.

</div>
