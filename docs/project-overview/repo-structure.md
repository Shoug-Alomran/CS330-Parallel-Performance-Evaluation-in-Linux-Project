<div class="home-hero" markdown>
<div class="home-hero__text" markdown>

# Repository Structure

This repository is organized to clearly separate documentation, source code, and project phases.

The structure supports reproducibility, academic clarity, and long-term maintainability.

</div>
</div>

---

## Root Directory

<div class="grid cards" markdown>

-   :material-cog-outline: **mkdocs.yml**

    ---
    Configuration file for the MkDocs documentation site, including theme settings, navigation structure, and plugins.

-   :material-github: **.github/workflows/**

    ---
    GitHub Actions workflows for automated build and deployment of the documentation site.

</div>

---

## Documentation (`docs/`)

<div class="grid cards" markdown>

-   :material-home: **docs/index.md**

    ---
    Homepage of the documentation site.

-   :material-folder-outline: **docs/project/**

    ---
    Core project information including overview, requirements, team details, and repository structure.

-   :material-folder-outline: **docs/phase1/**

    ---
    Phase I content: setup, build instructions, experiments, results, and report.

-   :material-folder-outline: **docs/phase2/**

    ---
    Phase II content: planning, work log, results, and final reporting.

-   :material-book-outline: **docs/reference/**

    ---
    Supporting material including common commands and glossary definitions.

-   :material-palette-outline: **docs/styles/**

    ---
    Custom CSS styling used to define layout, theme adjustments, and visual consistency.

</div>

---

## Source Code (`src/`)

<div class="grid cards" markdown>

-   :material-language-c: **program.c**

    ---
    Instructor-provided C program used for experimentation and performance evaluation.

</div>

---

## Structural Design Principles

<div class="grid cards" markdown>

-   :material-layers-outline: **Separation of Concerns**

    ---
    Source code remains independent from documentation and reporting materials.

-   :material-numeric-1-circle-outline: **Phase Isolation**

    ---
    Phase I and Phase II are organized independently to clearly distinguish experimental stages.

-   :material-school-outline: **Academic Clarity**

    ---
    Setup, execution, analysis, and reporting are documented in structured sections.

-   :material-wrench-outline: **Maintainability**

    ---
    The modular structure improves readability and supports long-term extension of the project.

</div>