---
title: "Protein Databases: UniProt and the PDB"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the protein knowledgebase UniProt combines reviewed and unreviewed protein records with their functional annotation, how the Protein Data Bank archives experimentally determined three-dimensional structures with their experimental details and quality indicators, how the two resources are linked by cross-references and how the choice of record affects the conclusions drawn from a protein analysis."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the difference between a reviewed and an unreviewed UniProt record and the consequence for an analysis that uses them."
  - "Describe what a Protein Data Bank entry records about a structure and how its experimental details affect the reliability of the coordinates."
references:
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
---

UniProt is the central resource for protein sequences and their functions. Each record holds a protein sequence with information on its name, its organism, its domains, its functional roles and its links to other databases. The UniProt Consortium (2023) describes the knowledgebase and its two parts: a reviewed section, in which records are curated by experts and checked against the literature, and an unreviewed section, which contains records generated automatically from the sequence archives. The reviewed records are more reliable, and an analysis should state which part it used.

The Protein Data Bank archives the three-dimensional structures of proteins, nucleic acids and their complexes. Berman (2000) described the archive, which holds the coordinates of each structure determined by experimental methods such as X-ray crystallography and nuclear magnetic resonance, together with information on how the structure was determined. Each entry carries indicators of its resolution and quality, and these determine how far the detail of the model can be trusted, as the structural methods topics explain.

The two resources are linked, so that a protein sequence can be connected to the structures of the same protein. The link is a cross-reference, and it may connect a sequence to a structure of only part of the protein or of a homologous protein from another species. A structure of a related protein is a model of the query protein only where the sequences are similar, and the alignment of the sequences must be checked before the structure is used.

Structure prediction has added a third source. Jumper et al. (2021) described AlphaFold, which predicts a structure from a sequence, and its predictions are archived alongside the experimental structures. A predicted structure carries a confidence measure for each residue, and a region of low confidence should not be interpreted as a determined structure.

The choice of record affects the conclusions. A function taken from an unreviewed record, or a structure from a homologue, may be correct, but the analysis must make clear the source of the claim and its level of support.
