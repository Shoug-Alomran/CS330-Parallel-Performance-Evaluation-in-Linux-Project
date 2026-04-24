<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Glossary

Key terms used throughout the CS330 parallel performance project, with emphasis
on the concepts that appear in Phase I and Phase II.

</div>
</div>

---

## Glossary Guide

<div class="grid cards" markdown>

-   :material-source-repository: **Project Reference**

    ---
    Quick access to the official GitHub repository used throughout the report,
    code appendix, and documentation.

-   :material-atom-variant: **Core Parallel Terms**

    ---
    Concepts such as speedup, synchronization, overhead, scalability, and
    data parallelism that apply across the whole project.

-   :material-source-fork: **Phase I Concepts**

    ---
    Process-based execution terms such as `fork()`, `wait()`, child process,
    matrix multiplication, and virtual machine setup.

-   :material-call-split: **Phase II Concepts**

    ---
    Thread-based execution terms such as array partitioning, worker thread,
    `Runnable`, partial sum, and thread configuration.

-   :material-chart-line: **Measurement Terms**

    ---
    Reporting vocabulary used in the benchmark analysis, including average
    execution time, percentage improvement, reproducibility, and raw timing data.

-   :material-book-open-page-variant: **How To Use This Page**

    ---
    Start with the section that matches your question, then use the definitions
    to interpret the reports, results tables, graphs, and source code.

</div>

---

## Project Reference

- Official GitHub repository:
  [CS330-Parallel-Performance-Evaluation-in-Linux-Project](https://github.com/Shoug-Alomran/CS330-Parallel-Performance-Evaluation-in-Linux-Project)

---

## Core Parallel Computing Terms

### Baseline

The reference version used for comparison. In Phase II, the baseline is the
`1`-thread run.

### Benchmark

A controlled performance test used to measure execution time under fixed
conditions.

### Concurrency

The ability of multiple tasks to make progress during overlapping time periods.
Concurrency does not always mean tasks run at the exact same instant.

### Correctness Check

A verification step that confirms the multithreaded result matches the
single-thread result.

### Data Parallelism

A parallel strategy where the same operation is applied to different portions
of the data at the same time.

### Execution Time

The total time a program or configuration needs to finish running. This project
reports execution time in milliseconds.

### Overhead

Extra cost introduced by parallel execution, such as thread creation,
synchronization, scheduling, or process management.

### Parallelism

The use of multiple processing units, threads, or processes to perform work
simultaneously.

### Scalability

How well performance changes as more threads or processes are added.

### Speedup

A performance metric showing how much faster a parallel version is compared to a
baseline. In this project:

`Speedup = T(1) / T(n)`

### Synchronization

The coordination required to make sure parallel tasks finish safely and their
results are combined correctly.

### Throughput

The amount of work completed in a period of time. This project focuses more on
execution time than throughput, but both are related.

---

## Phase I Terms

### Child Process

A process created by another process using `fork()`.

### `fork()`

A Unix system call that creates a new child process. Phase I uses `fork()` to
split matrix multiplication work across processes.

### `wait()`

A system call used by the parent process to pause until child processes finish.

### Matrix Multiplication

The computation performed in Phase I, where matrices `A` and `B` are multiplied
to produce matrix `C`.

### Process

An independent running program with its own execution state and resources.

### Process-Based Parallelism

Parallel execution achieved by running multiple processes rather than multiple
threads.

### Virtual Machine (VM)

A software-based computer used in Phase I to run Ubuntu Linux inside a
controlled environment.

---

## Phase II Terms

### Array Partitioning

Dividing the input array into non-overlapping ranges so each thread processes a
different slice.

### Chunk

A contiguous portion of the array assigned to one worker thread.

### Join

In Java, `join()` makes one thread wait until another thread finishes. This is
used in Phase II before combining partial sums.

### Multithreading

Using multiple threads inside one program to perform work in parallel.

### Partial Sum

The local result computed by one worker before all worker results are added
together.

### Runnable

A Java interface used to define code that can run on a thread. `Summer.java`
implements `Runnable`.

### Sum of Cubes

The Phase II workload where each array value contributes `x^3` to the final
result.

### Thread

A lightweight unit of execution inside a process. Threads share the same memory
space but can perform different parts of the work concurrently.

### Thread Configuration

The specific number of threads used in one experiment run, such as `1`, `2`,
`4`, `6`, or `8`.

### Worker Thread

A thread responsible for computing one assigned portion of the input data.

---

## Measurement And Reporting Terms

### Average Execution Time

The mean runtime across repeated runs of the same configuration.

### Configuration

A specific test setup, such as a chosen matrix size, process count, or thread
count.

### Controlled Experiment

An experiment where only selected variables change while the rest of the setup
stays fixed.

### Graph Interpretation

The explanation of what a graph shows and why a trend appears.

### Machine Specifications

The hardware and software details of the machine used for the benchmark, such
as CPU, RAM, OS, and Java version.

### Percentage Improvement

The percentage reduction in execution time compared to the baseline. In this
project:

`((T1 - Tn) / T1) * 100`

### Raw Timing Data

The unprocessed run-by-run execution times recorded before averaging.

### Reproducibility

The ability for the same setup and method to produce comparable results when
the experiment is repeated.
