---
title: "Causal Relations Across Layers"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How relations between molecular layers are inferred as possible causal links, such as a genetic variant that changes a transcript that changes a protein, the logic of mediation and the use of genetic variants as instruments that separate cause from correlation, the assumptions these inferences require and the cautions that correlation across layers does not establish the direction or the existence of a causal chain without experimental support."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a chain from a genetic variant through a transcript to a protein is tested as a possible causal path."
  - "Explain the assumptions behind using a genetic variant to infer a causal effect and why correlation across layers does not establish direction."
references:
  - "Hasin, Y., Seldin, M., & Lusis, A. (2017). Multi-omics approaches to disease. Genome Biology, 18(1), 83. https://doi.org/10.1186/s13059-017-1215-1"
  - "Ritchie, M. D., Holzinger, E. R., Li, R., Pendergrass, S. A., & Kim, D. (2015). Methods of integrating data to uncover genotype-phenotype interactions. Nature Reviews Genetics, 16(2), 85-97. https://doi.org/10.1038/nrg3868"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A genetic variant that changes the abundance of a transcript, which in turn changes the abundance of a protein, suggests a causal chain. Multi-omics data can test such chains by asking whether the association between the variant and the protein is explained by the transcript, a logic known as mediation. Hasin et al. (2017) discuss this kind of analysis for disease, where the chain from variant to protein to phenotype is the explanation sought. The chain is a hypothesis, since an association can arise from many structures.

Genetic variants are useful because they are fixed at conception and are not caused by the downstream measurements. A variant that is associated with a protein and with no other route to it can be used as an instrument, and the effect of the protein on a disease can be estimated from the variant. The approach rests on assumptions that the variant affects the outcome only through the protein, and these assumptions are hard to verify. A violation, such as a second pathway from the variant, biases the estimate.

Correlation across layers does not establish direction. Two layers that move together may be linked by a common cause, or the causal arrow may run in either direction, so that a protein may alter a transcript rather than the reverse. The data of a single time point cannot always distinguish these, and the direction must be supported by a design that orders the events or by an experiment that manipulates one layer.

Platt (1964) recommended a test that can exclude the alternative explanations, and a causal chain across layers is tested by an experiment that disrupts a step and observes the consequence in the next. Such a test is the strongest evidence, since the inferred chain predicts a particular effect of the intervention.

Ioannidis (2005) described how a result selected from many candidate chains will include some that are spurious, and a search over all pairs of layers produces many apparent causal links. The chains tested and the correction for their number must be reported.
