---
title: "Validating a Structure Before Use"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The checks an analyst should make before a PDB structure is used for a conclusion, including the match between the entry sequence and the protein of interest, the completeness of the chain, the geometry and the validation report, the agreement of the model with the experimental data and the comparison with other entries of the same protein, with the practical order in which the checks are made."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Confirm that the sequence of a PDB entry matches the protein of interest, including any mutations or tags."
  - "Work through a short validation checklist for a structure before using it in an analysis."
references:
  - "Brünger, A. T. (1992). Free R value: A novel statistical quantity for assessing the accuracy of crystal structures. Nature, 355(6359), 472-475. https://doi.org/10.1038/355472a0"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A structure should be checked before it is used, because a structure that is correct for one question can be wrong for another. The first check is the sequence. The entry carries the sequence of each chain, and this must match the protein of interest. A construct may carry a mutation, a tag or a truncation, and the residues of the analysis must be mapped to the residues of the entry before a conclusion is drawn. A residue number that is correct in the protein may be offset in the entry.

The second check is completeness. The chain should cover the region of interest, and the missing residues should lie outside it. A structure that lacks the loop containing the site of interest is not a structure of that site, however good its resolution. The third check is the validation report, which summarises the geometry of the model and the fit to the data. The report flags residues with unusual conformations, and a flagged residue in the region of interest must be treated with caution.

The fourth check is the agreement with the data. The indicators of the previous chapter, the resolution and the free R value, show whether the model is supported, and a structure that fits its data poorly should not be the basis of a conclusion. Berman (2000) describes the quality information that the archive records for each entry, and this information is the means of making the check.

The fifth check is comparison. Where several entries of the same protein exist, the analyst can compare them, and a feature that appears in all of them is more secure than one that appears in only one. Platt (1964) recommended comparisons that could exclude alternatives, and a set of structures that agree is stronger evidence than a single entry.

The checks are recorded in a short list: the entry, the sequence match, the coverage, the validation result, the data fit and the comparison. Sandve et al. (2013) recommended that the decisions in an analysis be recorded, and this list is the record of the structure's suitability.
