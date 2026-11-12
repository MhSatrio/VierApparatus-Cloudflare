---
title: "Proteomics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The computational analysis of mass spectrometry data to identify and quantify the proteins of a sample, covering the identification of peptides from their spectra by database search, the control of the false discovery rate in peptide and protein identification, label-free and labelled quantification, the handling of post-translational modifications and the statistical analysis of protein abundance across conditions, with the reporting needed for the results to be checked."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how peptides are identified from their mass spectra by database search and how the false discovery rate is controlled."
  - "Quantify proteins across samples and state the steps and the statistics needed before a protein is called changed."
references:
  - "Aebersold, R., & Mann, M. (2016). Mass-spectrometric exploration of proteome structure and function. Nature, 537(7620), 347-355. https://doi.org/10.1038/nature19949"
  - "Cox, J., & Mann, M. (2008). MaxQuant enables high peptide identification rates, individualized p.p.b.-range mass accuracies and proteome-wide protein quantification. Nature Biotechnology, 26(12), 1367-1372. https://doi.org/10.1038/nbt.1511"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Proteomics measures the proteins of a sample, and most of the proteomic data that a bioinformatician meets come from mass spectrometry. The instrument fragments peptides, the short pieces into which proteins are cut, and records the masses of the fragments as a spectrum. Aebersold and Mann (2016) describe mass spectrometry as the means of exploring the structure and function of the proteome, and the computational task is to turn the spectra back into the proteins they came from. The task is a search, a statistical decision and a quantification, and each carries its own errors.

The chapters follow the stages of the analysis. The identification of peptides by database search comes first, followed by the control of the false discovery rate that decides which identifications to accept. Quantification, the measure of how much of each protein is present, is treated next, with the statistics needed to compare proteins across conditions. The final chapters cover post-translational modifications and the reporting that allows the result to be checked.

Mass spectrometry is a measurement with many steps, and each step can introduce bias. The topic keeps the statistical discipline of the earlier topics in view, since a list of identified proteins is a product of thresholds and choices, and its meaning depends on how they were set.
