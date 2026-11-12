---
title: "Ensembl and UCSC Genome Browser"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The practical use of the two principal genome browsers, Ensembl and the UCSC Genome Browser, covering how a genomic region is navigated and its tracks read, how genes, transcripts and variants are found, how bulk queries are made with BioMart and the table tools, how coordinates and genome assemblies are matched between releases, and how a view is exported as a reproducible record."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Find a gene in Ensembl or the UCSC browser, choose its transcript and read the tracks that describe its structure and variation."
  - "Convert coordinates between genome assemblies and record the assembly and release used for every result."
references:
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
  - "Kent, W. J., Sugnet, C. W., Furey, T. S., Roskin, K. M., Pringle, T. H., Zahler, A. M., & Haussler, D. (2002). The human genome browser at UCSC. Genome Research, 12(6), 996-1006. https://doi.org/10.1101/gr.229102"
  - "Robinson, J. T., Thorvaldsdóttir, H., Winckler, W., Guttman, M., Lander, E. S., Getz, G., & Mesirov, J. P. (2011). Integrative genomics viewer. Nature Biotechnology, 29(1), 24-26. https://doi.org/10.1038/nbt.1754"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

Two genome browsers dominate the work of looking at a genomic region. Ensembl, described by Cunningham et al. (2022), is strongest for the gene models and variation of many species, and the UCSC Genome Browser, described by Kent et al. (2002), is strongest for the comparison of tracks across species and for the wide range of experimental data it displays. Both present a chromosome as a horizontal axis with features arranged in tracks, and the skill of reading one carries over to the other.

The topic covers the everyday tasks. A region is found by a gene name or a coordinate, its tracks are read to see the structure of the gene and the evidence behind it, and the transcripts are compared to choose the one that matches the question. Bulk queries, the export of many features and the conversion of coordinates between assemblies are the tasks that turn a browser view into a dataset.

The chapters also cover the record that a view should leave behind. A figure from a browser depends on the assembly, the release and the tracks that were shown, and a figure without these details cannot be reproduced. Robinson et al. (2011) describe a viewer that shows such tracks alongside experimental reads, and the same care applies to the browsers in this topic.
