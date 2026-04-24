<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Phase II Report
**Parallel Performance Evaluation (Multithreaded Java Sum of Cubes)**

This page includes the full standalone HTML report inside the Phase II section
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
  title="Phase II HTML Report">
</iframe>

---

## Quick Summary

Phase II extends the project from process-based parallelism in C to
thread-based parallelism in Java. The program computes the **sum of cubes of
array elements**, compares a sequential baseline to multithreaded execution,
and evaluates the required thread counts: `1`, `2`, `4`, `6`, and `8`.

### Key findings

* The best average runtime was **0.649 ms** with **8 threads**
* **6 threads** was nearly as strong at **0.698 ms**
* **2 threads** performed worse than the baseline, showing clear overhead
* The major performance improvement began only at higher thread counts

---

## What The HTML Report Adds

The standalone HTML report is designed to be more explanatory than the PDF. It
includes:

* a plain-language walkthrough of how the Java code works
* explanation of work partitioning and thread coordination
* graphs with interpretation, not just screenshots
* benchmark evidence and discussion of why some thread counts helped more than others
* code appendix content drawn from the repository `src` folder

---

## Downloadable Version

[Open the PDF report](./report.pdf){ .md-button }
