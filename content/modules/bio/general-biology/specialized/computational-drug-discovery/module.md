---
title: "Computational Drug Discovery"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The use of computation to find and improve drug candidates, covering the stages of the discovery pipeline from target identification to lead optimisation, the virtual screening of large chemical libraries against a protein target, the docking of ligands into binding sites and the scoring functions that rank them, the molecular dynamics simulations that model flexibility and binding free energies, the ligand-based methods that use known active compounds, the enrichment and validation that show a screen finds active compounds better than chance, the false positives that arise from scoring errors and assay interference, and the reporting of computational screens so that their predictions can be tested experimentally."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the stages of a drug discovery pipeline and state the role that computation plays in each."
  - "Explain how a virtual screen is validated by enrichment and why a high docking score alone is not evidence of activity."
references:
  - "Shoichet, B. K. (2004). Virtual screening of chemical libraries. Nature, 432(7019), 862-865. https://doi.org/10.1038/nature03197"
  - "Jorgensen, W. L. (2004). The Many Roles of Computation in Drug Discovery. Science, 303(5665), 1813-1818. https://doi.org/10.1126/science.1096361"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Drug discovery is a long and costly process, in which a few compounds that bind a disease target and act safely in the body are found among very many that do not. Computation has become a central part of the search, because it can evaluate large numbers of compounds before any is synthesised. Jorgensen (2004) described the many roles of computation across the pipeline, from the understanding of targets to the optimisation of leads, and the search is now shaped by the computational tools available.

The pipeline begins with a target, a protein whose activity is linked to disease, and proceeds through the identification of compounds that bind it, their optimisation into leads with better properties and their testing in increasingly complex systems. Computation contributes at each stage, and its predictions must be tested by experiment at every step. The chapters that follow examine virtual screening, docking, molecular dynamics, ligand-based methods, validation, false positives and reporting.

Virtual screening evaluates large libraries of compounds by docking them into the binding site of a target and ranking them by a score. Shoichet (2004) reviewed the methods and their performance, and showed that the scores are imperfect predictors of activity. The ranking identifies candidates for testing, but the candidates must be confirmed experimentally, since many of the top-ranked compounds are inactive.

Ioannidis (2005) described how a method that selects the best of many candidates is likely to overstate their value, and the selection of compounds from a virtual screen should be assessed against the rate of confirmation. Cumming (2014) argues that the success rate of a screen should be reported with its interval, and Sandve et al. (2013) and Peng (2011) recommended that the libraries, the procedures and the scores be recorded so that a screen can be reproduced.
