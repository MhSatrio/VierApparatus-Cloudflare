---
title: "Noise and Stochasticity in Cells"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "Why the molecular reactions inside a cell are stochastic when the numbers of molecules are small, how intrinsic and extrinsic noise differ, the effect of noise on gene expression and cell-fate decisions, and how deterministic rate equations must be replaced by stochastic descriptions in small systems."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish intrinsic noise from extrinsic noise in gene expression and give an example of each."
  - "Explain when a deterministic rate equation gives an adequate description of a cellular reaction and when a stochastic description is needed."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
---

The rate equations of the previous chapters describe the average behaviour of a population of molecules, and they assume that the concentrations are large enough for the average to be a good description. Many cellular species are present in small numbers. A gene may be switched on or off by a single binding event, and a messenger RNA may be present in only a few copies. For such species, the timing of each reaction is random, and two genetically identical cells can differ in the number of molecules they contain at the same moment.

Noise has two main sources. Intrinsic noise arises from the random timing of the reactions that produce and destroy a molecule within one cell. Extrinsic noise arises from differences between cells in quantities that affect the reaction, such as the number of ribosomes or the level of a signalling protein. Alberts et al. (2022) describe the gene expression machinery whose randomness produces the intrinsic component, and the variation among cells in the same tissue shows the extrinsic one.

Noise matters because it changes what a cell does. Two cells with the same average level of a regulatory protein may differ in whether they commit to a fate, because the threshold for the decision is crossed by some cells and not others. Noise can also be useful, since a population of cells that differ in their responses may survive a change that would kill a uniform population.

Kitano (2002) pointed out that a deterministic model can reproduce the average behaviour of a network while failing to describe the variation between cells. A stochastic simulation, in which each reaction occurs with a probability determined by the current state, gives a distribution of outcomes instead of a single trajectory, and it is the appropriate description when the number of molecules is small.

The practical choice is between a deterministic model, which is faster and easier to fit, and a stochastic model, which describes the variation. The choice should be made on the basis of the molecule numbers and of the question being asked.
