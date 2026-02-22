---
hide:
  - toc
---

<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase I · Overview

Phase I establishes the execution environment and performs the initial
experimental evaluation of process-based parallelism in Linux.

This phase ensures that compilation, execution, measurement, and
documentation are performed correctly and consistently.

</div>
</div>

---

## Phase I Objectives

<div class="grid cards" markdown>

-   :material-linux: **Environment Setup**

    ---
    Configure a Linux environment using a virtual machine to ensure
    reproducibility and controlled experimentation.

-   :material-tools: **Successful Compilation**

    ---
    Compile and execute the provided C program without warnings or runtime errors.

-   :material-source-fork: **Process Understanding**

    ---
    Analyze how `fork()` and `wait()` enable process-based parallel execution.

-   :material-timer-outline: **Performance Measurement**

    ---
    Measure execution time under varying configurations of `N` and `PROCS`.

-   :material-table: **Data Collection**

    ---
    Record structured performance data for analysis and reporting.

</div>

---

## Scope of Work

<div class="grid cards" markdown>

-   :material-code-braces: **No Algorithm Redesign**

    ---
    The provided source code is used without structural modification.

-   :material-tune: **Controlled Parameter Variation**

    ---
    Only configurable parameters are modified:
    - Matrix size (`N`)
    - Number of processes (`PROCS`)

-   :material-magnify: **Observation Over Optimization**

    ---
    The objective is to analyze behavior, not optimize or rewrite the algorithm.

</div>

---

## Phase I Deliverables

<div class="grid cards" markdown>

-   :material-monitor: **Environment Documentation**

    ---
    Clear explanation of VM and Linux setup.

-   :material-check-circle: **Successful Execution**

    ---
    Verified compilation and runtime outputs.

-   :material-chart-line: **Performance Results**

    ---
    Structured tables and/or graphs summarizing execution time.

-   :material-file-document-outline: **Analytical Report**

    ---
    Written analysis discussing performance trends and scaling behavior.

</div>

---

## Phase I Outcome

By completing Phase I, the project establishes:

- A reliable experimental environment  
- Baseline performance data  
- A structured methodology for evaluation  

These results form the foundation for deeper analysis and extension in Phase II.

---

This section provides the contextual framework for all Phase I documentation and experimental results presented in subsequent pages.