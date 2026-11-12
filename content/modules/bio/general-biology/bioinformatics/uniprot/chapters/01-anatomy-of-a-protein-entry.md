---
title: "Anatomy of a Protein Entry"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The sections of a UniProt protein entry, including the accession, the entry name, the protein and gene names, the organism, the sequence with its length and checksum, the function and subcellular location annotation, the features such as domains and binding sites and the cross-references to other databases, and how each section is read in practice."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the accession, the organism, the sequence and the function annotation in a UniProt entry."
  - "Explain the difference between the accession and the entry name and which of them to record."
references:
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A UniProt entry is a structured record for one protein. Its top section gives the accession, a stable identifier of six or ten characters, and the entry name, a readable form that is less stable. The protein name and the gene names follow, with the organism and its taxonomic identifier. The UniProt Consortium (2023) describes these fields as the core of the record, and the accession is the identifier that should be recorded for any analysis.

The sequence section holds the amino acid sequence with its length and a checksum. The checksum is a short value computed from the sequence, and it changes if the sequence changes. A dataset that records the checksum can detect a sequence that has been revised without a change of accession, which is a useful check when a protein sequence is used across several years of work.

The function section states what the protein does, where it is located in the cell and in which processes it takes part. Each statement carries evidence, and the evidence is what separates a claim from a guess. Alberts et al. (2022) describe the cellular roles that such statements summarise, and a function written as a fact may rest on a single experiment or on the similarity to another protein.

The features section lists domains, binding sites, active sites and regions of interest, each with its position in the sequence. Positions in this section refer to the canonical sequence, so a feature must be checked against the isoform that the analysis uses.

Cross-references list the entries in other databases that describe the same protein. They are the links through which a UniProt entry is connected to structure, pathway and disease resources, and they are the subject of a later chapter.
