---
title: "Sequence Archives and GenBank"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How nucleotide sequence archives are organised, the structure of a GenBank record with its locus, definition, accession and features, the difference between an accession number and a version, the search and retrieval of records by identifier and by sequence and the way the archives exchange records to keep their contents synchronised."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the parts of a GenBank record, including its accession, version, definition and feature table."
  - "Explain the difference between an accession number and a version and why an analysis must record the version it used."
references:
  - "Benson, D. A., Cavanaugh, M., Clark, K., Karsch-Mizrachi, I., Lipman, D. J., Ostell, J., & Sayers, E. W. (2012). GenBank. Nucleic Acids Research, 41(D1), D36-D42. https://doi.org/10.1093/nar/gks1195"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A record in the GenBank archive describes one sequence and its associated information. The record begins with a locus line that gives the name, length and molecule type, followed by the definition, which is a short description of the sequence, and the accession, which is the stable identifier of the record. The feature table lists the parts of the sequence that have a biological meaning, such as genes, coding regions and regulatory elements, each with its location and qualifiers, and the sequence itself follows. The archive's documentation describes this structure, and the feature table is the source of most annotation used in analyses. Benson et al. (2012) describe the archive that holds these records.

The accession number identifies a record and remains fixed, whereas the version number records the revision of the sequence. A record may be corrected or extended, and each change creates a new version with the same accession. An analysis that refers only to the accession may therefore use a different sequence from the one that was used earlier, and the version must be recorded for the result to be reproduced.

Records are found by identifier, by keyword in the definition or by sequence similarity. A search by sequence uses the alignment methods of the previous topic, and Altschul et al. (1990) introduced the local alignment approach by which most such searches are made. The search returns records whose sequences are similar to the query, and the user must check whether the matching record is annotated as the gene of interest.

The archives exchange records so that each holds the same data, and a record submitted to one partner appears in the others within a short time. The exchange means that the accession of a record is the same across the archives, which allows an identifier to be used in any of them.

Sandve et al. (2013) recommended that every input to an analysis be identified precisely, and the accession and version of each sequence are the identifiers that satisfy that recommendation.
