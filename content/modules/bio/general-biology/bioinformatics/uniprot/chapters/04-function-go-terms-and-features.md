---
title: "Function, GO Terms and Features"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the function, subcellular location and Gene Ontology terms of a UniProt entry are read and used, the difference between a function described in words and a structured term, the features that mark domains and sites on the sequence, the evidence codes that accompany each statement and the risk of treating a term as more certain than its evidence allows."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Read the function, location and GO terms of an entry and identify the evidence behind each."
  - "Use a feature such as a domain or an active site to locate a region of a protein and state its position in the canonical sequence."
references:
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

The function of a UniProt entry is written in two forms. The first is a short paragraph in plain language, which describes what the protein does, where it acts and which pathway it belongs to. The second is a set of structured terms, including the Gene Ontology terms for molecular function, biological process and cellular component. The UniProt Consortium (2023) describes the annotation in both forms, and the structured terms make the entries searchable and comparable.

The terms and the paragraph carry evidence codes. An evidence code shows whether a statement comes from an experiment in the literature, from a similarity to a protein whose function is known, or from an automatic method. The code is the key to judging a statement, and a term based only on sequence similarity is a hypothesis about the protein. Alberts et al. (2022) describe the experimental work through which many cellular functions were established, and the evidence code points back to that kind of work.

Features mark the parts of the sequence. A domain is a region that folds independently and carries out a function, and an active site or a binding site is a set of residues that acts on a ligand. The features are given by position, and the position refers to the canonical sequence of the entry, which is the default isoform. An analysis that uses a feature for another isoform must map the position to that isoform first.

A structured term is not more certain than its evidence. A protein may carry a term that was assigned by inference from a relative, and a list of terms from many proteins can give an impression of a shared function that rests on a single source. Counting the same term across many records can make a shared annotation look better supported than the number of independent observations behind it, so the count should be made on independent sources.

For an analysis, the practical steps are to record the terms with their evidence, to report the features on the canonical sequence and to state where a function is inferred rather than shown.
