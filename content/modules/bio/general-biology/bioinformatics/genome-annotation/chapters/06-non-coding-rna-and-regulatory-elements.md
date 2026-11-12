---
title: "Non-Coding RNA and Regulatory Elements"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How non-coding genes such as transfer and ribosomal RNAs, microRNAs and long non-coding RNAs are annotated, how regulatory elements such as promoters, enhancers and binding sites are predicted and why these features are harder to annotate than protein-coding genes, with the sources of evidence and the cautions needed when a non-coding feature is called from sequence alone."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why non-coding features are harder to annotate than protein-coding genes and name the evidence each class relies on."
  - "State the reasons a predicted regulatory element should be treated as a hypothesis until tested."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Stanke, M., & Waack, S. (2003). Gene prediction with a hidden Markov model and a new intron submodel. Bioinformatics, 19(Suppl. 2), ii215-ii225. https://doi.org/10.1093/bioinformatics/btg1080"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Not every functional element of a genome encodes a protein. Transfer and ribosomal RNA genes, small regulatory RNAs such as microRNAs, and longer non-coding transcripts all carry function without producing a protein. Alberts et al. (2022) describe the classes of RNA and their roles in the cell, and each class must be found and labelled in the annotation. These features are harder to annotate than protein-coding genes, because the signal in their sequence is weaker and their structure is more variable.

Some classes are found by specific models. Transfer RNA genes are identified by their conserved cloverleaf structure, and ribosomal RNA genes by their similarity to known sequences. The structural models are specific to a class, and they are tested against known examples before they are applied to a new genome. The specificity of the model determines how many false genes it produces, which is a parameter that should be reported.

Regulatory elements such as promoters, enhancers and transcription factor binding sites are predicted from sequence motifs and from experimental data such as chromatin accessibility or the binding of a factor. A motif match alone is weak evidence, since short motifs occur by chance many times in a genome. Stanke and Waack (2003) describe a gene model whose signals are learned from data, and a regulatory model is similarly only as good as the data used to train it.

Long non-coding RNAs are the hardest class. Their sequences are often poorly conserved and their boundaries are uncertain, so a catalogue of them is sensitive to the transcript data used to build it. A predicted non-coding gene should be treated as a hypothesis, and its support should be stated.

Ioannidis (2005) described how a result that is selected from many tests can overstate its reliability, and a catalogue of predicted regulatory elements drawn from many motif scans carries the same risk. The number of tests and the threshold should be reported with the catalogue.
