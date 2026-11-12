---
title: "Functional Annotation by Homology"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the predicted proteins of a genome receive functional names by homology, through similarity searches against curated protein databases, the transfer of function from a characterised relative, the thresholds that decide when a transfer is acceptable, the propagation of errors when annotations are copied from one protein to the next and the practice of recording the evidence for each assigned function."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Assign a functional name to a predicted protein by a homology search and state the threshold and the evidence used."
  - "Explain how an error in one annotation can spread to many proteins and how the transfer of function is recorded to limit this."
references:
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Functional annotation assigns a name to each predicted protein, and the usual means is homology: the protein is compared with a database of characterised proteins, and the function of the best match is transferred to it. The UniProt Consortium (2023) describes a curated knowledgebase of this kind, and the search itself is the local similarity search of Altschul et al. (1990). A predicted protein that resembles a well-studied enzyme receives the enzyme's name, and the transfer is the claim that the two proteins do the same job.

The transfer is valid only for close homologues. A high similarity over the full length of two proteins is good evidence that they share a function, while a match over a short domain may transfer only the function of that domain. The threshold for accepting a transfer, including the minimum identity and the coverage of the query, must be stated, since a lenient threshold transfers functions to proteins that do not share them.

Errors spread. A function that was wrongly assigned to one protein can be copied to every protein that matches it, and the copies carry the error into the annotations of other genomes. Alberts et al. (2022) describe how protein families evolve different functions, and a family member can be wrongly named by transfer from a relative that differs in the relevant residues. The error is hard to detect because it appears as many agreeing annotations.

The defence is to record the evidence for each name. A transferred name should state the source protein, the identity, the coverage and the threshold, so that a user can see whether the transfer rests on a close relative or a distant one. A name without its evidence cannot be re-examined when the source is later corrected.

Sandve et al. (2013) recommended that the sources of each result be recorded, and the evidence attached to each functional name is the record that makes the annotation checkable.
