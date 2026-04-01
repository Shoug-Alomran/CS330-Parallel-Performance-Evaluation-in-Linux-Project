<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase I Report
**Parallel Performance Evaluation (Process-based Matrix Multiplication)**

This page includes the full standalone HTML report inside the Phase I section
of the website.

Use the button below if you want to open the report as a separate full page.

[Open Full HTML Report](report-full.html){ .md-button .md-button--primary }
[Open PDF Version](report.pdf){ .md-button }

</div>
</div>

---

## Embedded Report

<iframe
  src="../report-full.html"
  style="width: 100%; height: 1100px; border: 1px solid rgba(0,0,0,.08); border-radius: 16px;"
  loading="lazy"
  title="Phase I HTML Report">
</iframe>

## 6) Discussion

In theory, parallel processes can reduce execution time by dividing computation
across cores. However, Phase I results show that for the tested sizes (1200–
2400), using 4 processes provided **minimal or negative** performance impact.

### Why performance did not improve

<div class="grid cards" markdown>

* ## :material-source-fork: **Process Creation Overhead**

  Creating multiple processes with `fork()` introduces overhead that can dominate short executions.

* ## :material-sync: **Synchronization Cost**

  The parent must wait for all children (`wait()`), so total time includes coordination overhead.

* ## :material-ruler: **Problem Size Threshold**

  For these matrix sizes, the computation may not be large enough to outweigh overhead.

</div>

For significantly larger matrices (e.g., N=10000), performance gains may become
more likely because computation time would dominate process overhead.

---

### 6.1 Implications for Parallel Programming

* Parallelism improves performance only when workload exceeds overhead cost
* Using all available cores does not guarantee better performance
* There is a minimum problem size where parallelization becomes beneficial

---

### 6.2 Experimental Limitations

* **Virtualization overhead:** VM layer may add performance penalties
* **ARM64 architecture:** Different characteristics than x86 systems
* **Initialization overhead:** Random initialization adds non-parallelizable work

---

## 7) Conclusion

In Phase I, we successfully:

* Set up Ubuntu Linux (**24.04.3 LTS ARM64**) in a virtual machine
* Installed GCC and development tools
* Compiled and executed the provided program
* Tested **6** configurations
* Collected execution-time data across all runs

### Key findings

* Parallel processes did **not** provide meaningful speedup for these sizes
* Process creation and synchronization overhead likely dominated runtime
* Larger problem sizes may be required to observe clear benefits

??? note "Working VM"
    ![Working VM](../Installing%20Ubuntu/12.%20Working%20VM.png)

??? note "Installing Kernel"
    ![Installing Kernel](../Installing%20Ubuntu/10.%20Installing%20Kernal.png)

??? note "Log in and update"
    ![Log in and update](../Installing%20Ubuntu/11.%20Log%20in%20+%20update.png)

??? note "Passing Memory Tests"
    ![Passing Memory Tests](../Installing%20Ubuntu/8.%20Passing%20Memory%20Tests.png)

---

## Future Work Recommendations

<div class="grid cards" markdown>

* ## :material-source-fork: **Thread-Based Parallelism**

  Evaluate pthread-based implementations and compare overhead.

* ## :material-sitemap-outline: **Improved Work Distribution**

  Explore alternative decomposition strategies for better load balance.

* ## :material-timer-sand: **Overhead Reduction**

  Investigate techniques such as process pooling or reduced synchronization.

* ## :material-ruler: **Larger Problem Sizes**

  Test matrices larger than 2400×2400 to identify the crossover point.

* ## :material-compare: **Comparative Benchmarks**

  Compare against sequential and optimized baselines to quantify overhead costs.

</div>

---

## Downloadable Version

[Open the PDF report](./report.pdf){ .md-button }
