---
title: "Normalisation and Quality Control"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How metabolomic data are normalised for differences in sample amount and for the drift of the instrument over the run, the use of pooled quality control samples run at intervals to measure and correct drift, the filtering of features with poor reproducibility and the missing values that arise from features below detection, with the reasons each correction must be checked against the quality control data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Use pooled quality control samples to measure instrument drift and state how a correction is applied and checked."
  - "Filter features by their reproducibility in the quality control samples and state the reason for the threshold."
references:
  - "Wishart, D. S., Feunang, Y. D., Marcu, A., Guo, A. C., Liang, K., Vázquez-Fresno, R., Sajed, T., Johnson, D., Li, C., Karu, N., Sayeeda, Z., Lo, E., Assempour, N., Berjanskii, M., Singhal, S., Arndt, D., Liang, Y., Badran, H., Grant, J., . . . Scalbert, A. (2018). HMDB 4.0: the human metabolome database for 2018. Nucleic Acids Research, 46(D1), D608-D617. https://doi.org/10.1093/nar/gkx1089"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A metabolomic run lasts hours or days, and the instrument changes during it. The sensitivity drifts, the retention times shift, and the signal of a feature may be higher at the start of the run than at the end for reasons unrelated to the sample. Normalisation must correct for these changes before the samples are compared, or the comparison will reflect the order in which the samples were run rather than their metabolites.

Pooled quality control samples are the standard means of measuring the drift. A sample made by mixing a little of every study sample is run repeatedly at intervals through the batch. Because every quality control is the same material, its variation over the run is the variation of the instrument, and a correction fitted to the quality controls can be applied to the study samples. The method is powerful, but it assumes that the drift is smooth and that the quality controls represent the samples.

Features must be reproducible. A feature whose signal varies greatly among the quality control injections is unreliable, and a filter that removes such features is standard practice. The threshold for the variation should be fixed in advance, and the features removed should be reported. Removing features after seeing their effect on the result is a form of the flexibility that Ioannidis (2005) described as producing false findings.

Missing values arise when a feature is below detection in some samples. They are usually filled with a small value or removed, and the choice carries the same assumptions as in proteomics. A feature that is missing in one group and present in another is informative about detection, and it must not be silently treated as absent.

Taschuk and Wilson (2017) recommended that software be tested, and the correction should be checked by showing that the quality controls become more uniform after it is applied. Sandve et al. (2013) recommended recording the steps of an analysis, and the correction, the filter and the missing-value rule are the steps that determine the data used.
