---
title: "Converting Between Assemblies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How features are moved from one genome assembly to another using chain files and the liftOver approach, why some features cannot be mapped and are dropped, the use of minimum match thresholds, how the unmapped features are reported and why a converted dataset must be checked against the original gene annotations before it is combined with other data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Convert a set of genomic intervals from one assembly to another and report the features that could not be mapped."
  - "Explain why a converted interval can be correct in position but wrong in its biological meaning, and how to check it."
references:
  - "Kent, W. J., Sugnet, C. W., Furey, T. S., Roskin, K. M., Pringle, T. H., Zahler, A. M., & Haussler, D. (2002). The human genome browser at UCSC. Genome Research, 12(6), 996-1006. https://doi.org/10.1101/gr.229102"
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Converting coordinates between assemblies uses an alignment of the two genomes. A chain file records the blocks of sequence that align between the old and new assembly, and a conversion tool maps each interval of the input onto the new assembly through these blocks. The UCSC Genome Browser, described by Kent et al. (2002), is built on assemblies that are related in this way, and the same idea underlies the conversion of features between releases.

Not every interval maps. An interval that falls in a region deleted from the new assembly, or in a region that has no alignment, is unmapped, and the tool reports it rather than inventing a position. A minimum match threshold sets how much of an interval must map for the conversion to be accepted. An interval that maps only partly may be placed in the wrong place, so the threshold should be set high enough to reject partial matches.

The unmapped features must be reported. A converted dataset with silently dropped features is biased toward the regions that are well conserved between assemblies, and the bias may be large in a region with rearrangements. The count of input and output intervals should be recorded, together with a list of the features that failed to map and the reason.

A converted position can be correct and still wrong for the biology. An exon may map to the right place while the gene model at the new assembly has a different structure, so the converted interval overlaps a different exon. Cunningham et al. (2022) describe the gene models that are maintained for each release, and the converted features should be compared with the models of the target release before they are used.

Sandve et al. (2013) recommended recording the steps of a data transformation, and the conversion tool, its chain file and its threshold are the steps that must be recorded for a converted dataset to be repeated.
