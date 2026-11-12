---
title: "Searching and Selecting Structures"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How to search the Protein Data Bank for the structures of a protein, how to narrow the results by method, resolution, organism and ligand, how to compare the candidate entries by the region they cover and the quality of their models and how the chosen structure is recorded so that the selection can be repeated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Search the archive for the structures of a protein and narrow the results by method and resolution."
  - "Choose among several entries of the same protein by the region covered, the ligand bound and the quality of the model."
references:
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A protein often has many entries in the archive. Each is a different experiment: a different construct, a different ligand, a different crystal form or a different mutant. The search finds all of them, and the first task is to narrow the list to the entries that answer the question. Berman (2000) describes the archive that the search runs against, and the entries differ in their content in ways that the search fields make visible.

The useful filters are the method, the resolution and the organism. A question about the atomic detail of a binding site requires a method and a resolution that resolve the site, and a question about the protein of a particular species requires the entries from that species. The filters combine, and each one removes entries that cannot answer the question, so the order of the filters is less important than their logic.

Among the entries that remain, the choice depends on three properties. The first is the region covered, since an entry that contains the domain of interest is more useful than one that contains only a neighbouring domain. The second is the ligand, since a structure with a bound inhibitor shows a different state from an unliganded one. The third is the quality of the model, which the next chapter treats in detail.

Platt (1964) recommended that comparisons be designed so that they discriminate between alternatives. Two structures of the same protein that differ in a ligand give such a comparison, and choosing the entry for a question is a decision that should be justified against the alternatives, not made by taking the first result.

The selection must be recorded. The PDB ID, the chain used, the region covered and the reason for the choice belong in the methods, and Sandve et al. (2013) recommended that such decisions be recorded so that they can be checked.
