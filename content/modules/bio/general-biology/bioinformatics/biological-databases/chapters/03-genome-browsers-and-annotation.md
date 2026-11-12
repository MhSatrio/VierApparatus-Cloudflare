---
title: "Genome Browsers and Annotation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How genome browsers display the sequence of a chromosome with its annotated genes, transcripts, variants and regulatory features, how the Ensembl annotation pipeline combines evidence to predict and maintain gene models, the difference between the reference annotation of a species and the evidence behind each feature and how annotation releases change the coordinates and identifiers that an analysis depends on."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a genome browser presents a region of a chromosome with its annotated features and how to find a gene and its transcripts."
  - "Explain why an analysis must record the annotation release it used, since coordinates and identifiers change between releases."
references:
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
  - "Robinson, J. T., Thorvaldsdóttir, H., Winckler, W., Guttman, M., Lander, E. S., Getz, G., & Mesirov, J. P. (2011). Integrative genomics viewer. Nature Biotechnology, 29(1), 24-26. https://doi.org/10.1038/nbt.1754"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A genome browser displays a region of a chromosome as a horizontal track, with the sequence at the finest scale and the annotated features arranged above and below it. Genes appear as blocks with their exons and introns, transcripts are shown as variants of the gene model, and variants, regulatory elements and experimental evidence appear as further tracks. Robinson et al. (2011) described the Integrative Genomics Viewer, which displays such tracks alongside the reads of an experiment, and the same principle underlies the browsers that serve the reference genomes.

The Ensembl project maintains the annotation of many genomes. Cunningham et al. (2022) describe how it combines the evidence from sequences of transcripts and proteins, from experimental data and from computational predictions to build the gene models, and how each model is assigned a stable identifier. The evidence behind a model is part of the record, and a model supported by strong experimental data differs in reliability from one predicted without it.

The reference annotation of a species is a set of gene models that is revised over time. Each release of the annotation may change the coordinates of a gene, add or remove transcripts and alter the identifiers of models. A list of genes from one release may not match the coordinates of another, and an analysis that combines data from different releases can silently mismatch them.

The recording of the release is therefore essential. The name and version of the annotation, and the genome assembly to which it refers, must be stated with the result. A change of genome assembly alters every coordinate, so a result given in one assembly cannot be compared with one given in another without conversion.

Sandve et al. (2013) recommended recording the exact versions of the inputs to each analysis, and the annotation release is one of the most important of those inputs.
