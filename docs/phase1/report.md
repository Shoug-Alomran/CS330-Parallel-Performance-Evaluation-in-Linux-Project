# Phase I Report: Parallel Performance Evaluation

## 1. Introduction

This project tests how using multiple processes affects the performance of matrix multiplication in Linux. We use the fork() system call to create child processes that work on different parts of the computation at the same time.

The program multiplies two matrices by dividing the work among multiple processes. We measure the execution time to see how performance changes when we use different numbers of processes and different matrix sizes.

The goal of Phase 1 is to set up a Linux environment, run the program with different settings, and collect data on how long it takes to complete.

## 2. Objectives

The objectives of this phase are:

- Set up Ubuntu Linux in a virtual machine
- Compile and run the provided C program
- Test with different matrix sizes: 1200, 1800, and 2400
- Test with different numbers of processes: 1 and 4
- Measure and compare execution times

## 3. Experimental Setup
### 3.1 System Environment
All experiments were conducted inside a Linux virtual machine to ensure a consistent and reproducible execution environment. The virtual machine was created using UTM on macOS and configured to use Apple's virtualization framework.

![Creating a VM with UTM](../Installing%20Ubuntu/1.%20Creating%20a%20VM%20with%20UTM.png)
![Virtualize](../Installing%20Ubuntu/2.%20Virtualize.png)

The guest operating system used was Ubuntu 24.04.3 LTS (ARM64). 

![Linux](../Installing%20Ubuntu/3.%20Linux.png)

The virtual machine was allocated 4 GB of memory and 4 CPU cores, which provided sufficient resources for parallel execution. 

![Memory and Cores](../Installing%20Ubuntu/4.%20Memory+Cores.png)

Storage capacity was configured to ensure sufficient disk space for the operating system, source code, and experimental outputs.

![Storage](../Installing%20Ubuntu/7.%20Storage.png)
![Storage Configuration](../Installing%20Ubuntu/9.%20Storage%20Configuration.png)

System verification commands (e.g., `uname -a`, `free -h`, `lsb_release -a`) were used to confirm the CPU architecture (aarch64), available memory, core count, and OS version, ensuring a stable and controlled environment.

![System Specifications](../Installing%20Ubuntu/16.%20System%20Specifications.png)

### 3.2 Software Tools

We installed the following tools in Ubuntu:

- GCC compiler (version 11.4.0)
- Build-essential package

Installation command:
sudo apt install build-essential

Compilation command:
gcc -Wall matrix_fork.c -o matrix_fork

The -Wall flag enables all compiler warnings to help catch errors.

![Apple Virtualization](../Installing%20Ubuntu/5.%20Apple%20Virtualization.png)
![Ubuntu](../Installing%20Ubuntu/6.%20Ubuntu.png)

The GCC compiler and development utilities were installed via `sudo apt install build-essential`. The program was compiled with the `-Wall` flag to enable all warnings, ensuring code quality. These tools together enabled the compilation and execution of the provided C program.

### 3.3 Program Description
The provided C program performs matrix multiplication using process-based parallelism. Two input matrices are initialized with random values, and the computation of the result matrix is divided among multiple child processes.

Each child process is responsible for computing a subset of matrix rows. The parent process waits for all child processes to complete before measuring the total execution time.

![Code in nano editor](../Installing%20Ubuntu/13.%20Code%20in%20nano%20editor.png)
![Head of the file](../Installing%20Ubuntu/14.%20Head%20of%20the%20file%20(to%20make%20sure%20it's%20saved).png)

The program uses:

- `fork()` for process creation
- `wait()` for synchronization
- `clock()` to measure execution time

No structural changes were made to the program. Only configurable parameters such as matrix size and number of processes were modified during experimentation.

## 4. Methodology
4.0 Methodology

We tested the program by changing two things:

1. Matrix size (N): 1200, 1800, 2400
2. Number of processes (PROCS): 1, 4

Testing procedure:

1. Open matrix_fork.c in the nano editor
2. Change the #define N and #define PROCS values
3. Save the file
4. Compile: gcc -Wall matrix_fork.c -o matrix_fork
5. Run the program: ./matrix_fork
6. Record the execution time
7. Repeat 2 more times (3 runs total)
8. Calculate the average time

We tested 6 different combinations:

- N=1200, PROCS=1
- N=1200, PROCS=4
- N=1800, PROCS=1
- N=1800, PROCS=4
- N=2400, PROCS=1
- N=2400, PROCS=4

## 5. Results
### 5.1 Execution Time Measurements
Execution times were collected for different combinations of matrix size and number of processes. The results are summarized in Table 1.

| Matrix Size (N) | Processes (PROCS) | Run 1 (s) | Run 2 (s) | Run 3 (s) | Average Time (s) |
|-----------------|-------------------|-----------|-----------|-----------|------------------|
| 1200            | 1                 | 0.001     | 0.001     | 0.003     | 0.0016          |
| 1200            | 4                 | 0.002     | 0.002     | 0.001     | 0.0016          |
| 1800            | 1                 | 0.001     | 0.001     | 0.001     | 0.001           |
| 1800            | 4                 | 0.003     | 0.003     | 0.003     | 0.003           |
| 2400            | 1                 | 0.002     | 0.001     | 0.001     | 0.0013          |
| 2400            | 4                 | 0.004     | 0.003     | 0.003     | 0.003           |

*Table 1: Average execution time for different configurations*

### 5.2 Performance Trends
5.2 Performance Trends

Our results show:

- Using 4 processes was slightly faster than using 1 process
- The improvement was small (about the same or slightly faster)
- Larger matrices showed similar patterns

The performance improvement was limited because:

- Creating processes takes time (overhead)
- Our matrices may not have been large enough to see major benefits
- The system has to coordinate between processes

![Execution Time vs. Number of Processes](../Installing Ubuntu/AllProcesses.png)

## 6. Discussion

What we observed:

Using multiple processes can reduce execution time, but the improvement depends on the problem size. In our tests, going from 1 to 4 processes showed minimal improvement.

Why this happened:

1. Process creation overhead: Creating processes with fork() takes time
2. Coordination: The parent process must wait for all child processes to finish
3. Problem size: Our matrices weren't large enough to see major speedup

For larger matrices (like N=10000), we would likely see bigger performance gains because the computation time would outweigh the overhead.

This aligns with OS concepts about parallelism:

- Parallelism helps when the workload is large
- Small tasks don't benefit much because overhead dominates
- There's a limit to how much speedup you can get (diminishing returns)

### 6.1 Implications for Parallel Programming
The results highlight important considerations for parallel program design:

- **Overhead Awareness:** Parallelization only improves performance when computational workload significantly exceeds process management overhead
- **Optimal Process Count:** Using all available CPU cores (4) doesn't guarantee best performance
- **Problem Size Threshold:** There exists a minimum problem size where parallelization becomes beneficial

### 6.2 Experimental Limitations
Several factors may have influenced the observed results:

- **Virtual Machine Environment:** Additional virtualization layer may introduce performance penalties
- **ARM64 Architecture:** Different performance characteristics compared to x86 systems
- **Matrix Initialization:** Random value generation may add non-parallelizable overhead

## 7. Conclusion

In Phase 1, we successfully:

✓ Set up Ubuntu Linux (version 24.04.3 LTS) in a virtual machine

✓ Installed GCC compiler and development tools

✓ Compiled and ran the matrix multiplication program

✓ Tested 6 different configurations

✓ Collected execution time data

Key findings:

- Multiple processes can improve performance
- The improvement was small for our test sizes
- Process creation overhead limits the benefits
- Larger problems would likely show better results

This phase gave us baseline data on how process-based parallelism works in Linux. These results will help us understand parallel processing concepts in Phase 2.

![Working VM](../Installing%20Ubuntu/12.%20Working%20VM.png)
![Installing Kernel](../Installing%20Ubuntu/10.%20Installing%20Kernal.png)
![Log in and update](../Installing%20Ubuntu/11.%20Log%20in%20+%20update.png)
![Passing Memory Tests](../Installing%20Ubuntu/8.%20Passing%20Memory%20Tests.png)

**Future Work Recommendations:**

1. **Alternative Parallelization Approaches:** Investigate thread-based parallelism using pthreads
2. **Optimized Decomposition:** Implement more efficient workload distribution strategies
3. **Overhead Reduction:** Explore process pooling or reduced synchronization frequency
4. **Larger Problem Sizes:** Test with matrices larger than 2400×2400 to identify performance crossover points
5. **Comparative Analysis:** Benchmark against sequential algorithms to quantify overhead costs

The Phase 1 results provide critical empirical evidence about the limitations of naive process-based parallelization and highlight the importance of careful parallel program design considering both computational workload and system overhead.

## **HTML Version:** [Open the Report](./report.html)
