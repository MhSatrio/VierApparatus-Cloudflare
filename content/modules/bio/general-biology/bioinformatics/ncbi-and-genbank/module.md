---
title: "NCBI and GenBank"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The practical use of the National Center for Biotechnology Information and its GenBank archive, covering the Entrez search system and its query syntax, the anatomy of a record in practice, accession and version numbers, programmatic retrieval of sequences, the NCBI Taxonomy and the links between NCBI databases, together with the rules for recording exactly which records an analysis used."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Find and retrieve a set of nucleotide records from NCBI using Entrez queries, and check that the records are the ones intended."
  - "Record the accession and version of every sequence used in an analysis so that the analysis can be repeated."
references:
  - "Sayers, E. W., Bolton, E. E., Brister, J. R., Canese, K., Chan, J., Comeau, D. C., Connor, R., Funk, K., Kelly, C., Kim, S., Madej, T., Marchler-Bauer, A., Lanczycki, C., Lathrop, S., Lu, Z., Thibaud-Nissen, F., Murphy, T., Phan, L., Skripchenko, Y., . . . Sherry, S. T. (2022). Database resources of the National Center for Biotechnology Information. Nucleic Acids Research, 50(D1), D20-D26. https://doi.org/10.1093/nar/gkab1112"
  - "Benson, D. A., Cavanaugh, M., Clark, K., Karsch-Mizrachi, I., Lipman, D. J., Ostell, J., & Sayers, E. W. (2012). GenBank. Nucleic Acids Research, 41(D1), D36-D42. https://doi.org/10.1093/nar/gks1195"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

The National Center for Biotechnology Information, or NCBI, hosts a family of databases that a bioinformatician uses almost daily. GenBank is its nucleotide sequence archive, and the other resources cover proteins, genomes, taxonomy, literature and the sequence-similarity tools. This topic is the practical companion to the biological databases topic. It shows how to find records, read them, retrieve them in bulk and record them so that another person can reach the same data.

The chapters follow the order of a typical task. They begin with the NCBI resources as a whole and the Entrez search system. They then move to the anatomy of a record, the meaning of accession and version numbers, and the retrieval of many sequences by program. The taxonomy database and the cross-links between records are covered next, and the final chapter sets out what an analysis must record about the NCBI data it used.

The topic does not repeat the general description of the databases in the biological databases topic. Its purpose is to make a search reproducible, from the first query to the list of accession numbers in a methods section.
