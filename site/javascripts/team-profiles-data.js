/*
 * Team member profile data for the interactive member-card feature.
 * Add or edit entries here — no other file needs to change.
 *
 * Keys are normalized member names (lowercase, trimmed) so they match
 * the bold name already printed on each member card in
 * docs/Project-Overview/team.md.
 *
 * Any field left as "" or [] will render as a clearly labeled
 * placeholder in the profile panel instead of being invented.
 *
 * contributions/responsibilities below are sourced from this repo's own
 * docs/Phase-2/work-log.md (Ownership Summary + Step-By-Step Log) and the
 * named role tabs in docs/Project-Overview/phase-1-plan.html.
 */
(function () {
  function normalize(name) {
    return String(name || "").trim().toLowerCase().replace(/\s+/g, " ");
  }

  var DATA = {
    "shoug alomran": {
      name: "Shoug Alomran",
      studentId: "223410392",
      role: "Software Engineer / Cybersecurity",
      department: "",
      affiliation: "CS330 · Introduction to Operating Systems",
      bio: "",
      contributions: [
        "Phase 1 — Report Writer & Integrator.",
        "Phase 2 — Measurement & System Owner: ran the official benchmarks across all required thread counts (1, 2, 4, 6, 8), recorded raw execution times, computed averages, and documented full machine specifications."
      ],
      responsibilities: [
        "Compile and run the final Java benchmark on the official measurement machine.",
        "Record raw timing data and compute averages for each thread configuration.",
        "Document CPU, RAM, OS, and Java version, then export and deliver the dataset to Aryam and Rana."
      ],
      links: {
        github: "https://github.com/Shoug-Alomran",
        linkedin: "https://linkedin.com/in/shoug-alomran",
        portfolio: "https://shoug-tech.com",
        email: "Shoug.Alomran@Shoug-Tech.com"
      }
    },
    "layan bin dayel": {
      name: "Layan Bin Dayel",
      studentId: "223410104",
      role: "CS330 Team Member",
      department: "Information Systems / Artificial Intelligence",
      affiliation: "CS330 · Introduction to Operating Systems",
      bio: "",
      contributions: [
        "Phase 1 — Experiment Runner: ran the timing experiments on the shared VM environment and collected/validated the dataset.",
        "Phase 2 — Graphs & Performance Analysis Owner: created the execution-time and speedup graphs and identified the performance decrease point."
      ],
      responsibilities: [
        "Run timing experiments without modifying the shared VM environment.",
        "Validate the dataset and deliver it to Danah and Shoug.",
        "Create the required performance graphs and write a short technical interpretation."
      ],
      links: {
        github: "https://github.com/layanbindayel",
        linkedin: "https://www.linkedin.com/in/layan-bindayel",
        portfolio: "",
        email: ""
      }
    },
    "aryam yahya almansour": {
      name: "Aryam Yahya Almansour",
      studentId: "223410070",
      role: "CS330 Team Member",
      department: "",
      affiliation: "CS330 · Introduction to Operating Systems",
      bio: "",
      contributions: [
        "Phase 1 — Setup & Environment Preparation: configured the VM/Ubuntu environment, ran the base execution, and documented system specifications.",
        "Phase 2 — Metrics & Tables Owner: computed speedup and percentage improvement, and built the formatted results tables."
      ],
      responsibilities: [
        "Prepare and hand off VM access for experiment runs.",
        "Compute speedup (T(1)/T(n)) and % improvement from the final timing dataset.",
        "Prepare formatted results tables for report integration."
      ],
      links: {
        github: "https://github.com/aryamalmansour",
        linkedin: "",
        portfolio: "",
        email: ""
      }
    },
    "danah altuwaijri": {
      name: "Danah Altuwaijri",
      studentId: "223410151",
      role: "CS330 Team Member",
      department: "Information Systems",
      affiliation: "CS330 · Introduction to Operating Systems",
      bio: "",
      contributions: [
        "Phase 1 — Graphs & Visuals: built graphs from Layan's finalized dataset.",
        "Phase 2 — Code Modification Owner: modified the Java benchmark to compute the sum of cubes, made thread count configurable, and verified correctness before freezing the final version."
      ],
      responsibilities: [
        "Wait for Layan's confirmed dataset before producing graphs.",
        "Modify, comment, and freeze the final Java benchmark code.",
        "Verify multithreaded output against the single-thread baseline."
      ],
      links: {
        github: "https://github.com/Danaltuwaijri",
        linkedin: "https://linkedin.com/in/danah-altuwaijri-a0a5b12b1",
        portfolio: "",
        email: ""
      }
    },
    "rana alfaris": {
      name: "Rana Alfaris",
      studentId: "223410567",
      role: "CS330 Team Member",
      department: "",
      affiliation: "CS330 · Introduction to Operating Systems",
      bio: "",
      contributions: [
        "Phase 2 — Report & Integration Owner: integrated the final tables and graphs into the report and organized the submission package."
      ],
      responsibilities: [
        "Draft the report structure (objective, methodology, setup, results, discussion, conclusion).",
        "Write the explanation of thread division, synchronization, and scalability behavior.",
        "Organize the final submission folder and create the ZIP package."
      ],
      links: {
        github: "https://github.com/Rana-af",
        linkedin: "",
        portfolio: "",
        email: ""
      }
    }
  };

  window.TEAM_PROFILES = {
    normalize: normalize,
    get: function (name) {
      return DATA[normalize(name)] || null;
    }
  };
})();
