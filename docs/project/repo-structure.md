# Repository Structure

This section describes the organization of the project repository and the purpose of each directory and file. The structure is designed to keep source code, documentation, and reports clearly separated and easy to navigate.

## Root Directory

The root of the repository contains configuration and metadata files required for building the documentation site and managing the project.

- `mkdocs.yml`  
  Configuration file for the MkDocs documentation site.

- `.github/workflows/`  
  Contains GitHub Actions workflows used to automatically build and deploy the documentation site.

## Documentation (`docs/`)

The `docs/` directory contains all Markdown files used to generate the project website.

- `index.md`  
  Homepage of the documentation site.

- `project/`  
  General project information.
  - `overview.md` – Project description and objectives  
  - `requirements.md` – Technical and academic requirements  
  - `team.md` – Team member information  
  - `repo-structure.md` – Description of repository organization  

- `phase1/`  
  Documentation related to Phase I.
  - `index.md` – Phase I overview  
  - `setup.md` – Virtual machine and Linux setup  
  - `build-run.md` – Compilation and execution steps  
  - `experiments.md` – Experimental plan  
  - `results.md` – Performance results  
  - `report.md` – Phase I report content  

- `phase2/`  
  Documentation related to Phase II.
  - `index.md` – Phase II overview  
  - `plan.md` – Phase II plan  
  - `work-log.md` – Work log and progress  
  - `results.md` – Phase II results  
  - `report.md` – Phase II report content  

- `reference/`  
  Reference material.
  - `commands.md` – Common Linux and build commands  
  - `glossary.md` – Key terms and definitions  

- `styles/`  
  Custom CSS files used to style the documentation site.

## Source Code (`src/`)

The `src/` directory contains the C source code used for the project.

- `program.c`  
  Instructor-provided C program used for experimentation and performance evaluation.

## Purpose of the Structure

This structure separates:

- **Source code** from documentation

- **Phase-specific content** from general project information

- **Setup and execution details** from results and analysis

Such separation improves clarity, maintainability, and alignment with academic documentation standards.

---

This organization ensures the project is easy to understand, reproduce, and evaluate.
