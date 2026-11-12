---
title: "Gating Strategy"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How gates are drawn to select single, live cells and then the populations of interest, the hierarchy of gates, how the gating strategy is fixed before analysis and how gate placement is checked against the controls."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct a hierarchical gating strategy that removes doublets and dead cells before defining populations."
  - "Fix the gating strategy in advance and verify gate placement with the controls."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Herzenberg, L. A., Parks, D., Sahaf, B., Perez, O., Roederer, M., & Herzenberg, L. A. (2002). The history and future of the fluorescence activated cell sorter and flow cytometry: A view from Stanford. Clinical Chemistry, 48(10), 1819-1827. https://doi.org/10.1093/clinchem/48.10.1819"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A gate is a boundary drawn around a region of a plot, and the cells inside it form the population analysed. Gates are arranged in a hierarchy. The first gates remove artefacts: the doublets identified by pulse width, and the debris at the lowest scatter. The next gate removes dead cells that take up the viability dye, since they bind antibodies nonspecifically. Only then are the populations of interest defined, by their markers. Herzenberg et al. (2002) showed that the hierarchy is what makes the populations interpretable, because each gate is applied to cells that have already passed the earlier tests.

The gating strategy must be fixed before the analysis. Ioannidis (2005) described how the freedom to adjust gates after seeing the data allows the researcher to find an effect in almost any set of measurements, and the boundaries of the gates should be set from the controls and the strategy written down beforehand. A gate drawn to produce a clean population or a significant difference is a form of selection, and the gate placement should not depend on the outcome being studied.

The placement is checked against controls. The fluorescence-minus-one control, described in a later chapter, shows where the boundary of a positive population lies when one marker is absent, and the gate should exclude the negatives of that control. Gates drawn with an isotype control are placed at a fixed margin above the background of the non-specific antibody.

Platt (1964) recommended that data be examined in a way that could reveal an error. A gate that changes its placement between samples, or that sits on the continuum of two populations, shows that the boundary is not defined by the biology and must be reconsidered.

Alberts et al. (2022) describe the stages of cell differentiation that give rise to the populations gated, and the boundaries between them are often gradual rather than sharp.
