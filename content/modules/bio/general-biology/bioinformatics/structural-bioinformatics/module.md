---
title: "Structural Bioinformatics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The computational analysis of three-dimensional protein structures, covering the comparison of structures by distance-matrix and superposition methods, the classification of structures into folds and families, the construction of comparative models of proteins from related templates, the analysis of structural features such as pockets and interfaces, and the reporting and validation that allow a structural result to be trusted and repeated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare two protein structures by a structure alignment method and state what the similarity score measures."
  - "Build a comparative model of a protein from a related template and state the accuracy the model can claim."
references:
  - "Holm, L., & Sander, C. (1993). Protein structure comparison by alignment of distance matrices. Journal of Molecular Biology, 233(1), 123-138. https://doi.org/10.1006/jmbi.1993.1489"
  - "Zhang, Y. (2005). TM-align: a protein structure alignment algorithm based on the TM-score. Nucleic Acids Research, 33(7), 2302-2309. https://doi.org/10.1093/nar/gki524"
  - "Šali, A., & Blundell, T. L. (1993). Comparative protein modelling by satisfaction of spatial restraints. Journal of Molecular Biology, 234(3), 779-815. https://doi.org/10.1006/jmbi.1993.1626"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Structural bioinformatics works with the three-dimensional shapes of proteins, which are determined by experiment and predicted by computation, and it asks what the shapes reveal about evolution and function. Two proteins with little sequence similarity can share a fold, and their shared shape can show a relationship that the sequences hide. The methods of the topic compare structures, classify them, model unknown structures from known ones and describe the features that matter for function.

The chapters follow these tasks. The comparison of structures by distance matrices and by superposition comes first, with Holm and Sander (1993) describing a method that compares the internal distances of two proteins, and Zhang (2005) describing a score that normalises the comparison by the length of the protein. Comparative modelling, in which the structure of a protein is built from the structure of a related one, follows, with Šali and Blundell (1993) describing the satisfaction of spatial restraints on which it rests.

The structural data come from the Protein Data Bank, described by Berman (2000), and every structural conclusion depends on the quality of the entries used. The final chapters address the validation of structural results and the reporting that lets them be checked, since a structure that is compared or modelled is an inference from data and from methods, and its limits must be stated with it.
