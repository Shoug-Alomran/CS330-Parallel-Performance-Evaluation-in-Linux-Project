---
hide:
  - toc
---

<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# **Parallel Performance Evaluation in Linux**

This project provides hands-on experimentation with Linux process creation and parallel execution using C and Java.

You will compile and execute system-level programs, vary configuration parameters, measure execution time, and analyze performance behavior across different parallel configurations.

[Go to Phase I](../Phase-1/index.md){ .md-button .md-button--primary }
[Go to Phase II](../Phase-2/index.md){ .md-button }

</div>
</div>

---

## What This Project Covers

<div class="grid cards" markdown>

-   :material-source-fork: **Process-Based Parallelism**

    ---
    Use `fork()` and `wait()` in Linux to divide matrix multiplication work across multiple processes.

-   :material-vector-polyline: **Thread-Based Parallelism**

    ---
    Implement Java multithreading to compute the sum of cubes and analyze scalability using different thread counts.

-   :material-timer-outline: **Timing & Performance Analysis**

    ---
    Measure execution time using `clock()` in C and `System.nanoTime()` in Java. Evaluate speedup and efficiency.

-   :material-file-document-outline: **Structured Documentation**

    ---
    Provide reproducible setup steps, controlled experiments, formatted results, and structured reporting across both phases.

</div>

---

## Objectives

- Understand Linux process creation and synchronization  
- Explore multithreading using Java  
- Measure execution time under different parallel configurations  
- Analyze scalability and overhead behavior  
- Compare process-based and thread-based parallelism  
- Practice structured technical documentation  

---

## Scope

This project emphasizes experimental evaluation and performance analysis.

Phase I focuses on process-based matrix multiplication in Linux using C.

Phase II focuses on thread-based parallel computation in Java and formal performance evaluation using speedup metrics.

All experiments are conducted in controlled environments to ensure reproducibility and valid comparison.

---

## Project Phases

<div class="grid cards" markdown>

-   :material-numeric-1-circle: **Phase I · Process-Based Matrix Multiplication**

    ---
    Set up Linux, compile the C program, vary matrix size and number of processes, and collect execution-time measurements.

    [Phase I Overview](../Phase-1/index.md)

-   :material-numeric-2-circle: **Phase II · Multithreaded Performance Evaluation**

    ---
    Implement configurable thread counts, perform controlled benchmarks on a single machine, compute speedup, and analyze scalability limits.

    [Phase II Overview](../Phase-2/index.md)

</div>

---

## Tools and Technologies

<div class="grid cards" markdown>

-   :material-linux: **Linux (Ubuntu)**

    ---
    Runtime environment for process creation and benchmarking in Phase I.

-   :material-language-c: **C + GCC**

    ---
    System-level programming for process-based parallel matrix multiplication.

-   :material-language-java: **Java**

    ---
    Multithreaded implementation and performance measurement in Phase II.

-   :material-source-fork: **fork() / wait()**

    ---
    Process management primitives used in Phase I.

-   :material-vector-polyline: **Java Threads**

    ---
    Thread-based workload division and synchronization in Phase II.

-   :material-book-open-variant: **MkDocs (Material)**

    ---
    Documentation framework used to publish a clean, structured, and reproducible project site.

</div>