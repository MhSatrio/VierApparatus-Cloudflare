---
title: "Variant Effect Scoring"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The use of a protein language model's likelihood to score the effect of amino acid substitutions, covering the log-likelihood ratio between the mutant and the wild-type sequence as a score, the calibration of the score against deep mutational scanning data in which effects have been measured, the correlation between predicted and measured effects with its interval, the bias of the score toward substitutions that are common in the training data, the separation of conserved and variable positions, the danger of applying the score to positions whose effect depends on context such as binding partners, and the reporting of the score, the benchmark datasets and the agreement with measurements."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute a log-likelihood ratio variant score and state why it is a prediction rather than a measurement of effect."
  - "Evaluate the correlation between predicted and measured variant effects with an interval and check for bias toward common substitutions."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A protein language model assigns a likelihood to each sequence, and the change in likelihood caused by a substitution can serve as a score of its effect. A substitution that makes the sequence much less likely may be damaging, because the wild-type residue at that position is favoured by the evolutionary record. The score is computed as the log-likelihood ratio between the mutant and the wild type, and it is a prediction of the effect, not a measurement of it.

The score is calibrated and validated against deep mutational scanning data, in which the effects of many substitutions have been measured in a functional assay. The correlation between predicted and measured effects summarises the agreement, and it should be reported with its interval, since the number of variants in a dataset determines how precisely the correlation is known. Cumming (2014) argues that the strength of an association should be given with the uncertainty that the sample imposes.

A bias toward substitutions that are common in the training data can make the score look better than it is. A score that rewards common substitutions will rank a common but harmless change above a rare but damaging one, and the bias must be tested by examining the score across substitution types. Ioannidis (2005) described how a method can achieve apparent success through a feature of the test set rather than its ability, and this bias is one such feature.

The score performs best at conserved positions, where the evolutionary record is clear, and less well at variable positions, where many substitutions are tolerated. Its application to positions whose effect depends on context, such as those that contact a binding partner, is less reliable, since the sequence alone does not carry the partner. The report should separate performance by position type and state where the score should not be used.

Munafò et al. (2017) argued that the benchmark datasets, the score and the agreement with measurements should all be reported, so that the score can be reproduced and judged. Peng (2011) argued that the procedure for computing the score must be documented, since small differences in computation can change the ranking of variants.
