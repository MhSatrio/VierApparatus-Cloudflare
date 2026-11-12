---
title: "Pairwise Alignment in Practice"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a pairwise alignment is carried out with software in practice, covering the input preparation and the choice of sequence type, the parameter settings and their recording, the inspection of an alignment for regions of low confidence, the output formats that carry an alignment and the checks that confirm the software has aligned the intended sequences."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Prepare two sequences for pairwise alignment and set the parameters of the method so that they are recorded."
  - "Inspect an alignment for regions of low confidence and check that the software aligned the intended sequences."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
---

Pairwise alignment is usually run with software, and the software hides many choices behind its defaults. The first choice is the input. The sequences must be of the same type, either nucleotides or amino acids, and a mixture of the two produces meaningless scores. The second is the method, global or local, which follows from the question. The third is the parameters, the matrix and the gap penalties, and each of these should be set explicitly rather than taken from a default that may change between versions.

The output of an alignment is inspected before it is used. Regions with many gaps, or with columns of mismatches surrounded by identical residues, are regions of low confidence, and the alignment there should not be interpreted. An alignment that places an identical motif in two different positions suggests that the scoring has been ambiguous at that point. The inspection is a reading of the alignment, and it cannot be replaced by the score.

Taschuk and Wilson (2017) recommended that research software be tested on inputs whose answers are known, and an alignment of two sequences with a known relationship is such a test. Two copies of the same sequence should align without gaps, and a sequence aligned with a shuffled copy of itself should show a poor score. These tests confirm that the setup is working before it is applied to the data.

The checks confirm the input. The sequences that enter the alignment should be those intended, which means that their identifiers, lengths and organisms are listed beside the alignment. A sequence that was mislabelled upstream will produce a clean alignment of the wrong protein.

Needleman and Wunsch (1970) defined the optimum that the software finds, and Sandve et al. (2013) recommended that every parameter be recorded so that the alignment can be repeated exactly. The sequences, the method, the matrix, the penalties and the software version make up that record.
