---
title: "Matching Samples Across Layers"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The problem of ensuring that the measurements of different molecular layers refer to the same biological samples, the differences in the material used for each layer, the matching of samples by identifiers and metadata, the consequences of mismatched samples for any integrated result and the design choices, such as measuring several layers from one aliquot or recording the processing of each sample, that make matching reliable."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe why the material used for each omics layer may differ and how this affects the matching of samples."
  - "Identify the design choices that make sample matching reliable and state the checks that detect a mismatch."
references:
  - "Hasin, Y., Seldin, M., & Lusis, A. (2017). Multi-omics approaches to disease. Genome Biology, 18(1), 83. https://doi.org/10.1186/s13059-017-1215-1"
  - "Ritchie, M. D., Holzinger, E. R., Li, R., Pendergrass, S. A., & Kim, D. (2015). Methods of integrating data to uncover genotype-phenotype interactions. Nature Reviews Genetics, 16(2), 85-97. https://doi.org/10.1038/nrg3868"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

Integration assumes that every layer describes the same biological sample, and this assumption is often false. The DNA for genotyping, the RNA for transcriptomics, the protein for proteomics and the metabolites for metabolomics are extracted by different procedures from different parts of the sample, and they may not come from the same cells. A tissue biopsy may be divided into pieces, each processed for a different layer, and the pieces are not identical. Hasin et al. (2017) note that this matching is one of the practical obstacles to multi-omics studies, and a mismatch silently corrupts every integrated result.

The matching is secured by design. Where possible, several layers should be measured from a single aliquot or from material taken at the same moment and split with a known protocol. Where this is impossible, each sample must carry an identifier that is recorded for every layer, and the processing of each sample, including the time, the batch and the operator, should be recorded so that the pairing can be checked.

Ritchie et al. (2015) describe the integration methods, and all of them assume that the rows of each layer correspond to the same subjects. A method applied to mismatched data will find relationships between unrelated samples, and the error will look like biology. The check is to test the matching with a feature that should be shared across layers, such as the sex or a genotype-dependent expression, and a mismatch shows as a failure of that check.

Sample identity is also a matter of record. A sample swap in the laboratory, or a relabelling in a spreadsheet, produces a silent error that no statistical method can detect. The chain of custody for each sample, from collection to measurement, is part of the data.

Wilkinson et al. (2016) set out the FAIR principles, which require that data carry identifiers that link them to their samples, and Sandve et al. (2013) recommended recording the steps of an analysis, which include the matching of samples to their measurements.
