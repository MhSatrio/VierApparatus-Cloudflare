---
title: "Nuclear Magnetic Resonance Metabolomics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How metabolites are measured by nuclear magnetic resonance spectroscopy as an alternative to mass spectrometry, the one-dimensional spectrum and its peaks, the binning and alignment of spectra across samples, the identification of metabolites by their chemical shifts against reference libraries, the reproducibility advantage of the method and its lower sensitivity, with the processing steps that make spectra comparable."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how an NMR spectrum of a biofluid is processed into a table of intensities that can be compared across samples."
  - "Identify metabolites from their chemical shifts and state the limits of the identification in a crowded spectrum."
references:
  - "Wishart, D. S., Feunang, Y. D., Marcu, A., Guo, A. C., Liang, K., Vázquez-Fresno, R., Sajed, T., Johnson, D., Li, C., Karu, N., Sayeeda, Z., Lo, E., Assempour, N., Berjanskii, M., Singhal, S., Arndt, D., Liang, Y., Badran, H., Grant, J., . . . Scalbert, A. (2018). HMDB 4.0: the human metabolome database for 2018. Nucleic Acids Research, 46(D1), D608-D617. https://doi.org/10.1093/nar/gkx1089"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Nuclear magnetic resonance spectroscopy measures the metabolites of a sample by the frequencies at which their hydrogen nuclei absorb energy in a magnetic field. Each metabolite contributes a pattern of peaks determined by its chemical structure, and a spectrum of a biofluid such as urine or serum is the sum of the patterns of all the metabolites present. The method is less sensitive than mass spectrometry, but it is highly reproducible and it does not destroy the sample, and these properties make it useful for large studies.

The spectrum must be processed before samples can be compared. The baseline is corrected, the chemical shift scale is referenced, and the spectrum is divided into bins, each carrying the total intensity of a small range of shifts. Alignment corrects for the small shifts in peak position that the chemistry of the sample causes, since the pH and the ionic content of a biofluid move peaks between samples. The binning and alignment are choices that affect the table of intensities, and they must be stated.

Identification uses chemical shifts. A reference library records the shifts and multiplicities of the peaks of each known metabolite, and a peak pattern in the spectrum is matched against the library. In a crowded spectrum, the peaks of many metabolites overlap, and a shift may match several candidates. Wishart et al. (2018) describe a database that holds such reference spectra, and the identification is only as firm as the uniqueness of the pattern. Overlapping peaks should be reported as ambiguous.

Alberts et al. (2022) describe the metabolism whose products are measured, and the identification of a metabolite is the first step toward interpreting its level. The chapter on interpretation applies here as elsewhere in metabolomics.

Sandve et al. (2013) recommended recording the processing of data, and the binning width, the alignment method and the library are the steps that determine the intensities used in the statistics.
