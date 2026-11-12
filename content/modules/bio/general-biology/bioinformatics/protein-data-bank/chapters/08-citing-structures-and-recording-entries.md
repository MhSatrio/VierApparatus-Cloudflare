---
title: "Citing Structures and Recording Entries"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a structure from the Protein Data Bank is cited in a paper, what a record of the structures used in an analysis must contain, including the PDB identifiers, the chains, the regions and the versions of the entries, and how the citation and the record together allow the structure to be retrieved and checked again."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Cite a PDB entry in a paper with its identifier and its primary citation."
  - "Write a record of the structures used in an analysis that another person could use to retrieve the same entries and chains."
references:
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A structure used in a paper is cited in two ways. The first is the identifier of the entry, which is the means by which a reader retrieves it. The second is the primary citation of the structure, which is the publication that reports the experiment, and the entry lists it. Berman (2000) describes the archive in which each entry is deposited with this information, and a citation should give both the identifier and the reference of the structure.

The identifier is a short code, and it is not unique across the whole of biology. It must be read together with the chain or chains used, and a paper that cites only the identifier leaves the reader to guess which chain was meant. The citation should name the chain and, where relevant, the residues analysed.

A record of the structures in an analysis is more detailed than the citation. It lists each entry by its identifier, the chains used, the region covered, the version of the entry at the time of retrieval and the date of retrieval. Wilkinson et al. (2016) set out the FAIR principles, in which data are identified and described so that they can be found again, and this record provides the identification that a structure needs.

The record should also name the decisions taken with each structure: which ligands were kept, which waters were kept and which residues were excluded. These decisions change the result, and Sandve et al. (2013) recommended that the processing of data be recorded so that it can be repeated.

With the citation and the record together, another group can retrieve the same entries, apply the same processing and check the result. A structure reported without these details is a structure the reader must take on trust.
