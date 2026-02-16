# Experimental Design

## Overview
This page outlines the experimental methodology for evaluating process-based parallelism in matrix multiplication. The experiments are designed to systematically measure how execution time is affected by varying problem size and the number of parallel processes.

## Experimental Parameters
Two key parameters are varied in these experiments:

1. **Matrix Size (N):** Controls the computational workload

   - **Purpose:** To observe how performance scales with problem size
   - **Values Tested:** 1200, 1800, 2400

2. **Number of Processes (PROCS):** Controls the level of parallelism

   - **Purpose:** To evaluate the impact of parallelization
   - **Values Tested:** 1, 4

## Experimental Matrix
The complete experimental design consists of 6 unique configurations:

| Configuration | Matrix Size (N) | Processes (PROCS) | Status     |
|---------------|-----------------|-------------------|------------|
| 1             | 1200            | 1                 | Complete   |
| 2             | 1200            | 4                 | Complete   |
| 3             | 1800            | 1                 | Complete   |
| 4             | 1800            | 4                 | Complete   |
| 5             | 2400            | 1                 | Complete   |
| 6             | 2400            | 4                 | Complete   |

## Experimental Procedure
For each configuration, the following procedure is followed:

1. **Source Code Modification:**

    - Edit the `#define` directives in `matrix_fork.c` to set the desired N and PROCS values
     - Example: Change `#define N 600` to `#define N 1200`

2. **Compilation:**
```bash
 gcc -Wall matrix_fork.c -o matrix_fork
 ```

3. **Execution:**
    - Run the program 3 times to account for system variability
```bash
 ./matrix_fork
 ```

4. **Data Collection:**

    - Record execution time from each run
     - Calculate average execution time
     - Note any anomalies or system behavior during execution

5. **Environment Consistency:**

    - Ensure no other CPU-intensive processes are running
    - Maintain identical system configuration across all runs
     - Use the same compilation flags for all tests

## Data Collection Format
All experimental data is recorded in the following format:

| Matrix Size (N) | Processes (PROCS) | Run 1 (s) | Run 2 (s) | Run 3 (s) | Average Time (s) |
|-----------------|-------------------|-----------|-----------|-----------|------------------|
| 1200            | 1                 | 0.001     | 0.001     | 0.003     | 0.0016           |
| 1200            | 4                 | 0.002     | 0.002     | 0.001     | 0.0016           |
| 1800            | 1                 | 0.001     | 0.001     | 0.001     | 0.001            |
| 1800            | 4                 | 0.003     | 0.003     | 0.003     | 0.003            |
| 2400            | 1                 | 0.002     | 0.001     | 0.001     | 0.0013           |
| 2400            | 4                 | 0.004     | 0.003     | 0.003     | 0.003            |

## Analysis Plan
Once data collection is complete, the following analyses will be performed:

### 1. Performance Scaling Analysis
- **Execution Time vs. PROCS:** Plot execution time against number of processes for each N value
- **Execution Time vs. N:** Plot execution time against matrix size for each PROCS value

### 2. Overhead Analysis

- **Process Creation Overhead:** Calculate the additional time cost per process created
- **Synchronization Overhead:** Measure the impact of `wait()` calls on total execution time

### 3. Efficiency Metrics

- **Speedup:** Calculate speedup relative to single-process execution
- **Efficiency:** Determine how effectively additional processes are utilized
- **Scalability:** Assess performance scaling as both N and PROCS increase

### 4. Statistical Analysis

- **Variability Assessment:** Calculate standard deviation across multiple runs
- **Confidence Intervals:** Determine statistical significance of observed differences

## Expected Outcomes
Based on parallel computing theory, we expect:

- **For small N:** Process creation overhead may outweigh parallelization benefits
- **For large N:** Increasing PROCS should significantly reduce execution time
- **Optimal PROCS:** Best performance should occur when PROCS equals available CPU cores (4)
- **Diminishing Returns:** Adding more processes beyond available cores may not improve performance

## Current Status

- Experimental design finalized  
- Environment setup completed  
- Data collection completed for all 6 configurations  
- Preliminary analysis shows:
  - For N=1200: Both 1 and 4 processes show similar performance (0.0016s average)
  - For N=1800: 4 processes show 3x slower performance than 1 process
  - For N=2400: 4 processes show ~2.3x slower performance than 1 process
- Analysis in progress

## Next Steps

1. Complete statistical analysis of collected data
2. Generate performance graphs and visualizations
3. Conduct detailed analysis of results
4. Document findings in the final report
5. Compare observed results with theoretical expectations

## Tools and Resources

- **Data Analysis:** Python/Excel for statistical analysis and graphing
- **Documentation:** Markdown for reporting, Docs for formal documentation