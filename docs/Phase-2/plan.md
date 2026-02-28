<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase 2 Experimental Plan

This plan defines a reproducible benchmark process for evaluating multithreaded performance.

</div>
</div>

---

## Objective

Evaluate how execution time changes when the Java program computes the **sum of cubes** using `1`, `2`, `4`, `6`, and `8` threads.

---

## Controlled Test Conditions

- Use the same machine for all official runs.
- Use the same input array size for all thread counts.
- Ensure all array values are integers less than `100`.
- Measure only computation time (exclude setup and logging).

---

## Measurement Method

- Use `System.nanoTime()` before and after computation.
- Convert elapsed time to milliseconds.
- Execute each thread configuration at least `5` times.
- Compute average time for each configuration.

---

## Metrics

- `Execution Time (ms)`
- `Speedup = T(1) / T(n)`
- `% Improvement = ((T(1) - T(n)) / T(1)) * 100`

---

## Analysis Questions

- Where does performance improve the most?
- At which thread count do gains flatten?
- Does performance decrease at higher thread counts?
- What overhead factors explain the trend (thread creation, scheduling, context switching, core limits)?
