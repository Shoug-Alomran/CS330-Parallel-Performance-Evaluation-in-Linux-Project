# Build and Run

## Program Description
The provided C program performs matrix multiplication using process-based parallelism. Two input matrices are initialized with random values, and the computation of the result matrix is divided among multiple child processes.

Each child process is responsible for computing a subset of matrix rows. The parent process waits for all child processes to complete before measuring the total execution time.

![Code in nano editor](../Installing%20Ubuntu/13.%20Code%20in%20nano%20editor.png)
![Head of the file](../Installing%20Ubuntu/14.%20Head%20of%20the%20file%20(to%20make%20sure%20it's%20saved).png)

The program uses:

- `fork()` for process creation
- `wait()` for synchronization
- `clock()` to measure execution time

No structural changes were made to the program. Only configurable parameters such as matrix size and number of processes were modified during experimentation.

## Source Code

??? note "Program.C"
    ```c
    #include <stdio.h>
    #include <stdlib.h>
    #include <unistd.h>
    #include <sys/wait.h>
    #include <time.h>

    #define N 600     // Matrix size
    #define PROCS 4  // Number of child processes

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

## Compilation

To compile the program, use:

```bash
gcc -Wall matrix_fork.c -o matrix_fork
```
The -Wall flag enables all compiler warnings to ensure code quality.

## Execution
To run the program with default parameters (N=600, PROCS=4):

```bash
./matrix_fork
```
## Expected Output

When successfully executed, the program outputs the execution time:

```bash
Execution Time: 0.001 seconds
```
![Execution Time](../Installing%20Ubuntu/15.%20Terminal%20Output.png)

## Modifying Parameters
To test different configurations, modify the #define directives at the top of the source code:

1. Open the file in nano:

```bash
nano matrix_fork.c
```

2. Change the values:

```bash
#define N 800        // Change matrix size
#define PROCS 2      // Change number of processes
```
3. Save (Ctrl+O) and exit (Ctrl+X)
4. Recompile and run again

## Verification Steps

1. Compilation Check: No warnings or errors should appear during compilation

2. Execution Check: Program should run without segmentation faults

3. Output Check: Execution time should be displayed in seconds with 3 decimal places

4. Process Check: Use top or htop to verify multiple processes are created during execution

## Troubleshooting

- Permission denied: Run chmod +x matrix_fork after compilation

- Segmentation fault: Check matrix bounds and process creation logic

- Long execution time: Consider reducing N for initial testing

- Compiler not found: Install build-essential: sudo apt install build-essential