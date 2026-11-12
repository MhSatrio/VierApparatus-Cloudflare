---
title: "Gap Filling and Curation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The identification of gaps in a draft reconstruction, namely metabolites that can be produced or consumed by no reaction, and the filling of these gaps by adding reactions from databases or by manual curation with literature evidence, the risk that automated gap filling adds reactions that make the model fit the growth data for the wrong reason, the parsimony principle of adding the fewest reactions, the manual checking of each addition against experimental evidence, and the record of every change so that the curation can be audited."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the dead-end metabolites that reveal gaps in a draft reconstruction and state the kinds of evidence that justify filling them."
  - "Explain the risk of automated gap filling and why each added reaction should be recorded and justified."
references:
  - "Thiele, I., & Palsson, B. Ø. (2010). A protocol for generating a high-quality genome-scale metabolic reconstruction. Nature Protocols, 5(1), 93-121. https://doi.org/10.1038/nprot.2009.203"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A gap is a metabolite that the network cannot produce or cannot consume, so that any reaction using it is blocked at steady state. Dead-end metabolites reveal gaps, and they are common in draft reconstructions because the enzymes for some steps have not been annotated. A gap prevents the model from producing some essential metabolites or from carrying out some pathways, and it must be closed before the model is useful. Thiele and Palsson (2010) described the search for gaps as a systematic step of the protocol.

Gaps can be filled by adding a reaction from a database that converts the dead-end metabolite, or by manual curation in which an expert identifies the missing reaction from the literature. Manual curation is slower but better justified, since each reaction is accompanied by a reference, while database additions may include reactions that the organism does not have. Each addition should be recorded with its evidence and its source.

Automated gap filling chooses the reactions that allow the model to meet a growth requirement with the fewest additions. This parsimony principle is attractive, but it can produce a model that grows for the wrong reason, since the added reactions may enable growth on a substrate the organism cannot use. Ioannidis (2005) described how a model adjusted to satisfy an objective can satisfy it without describing the system, and automated additions must be checked against independent knowledge.

Every change to a reconstruction should be logged, with the reason, the evidence and the date, so that the curation can be audited and reversed if the evidence changes. Cumming (2014) argues that the uncertainty of each addition should be recorded, since a reaction supported by a single report is less certain than one confirmed in several organisms. Sandve et al. (2013) recommended keeping this record with the model, so that the path from genome to reconstruction can be followed.
