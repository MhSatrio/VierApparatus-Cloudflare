---
title: "Ab Initio Gene Prediction"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How genes are predicted from the genome sequence alone using hidden Markov models of gene structure, the states that model exons, introns, start and stop signals and intergenic regions, the training of the model on known genes, the intron submodel introduced by Stanke and Waack that improves the prediction of splice boundaries and the limits of prediction without experimental evidence."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the states of a gene-prediction hidden Markov model and what each state represents."
  - "Explain why an ab initio prediction needs training data from the species and why its results must be checked against evidence."
references:
  - "Stanke, M., & Waack, S. (2003). Gene prediction with a hidden Markov model and a new intron submodel. Bioinformatics, 19(Suppl. 2), ii215-ii225. https://doi.org/10.1093/bioinformatics/btg1080"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

An ab initio gene predictor finds genes from the sequence alone, using a statistical model of what genes look like. A hidden Markov model describes a process that moves through a sequence of hidden states, such as exon, intron, intergenic region and the signals at the boundaries, and emits the bases observed in each state. The most probable path through the states is the predicted gene structure. Stanke and Waack (2003) describe such a model, and their work adds a submodel for introns that improves the prediction of where exons begin and end.

The model is trained on a set of known genes from the species or a related one. The training estimates the probabilities of each state, the typical length of an exon, the composition of the regions around a splice site and the frequency of each codon. A model trained on a distant species predicts poorly, because the signals that mark a gene in one organism differ in another. The training set is therefore a key input, and its origin must be recorded.

The intron submodel matters because the splice sites are weak signals in many genomes. A model that treats introns as a single undifferentiated state misplaces exon boundaries, and a model that describes the intron structure explicitly finds the correct boundaries more often. Stanke and Waack (2003) showed this improvement on the test genes they used, and the value of the model depends on the species it was trained for.

The prediction is only a hypothesis. An ab initio model can produce a gene that does not exist, miss a gene that is unusually shaped or split a gene into two. Without evidence from transcripts or proteins, the predicted structure cannot be confirmed, and the annotation should label such genes as predictions.

Taschuk and Wilson (2017) recommended that research software be tested on inputs whose answers are known. A predictor should be tested on a set of genes with known structures from the species before its results are trusted, and the test should be reported with the training data used.
