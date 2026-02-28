<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase I Report  
**Parallel Performance Evaluation (Process-based Matrix Multiplication)**

This report evaluates how process-based parallelism using `fork()` impacts
matrix multiplication performance in Linux.

Experiments vary matrix size (`N`) and the number of child processes (`PROCS`)
to measure execution time trends under controlled conditions.

</div>
</div>

---

## 1) Introduction

This project tests how using multiple processes affects the performance of
matrix multiplication in Linux. The program uses `fork()` to create child
processes that compute different portions of the result matrix in parallel.

The goal of Phase I is to set up a Linux environment, run the program under
different configurations, and collect execution-time data for analysis.

---

## 2) Objectives

<div class="grid cards" markdown>

-   :material-linux: **Environment Setup**

    ---
    Set up Ubuntu Linux in a virtual machine.

-   :material-tools: **Build & Run**

    ---
    Compile and run the provided C program successfully.

-   :material-tune: **Parameter Variation**

    ---
    Test matrix sizes: **1200, 1800, 2400**  
    Test processes: **1, 4**

-   :material-timer-outline: **Timing Measurement**

    ---
    Measure and compare execution time across all configurations.

</div>

---

## 3) Experimental Setup

### 3.1 System Environment

All experiments were conducted inside a Linux virtual machine to ensure a
consistent and reproducible execution environment. The VM was created using
**UTM on macOS** and configured to use **Apple’s virtualization framework**.

??? note "Creating a VM with UTM"
    ![Creating a VM with UTM](../Installing%20Ubuntu/1.%20Creating%20a%20VM%20with%20UTM.png)

??? note "Virtualize"
    ![Virtualize](../Installing%20Ubuntu/2.%20Virtualize.png)

The guest OS used was **Ubuntu 24.04.3 LTS (ARM64)**.

??? note "Linux"
    ![Linux](../Installing%20Ubuntu/3.%20Linux.png)

The VM was allocated **4 GB memory** and **4 CPU cores**, providing sufficient
resources for parallel execution.

??? note "Memory and Cores"
    ![Memory and Cores](../Installing%20Ubuntu/4.%20Memory+Cores.png)

Storage was configured to ensure adequate disk space for the OS, source code,
and experimental outputs.

??? note "Storage"
    ![Storage](../Installing%20Ubuntu/7.%20Storage.png)

??? note "Storage Configuration"
    ![Storage Configuration](../Installing%20Ubuntu/9.%20Storage%20Configuration.png)

System verification commands (e.g., `uname -a`, `free -h`, `lsb_release -a`)
were used to confirm architecture, memory, core count, and OS version.

??? note "System Specifications"
    ![System Specifications](../Installing%20Ubuntu/16.%20System%20Specifications.png)

---

### 3.2 Software Tools

<div class="grid cards" markdown>

-   :material-package-variant: **Build Tools**

    ---
    Installed `build-essential` to obtain GCC and core development utilities.

-   :material-tools: **Compiler**

    ---
    GCC compiler (version **11.4.0**).

</div>

**Installation:**

```bash
sudo apt install build-essential
```

**Compilation:**

```bash
gcc -Wall matrix_fork.c -o matrix_fork
```

The `-Wall` flag enables compiler warnings to catch potential issues early.

??? note "Apple Virtualization"
    ![Apple Virtualization](../Installing%20Ubuntu/5.%20Apple%20Virtualization.png)

??? note "Ubuntu"
    ![Ubuntu](../Installing%20Ubuntu/6.%20Ubuntu.png)

---

### 3.3 Program Description

The provided C program performs matrix multiplication using process-based
parallelism. Two matrices are initialized with random values. The result
matrix computation is divided across multiple child processes.

Each child process computes a subset of matrix rows. The parent process waits
for all children to complete before measuring total execution time.

??? note "Code in nano editor"
    ![Code in nano editor](../Installing%20Ubuntu/13.%20Code%20in%20nano%20editor.png)

??? note "Head of the file"
    ![Head of the file](../Installing%20Ubuntu/14.%20Head%20of%20the%20file%20\(to%20make%20sure%20it's%20saved\).png)

**System calls used:**

* `fork()` for process creation
* `wait()` for synchronization
* `clock()` to measure execution time

No structural changes were made to the program. Only configurable parameters
(e.g., `N`, `PROCS`) were modified during experimentation.

---

## 4) Methodology

Two parameters were varied:

1. **Matrix size (`N`)**: 1200, 1800, 2400
2. **Number of processes (`PROCS`)**: 1, 4

<div class="grid cards" markdown>

* ## :material-pencil: **Modify**
  Update `#define N` and `#define PROCS` in `matrix_fork.c`.

* ## :material-tools: **Compile**
  ```bash
  gcc -Wall matrix_fork.c -o matrix_fork
  ```

* ## :material-play-circle-outline: **Run (3 Trials)**
  ```bash
  ./matrix_fork
  ```

* ## :material-table: **Record**
  Record 3 execution times and compute the average.

</div>

**Configurations tested (6 total):**

* N=1200, PROCS=1
* N=1200, PROCS=4
* N=1800, PROCS=1
* N=1800, PROCS=4
* N=2400, PROCS=1
* N=2400, PROCS=4

---

## 5) Results

### 5.1 Execution Time Measurements

| Matrix Size (N) | PROCS | Run 1 (s) | Run 2 (s) | Run 3 (s) | Average (s) |
| --------------- | ----: | --------: | --------: | --------: | ----------: |
| 1200            |     1 |     0.001 |     0.001 |     0.003 |      0.0016 |
| 1200            |     4 |     0.002 |     0.002 |     0.001 |      0.0016 |
| 1800            |     1 |     0.001 |     0.001 |     0.001 |      0.0010 |
| 1800            |     4 |     0.003 |     0.003 |     0.003 |      0.0030 |
| 2400            |     1 |     0.002 |     0.001 |     0.001 |      0.0013 |
| 2400            |     4 |     0.004 |     0.003 |     0.003 |      0.0030 |

*Table 1: Execution time across configurations (3 trials + average)*

---

### 5.2 Observed Performance Trends

<div class="grid cards" markdown>

* ## :material-information-outline: **N = 1200**

  1 vs 4 processes produced nearly identical average execution time.

* ## :material-information-outline: **N = 1800**

  4 processes were slower than 1 process in all runs.

* ## :material-information-outline: **N = 2400**

  4 processes remained slower than 1 process, with ~2.3× higher average time.

</div>

??? note "Execution Time vs. Number of Processes"
    ![Execution Time vs. Number of Processes](../Installing%20Ubuntu/AllProcesses.png)

---

## 6) Discussion

In theory, parallel processes can reduce execution time by dividing computation
across cores. However, Phase I results show that for the tested sizes (1200–
2400), using 4 processes provided **minimal or negative** performance impact.

### Why performance did not improve

<div class="grid cards" markdown>

* ## :material-source-fork: **Process Creation Overhead**

  Creating multiple processes with `fork()` introduces overhead that can dominate short executions.

* ## :material-sync: **Synchronization Cost**

  The parent must wait for all children (`wait()`), so total time includes coordination overhead.

* ## :material-ruler: **Problem Size Threshold**

  For these matrix sizes, the computation may not be large enough to outweigh overhead.

</div>

For significantly larger matrices (e.g., N=10000), performance gains may become
more likely because computation time would dominate process overhead.

---

### 6.1 Implications for Parallel Programming

* Parallelism improves performance only when workload exceeds overhead cost
* Using all available cores does not guarantee better performance
* There is a minimum problem size where parallelization becomes beneficial

---

### 6.2 Experimental Limitations

* **Virtualization overhead:** VM layer may add performance penalties
* **ARM64 architecture:** Different characteristics than x86 systems
* **Initialization overhead:** Random initialization adds non-parallelizable work

---

## 7) Conclusion

In Phase I, we successfully:

* Set up Ubuntu Linux (**24.04.3 LTS ARM64**) in a virtual machine
* Installed GCC and development tools
* Compiled and executed the provided program
* Tested **6** configurations
* Collected execution-time data across all runs

### Key findings

* Parallel processes did **not** provide meaningful speedup for these sizes
* Process creation and synchronization overhead likely dominated runtime
* Larger problem sizes may be required to observe clear benefits

??? note "Working VM"
    ![Working VM](../Installing%20Ubuntu/12.%20Working%20VM.png)

??? note "Installing Kernel"
    ![Installing Kernel](../Installing%20Ubuntu/10.%20Installing%20Kernal.png)

??? note "Log in and update"
    ![Log in and update](../Installing%20Ubuntu/11.%20Log%20in%20+%20update.png)

??? note "Passing Memory Tests"
    ![Passing Memory Tests](../Installing%20Ubuntu/8.%20Passing%20Memory%20Tests.png)

---

## Future Work Recommendations

<div class="grid cards" markdown>

* ## :material-source-fork: **Thread-Based Parallelism**

  Evaluate pthread-based implementations and compare overhead.

* ## :material-sitemap-outline: **Improved Work Distribution**

  Explore alternative decomposition strategies for better load balance.

* ## :material-timer-sand: **Overhead Reduction**

  Investigate techniques such as process pooling or reduced synchronization.

* ## :material-ruler: **Larger Problem Sizes**

  Test matrices larger than 2400×2400 to identify the crossover point.

* ## :material-compare: **Comparative Benchmarks**

  Compare against sequential and optimized baselines to quantify overhead costs.

</div>

---

## HTML Version

[Open the Report](./report.html)