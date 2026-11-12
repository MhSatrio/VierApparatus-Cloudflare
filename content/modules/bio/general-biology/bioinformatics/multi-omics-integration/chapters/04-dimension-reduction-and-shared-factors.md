---
title: "Dimension Reduction and Shared Factors"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How dimension reduction summarises the features of several omics layers into a small number of factors that capture shared variation, the principal component and factor analysis approaches applied to each layer and jointly, the interpretation of the loadings that show which features drive each factor, the choice of the number of factors and the risk that a factor reflects a technical source such as batch or sample quality rather than biology."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a joint factor model summarises several layers into shared factors and what the loadings of a factor show."
  - "Explain how a factor can reflect a technical source of variation and how this is checked."
references:
  - "Ritchie, M. D., Holzinger, E. R., Li, R., Pendergrass, S. A., & Kim, D. (2015). Methods of integrating data to uncover genotype-phenotype interactions. Nature Reviews Genetics, 16(2), 85-97. https://doi.org/10.1038/nrg3868"
  - "Hasin, Y., Seldin, M., & Lusis, A. (2017). Multi-omics approaches to disease. Genome Biology, 18(1), 83. https://doi.org/10.1186/s13059-017-1215-1"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Omics datasets have thousands of features per layer, far more than samples, and dimension reduction condenses them into a small number of factors. A principal component analysis of one layer finds the directions of greatest variation among the samples, and a joint factor model applied to several layers finds directions that vary together across them. Each factor is a weighted combination of features, and the weights, called loadings, show which features contribute to it in each layer. Ritchie et al. (2015) describe these methods as central to integration, since a shared factor is a candidate for a biological process that spans the layers.

The interpretation of a factor depends on its loadings. A factor with large loadings on genes of one pathway and on proteins of the same pathway is a candidate for that pathway's activity, and the loadings must be examined to see whether the interpretation holds. A factor dominated by a few features is less convincing than one whose loadings are spread across a coherent set, and the loadings should be reported with the factor.

The number of factors is a decision that changes the result. Too few factors merge distinct processes, and too many split a process into fragments and fit noise. The number is usually chosen from the variance explained or from a criterion of stability, and the choice should be stated and its effect examined.

A factor can reflect a technical source rather than biology. The processing batch, the date of extraction or the quality of the samples can produce a strong shared variation across layers, and such a factor looks like a biological signal. Hasin et al. (2017) discuss the importance of such confounders in multi-omics studies, and the check is to test whether each factor is associated with batch or quality measures before it is interpreted biologically.

Taschuk and Wilson (2017) recommended that research software be tested, and a factor model should be checked on data with a known structure. Sandve et al. (2013) recommended recording the number of factors, the loadings and the checks for confounding, since the interpretation of a factor depends on each.
