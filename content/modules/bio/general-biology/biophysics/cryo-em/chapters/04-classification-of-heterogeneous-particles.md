---
title: "Classification of Heterogeneous Particles"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How a population of particles that differ in composition or conformation is sorted into classes by computational classification, how each class is averaged into its own reconstruction, the danger that classification can split a single state into artificial classes or merge distinct ones and the discipline needed to show that the classes reflect real states of the molecule."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a heterogeneous particle population is classified and how each class is reconstructed."
  - "Explain how classification can create artificial classes and how real states are distinguished from them."
references:
  - "Bai, X.-c., McMullan, G., & Scheres, S. H. W. (2015). How cryo-EM is revolutionizing structural biology. Trends in Biochemical Sciences, 40(1), 49-57. https://doi.org/10.1016/j.tibs.2014.10.005"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A sample of a molecule is rarely uniform. Some particles may be missing a subunit or a ligand, others may be in different conformations, and some may be damaged. Averaging all of them together produces a blurred map that represents none of the states well. Classification sorts the particles into groups that are more similar to one another, and each group is averaged separately. The method reveals the states that the mixture contains, which is one of the most valuable features of the technique, since different conformations may be functionally distinct.

The classes are found by a computational procedure that compares the particles and groups those that resemble one another. Anfinsen (1973) showed that a protein adopts a defined structure, and a classification of conformations seeks the defined states that the molecule adopts. The procedure can be unsupervised, grouping the particles without a prior model, or supervised, using references for the states expected. Both require choices about the number of classes and the criteria for membership.

Classification can produce artefacts. A single conformation may be split into several classes because of noise, orientation bias or the alignment, and each split class is then reconstructed as a separate state. The reverse error also occurs, in which two distinct states are merged because their differences are small relative to the noise. Ioannidis (2005) described how a method that always produces classes will produce them even in a homogeneous sample, and the classes must be tested for reality.

The test of a class is whether it is reproducible. Classes that appear with different starting references, with different subsets of the particles or with different parameters, and that show the same features, are more likely to be real states. Classes that appear only under one set of choices are suspect. The number of particles in each class also matters, since a class with few particles has a poorly determined reconstruction.

Platt (1964) recommended a test that could separate the alternatives, and the reproducibility of the classes across independent processing is such a test. The conformational states that survive it are the ones the data support.

Classification sorts a heterogeneous sample into states, and the reality of each state is established by its reproducibility under independent processing.
