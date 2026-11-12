---
title: "Gene-Protein-Reaction Rules"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The Boolean rules that link genes to reactions through the proteins they encode, in which an AND relation joins the subunits of an enzyme complex and an OR relation joins isozymes that can each catalyse the reaction, the evaluation of these rules to determine whether a reaction is active after a gene is deleted, the propagation of gene deletions to the reactions they disable, the reasons that the rules are an approximation of enzyme biology, and the recording of the source of each rule."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a gene-protein-reaction rule with AND and OR relations for an enzyme complex and for isozymes."
  - "Determine which reactions are disabled by a gene deletion from its rule and explain the limits of the approximation."
references:
  - "Thiele, I., & Palsson, B. Ø. (2010). A protocol for generating a high-quality genome-scale metabolic reconstruction. Nature Protocols, 5(1), 93-121. https://doi.org/10.1038/nprot.2009.203"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The link between a gene and a reaction is made by a Boolean rule. An enzyme that is a complex of several subunits requires all of them, and the rule joins their genes with AND. Two isozymes, which are different proteins that can each catalyse the same reaction, are joined by OR, since either is sufficient. A reaction that is catalysed by a complex of isozymes has a rule that combines both kinds of relation, and the structure of the rule reflects the enzyme biology that the reconstruction is meant to describe.

The rules determine the effect of a gene deletion on the network. When a gene is deleted, the rules are evaluated with that gene set to false, and a reaction whose rule then evaluates to false is disabled. This propagation allows the effect of a knockout to be simulated for every gene in the genome, and it is the basis of the prediction of essential genes. Thiele and Palsson (2010) described how the rules are built from the annotation and the literature.

The rules are an approximation. Enzymes may be active only in some conditions, subunits may be shared between complexes, and a reaction may be catalysed by a promiscuous enzyme that is not recorded. A Boolean rule treats all these cases as fixed, and a deletion that is predicted to disable a reaction may be compensated by a mechanism outside the model. Peng (2011) argued that a model must be reproducible, and its approximations must be recorded so that a reader can judge the predictions.

Each rule should record its source, whether it comes from a curated complex, a genome annotation or a homology inference. Sandve et al. (2013) recommended keeping the inputs and the steps of an analysis together, and the rules are one of the inputs that determine the predictions of essentiality. Their source determines how far a predicted knockout effect can be trusted, which is the subject of the validation chapter.
