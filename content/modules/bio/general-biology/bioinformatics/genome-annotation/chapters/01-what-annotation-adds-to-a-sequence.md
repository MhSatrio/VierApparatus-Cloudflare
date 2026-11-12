---
title: "What Annotation Adds to a Sequence"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What genome annotation adds to a bare assembled sequence, including the positions of genes and their exons and introns, the transcripts and their start and end points, the regulatory and non-coding elements, and the functional labels attached to predicted proteins, and the distinction between structural annotation that describes where features lie and functional annotation that describes what they do."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish structural annotation from functional annotation and give an example of each for a predicted gene."
  - "List the features a complete annotation of a eukaryotic genome is expected to contain."
references:
  - "Stanke, M., & Waack, S. (2003). Gene prediction with a hidden Markov model and a new intron submodel. Bioinformatics, 19(Suppl. 2), ii215-ii225. https://doi.org/10.1093/bioinformatics/btg1080"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A sequence tells a reader its letters and nothing more. Annotation tells the reader where the genes are, how each is built from exons and introns, and what the encoded proteins are thought to do. Structural annotation gives the positions: the start and end of each gene, the boundaries of its exons, and the start codon and stop codon of each coding region. Stanke and Waack (2003) describe a method for predicting these structures from sequence, and the predicted structure is the first layer of an annotation.

Functional annotation gives the meaning of the structure. It assigns a name, a function or a process to a predicted protein, usually by comparison with proteins whose function has been determined elsewhere. The two kinds of annotation are independent. A gene can have a correct structure with no known function, or a known function assigned to a structure that is slightly wrong. The distinction matters because the reliability of the two layers differs.

A complete annotation of a eukaryotic genome includes the protein-coding genes with their transcripts, the untranslated regions, the non-coding RNA genes and the regulatory elements where they can be found. Alberts et al. (2022) describe the features that such a catalogue must capture, and each feature type has its own method of prediction and its own level of confidence.

The annotation is therefore a layered description, and each layer has its own evidence. A reader should ask which layer a claim belongs to before judging it. A statement that a gene is expressed in a tissue depends on transcript evidence, while a statement that a gene encodes a particular enzyme depends on functional similarity.

Sandve et al. (2013) recommended that the sources of each claim in an analysis be recorded, and annotation layers are the claims that most need this record.
