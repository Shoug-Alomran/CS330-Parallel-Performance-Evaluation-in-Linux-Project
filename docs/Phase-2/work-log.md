<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase 2 Work Log

This work log follows the task ownership and dependency flow defined in the
Phase 2 plan dashboard.

</div>
</div>

---

## Ownership Summary

| Owner | Role From Plan | Main Responsibility | Current Status |
|---|---|---|---|
| Aryam | Metrics & Tables Owner | Compute speedup, compute % improvement, and prepare formatted results tables | Completed |
| Layan | Graphs & Performance Analysis Owner | Create graphs, identify performance decrease point, and write short interpretation | Completed |
| Danah | Code Modification Owner | Modify Java code, verify correctness, comment code, and freeze final version | Completed |
| Shoug | Measurement & System Owner | Run official benchmarks, record raw times, compute averages, and capture machine specs | Completed |
| Rana | Report & Integration Owner | Integrate tables and graphs, write report, organize submission folder, and create ZIP | In progress |

---

## Detailed Responsibility Matrix

| Work Item | Owner | Status | Notes |
|---|---|---|---|
| Compute speedup | Aryam | Completed | Calculated from the final timing dataset |
| Compute % improvement | Aryam | Completed | Based on the 1-thread baseline |
| Create formatted results tables | Aryam | Completed | Main comparison table and supporting results table prepared |
| Prepare tables for report insertion | Aryam | Completed | Final tables ready for report integration |
| Create required graphs | Layan | Completed | Execution time, speedup, and percentage improvement graphs prepared |
| Identify performance decrease point | Layan | Completed | Overhead increase identified at lower thread counts |
| Write short technical interpretation | Layan | Completed | Graph explanation and trend summary prepared |
| Modify program to compute sum of cubes | Danah | Completed | Final computation changed to `x^3` |
| Ensure array values are less than 100 | Danah | Completed | Random values constrained to required range |
| Make thread count configurable (`1, 2, 4, 6, 8`) | Danah | Completed | Required thread set implemented |
| Verify correctness against single-thread result | Danah | Completed | Parallel output checked against baseline |
| Clean and comment code | Danah | Completed | Source code comments added for readability |
| Freeze final version before benchmarking | Danah | Completed | Final benchmark version delivered before official timing runs |
| Compile and execute final Java file | Shoug | Completed | Official benchmark machine used |
| Run `1, 2, 4, 6, 8` thread configurations | Shoug | Completed | All required configurations executed |
| Repeat runs and record raw execution times | Shoug | Completed | Final dataset recorded in results evidence |
| Compute average execution time for each configuration | Shoug | Completed | Average values entered into Phase 2 results |
| Record full machine specifications | Shoug | Completed | CPU, RAM, OS, and Java version documented |
| Export dataset to Excel/CSV | Shoug | Completed | Benchmark spreadsheet included in Phase 2 files |
| Deliver dataset and machine specs to Aryam and Rana | Shoug | Completed | Data handed off for tables and report writing |
| Draft report structure | Rana | Completed | Structure aligned to objective, methodology, setup, results, discussion, conclusion |
| Insert tables, graphs, and machine specs | Rana | Completed | Report updated with final figures and benchmark context |
| Write explanation of thread division, synchronization, and scalability | Rana | Completed | Report text expanded in markdown and HTML report |
| Ensure report stays within formal requirements | Rana | In progress | Final wording still subject to export/submission check |
| Organize submission folder | Rana | Pending | Final packaging structure still needs confirmation |
| Verify all files open correctly | Rana | Pending | Best done immediately before final submission |
| Create final ZIP | Rana | Pending | Waiting on final packaging pass |
| Perform final validation check | Rana | Pending | Final submission checklist still open |

---

## Step-By-Step Log By Owner

### Aryam · Metrics & Tables

1. Imported the final timing dataset from Shoug.
2. Verified averages and benchmark values.
3. Created the main table: `Threads | Avg Time | Speedup | % Improvement`.
4. Applied the formulas `Speedup = T(1) / T(n)` and `% Improvement = ((T1 - Tn) / T1) * 100`.
5. Prepared supporting presentation tables for results pages and report sections.
6. Formatted final tables for report insertion and export.

Deliverable: final formatted results tables.

### Layan · Graphs & Performance Analysis

1. Imported the final results table from Aryam.
2. Created the graph `Threads vs Avg Execution Time`.
3. Created the graph `Threads vs Speedup`.
4. Added labels and prepared graph exports.
5. Identified the performance decrease point where overhead outweighed benefit.
6. Wrote a short explanation covering speedup trend, overhead causes, and scaling behavior.
7. Exported graph images and delivered them for report integration.

Deliverable: graph images plus a short performance interpretation.

### Danah · Code Modification

1. Opened the existing Java program.
2. Modified the computation logic to calculate `x^3`.
3. Ensured generated values stayed below `100`.
4. Implemented configurable thread counts.
5. Added correctness checks comparing the multithreaded and single-thread results.
6. Compiled and tested functionality before official timing.
7. Cleaned and commented the code.
8. Delivered the final code version before benchmarking.

Deliverable: final Java benchmark code.

### Shoug · Measurement & System

1. Received the final Java version after code freeze.
2. Compiled the program on the official machine.
3. Ran the `1`-thread configuration.
4. Ran the `2`-thread configuration.
5. Ran the `4`-thread configuration.
6. Ran the `6`-thread configuration.
7. Ran the `8`-thread configuration.
8. Recorded raw execution times and computed averages.
9. Documented CPU model, core count, RAM, operating system, and Java version.
10. Exported the dataset and shared it with Aryam and Rana.

Deliverables: raw timing dataset, averaged timing table, and machine specifications.

### Rana · Report & Integration

1. Drafted the report structure: objective, methodology, experimental setup, results, discussion, and conclusion.
2. Inserted tables, graphs, and machine specifications into the reporting workflow.
3. Wrote the explanatory discussion for thread division logic, synchronization, scalability behavior, and performance decrease.
4. Expanded the HTML report so the implementation and analysis are easier to understand.
5. Continued preparing the final submission structure and packaging.

Deliverable: final report package and submission ZIP.

---

## Dependency Flow

The Phase 2 plan defines this handoff order:

`Danah -> Shoug -> Aryam -> Layan -> Rana`

This means:

- Danah finalizes the code
- Shoug runs the official measurements
- Aryam turns measurements into formatted tables and metrics
- Layan creates graphs and interpretation from the final table
- Rana integrates everything into the report and submission package

---

## Shared Agreements From The Plan

- Fixed array size is used consistently during benchmarking
- Only the required thread set is tested: `1`, `2`, `4`, `6`, `8`
- Time is standardized in milliseconds
- File naming stays consistent across the submission assets
- Only one official machine is used for final benchmark timing
- Final peer review and packaging happen at the end of the workflow

---

## Current Phase Status

| Milestone | Description | Status |
|---|---|---|
| `M1` | Code modification complete | Completed |
| `M2` | Official benchmark dataset complete | Completed |
| `M3` | Tables, graphs, and report content integrated | Completed |
| `M4` | Final submission folder and ZIP packaging | In progress |
