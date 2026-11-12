---
title: "Systems Biology"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The study of living systems as networks of interacting components whose collective behaviour cannot be predicted from the parts alone, covering the integration of measurements across genes, proteins and metabolites, the emergence of properties such as robustness and oscillation from feedback and redundancy, the recurring network motifs that perform specific functions, the iterative cycle of modelling, measurement and prediction, and the reporting of systems models so that they can be tested and reused."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why the behaviour of a biological system cannot always be predicted from the properties of its isolated parts."
  - "Describe the cycle of modelling, measurement and prediction used in systems biology and the role of each step."
references:
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Systems biology studies how the components of a living cell or organism work together. Its premise is that many biological functions arise from the interactions among genes, proteins and metabolites, and that these interactions must be understood as a whole to explain the behaviour of the system. Kitano (2002) described the field as the attempt to understand the system-level properties that emerge from such interactions, which the study of isolated parts cannot reveal directly.

The topic begins with the idea of emergence, in which robustness, oscillation and switching arise from feedback loops and redundancy rather than from any single component. The networks of interactions that give rise to these properties are the subject of the later topics, which cover biological networks, metabolic reconstruction, flux balance analysis and dynamic models. Alon (2007) showed that certain small patterns of interaction, network motifs, recur in biological networks far more often than chance, and each motif tends to perform a specific function.

Systems biology proceeds by a cycle of modelling, measurement and prediction. A model is built from the known interactions, its predictions are tested by measurement, and the discrepancies lead to a revised model. The cycle depends on the quality of the measurements and on the honesty with which the model is compared with them. Ioannidis (2005) described how repeated adjustment of a model to fit the data can produce a model that predicts nothing new, and a model should be tested on data that were not used to build it.

The later chapters of the topic return to the reproducibility of models. Peng (2011) argued that a result must be reproducible from its means, and a systems model must be reported with its equations, its parameters and the code that solves it. Sandve et al. (2013) recommended recording these elements together, since a model that cannot be rerun has little value for the systems it describes.
