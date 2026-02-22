---
hide:
  - toc
---

<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Build & Run

This section explains how to compile, execute, and modify the process-based
parallel matrix multiplication program used in this project.

</div>
</div>

---

## Program Overview

<div class="grid cards" markdown>

-   :material-sitemap: **Process-Based Parallelism**

    ---
    Matrix multiplication is divided across multiple child processes.
    Each child computes a subset of matrix rows.

-   :material-source-fork: **Process Creation**

    ---
    Uses `fork()` to create child processes and distribute workload.

-   :material-timer-outline: **Performance Measurement**

    ---
    Execution time is measured using `clock()` after all processes complete.

-   :material-sync: **Synchronization**

    ---
    The parent process waits for all children using `wait()` before calculating total runtime.

</div>

---

## Screenshots (Verification)

??? note "Code in nano editor"
    ![Code in nano editor](../Installing%20Ubuntu/13.%20Code%20in%20nano%20editor.png)

??? note "Head of the file (verification)"
    ![Head of the file](../Installing%20Ubuntu/14.%20Head%20of%20the%20file%20(to%20make%20sure%20it's%20saved).png)

---

## Source Code

??? note "matrix_fork.c"
    ```c
    
    #include <stdio.h>
    #include <stdlib.h>
    #include <unistd.h>
    #include <sys/wait.h>
    #include <time.h>

    #define N 600
    #define PROCS 4

    double A[N][N], B[N][N], C[N][N];

    void initialize_matrices() {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                A[i][j] = rand() % 10;
                B[i][j] = rand() % 10;
                C[i][j] = 0;
            }
        }
    }

    void multiply(int start, int end) {
        for (int i = start; i < end; i++) {
            for (int j = 0; j < N; j++) {
                for (int k = 0; k < N; k++) {
                    C[i][j] += A[i][k] * B[k][j];
                }
            }
        }
    }

    int main() {
        srand(time(NULL));
        initialize_matrices();

        clock_t start_time = clock();
        int rows_per_proc = N / PROCS;

        for (int p = 0; p < PROCS; p++) {
            pid_t pid = fork();
            if (pid == 0) {
                int start = p * rows_per_proc;
                int end = (p == PROCS - 1) ? N : start + rows_per_proc;
                multiply(start, end);
                exit(0);
            }
        }

        for (int p = 0; p < PROCS; p++) {
            wait(NULL);
        }

        clock_t end_time = clock();
        double time_taken =
            (double)(end_time - start_time) / CLOCKS_PER_SEC;

        printf("Execution Time: %.3f seconds\n", time_taken);
        return 0;
    }
    ```

---

## Compilation

<div class="grid cards" markdown>

-   :material-tools: **Compile Using GCC**

    ---
    ```bash
    gcc -Wall matrix_fork.c -o matrix_fork
    ```

    The `-Wall` flag enables compiler warnings to ensure code quality.

</div>

---

## Execution

<div class="grid cards" markdown>

-   :material-play-circle-outline: **Run the Program**

    ---
    ```bash
    ./matrix_fork
    ```

    Default configuration:  
    `N = 600`, `PROCS = 4`

</div>

---

## Expected Output

```bash
Execution Time: 0.001 seconds
```

??? note "Terminal Output Screenshot"
    ![Execution Time](../Installing%20Ubuntu/15.%20Terminal%20Output.png)

---

## Modifying Parameters

<div class="grid cards" markdown>

* :material-pencil: **Open in Nano**

  ---

  ```bash
  nano matrix_fork.c
  ```

* :material-tune: **Adjust Configuration**

  ---

  ```c
  #define N 800
  #define PROCS 2
  ```

* :material-refresh: **Recompile & Execute**

  ---

  Save (`Ctrl + O`), Exit (`Ctrl + X`), then recompile and run again.

</div>

---

## Verification Checklist

<div class="grid cards" markdown>

* :material-check-circle: **Compilation**

  ---

  No warnings or errors during compilation.

* :material-check-circle: **Execution**

  ---

  No segmentation faults or runtime crashes.

* :material-check-circle: **Output**

  ---

  Execution time printed with three decimal precision.

* :material-monitor-dashboard: **Process Monitoring**

  ---

  Use `top` or `htop` to verify multiple processes are active.

</div>

---

## Troubleshooting

<div class="grid cards" markdown>

* :material-alert-circle-outline: **Permission Denied**

  ---

  ```bash
  chmod +x matrix_fork
  ```

* :material-bug-outline: **Segmentation Fault**

  ---

  Check matrix bounds and process distribution logic.

* :material-clock-outline: **Long Execution Time**

  ---

  Reduce `N` for initial testing.

* :material-package-variant: **Compiler Not Found**

  ---

  ```bash
  sudo apt install build-essential
  ```

</div>

---

### What This Fixes

* No long text walls
* Visual consistency with your other CS330 pages
* Clean hierarchy
* Clear technical emphasis
* Screenshots contained properly
* Code untouched
* Looks like structured systems documentation, not lab notes
