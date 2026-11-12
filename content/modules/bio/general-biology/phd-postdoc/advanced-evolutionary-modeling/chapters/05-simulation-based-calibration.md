---
title: "Testing Inference Methods by Simulation"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The testing of evolutionary inference methods using simulated data in which the true parameters are known, covering the simulation of datasets from a known model across a range of parameter values, the application of the inference method to each simulated dataset, the calculation of the coverage of the intervals and the bias and error of the estimates, the detection of an inference method that is biased under particular conditions such as small samples, strong selection or population structure, the calibration of the method so that its stated intervals contain the true values at the stated rate, the use of simulations to choose among inference methods, and the reporting of the simulation design, the coverage and the bias with their uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Simulate datasets with known parameters, apply an inference method, and calculate the coverage of its intervals."
  - "Identify conditions under which an inference method is biased and state how this limits its application."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

An inference method is trustworthy only if it recovers the truth under known conditions, and simulation provides those conditions. Datasets are generated from a model with chosen parameters, the method is applied to each dataset, and the estimates are compared with the parameters that generated them. This reveals bias, error and the coverage of the intervals, which cannot be observed in real data where the truth is unknown. Ioannidis (2005) described how methods that are never tested against known answers can give confident results that are wrong, and simulation-based testing is the remedy.

The coverage of an interval is the proportion of simulated datasets in which the interval contains the true parameter, and it should match the nominal rate. An interval with a nominal coverage of ninety-five per cent that contains the truth in only seventy per cent of simulations is badly calibrated, and such a method will overstate its certainty. Cumming (2014) argues that the coverage and the width of the interval should both be reported, since a method can achieve coverage by making its intervals uninformatively wide.

Bias and error are examined across the range of conditions, and a method may be unbiased in one regime and seriously biased in another. Small samples, strong selection and population structure are common sources of bias, and the conditions under which the method fails must be identified. The method should not be applied outside the conditions in which it has been shown to work.

Simulations can also be used to choose among methods, by comparing their coverage and bias under the same conditions. The comparison must be fair, with the methods given the same data and the same budget of computation. Munafò et al. (2017) argued that the simulation design, including the parameter range and the number of replicates, should be reported in full, so that the comparison can be repeated. Peng (2011) argued that the random seeds and the code are needed for the simulation to be reproduced.
