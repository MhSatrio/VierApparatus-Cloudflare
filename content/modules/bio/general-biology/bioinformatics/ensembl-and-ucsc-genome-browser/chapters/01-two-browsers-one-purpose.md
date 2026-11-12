---
title: "Two Browsers, One Purpose"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the Ensembl and UCSC genome browsers differ in their content, their emphasis and their typical users, how each is organised around releases and assemblies, and how a researcher chooses between them for a particular question about a gene, a region or a set of species."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the main differences in content and emphasis between the Ensembl and UCSC genome browsers."
  - "Choose one of the two browsers for a given question and state the reason for the choice."
references:
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
  - "Kent, W. J., Sugnet, C. W., Furey, T. S., Roskin, K. M., Pringle, T. H., Zahler, A. M., & Haussler, D. (2002). The human genome browser at UCSC. Genome Research, 12(6), 996-1006. https://doi.org/10.1101/gr.229102"
---

The Ensembl and UCSC browsers answer related questions in different ways. Cunningham et al. (2022) describe Ensembl as an annotation resource that builds and maintains gene models for many species, so its strength is the detail of the gene structure, the transcripts and the variation attached to them. Kent et al. (2002) describe the UCSC Genome Browser as a tool for displaying the genome with many tracks side by side, which makes it strong for comparing features across the genome and across species.

The difference shows in how a question is answered. A researcher who wants every transcript of a gene and the variants that fall within it will find the Ensembl view the more complete. A researcher who wants to see a conserved element, a chromatin mark and a set of experimental tracks over the same region will find the UCSC view better suited, since it puts many tracks into one display.

Both browsers are organised around releases and assemblies. A release is an annotation of a genome at a particular date, and an assembly is the sequence to which the annotation refers. Gene identifiers and coordinates change between releases, so the release is part of the answer, not a detail to be left out.

The choice is not exclusive. Many analyses begin in one browser and finish in the other, and the coordinates and identifiers must be reconciled when they do. The second chapter describes how a region is navigated, and the later chapters show how results are transferred between them.
