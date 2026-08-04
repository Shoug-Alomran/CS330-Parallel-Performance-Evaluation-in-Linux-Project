<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase II · Multithreaded Performance Optimization

Phase II extends the project from process-based parallelism in C to
thread-based parallelism in Java.

This phase focuses on modifying the program, benchmarking multiple thread
counts, and explaining how and why performance changes across configurations.

</div>
</div>

---

## Phase II Objectives

<div class="grid cards" markdown>

-   :material-language-java: **Java Implementation**

    ---
    Build and explain a Java program that computes the **sum of cubes of array
    elements**.

-   :material-call-split: **Thread-Based Parallelism**

    ---
    Split the array across multiple worker threads and combine their partial
    results into one final sum.

-   :material-timer-outline: **Performance Measurement**

    ---
    Measure runtime for the required configurations: `1`, `2`, `4`, `6`, and
    `8` threads.

-   :material-chart-box-outline: **Scaling Analysis**

    ---
    Compare execution time, speedup, and percentage improvement against the
    single-thread baseline.

-   :material-file-document-outline: **Explanatory Reporting**

    ---
    Document not just the final numbers, but also what the code does and why
    the results behaved that way.

</div>

---

## Scope Of Work

<div class="grid cards" markdown>

-   :material-code-braces: **Targeted Program Changes**

    ---
    The work centers on adapting the Java code for the required cube
    computation and benchmarking different thread counts.

-   :material-sitemap: **Controlled Work Distribution**

    ---
    The array is divided into contiguous ranges so each thread handles a
    separate portion of the input data.

-   :material-check-circle: **Correctness Verification**

    ---
    The threaded result is checked against a sequential baseline to confirm
    that performance measurements are still based on correct output.

</div>

---

## Phase II Deliverables

<div class="grid cards" markdown>

-   :material-format-list-bulleted: **Experimental Plan**

    ---
    Controlled setup, timing method, and repeat policy.

    [Open Plan](plan.md)

-   :material-table: **Structured Results**

    ---
    Final averages, raw runs, graphs, and interpretation.

    [Open Results](results.md)

-   :material-file-document-outline: **Standalone Report**

    ---
    Full HTML and PDF report with methodology, analysis, and code appendix.

    [Open Report](report.md)

-   :material-account-group: **Work Log**

    ---
    Team responsibilities and completion tracking.

    [Open Work Log](work-log.md)

</div>

---

## Phase II Outcome

By completing Phase II, the project demonstrates:

- A working Java multithreaded benchmark
- Measured scaling behavior across five thread configurations
- A clear comparison between overhead-limited and speedup-producing cases

These results build on Phase I by moving from process-based parallelism to a
thread-based implementation with a more detailed performance analysis.
