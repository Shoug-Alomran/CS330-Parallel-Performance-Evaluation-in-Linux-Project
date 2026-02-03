# Experimental Design

## Overview
This page outlines the experimental methodology for evaluating process-based parallelism in matrix multiplication. The experiments are designed to systematically measure how execution time is affected by varying problem size and the number of parallel processes.

## Experimental Parameters
Two key parameters are varied in these experiments:

1. **Matrix Size (N):** Controls the computational workload
   - **Purpose:** To observe how performance scales with problem size
   - **Values Tested:** 600, 800

2. **Number of Processes (PROCS):** Controls the level of parallelism
   - **Purpose:** To evaluate the impact of parallelization
   - **Values Tested:** 1, 2, 4

## Experimental Matrix
The complete experimental design consists of 6 unique configurations:

| Configuration | Matrix Size (N) | Processes (PROCS) | Status |
|---------------|-----------------|-------------------|--------|
| 1 | 600 | 1 | Pending |
| 2 | 600 | 2 | Pending |
| 3 | 600 | 4 | Baseline complete |
| 4 | 800 | 1 | Pending |
| 5 | 800 | 2 | Pending |
| 6 | 800 | 4 | Pending |

## Experimental Procedure
For each configuration, the following procedure is followed:

 1. **Source Code Modification:**

    - Edit the `#define` directives in `matrix_fork.c` to set the desired N and PROCS values
    - Example: Change `#define N 600` to `#define N 800`

 2. **Compilation:**

   ```bash
   gcc -Wall matrix_fork.c -o matrix_fork
   ```

 3. **Execution:**

    - Run the program 3 times to account for system variability

	```bash
	./matrix_fork
	```

 4. Data Collection:

    - Record execution time from each run
    - Calculate average execution time
    - Note any anomalies or system behavior during execution

 5. Environment Consistency:

    - Ensure no other CPU-intensive processes are running
    - Maintain identical system configuration across all runs
    - Use the same compilation flags for all tests

    ## Data Collection Format
All experimental data is recorded in the following format:

| Matrix Size (N) | Processes (PROCS) | Run 1 (s) | Run 2 (s) | Run 3 (s) | Average Time (s) |
|-----------------|-------------------|-----------|-----------|-----------|------------------|
| 600             | 1                 |           |           |           |                  |
| 600             | 2                 |           |           |           |                  |
| 600             | 4                 | 0.001     |           |           |                  |
| 800             | 1                 |           |           |           |                  |
| 800             | 2                 |           |           |           |                  |
| 800             | 4                 |           |           |           |                  |

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
Experimental design finalized  
Environment setup completed  
Baseline measurement obtained (N=600, PROCS=4)  
Data collection in progress  
Analysis pending  

## Next Steps

1. Complete all experimental runs for the 6 configurations
2. Calculate averages and statistical measures
3. Generate performance graphs and visualizations
4. Conduct detailed analysis of results
5. Document findings in the final report

## Tools and Resources

- **Scripting:** Bash scripts for automated testing (optional)
- **Data Analysis:** Python/Excel for statistical analysis and graphing
- **Documentation:** Markdown for reporting, LaTeX for formal documentation

## Team Coordination

- **Layan:** Responsible for executing experiments and collecting data
- **Danah:** Responsible for creating graphs and visualizations
- **Shoug:** Responsible for integrating all components into final report