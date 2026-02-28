<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase 2 Performance Analysis Report

Use this structure to produce the final written analysis for submission.

</div>
</div>

---

## 1. Program Understanding

- Briefly explain the provided baseline code.
- Describe the original thread model and how work is partitioned.

## 2. Modification Summary

- Explain the change to **sum of cubes of array elements**.
- Confirm array value constraint (integers `< 100`).
- Describe how thread counts `1,2,4,6,8` are configured.

## 3. Measurement Methodology

- Hardware and software environment.
- Timing method (`System.nanoTime()`).
- Number of runs per configuration and averaging policy.

## 4. Results

- Insert main results table.
- Insert raw trial table (recommended).
- Insert performance graphs.

## 5. Performance Discussion

- Compare speedup trend as thread count increases.
- Explain the best-performing thread count.
- Identify where performance starts to decrease.
- Discuss overhead causes: thread creation, scheduling, synchronization, and CPU core limits.

## 6. Conclusion

- Summarize key findings.
- State whether multithreading improved performance for this workload.
- Provide one improvement idea for future testing.
