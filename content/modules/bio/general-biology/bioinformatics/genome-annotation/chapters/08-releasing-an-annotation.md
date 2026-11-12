---
title: "Releasing an Annotation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a genome annotation is released with a version, a changelog and a stable set of identifiers, the reasons identifiers should persist across releases where the gene models are unchanged, how the release is tied to the assembly it describes, how users are told of changes that affect their analyses and the deposition of the annotation files in a standard format so that others can use and check them."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Assign a version to a genome annotation and describe what a changelog must state for users to judge its effect on their work."
  - "Explain why stable identifiers and a tie to the assembly make an annotation usable across releases."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Haas, B. J., Salzberg, S. L., Zhu, W., Pertea, M., Allen, J. E., Orvis, J., White, O., Buell, C. R., & Wortman, J. R. (2008). Automated eukaryotic gene structure annotation using EVidenceModeler and the Program to Assemble Spliced Alignments. Genome Biology, 9(1), R7. https://doi.org/10.1186/gb-2008-9-1-r7"
---

An annotation is revised as new evidence arrives, and the revisions must be released in a way that users can follow. A release is a dated and numbered state of the annotation, tied to the assembly it describes, and a user who builds an analysis on it needs to know which release was used. The version is the minimum identifier, and it must be stated in every analysis that uses the annotation. Haas et al. (2008) describe a pipeline that is rerun as evidence accumulates, which is why releases form a sequence.

Stable identifiers are the means of carrying a gene through a sequence of releases. A gene model that is unchanged should keep its identifier across releases, and a model that is changed should be given a new one or a clear note of the change. Without stable identifiers, a user cannot tell whether a gene in one release is the same gene in the next, and a list of genes becomes impossible to compare over time.

The changelog states what changed. It lists the genes added, removed and revised, the models whose structure changed, and the identifiers that were retired or merged. A user who relies on one gene can check the changelog to see whether it has been affected, and the changelog is the means of judging whether an earlier result still holds.

The annotation files should be deposited in a standard format, with the sequence and the annotation tied to the assembly version. Wilkinson et al. (2016) set out the FAIR principles, in which a dataset is findable, accessible and reusable with clear identifiers and a description of its provenance, and a versioned, standard-format release meets those principles.

Sandve et al. (2013) recommended that the inputs to an analysis be recorded, and an annotation release with its version and its assembly is the input that a later analysis must cite.
