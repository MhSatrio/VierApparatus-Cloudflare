---
title: "Reporting Computational Discovery Work"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The reporting of computational drug discovery work so that its methods, benchmarks, calibrations, prospective tests and limits can be evaluated and reproduced, covering the description of the targets, the structures and their sources, the free energy and docking protocols with their convergence and sampling, the benchmark with its split, its decoys and the leakage controls, the calibration against measured potency with the held-out set, the prospective predictions registered before testing with every compound and its outcome, the hit rate with its interval and the baseline comparison, the domain of applicability of the property models, the deposition of the code, the models and the data with identifiers, and the honest statement of the methods that did not perform and of the conditions under which the predictions should not be used."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Report a computational discovery study with its benchmark, calibration, prospective predictions and every compound tested."
  - "State the conditions under which the predictions should not be used and the methods that did not perform."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A report of computational drug discovery must allow a reader to judge each method on its own evidence. The targets and the structures used must be described with their sources, and the free energy and docking protocols must be given with their convergence and sampling. Munafò et al. (2017) argued that a method whose protocol is hidden cannot be assessed, and the protocol is the first thing a reader needs.

The benchmark must be reported with its split, its decoys and the leakage controls applied. The calibration against measured potency must be reported on a held-out set, and the calibration set must be distinguished from it. Peng (2011) argued that the means to reproduce a result must be available, and the benchmark and calibration data are part of those means.

The prospective predictions must be registered before testing, and every compound tested must be reported with its outcome. The hit rate should be given with its binomial interval and compared with the baseline. Cumming (2014) argues that the interval conveys the uncertainty of the hit rate, and a rate from a few compounds should not be presented as a firm estimate. Ioannidis (2005) described how the omission of failures inflates the apparent value of a method, and the complete record protects against this.

The domain of applicability of each property model must be stated, and the report should give the conditions under which the predictions should not be used. The code, the models and the data should be deposited with identifiers, and the methods that did not perform should be reported honestly. A computational discovery claim that omits its failures and its limits gives readers a false sense of the tool's reach, and the statement of limits protects those who might otherwise rely on it beyond its evidence.
