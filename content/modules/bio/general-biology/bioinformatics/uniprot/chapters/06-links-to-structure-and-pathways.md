---
title: "Links to Structure and Pathways"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How UniProt entries are linked to structure records in the Protein Data Bank and to predicted structure models, how the cross-references to pathway and disease resources are read, how a structure is checked against the sequence of the entry it is linked to and how a linked structure may describe only part of a protein or a related protein."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Follow a UniProt cross-reference to a structure record and check whether the structure covers the region of interest."
  - "Explain why a linked structure may describe a fragment or a homologue and how this affects its use."
references:
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A UniProt entry carries cross-references to the databases that hold its structures, its pathways and its disease associations. The structure links are the most useful for a structural analysis, since they connect a sequence to coordinates. The UniProt Consortium (2023) describes these cross-references as part of the entry, and they are followed from the entry to the record in the other database.

Berman (2000) describes the Protein Data Bank that holds the experimental structures to which these links point. A structure in the archive may cover all of the protein, a single domain or a complex, and the link does not always say which. The region covered by the structure must be checked against the region of interest before the structure is used to draw a conclusion about it.

Predicted structures are linked in the same way. Jumper et al. (2021) describe a method that predicts structures from sequence, and the predicted model covers the full chain but carries a per-residue confidence that varies along the sequence. A region with low confidence is not a determined structure, and a conclusion drawn from it needs to be qualified.

A link may also be to a homologue, which is a protein of another species or of another family with a similar sequence. A structure of a homologue can guide the analysis of the protein of interest, but the two proteins may differ in the residues that matter, and the sequence identity between them should be reported.

Pathway and disease cross-references are followed in the same way. Each link is an association, and an association is a hypothesis about the protein's role until the source is examined. The check is to read the record at the other end of the link and confirm that it describes the same protein.

Sandve et al. (2013) recommended that the sources of an analysis be recorded, and the linked structure with its identifier and the region it covers is one of those sources.
