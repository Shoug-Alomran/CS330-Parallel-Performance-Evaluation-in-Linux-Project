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
![Ubuntu](../Installing%20Ubuntu/6.%20Ubuntu%20.png)

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

The experimental design uses two matrix sizes: 600 and 800. For each matrix size, three different process counts are tested: 1, 2, and 4. Each configuration is executed three times to account for system variability, resulting in a total of six distinct configurations being evaluated (two N values multiplied by three PROCS values).

The procedure for conducting these experiments follows a consistent sequence. First, the program is compiled using the command `gcc -Wall matrix_fork.c -o matrix_fork`. For each combination of N and PROCS, the `#define` directives in the source code are manually updated to reflect the desired values. The program is then executed three times, with each execution's runtime being recorded. Finally, the average execution time is calculated for each configuration to provide a reliable performance measurement.

The current status is that the experimental design has been fully established, and the data collection process is in progress.

## 5. Results
### 5.1 Baseline Verification
The experimental environment was successfully verified by compiling and executing the program with initial parameters (N=600, PROCS=4). The baseline execution time was **0.001 seconds**, confirming that the parallel computation framework is functional.

![Terminal Output](../Installing%20Ubuntu/15.%20Terminal%20Output.png)

### 5.2 Experimental Data Collection Status
The experimental matrix has been defined, and data collection is currently underway. The table below shows the planned configuration space.

| Matrix Size (N) | Processes (PROCS) | Run 1 (s) | Run 2 (s) | Run 3 (s) | Average Time (s) |
|-----------------|-------------------|-----------|-----------|-----------|------------------|
| 600             | 1                 | Pending   | Pending   | Pending   | Pending          |
| 600             | 2                 | Pending   | Pending   | Pending   | Pending          |
| 600             | 4                 | 0.001     | Pending   | Pending   | Pending          |
| 800             | 1                 | Pending   | Pending   | Pending   | Pending          |
| 800             | 2                 | Pending   | Pending   | Pending   | Pending          |
| 800             | 4                 | Pending   | Pending   | Pending   | Pending          |

### 5.3 Expected Performance Trends
Based on parallel computing theory, we expect:

1. **Increasing PROCS** will reduce execution time up to the number of available CPU cores (4)
2. **Larger N values** will show greater benefits from parallelization
3. **Performance graphs** (Execution Time vs. PROCS, Execution Time vs. N) will be generated once data collection is complete

## 6. Discussion
### 6.1 Current Findings
The baseline execution (N=600, PROCS=4) completed in 0.001 seconds, demonstrating that the process-based parallelization framework is correctly implemented. This rapid execution time for a 600×600 matrix suggests efficient utilization of the 4 allocated CPU cores.

### 6.2 Implications of Experimental Design
The chosen experimental parameters (N=600, 800 and PROCS=1, 2, 4) are strategically selected to:

- **PROCS=1:** Establish sequential execution baseline
- **PROCS=2, 4:** Evaluate scaling with available cores
- **N=600, 800:** Examine workload impact on parallel efficiency

### 6.3 Expected Analysis Outcomes
Once data collection is complete, analysis will focus on:

1. **Process Creation Overhead:** Quantifying the cost of `fork()` calls versus computational savings
2. **Scalability Limits:** Identifying the point of diminishing returns as PROCS increases
3. **Workload Threshold:** Determining the minimum N value where parallelization becomes beneficial
4. **Task vs. Data Parallelism:** Evaluating the row-wise decomposition strategy's efficiency

### 6.4 Practical Considerations
The experimental delay highlights important coordination challenges in parallel computing research, mirroring real-world scenarios where resource access and team synchronization impact project timelines.

## 7. Conclusion
Phase I has successfully established a controlled experimental environment for evaluating process-based parallelism in Linux. Key accomplishments include:

1. **Environment Setup:** UTM-based virtualization with Ubuntu 24.04.3 LTS, 4 CPU cores, and 4 GB RAM
2. **Tool Configuration:** Installation of GCC compiler and development utilities
3. **Program Verification:** Successful compilation and execution of the parallel matrix multiplication program
4. **Experimental Design:** Definition of systematic testing methodology with varying N and PROCS parameters
5. **Baseline Measurement:** Initial execution time of 0.001 seconds for N=600 with 4 processes

![Working VM](../Installing%20Ubuntu/12.%20Working%20VM.png)
![Installing Kernel](../Installing%20Ubuntu/10.%20Installing%20Kernal.png)
![Log in and update](../Installing%20Ubuntu/11.%20Log%20in%20+%20update.png)
![Passing Memory Tests](../Installing%20Ubuntu/8.%20Passing%20Memory%20Tests.png)

**Current Status:** Data collection across the defined experimental matrix is in progress. The completed measurements will enable comprehensive analysis of parallelization efficiency, overhead trade-offs, and scalability limitations.

**Next Steps:** 

- Complete experimental runs for all (N, PROCS) combinations
- Generate performance graphs from collected data
- Conduct detailed analysis of parallelization effectiveness
- Extend findings to Phase II for deeper investigation of operating system parallelization mechanisms