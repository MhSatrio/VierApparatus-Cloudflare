---
title: "Marker Genes and Cell Identity"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the identity of a cell type is established from its marker genes in single-cell data, the use of curated marker lists, the validation of a marker by independent measurements such as in situ hybridisation or protein staining, the problem of markers that are shared between types and the reporting of the markers that support each identity assignment."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Assign an identity to a cluster from its marker genes and state the marker set that supports the assignment."
  - "Explain why a marker shared between cell types cannot establish identity alone and what independent evidence is needed."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Stuart, T., Butler, A., Hoffman, P., Hafemeister, C., Papalexi, E., Mauck, W. M., Hao, Y., Stoeckius, M., Smibert, P., & Satija, R. (2019). Comprehensive Integration of Single-Cell Data. Cell, 177(7), 1888-1902. https://doi.org/10.1016/j.cell.2019.05.031"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A cluster becomes a cell type when it is given an identity, and the identity is usually based on marker genes that are known to characterise a type. Alberts et al. (2022) describe the genes that define the main cell types of tissues, and these knowledge bases provide the markers against which a cluster is compared. The identity is the most consequential label in a single-cell study, since it determines what the rest of the paper says about the tissue, and it deserves the most careful evidence.

Markers are not always specific. A gene that marks one type in one tissue may be expressed in several types, or in a different type in another tissue, and a cluster identified by such a gene is ambiguous. The strongest identity rests on a combination of markers, chosen so that each type is distinguished from the others, and the set of markers should be reported with the identity.

Independent validation is the strongest evidence. A marker can be checked by a method that does not depend on the sequencing, such as in situ hybridisation, which shows where a transcript lies in the tissue, or protein staining, which shows the cells that carry a protein. Stuart et al. (2019) show how single-cell data can be matched to reference datasets, and a reference match is a form of evidence, although it inherits the reference's assumptions.

The identity should be tested against its alternatives. Platt (1964) recommended framing a test so that it excludes competing explanations, and a cluster named as one type should be compared with the possibility that it is another type, a state of a type or a doublet. A marker profile that fits several explanations equally well does not establish the identity.

Sandve et al. (2013) recommended that the evidence for each claim be recorded. The markers that support each identity, and the independent evidence where it exists, belong in the report.
