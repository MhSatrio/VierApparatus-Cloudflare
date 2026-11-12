---
title: "Prospective Validation"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The prospective validation of computational drug discovery predictions in which the predictions are made and recorded before the compounds are tested, covering the registration of the prediction rule and of the compounds selected before experiments begin, the blinding of the experimental team to the computed scores where that is feasible, the hit rate among the tested compounds with its binomial interval, the comparison of the hit rate with a baseline such as random selection or a simple heuristic, the inclusion of compounds the model rejected so that its false negatives can be estimated, the iterative cycles of prediction and testing with the results of each cycle reported, and the reporting of every compound tested with its outcome."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Register a prediction rule and the compounds it selects before experiments begin and report the hit rate with its interval."
  - "Include compounds the model rejected and compare the hit rate with a baseline selection."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Prospective validation is the strongest test of a computational drug discovery method, because the predictions are made and recorded before the compounds are tested, and the outcome cannot be shaped by knowledge of the result. A rule for selecting compounds is registered in advance, the compounds are chosen by that rule, and the experimental team tests them. Munafò et al. (2017) argued that pre-registration of the prediction protects the evaluation from the flexibility that makes retrospective success easy to find, and Ioannidis (2005) described how such flexibility inflates reported performance.

The experimental team should be blinded to the computed scores where this is feasible, so that their interpretation of the assays is not influenced by the predictions. Blinding is not always possible, and where it is not, the limitation should be stated. Cumming (2014) argues that the hit rate among the tested compounds should be reported with its binomial interval, since a few compounds give a wide range for the true rate.

The hit rate must be compared with a baseline, such as the rate obtained by random selection from the same library or by a simple heuristic. A method that does not exceed the baseline has not added value, however sophisticated its computation. The baseline should be chosen before the experiment and tested on the same assay.

Compounds that the model rejected should also be tested, so that its false negatives can be estimated. A method that is good at finding actives but also rejects many actives is less useful than its hit rate suggests, and the rejected compounds reveal this. Iterative cycles of prediction and testing are common, and the results of each cycle should be reported, including the cycles in which the method failed.

Every compound tested must be reported with its outcome, and the successes must not be presented without the denominator of failures. Peng (2011) argued that the complete record of the predictions and the experiments is necessary for the method to be judged, and the deposition of this record allows others to evaluate it.
