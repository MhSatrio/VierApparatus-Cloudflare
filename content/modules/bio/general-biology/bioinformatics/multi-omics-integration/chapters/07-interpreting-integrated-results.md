---
title: "Interpreting Integrated Results"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the results of a multi-omics integration are interpreted biologically, including the translation of shared factors and modules into processes, the use of pathway and enrichment analyses across layers, the consistency of a finding across independent layers as evidence for it, the danger of a narrative that fits any pattern, and the discipline of testing an integrated interpretation against data it was not built from."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Translate an integrated factor or module into a biological process and state the evidence that supports the translation."
  - "Explain why a finding supported by several independent layers is stronger than one supported by a single layer and why a narrative can fit any pattern."
references:
  - "Hasin, Y., Seldin, M., & Lusis, A. (2017). Multi-omics approaches to disease. Genome Biology, 18(1), 83. https://doi.org/10.1186/s13059-017-1215-1"
  - "Aebersold, R., & Mann, M. (2016). Mass-spectrometric exploration of proteome structure and function. Nature, 537(7620), 347-355. https://doi.org/10.1038/nature19949"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An integrated analysis ends with a factor, a module or a set of linked features that must be interpreted. The step from a statistical object to a biological process is a judgement, and it is the step most prone to overreach. A factor loaded on genes and proteins of one pathway can be named after that pathway, but the naming is a hypothesis about what drives the factor, and the factor may equally reflect a technical source or a process that spans several pathways. Hasin et al. (2017) emphasise that the biological interpretation of integrated results requires evidence beyond the statistics.

Consistency across layers is one source of evidence. A process that is supported by changes in the transcriptome, the proteome and the metabolome is more credible than one visible in a single layer, since the chance that independent measurements agree by accident is low. Aebersold and Mann (2016) describe the proteomic measurements on which such consistency depends, and the agreement across layers is a stronger claim than any single layer can make.

The interpretation must be tested. Enrichment analyses that place the features of a factor in pathways must be corrected for the number of pathways examined, and the claim that a pathway drives the factor must be tested against the alternatives. Ioannidis (2005) described how the freedom to choose an interpretation after seeing the results produces findings that do not hold, and the interpretation should be fixed in advance where possible.

A narrative can fit almost any pattern. A reader can construct a plausible story for a factor, a module or a set of changes, and the story may be wrong. Platt (1964) recommended that an explanation be framed so that a test can exclude the alternatives, and a biological interpretation should specify the observation that would contradict it.

Sandve et al. (2013) recommended recording the interpretation together with the analysis that produced it, and the test that supports or contradicts the interpretation is part of that record.
