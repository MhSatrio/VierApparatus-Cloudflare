---
title: "Noise in Gene Expression"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The sources of random variation in gene expression, including the bursts of transcription and the random partitioning of molecules at cell division, how intrinsic noise from a gene's own reactions differs from extrinsic noise from the cell's state, how the noise is measured in single cells and how it can be useful as well as harmful to a cell."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish intrinsic noise in a gene's own reactions from extrinsic noise in the cellular environment."
  - "Describe how noise in expression is measured in single cells and why it matters for cellular decisions."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Gillespie, D. T. (1977). Exact stochastic simulation of coupled chemical reactions. The Journal of Physical Chemistry, 81(25), 2340-2361. https://doi.org/10.1021/j100540a008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

The number of copies of a protein in a cell varies from one cell to another, even when the cells are genetically identical and grown in the same conditions. Alberts et al. (2022) describe the regulation of gene expression, and much of the variation arises because transcription and translation occur in discrete events. A gene is switched on, produces a burst of messenger RNA molecules and is switched off, and the number of bursts and their sizes set the mean and the spread of the expression. The randomness of these events is intrinsic to the gene.

Extrinsic noise comes from the state of the cell as a whole. Differences in the number of RNA polymerases, ribosomes or regulatory proteins between cells change the expression of many genes together, and this correlated variation is extrinsic. The two sources can be separated experimentally by reporting the expression of two identical copies of a gene in the same cell: the intrinsic noise makes the two reporters differ, while the extrinsic noise makes them vary together.

The algorithm of Gillespie (1977) generates the random sequence of reaction events for a gene, and the simulated distribution of expression can be compared with the measured distribution across cells. A model that reproduces the mean but not the spread has missed the burst structure, and a model that reproduces the spread with the wrong correlation has missed the extrinsic component.

Noise is not always harmful. Some cells use variation in expression to produce subpopulations with different behaviour, and this bet-hedging allows a population to survive an environment that changes unpredictably. The benefit of noise depends on the environment, and the same variation that is useful in one setting may be damaging in another.

Ioannidis (2005) described how the variation in single-cell measurements can be averaged away in population measurements, and the claims about noise require single-cell data. Platt (1964) recommended the two-reporter experiment as a test that discriminates between the intrinsic and extrinsic sources.

Noise is a property of the cell as a stochastic system, and its measurement separates the randomness of each gene from the variation of the cell that contains it.
