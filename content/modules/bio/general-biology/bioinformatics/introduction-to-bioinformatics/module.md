---
title: "Introduction to Bioinformatics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What bioinformatics is and how it turns biological data into answers, the kinds of data it works with, the common file formats, the core algorithms for comparing sequences and building alignments and phylogenetic trees, and the habits of reproducible analysis that the field requires."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the main types of biological data that bioinformatics analyses and the common file formats that store them."
  - "Explain the principles of pairwise and multiple sequence alignment and how they are used to infer biological relationships."
references:
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
  - "Smith, T., & Waterman, M. (1981). Identification of common molecular subsequences. Journal of Molecular Biology, 147(1), 195-197. https://doi.org/10.1016/0022-2836(81)90087-5"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Edgar, R. C. (2004). MUSCLE: multiple sequence alignment with high accuracy and high throughput. Nucleic Acids Research, 32(5), 1792-1797. https://doi.org/10.1093/nar/gkh340"
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Bioinformatics is the use of computation to answer biological questions. The field grew out of the need to store and compare the sequences of genes and proteins, and it now covers the analysis of genomes, transcriptomes, proteomes, protein structures and biological networks. Its central problem is that the data are large, noisy and indirect, so that a biological conclusion depends on the algorithm, the parameters and the quality of the input, and each of these must be understood before the result is trusted.

The topic introduces the core ideas that the rest of the bioinformatics modules use. It covers the types of biological data and the formats in which they are stored, the algorithms for aligning sequences, the methods for searching large databases and for building multiple alignments and phylogenetic trees, and the habits of reproducible analysis that make a result checkable by others.

Sequence alignment is the first algorithm to master. Two sequences are compared by finding the arrangement of matches, mismatches and gaps that gives the best score under a scoring scheme, and the global and local forms of the method answer different questions. Searching a database requires faster heuristics, and the statistics that judge whether a match is significant are as important as the search itself.

The chapters also emphasise the limits of computational results. A tool that gives an answer for every input can give a wrong answer with the same confidence, and the choice of method, parameters and data must be reported. Sandve et al. (2013) set out rules for making computational work reproducible, and these rules recur throughout the topic.
