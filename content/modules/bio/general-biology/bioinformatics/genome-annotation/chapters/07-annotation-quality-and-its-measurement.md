---
title: "Annotation Quality and Its Measurement"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the quality of a genome annotation is measured, including the proportion of genes supported by transcript and protein evidence, the completeness of the gene set judged against conserved genes, the consistency of gene models and the accuracy of predicted structures tested against reference genes, and the limits of each measure, since an annotation can contain many well-supported genes and still miss or merge others."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Measure the evidence support and the completeness of a genome annotation and state what each measure does and does not show."
  - "Test the accuracy of gene models against a set of reference genes and report the result with its limits."
references:
  - "Haas, B. J., Salzberg, S. L., Zhu, W., Pertea, M., Allen, J. E., Orvis, J., White, O., Buell, C. R., & Wortman, J. R. (2008). Automated eukaryotic gene structure annotation using EVidenceModeler and the Program to Assemble Spliced Alignments. Genome Biology, 9(1), R7. https://doi.org/10.1186/gb-2008-9-1-r7"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The quality of an annotation has several dimensions, and each is measured differently. The first is evidence support: the proportion of gene models that are supported by transcripts or proteins. A high proportion means that most of the predicted genes have independent support, although a model can be supported and still be wrong at its ends. Haas et al. (2008) describe the evidence-based pipeline in which support is recorded for each model, and the proportion is a direct output of that process.

The second dimension is completeness. A set of genes that are expected to be present in almost every genome of a given group can be searched for in the annotation, and the fraction found indicates how complete the gene set is. A gene missing from the annotation may be absent from the genome, may be unannotated or may be merged into a neighbour, and the measure does not say which. The completeness must therefore be read with the known biology of the group.

The third dimension is the accuracy of the structures. Where a reference set of genes with confirmed structures exists, the predicted models can be compared with them, and the agreement at the level of exons and of whole genes is a measure of accuracy. Taschuk and Wilson (2017) recommended that research software be tested against known inputs, and a comparison with a reference set is that kind of test.

Each measure has limits. A high evidence support can coexist with many merged or split genes, and a high completeness can hide a set of genes that are present but badly structured. Sandve et al. (2013) recommended that the measures of an analysis be reported with the methods that computed them, so that another group can compute them on the same annotation.

The honest report gives all three measures and states what each one cannot show. A single score of annotation quality would hide these differences, and a reader needs the components.
