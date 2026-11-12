---
title: "Biological Databases"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The databases that store and organise biological knowledge, including the sequence archives GenBank and its partners, the genome browsers and annotation resources such as Ensembl, the protein knowledgebase UniProt and the Protein Data Bank of structures, together with the identifiers, versions and cross-references that link them, the quality and curation of their records and the principles of data sharing and access."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the main biological databases, what each stores and how a researcher finds a record in each."
  - "Explain why database identifiers, versions and cross-references must be recorded with an analysis for it to be reproducible."
references:
  - "Benson, D. A., Cavanaugh, M., Clark, K., Karsch-Mizrachi, I., Lipman, D. J., Ostell, J., & Sayers, E. W. (2012). GenBank. Nucleic Acids Research, 41(D1), D36-D42. https://doi.org/10.1093/nar/gks1195"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

Biological knowledge is stored in databases. The sequences of organisms, the annotations that say what the genes do, the structures of proteins and the experimental results that support them are each held in archives maintained by consortia and institutes, and every bioinformatic analysis draws on one or more of them. Knowing what each database contains, how its records are organised and how far its contents can be trusted is therefore a basic part of the field.

The topic describes the principal resources. The sequence archive GenBank, maintained with its international partners, holds the nucleotide sequences submitted by researchers, and Benson et al. (2012) describe its contents and organisation. Ensembl, described by Cunningham et al. (2022), provides annotated genomes and their genes, transcripts and variants for many species. UniProt collects protein sequences with their functional annotations, and the Protein Data Bank archives the three-dimensional structures of biological macromolecules, as Berman (2000) described.

Records are linked by identifiers, and an analysis that uses several databases depends on those links being correct. A gene may have one identifier in a genome database and another in a protein database, and the mapping between them changes as the annotations are revised. Records are also versioned, so that the same identifier may refer to a sequence that has been corrected. The version and the identifier mapping must be recorded with the analysis.

The quality of database records varies. Some entries are curated by experts, and others are generated automatically and not reviewed. The source of each record, which is shown in its annotation, indicates how far it can be relied upon, and a result that rests on automatically generated annotations should say so.

Wilkinson et al. (2016) set out the FAIR principles, which ask that data resources be findable, accessible, interoperable and reusable, and these principles provide the standard by which the databases and the analyses that use them should be judged.
