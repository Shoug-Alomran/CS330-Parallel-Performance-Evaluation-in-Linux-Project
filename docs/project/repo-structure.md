Below is the **pure Markdown** version, ready to drop directly into your `.md` file (MkDocs-compatible, no extra formatting).

---

## Repository Structure

### Root Directory

| Path / File          | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `mkdocs.yml`         | Configuration file for the MkDocs documentation site        |
| `.github/workflows/` | GitHub Actions workflows for automatic build and deployment |

---

### Documentation (`docs/`)

| Path            | Description                        |
| --------------- | ---------------------------------- |
| `docs/index.md` | Homepage of the documentation site |

#### Project Information (`docs/project/`)

| File                | Description                            |
| ------------------- | -------------------------------------- |
| `overview.md`       | Project description and objectives     |
| `requirements.md`   | Technical and academic requirements    |
| `team.md`           | Team member information                |
| `repo-structure.md` | Description of repository organization |

---

#### Phase I (`docs/phase1/`)

| File             | Description                     |
| ---------------- | ------------------------------- |
| `index.md`       | Phase I overview                |
| `setup.md`       | Virtual machine and Linux setup |
| `build-run.md`   | Compilation and execution steps |
| `experiments.md` | Experimental plan               |
| `results.md`     | Performance results             |
| `report.md`      | Phase I report content          |

---

#### Phase II (`docs/phase2/`)

| File          | Description             |
| ------------- | ----------------------- |
| `index.md`    | Phase II overview       |
| `plan.md`     | Phase II plan           |
| `work-log.md` | Work log and progress   |
| `results.md`  | Phase II results        |
| `report.md`   | Phase II report content |

---

#### Reference (`docs/reference/`)

| File          | Description                     |
| ------------- | ------------------------------- |
| `commands.md` | Common Linux and build commands |
| `glossary.md` | Key terms and definitions       |

---

#### Styles (`docs/styles/`)

| Path      | Description                       |
| --------- | --------------------------------- |
| `styles/` | Custom CSS files for site styling |

---

### Source Code (`src/`)

| File        | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `program.c` | Instructor-provided C program for experimentation and performance evaluation |

---

### Purpose of the Structure

| Goal                   | Explanation                                       |
| ---------------------- | ------------------------------------------------- |
| Separation of concerns | Keeps source code independent from documentation  |
| Phase isolation        | Distinguishes Phase I and Phase II content        |
| Academic clarity       | Separates setup, execution, results, and analysis |
| Maintainability        | Improves readability and long-term maintenance    |
