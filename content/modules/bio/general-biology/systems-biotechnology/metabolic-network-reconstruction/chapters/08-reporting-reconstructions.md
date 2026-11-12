---
title: "Reporting Reconstructions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "What a report of a metabolic reconstruction must contain for it to be reused, checked and corrected, including the organism, the genome annotation and its version, the number of metabolites, reactions and genes with the evidence for each, the gaps filled and the reactions added from general biochemistry, the medium and bounds used in simulations, the validation data with the agreement and its intervals, and the deposition of the model in a standard format with the code and a versioned change log."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the organism, evidence, medium and validation details that a metabolic reconstruction report must give."
  - "Report the agreement of a reconstruction with experiments with its intervals and the data used, and deposit the model with a change log."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Thiele, I., & Palsson, B. Ø. (2010). A protocol for generating a high-quality genome-scale metabolic reconstruction. Nature Protocols, 5(1), 93-121. https://doi.org/10.1038/nprot.2009.203"
  - "Schellenberger, J., Que, R., Fleming, R. M. T., Thiele, I., Orth, J. D., Feist, A. M., Zielinski, D. C., Bordbar, A., Lewis, N. E., Rahmanian, S., Kang, J., Hyduke, D. R., & Palsson, B. Ø. (2011). Quantitative prediction of cellular metabolism with constraint-based models: the COBRA Toolbox v2.0. Nature Protocols, 6(9), 1290-1307. https://doi.org/10.1038/nprot.2011.308"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A metabolic reconstruction is a resource that other researchers will reuse, check and correct, and its report must provide what they need. The organism, the strain and the genome annotation with its version should be stated first, since the reconstruction is a translation of that annotation. Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and for a reconstruction these means include the model file and the version of every database used.

The size and evidence of the reconstruction should be given. The number of metabolites, reactions and genes should be reported, together with the proportion of reactions supported by direct evidence, by homology and by general biochemistry. Thiele and Palsson (2010) described how these categories should be distinguished, and the report should state how much of the model rests on each type of evidence.

The simulations should be reported with the medium, the exchange bounds and the objective function used. A growth prediction is meaningless without the medium on which it was computed, and a change in the bounds can change the result completely. The validation data should be given with the agreement, the sensitivity and specificity, and their intervals. Cumming (2014) argues that the precision of each estimate should be shown, and Schellenberger et al. (2011) described the software that makes these simulations reproducible.

The model should be deposited in a standard format together with its code, its validation data and a versioned change log. Ioannidis (2005) described how findings that are not recorded with their history cannot be assessed, and the change log allows a reader to see how the model has been corrected. Sandve et al. (2013) recommended keeping the inputs, steps and outputs of an analysis together, and this applies to the reconstruction as much as to any other analysis.
