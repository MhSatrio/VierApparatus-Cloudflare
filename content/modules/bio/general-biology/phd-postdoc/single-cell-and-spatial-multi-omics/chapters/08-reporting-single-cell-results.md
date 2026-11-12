---
title: "Reporting Single-Cell and Spatial Results"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The reporting of single-cell and spatial multi-omics results so that the cell types, states, spatial claims and differences can be evaluated and reproduced, covering the report of the sample sizes as donors and cells, the quality metrics that include viability, doublet rate, capture efficiency and sequencing depth, the description of the clustering parameters and their stability, the cell-type proportions with their intervals, the differential expression results with the unit of replication and the model stated, the spatial claims with the resolution and the null model, the deposition of raw, processed and annotated data and of the code with identifiers, and the honest statement of the limitations imposed by dissociation, amplification and deconvolution."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Report single-cell results with the donor sample size, quality metrics, clustering parameters and unit of replication stated."
  - "Deposit raw, processed and annotated data with identifiers so that the cell-type definitions can be checked."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A single-cell report must state its sample size at the level that matters. The number of cells is often very large, but the number of donors, animals or cultures that the cells came from is usually small, and the inference about a condition depends on the latter. Munafò et al. (2017) argued that the unit of replication should be reported explicitly, and the report should give donors and cells separately, so that the reader can see how much independent information the study contains.

Quality metrics must be reported, including viability, the doublet rate, the capture efficiency and the sequencing depth. Each affects the reliability of the data, and a reader cannot judge the results without them. Cumming (2014) argues that each metric should be reported with its uncertainty, since a viability estimated from a few cells is itself an estimate.

The clustering parameters, the stability of the clusters and the cell-type proportions with their intervals should all be reported. The differential expression results must state the unit of replication and the model used, and the spatial claims must give the resolution of the method and the null model of the test. Ioannidis (2005) described how the failure to state these choices makes a result impossible to evaluate, and each choice must be reported.

Raw, processed and annotated data, together with the code, should be deposited with identifiers. The annotations define the cell types, and they can be checked only if the data and the code are available. Peng (2011) argued that a result is reproducible when the means to check it are available, and the deposition is the means for single-cell work. The report should close with an honest statement of the limitations imposed by dissociation, amplification and deconvolution, since each may shape the cell states that were observed.
