---
hide:
  - toc
---

<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Parallel Performance Evaluation in Linux (Process-based Matrix Multiplication)**


This project provides hands-on experimentation with Linux process creation and parallel execution using C.

You will compile and run a provided matrix multiplication program, vary configuration parameters (matrix size `N` and number of processes `PROCS`), and analyze execution-time behavior across different setups.

[Build & Run](../Phase-1/build-run.md){ .md-button .md-button--primary }
[Go to Phase I](../Phase-1/index.md){ .md-button }

</div>
</div>

---

## What This Project Covers

<div class="grid cards" markdown>

-   :material-source-fork: **Process Creation**

    ---
    Understand how Linux creates child processes using `fork()`, how work is split across processes, and how the parent synchronizes using `wait()`.

-   :material-view-parallel: **Parallel Execution**

    ---
    Execute matrix multiplication with different `PROCS` values and observe how parallelism impacts runtime and CPU utilization.

-   :material-timer-outline: **Timing & Analysis**

    ---
    Measure execution time using `clock()` and compare results across configurations to evaluate scaling behavior.

-   :material-file-document-outline: **Structured Documentation**

    ---
    Provide reproducible build/run steps, verification checks, troubleshooting notes, and clean reporting for Phase I and Phase II.

</div>

---

## Objectives

- Understand process creation and management in Linux  
- Explore parallel execution using multiple processes  
- Measure and analyze execution time under different configurations  
- Evaluate performance and scalability behavior  
- Practice structured technical documentation  

---

## Scope

This project emphasizes **experimental evaluation** rather than algorithm design.

A provided C program is used as the baseline for experimentation. Modifications are limited to configurable parameters (e.g., `N`, `PROCS`) to ensure consistent and comparable results.

All work is performed in a Linux environment (Ubuntu) to ensure reproducibility.

---

## Project Phases

<div class="grid cards" markdown>

-   :material-numeric-1-circle: **Phase I — Setup + Experimentation**

    ---
    Set up the Linux environment, compile and execute the program, run multiple configurations, and collect performance measurements.

    [Phase I Overview](../Phase%201/)

-   :material-numeric-2-circle: **Phase II — Extension + Reporting**

    ---
    Phase II builds on Phase I according to instructor-provided requirements (additional experiments, deeper analysis, final report).

    [Phase II Overview](../Phase%202/)

</div>

---

## Tools and Technologies

<div class="grid cards" markdown>

-   :material-linux: **Linux (Ubuntu)**

    ---
    Primary runtime environment for process creation, execution, and measurement.

-   :material-language-c: **C + GCC**

    ---
    System-level programming in C compiled using `gcc`.

-   :material-source-fork: **fork() / wait()**

    ---
    Process creation and synchronization primitives used to parallelize computation.

-   :material-book-open-variant: **MkDocs (Material)**

    ---
    Documentation framework used to publish a clean, structured, and reproducible project site.

</div>

---