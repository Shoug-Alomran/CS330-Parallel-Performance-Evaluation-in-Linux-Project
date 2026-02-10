# Phase I Report: Parallel Performance Evaluation

## 1. Introduction
Parallel processing is a fundamental concept in modern operating systems, enabling programs to improve performance by executing multiple tasks concurrently. Operating systems provide mechanisms such as process creation, scheduling, and synchronization to support parallel execution on multi-core systems.

This project investigates process-based parallelism in a Linux environment using an instructor-provided C program. The program performs matrix multiplication by dividing the workload among multiple child processes created using the `fork()` system call. Execution time is measured to evaluate how performance is affected by changes in problem size and the number of processes.

The goal of Phase I is to establish a controlled experimental environment, execute the program under different configurations, and collect baseline performance data for analysis.

## 2. Objectives
The objectives of this phase are as follows:

- Set up a Linux execution environment using virtualization
- Compile and execute the provided C program successfully
- Evaluate the effect of varying the number of processes on execution time
- Analyze how problem size impacts performance
- Collect and present execution time measurements in a structured manner

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
The following tools were installed inside the Linux environment:

- **GCC compiler** (version 11.4.0)
- **Standard Linux development utilities** (`build-essential`)
- **Linux terminal environment**

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
To evaluate the performance of process-based parallelism, experiments were designed by systematically varying two key parameters. The first parameter is the matrix size (N), which directly controls the computational workload. The second parameter is the number of processes (PROCS), which controls the level of parallelism in the execution.

The experimental design uses three matrix sizes: 1200, 1800, and 2400. For each matrix size, two different process counts are tested: 1 and 4. Each configuration is executed three times to account for system variability, resulting in a total of six distinct configurations being evaluated.

The procedure for conducting these experiments follows a consistent sequence. First, the program is compiled using the command `gcc -Wall matrix_fork.c -o matrix_fork`. For each combination of N and PROCS, the `#define` directives in the source code are manually updated to reflect the desired values. The program is then executed three times, with each execution's runtime being recorded. Finally, the average execution time is calculated for each configuration to provide a reliable performance measurement.

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
The results indicate that increasing the number of processes generally **increases** execution time for larger problem sizes, contrary to typical parallelization expectations. The performance degradation is likely due to overhead introduced by process creation and inter-process synchronization.

Key observations:
- For N=1200: Both 1 and 4 processes show similar performance (0.0016s average)
- For N=1800: 4 processes show 3x slower performance than 1 process
- For N=2400: 4 processes show ~2.3x slower performance than 1 process

![Execution Time vs. Number of Processes](path/to/graph1.png)
![Execution Time vs. Matrix Size](path/to/graph2.png)

## 6. Discussion
The experimental results demonstrate that process-based parallelism can **decrease** performance for the tested configurations, particularly for larger matrix sizes. The overhead of creating and managing processes outweighs the benefits of parallel execution in this implementation.

As the number of processes increases, execution time consistently increases rather than decreases. This counterintuitive behavior can be attributed to several factors:

1. **Process Creation Overhead:** Each `fork()` call involves significant system resource allocation
2. **Context Switching:** The operating system must manage multiple processes competing for CPU time
3. **Memory Management:** Each child process requires separate memory space for execution
4. **Synchronization Costs:** The `wait()` calls introduce blocking that reduces parallelism benefits

These observations align with operating system principles related to the trade-offs between parallelization benefits and overhead costs. The row-wise decomposition strategy may also contribute to inefficiency, as workload distribution might not be optimal.

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
Phase I has successfully established a controlled experimental environment and collected comprehensive performance data for process-based parallelism evaluation. Key findings include:

1. **Environment Setup Success:** UTM-based virtualization with Ubuntu 24.04.3 LTS provided a stable testing platform
2. **Unexpected Results:** Process-based parallelism showed performance degradation rather than improvement
3. **Overhead Dominance:** Process creation and synchronization costs outweighed parallel computation benefits
4. **Scalability Issues:** Performance did not scale with increased process count

These findings provide valuable insights into the practical challenges of process-based parallelization and establish a foundation for further investigation in subsequent phases.

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
