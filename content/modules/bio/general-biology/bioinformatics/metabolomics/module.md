---
title: "Metabolomics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The computational analysis of metabolite measurements from mass spectrometry and nuclear magnetic resonance, covering the detection and annotation of metabolite features, the identification of metabolites against reference libraries and the metabolome database, the normalisation and statistical analysis of metabolite abundances, the interpretation of metabolite changes through pathways and the level of confidence that each identification and each pathway claim deserves."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a metabolite is annotated from a mass spectral feature and what level of confidence each annotation carries."
  - "Analyse a metabolite dataset with normalisation and statistics and state the limits of interpreting changes through pathways."
references:
  - "Wishart, D. S., Feunang, Y. D., Marcu, A., Guo, A. C., Liang, K., Vázquez-Fresno, R., Sajed, T., Johnson, D., Li, C., Karu, N., Sayeeda, Z., Lo, E., Assempour, N., Berjanskii, M., Singhal, S., Arndt, D., Liang, Y., Badran, H., Grant, J., . . . Scalbert, A. (2018). HMDB 4.0: the human metabolome database for 2018. Nucleic Acids Research, 46(D1), D608-D617. https://doi.org/10.1093/nar/gkx1089"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

Metabolites are the small molecules of the cell, the substrates, products and signals of its chemistry. Metabolomics measures them in a sample, most often by mass spectrometry or nuclear magnetic resonance, and the computational task is to turn the measured features into identified metabolites and then into an interpretation. Wishart et al. (2018) describe the human metabolome database, which is the reference against which many identifications are made, and the database shows how much of the metabolome is still uncharacterised.

The topic follows the path from the raw measurement to the biological claim. The first chapters deal with the features that the instrument produces and their annotation, where confidence varies sharply with the evidence available. The later chapters cover normalisation and statistics, the interpretation of changes through pathways and the reporting that allows the result to be checked.

Metabolomics is especially exposed to identification error. Many metabolites share masses, and a feature may match several candidates equally well. The level of confidence in each identification must therefore be stated, and an interpretation built on an uncertain identity is a weak claim. Alberts et al. (2022) describe the metabolic pathways into which these molecules fit, and a pathway claim depends on the identities that enter it.
