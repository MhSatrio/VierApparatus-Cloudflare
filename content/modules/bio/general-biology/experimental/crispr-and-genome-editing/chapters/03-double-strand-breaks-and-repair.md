---
title: "Double-Strand Breaks and Repair"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How a Cas9-induced double-strand break is resolved by non-homologous end joining and by homology-directed repair, why end joining is error-prone and produces small insertions and deletions, and how the repair outcome depends on the cell cycle."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how non-homologous end joining and homology-directed repair produce different outcomes at a cut site."
  - "Predict the likely repair outcome for a given cell type and cell cycle stage."
references:
  - "Cong, L., Ran, F. A., Cox, D., Lin, S., Barretto, R., Habib, N., Hsu, P. D., Wu, X., Jiang, W., Marraffini, L. A., & Zhang, F. (2013). Multiplex genome engineering using CRISPR/Cas systems. Science, 339(6121), 819-823. https://doi.org/10.1126/science.1231143"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

A double-strand break is one of the most dangerous lesions in a cell, and the cell has two main ways of repairing it. Non-homologous end joining rejoins the two ends directly, often with the loss or gain of a few bases at the junction. It works throughout the cell cycle and is the dominant pathway in most cells. Alberts et al. (2022) describe the enzymes of this pathway, and their imprecision is the reason a cut can be repaired without restoring the original sequence.

Cong et al. (2013) used the repair of Cas9-induced breaks to disrupt genes, and the most common product of end joining is a small insertion or deletion that shifts the reading frame and disables the gene. This is why CRISPR is effective for knockouts. The outcome is not a single fixed product, however. A cut is repaired in different ways in different cells, so the population of edited cells is a mixture of alleles, and the mixture must be measured.

Homology-directed repair uses a template to rebuild the sequence precisely. If a donor DNA carrying the desired change is supplied with the guide, the cell may copy the template into the break. This pathway is most active in dividing cells in the S and G2 phases, when a sister chromatid is available, and it is much less efficient than end joining. The frequency of precise edits is therefore low, and the design must allow for it.

Ioannidis (2005) described how an outcome that is rare can be missed or exaggerated when the screen is small, and the number of cells examined determines the smallest effect that can be detected. Platt (1964) recommended comparing alternatives, and the comparison between the two repair pathways is part of the design of any precise edit.

The likely outcome of a cut should therefore be predicted from the cell type and the cell cycle, and the prediction tested by sequencing rather than assumed.
