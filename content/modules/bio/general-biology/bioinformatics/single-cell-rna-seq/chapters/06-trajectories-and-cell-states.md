---
title: "Trajectories and Cell States"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the continuous transitions between cell states are inferred from single-cell data by ordering cells along a trajectory, the assumptions that a trajectory makes about the direction and the connectedness of states, the use of marker genes to label the states along a path, the risk of drawing a trajectory where the data show only a mixture and the evidence needed to support a claim about developmental order."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a trajectory orders cells along a path and what it assumes about the direction of change."
  - "Distinguish a developmental order supported by evidence from a pseudotime ordering that only reflects similarity."
references:
  - "Wolf, F. A., Angerer, P., & Theis, F. J. (2018). SCANPY: large-scale single-cell gene expression data analysis. Genome Biology, 19(1), 15. https://doi.org/10.1186/s13059-017-1382-0"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Some cell populations change continuously. A progenitor gives rise to a series of intermediate states on the way to a mature cell, and a snapshot of the tissue captures cells at many points along the route. A trajectory method orders the cells along a path so that similar cells are adjacent, and the position along the path, called pseudotime, is treated as a proxy for progress. Wolf et al. (2018) describe trajectory inference in their toolkit, and the method turns a set of snapshots into an ordered series.

The ordering rests on assumptions. The method assumes that the cells lie along a connected path, that the path has a single origin and that the cells are a sample of a continuous process. If the process branches, the trajectory must represent the branches, and if the cells are a mixture of unrelated states, the ordering will impose a path that does not exist. The assumptions should be checked against the data before a trajectory is reported.

Direction is the most difficult question. A trajectory ordering can be reversed without changing the similarities between cells, so the data alone do not say which end is the beginning. The direction must be supplied by a biological reason, such as a known starting population or a marker that is known to appear early. Alberts et al. (2022) describe developmental pathways in which the order of states is established by experiment, and a trajectory should be checked against such knowledge.

A pseudotime is not a time. It orders the cells by their similarity, and the distances between cells along the path do not measure elapsed time. A claim that one state precedes another requires evidence beyond the pseudotime, such as lineage tracing or time-series sampling.

Ioannidis (2005) described how a pattern found by flexible analysis can be less reliable than it appears, and a trajectory can be made to fit almost any dataset with enough choices. The method, its parameters and the evidence for the direction should be stated.

Sandve et al. (2013) recommended recording the parameters of an analysis, and the starting cells, the path and the evidence for the direction form the record of a trajectory.
