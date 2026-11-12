---
title: "Compensation and Spillover"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "Why the emission of one fluorophore spills into the detector of another, how single-stained controls measure the spillover and how compensation subtracts it so that each colour reports only its own label."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why fluorescence spillover occurs and how it distorts the apparent expression of a marker."
  - "Prepare single-stained compensation controls and apply compensation to a multicolour data set."
references:
  - "Herzenberg, L. A., Parks, D., Sahaf, B., Perez, O., Roederer, M., & Herzenberg, L. A. (2002). The history and future of the fluorescence activated cell sorter and flow cytometry: A view from Stanford. Clinical Chemistry, 48(10), 1819-1827. https://doi.org/10.1093/clinchem/48.10.1819"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Fluorophores have broad emission spectra, and the tail of each one extends into the detectors designed for others. A cell labelled with a green fluorophore therefore produces a faint signal in the detector for orange, and a cell that is truly negative for an orange marker can appear positive. This spillover is a property of the dyes and the filters, not of the biology, and it must be removed before the data can be interpreted. Herzenberg et al. (2002) recognised that multicolour measurement depends on this correction, which is the central technical problem of the method.

Compensation measures the spillover from a set of single-stained controls. Each fluorophore is applied alone to cells or to beads, and the instrument records how much of its signal appears in every other detector. The spillover coefficients form a matrix, and the matrix is inverted and applied to the multicolour data so that each detector retains only its own colour. The controls must be stained with the same fluorophore and the same instrument settings as the experiment, since the spillover changes with the voltage.

The correction is only as good as the controls. A single-stained control that is too dim, or that is saturated, gives a poor coefficient, and the compensated data then show artefactual populations. A control with a positive population brighter than the sample is preferred, because the coefficient is then measured where the signal is strong.

Platt (1964) argued for a design that can fail, and the compensation is tested by examining whether the negative population of each marker lies on the axis after correction. A population that remains diagonal indicates an incorrect matrix.

Ioannidis (2005) described how an uncorrected analysis can produce apparent co-expression, and the compensation should be reported with the controls used. Alberts et al. (2022) describe the markers whose co-expression is often claimed, and spillover is a common source of false co-expression.
