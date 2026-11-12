---
title: "Label-Free and Labelled Quantification"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the abundance of proteins is measured in mass spectrometry, the label-free approaches that compare the intensity or the spectral counts of peptides across runs, the labelled approaches such as isotope labelling that measure the ratio of two samples within one run, the normalisation that corrects for loading and instrument drift and the cautions that the intensities of peptides depend on properties other than abundance."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare label-free and labelled quantification and state the situations in which each is preferred."
  - "Normalise peptide intensities across runs and explain why a protein's abundance must be estimated from several peptides."
references:
  - "Cox, J., & Mann, M. (2008). MaxQuant enables high peptide identification rates, individualized p.p.b.-range mass accuracies and proteome-wide protein quantification. Nature Biotechnology, 26(12), 1367-1372. https://doi.org/10.1038/nbt.1511"
  - "Aebersold, R., & Mann, M. (2016). Mass-spectrometric exploration of proteome structure and function. Nature, 537(7620), 347-355. https://doi.org/10.1038/nature19949"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Quantification asks how much of each protein is present. In label-free methods, each sample is run separately, and the signal of each peptide, either its intensity or the count of spectra that identify it, is compared across the runs. Cox and Mann (2008) describe a label-free quantification that uses the intensities of peptides and aligns the runs before the comparison, which makes the signals of the same peptide comparable between samples.

Labelled methods mix the samples before the mass spectrometer. Peptides from different samples carry different isotopic labels, so that they appear as pairs or groups of peaks whose intensity ratio gives the relative abundance within one run. The labels remove much of the run-to-run variation, at the cost of the reagents and of the complexity of the design. Aebersold and Mann (2016) describe the mass-spectrometric approaches to the proteome that these methods serve, and the choice between them depends on the number of samples and the precision needed.

Normalisation corrects for differences in the amount of material loaded and in the drift of the instrument. Without it, a sample that was loaded with more protein appears to have higher abundance of every protein. The normalisation method is a choice that changes the result, and it should be stated, since different methods assume different things about how many proteins change.

A protein's abundance is estimated from its peptides, and a single peptide can be misleading. Peptides differ in their ionisation efficiency, so the intensity of one peptide depends on properties other than the amount of its protein. Combining several peptides per protein gives a more stable estimate, and the number of peptides behind each protein should be reported with its abundance.

Sandve et al. (2013) recommended that the processing of data be recorded, and the quantification method, the normalisation and the rule for combining peptides are the steps that determine the abundance of every protein.
