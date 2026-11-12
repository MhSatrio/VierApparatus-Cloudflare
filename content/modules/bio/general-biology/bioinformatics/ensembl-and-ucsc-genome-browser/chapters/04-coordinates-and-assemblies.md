---
title: "Coordinates and Assemblies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How genomic coordinates are defined by an assembly and a coordinate system, the difference between zero-based and one-based positions and between closed and half-open intervals, how the same locus has different coordinates in different assemblies and how mixing assemblies silently moves features by large distances."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a coordinate is meaningful only with the assembly and the coordinate convention that define it."
  - "Identify the coordinate convention of a file and convert it correctly when combining it with a file that uses another convention."
references:
  - "Kent, W. J., Sugnet, C. W., Furey, T. S., Roskin, K. M., Pringle, T. H., Zahler, A. M., & Haussler, D. (2002). The human genome browser at UCSC. Genome Research, 12(6), 996-1006. https://doi.org/10.1101/gr.229102"
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A genomic coordinate is a position on a chromosome, and it means something only in relation to the assembly that defines the chromosome. An assembly is a version of the genome sequence, and each new assembly may insert or delete sequence, so the same gene can occupy different coordinates in two assemblies. Kent et al. (2002) describe the UCSC browser's use of assemblies to display the genome, and Cunningham et al. (2022) describe the same concept in Ensembl, where each release is tied to an assembly.

Two conventions cause frequent errors. In some formats the first base of a chromosome is numbered 0, and in others it is numbered 1, so a position read in one format is off by one in another. Intervals have a similar difference: a closed interval includes both its ends, while a half-open interval includes the start and excludes the end. A feature that is correct in one convention can be wrong by one base in the other, which matters for primer design and for the boundaries of exons.

The effect of mixing assemblies is much larger than an off-by-one error. Where an assembly has an insertion of many kilobases upstream of a gene, every coordinate downstream of the insertion shifts by that amount. A list of variants from one assembly placed onto another without conversion will appear at the wrong gene, and the error may not be noticed because the positions are still valid numbers on the chromosome.

The defence is to record the assembly and the coordinate convention with every file, to check that all files in an analysis use the same assembly and to convert where they do not. Sandve et al. (2013) recommended recording the inputs to an analysis precisely, and the assembly is the most important input for coordinates.
