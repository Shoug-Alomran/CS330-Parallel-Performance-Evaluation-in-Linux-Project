<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase 2 Experimental Plan

This plan defines the benchmark process used to evaluate multithreaded performance and records the completed execution setup.

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

### Execution Environment

- Machine: **MacBook Air**
- Processor: **Apple M2**
- Cores: **8 total (4 performance + 4 efficiency)**
- RAM: **8 GB**
- Operating system: **macOS Tahoe 26.3.1**
- Java runtime: **OpenJDK 25 LTS (Temurin)**

---

## Measurement Method

- Use `System.nanoTime()` before and after computation.
- Convert elapsed time to milliseconds.
- Execute each thread configuration repeatedly under the same setup.
- The final recorded dataset contains **12 runs per configuration**.
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

---

## Observed Outcome

- `2` threads showed overhead and performed worse than the baseline.
- `4` threads provided only a modest improvement.
- `6` and `8` threads produced the strongest performance gains.
- `8` threads had the best average runtime overall, while `6` threads remained very close and slightly more stable in some runs.
