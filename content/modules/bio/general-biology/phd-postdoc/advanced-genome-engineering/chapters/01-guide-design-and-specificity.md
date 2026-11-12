---
title: "Guide Design and Specificity"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The design of guide sequences for programmable nucleases and the assessment of their specificity, covering the requirement of a protospacer adjacent motif at the target, the scoring of guides by predicted on-target activity based on sequence features, the search of the genome for sequences similar to the guide that could be cut as off-target sites, the weighting of off-target sites by the number and position of mismatches, the use of high-fidelity nuclease variants and of reduced guide exposure to limit off-target cutting, the validation of predictions by sequencing of the predicted sites in edited cells, and the reporting of the design, the scores and the verified off-target profile."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Score candidate guides for on-target activity and off-target risk and select a guide with a justified specificity profile."
  - "Validate predicted off-target sites by sequencing in edited cells and report the result."
references:
  - "Jinek, M., Chylinski, K., Fonfara, I., Hauer, M., Doudna, J. A., & Charpentier, E. (2012). A programmable dual-RNA-guided DNA endonuclease in adaptive bacterial immunity. Science, 337(6096), 816-821. https://doi.org/10.1126/science.1225829"
  - "Mali, P., Yang, L., Esvelt, K. M., Aach, J., Guell, M., DiCarlo, J. E., Norville, J. E., & Church, G. M. (2013). RNA-guided human genome engineering via Cas9. Science, 339(6121), 823-826. https://doi.org/10.1126/science.1232033"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A guide sequence directs the nuclease to its target by base pairing, and the target must be followed by a short motif that the enzyme requires. Jinek et al. (2012) described this requirement and the dual-RNA architecture that the guide participates in. The first step in design is therefore to find the candidate sites that satisfy the motif, and then to score each for the likelihood that it will be cut efficiently.

Scores for on-target activity are derived from sequence features that have been associated with cutting efficiency in previous experiments. These scores are predictions, and their accuracy must be assessed on the systems in which they will be used. Ioannidis (2005) described how a predictive model that has not been validated on new data may perform far worse than its original report suggested, and the score should be treated as a ranking rather than a guarantee.

The genome must be searched for sequences similar to the guide that could be cut as off-target sites. Mismatches reduce the likelihood of cutting, but not to zero, and the number and position of mismatches determine the risk. Mali et al. (2013) showed that the approach could be applied to human cells, where the number of potential off-target sites is large, and the search must be exhaustive for the genome in use.

Specificity can be improved with high-fidelity nuclease variants and with reduced exposure of the guide in the cell. Predicted off-target sites should then be sequenced in the edited cells to confirm or refute the predictions. Cumming (2014) argues that the frequency of off-target edits should be estimated with its interval, since a rare event observed in a few clones is uncertain. Munafò et al. (2017) argued that the scores, the predicted sites and the verified profile should all be reported, so that the specificity of the edit can be judged.
