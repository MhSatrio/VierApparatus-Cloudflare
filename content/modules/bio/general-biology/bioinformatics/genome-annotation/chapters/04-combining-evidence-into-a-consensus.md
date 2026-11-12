---
title: "Combining Evidence into a Consensus"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How predictions from several sources are combined into a single consensus gene model, the role of EVidenceModeler in weighting the evidence, the way PASA refines gene structures and updates the annotation with transcript evidence, the handling of conflicts between sources and the reasons the weights assigned to each source must be stated and tested."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how several gene predictions and evidence alignments are combined into one consensus gene model."
  - "Explain how conflicts between sources are resolved and why the weights given to each source must be reported."
references:
  - "Haas, B. J., Salzberg, S. L., Zhu, W., Pertea, M., Allen, J. E., Orvis, J., White, O., Buell, C. R., & Wortman, J. R. (2008). Automated eukaryotic gene structure annotation using EVidenceModeler and the Program to Assemble Spliced Alignments. Genome Biology, 9(1), R7. https://doi.org/10.1186/gb-2008-9-1-r7"
  - "Stanke, M., & Waack, S. (2003). Gene prediction with a hidden Markov model and a new intron submodel. Bioinformatics, 19(Suppl. 2), ii215-ii225. https://doi.org/10.1093/bioinformatics/btg1080"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A genome may be predicted by several tools, and each prediction is supported by a different set of evidence. Combining them into one annotation requires a rule for deciding which structure to keep where predictions disagree. Haas et al. (2008) describe EVidenceModeler, a tool that combines predictions and alignments from several sources by weighting each according to a set of user-defined values, and that produces a single consensus structure for each gene. The weights express how much each source is trusted, and they are the central decision of the combination.

The pipeline also needs a means of refining the structures with transcript evidence. Haas et al. (2008) describe the Program to Assemble Spliced Alignments, which uses the transcript alignments to update the gene models, adding alternative transcripts and correcting the boundaries where the transcripts show them. The updated models are then passed to the combination step, so that the consensus reflects the transcripts that the species actually produces.

Conflicts arise when two sources give different structures for the same region. A predictor may place an exon where a transcript shows that the exon is absent, or two predictions may join the same exons in different ways. The combination resolves each conflict by the weights, and the resolution favours the source with the higher weight. A conflict resolved in favour of a prediction over a transcript is a decision that should be examined.

The weights are assumptions. Stanke and Waack (2003) describe the ab initio prediction whose weight is usually low relative to transcript evidence, but the right balance depends on the quality of the transcripts and the predictor. The weights should be stated and their effect tested by repeating the combination with different values.

Sandve et al. (2013) recommended that the parameters of an analysis be recorded, and the weights, the evidence sets and the version of the pipeline are the parameters of a combined annotation.
