---
title: "Designing a Systems Study"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The design of a systems biology study from its question to its analysis, covering the choice of the system and of the perturbations that will reveal its structure, the decision of which omics layers to measure and at what time points, the replication and controls needed to separate biological from technical variation, the planning of the iterative cycle of model and experiment before data are collected, and the pre-specification of the analysis so that the study can be judged against its plan."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Plan a systems study that links a biological question to the perturbations, measurements and time points that can answer it."
  - "Pre-specify the analysis of a systems study and explain why this protects against flexible interpretation."
references:
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A systems study begins with a question about how a system behaves, not with a list of the components to be measured. The question determines which perturbations will reveal the structure of the system, since a network is best understood by changing its parts and observing the response. Kitano (2002) described this approach as the combination of measurement and perturbation that defines the field, and the design should be fixed by the question before the measurements are chosen.

The choice of omics layers and time points follows from the question. A transcriptional response that unfolds over hours requires measurements at several times within that window, while a signal that changes in seconds requires a different method. Measuring every layer at every time is costly and often unnecessary, and the design should state which layers and which times are needed to answer the question and why.

Replication and controls separate biological variation from technical variation. Samples prepared on different days, processed by different operators or run on different instruments may differ for reasons unrelated to the biology, and a design that confounds these with the treatment cannot separate them. Balanced designs, in which each condition is represented in each batch, allow the technical variation to be estimated and removed, and the replicates should be counted as independent biological units.

The analysis should be pre-specified, so that the model, the criteria for a significant response and the handling of missing data are fixed before the data are seen. Ioannidis (2005) described how flexibility in analysis produces findings that do not hold, and a pre-specified plan is the principal defence against this. Cumming (2014) argues that the estimates from the study should be reported with their intervals, and Sandve et al. (2013) recommended depositing the plan with the data and the analysis code, so that the study can be judged against what was intended.
