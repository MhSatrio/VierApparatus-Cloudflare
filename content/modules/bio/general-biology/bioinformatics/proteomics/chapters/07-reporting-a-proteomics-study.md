---
title: "Reporting a Proteomics Study"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a proteomics study must contain for its identifications and quantifications to be checked and repeated, including the raw spectra with their repository accession, the search database and its version, the search parameters and modifications, the false discovery rates at the peptide and protein levels, the quantification and normalisation methods and the statistical tests with their corrections."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a proteomics report must contain for another group to repeat the identification and quantification."
  - "Deposit the raw spectra and the identification results so that the protein list can be recomputed."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cox, J., & Mann, M. (2008). MaxQuant enables high peptide identification rates, individualized p.p.b.-range mass accuracies and proteome-wide protein quantification. Nature Biotechnology, 26(12), 1367-1372. https://doi.org/10.1038/nbt.1511"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A proteomics result is a protein list with its quantities, and the list can be checked only if the reader can see how it was produced. Peng (2011) argued that the means of reproducing a computational result must accompany it, and for a mass spectrometry study the means are the raw spectra, the search settings and the statistical decisions. Cox and Mann (2008) describe a pipeline in which these settings are explicit, and a report should give the same level of detail for whatever pipeline is used.

The raw data are the first item. The spectra should be deposited in a public repository with an accession, since the identifications can then be recomputed with other settings. Wilkinson et al. (2016) set out the principles under which such data should be identified and made reusable, and a deposited spectral dataset meets them.

The search is the second item. The database and its version, the enzyme, the tolerances, the fixed and variable modifications and the software with its version should be listed. The false discovery rate used at the peptide and at the protein level must be stated, along with the number of peptides supporting each protein, since these determine how far the list can be trusted.

The quantification is the third item. The method, the normalisation, the handling of missing values and the rule for combining peptides into proteins should be given, together with the statistical tests and the correction used. Sandve et al. (2013) recommended recording the steps of an analysis, and these steps are what a reader needs to reproduce the quantities.

The results are the fourth item. The protein table with its identifiers, its quantities and its statistics should be deposited, with the code that produced it. Peng (2011) argued that the availability of data and code is what allows a computational finding to be verified, and a report that gives both can be checked by anyone who wants to.
