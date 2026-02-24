---
hide:
  - toc
---

<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Performance Analysis Report

This report analyzes how increasing the number of threads affects execution time and scalability.

</div>
</div>

## Parallel Work Division

The array is divided into equal segments.  
Each thread processes a portion independently.  
Partial sums are combined at the end.

## Synchronization

Threads operate independently during computation.  
Synchronization occurs only when combining results.  
This minimizes contention.

## Expected Performance Behavior

Increasing thread count reduces execution time initially due to parallel workload distribution.

After a certain number of threads, performance gains decrease due to:

- Thread creation overhead  
- Context switching  
- Cache contention  
- CPU core limitations  

Final numerical analysis will be inserted after measurement.