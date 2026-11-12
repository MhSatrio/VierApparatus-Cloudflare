---
title: "Validation and Prospective Prediction"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The validation of a biological model by withheld data and by prospective prediction, covering the splitting of data into training and test sets in a way that respects its structure, the cross-validation that repeats the split to estimate performance, the danger of leakage when information from the test set influences the model, the prospective test in which the model predicts outcomes that are then observed, the calibration of predictive intervals so that the stated coverage matches the observed frequency, the comparison of the model with simple baselines that set the standard the model must exceed, and the reporting of predictive performance with its uncertainty and the conditions under which it was tested."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Split data into training and test sets in a way that respects its structure and avoids leakage."
  - "Compare a model's predictions with a simple baseline and check whether the stated predictive intervals have the stated coverage."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Validation asks whether a model predicts data it has not seen. The data must be split into training and test sets, and the split must respect the structure of the data. Observations from the same individual, the same batch or the same site are not independent, and a random split that places related observations on both sides will overstate performance. Ioannidis (2005) described how such leakage makes models appear more accurate than they are, and the split must be designed to prevent it.

Cross-validation repeats the split several times and averages the performance, which gives a more stable estimate than a single split. The repetition must also respect the structure of the data, and the performance should be reported with its interval across the repetitions. Cumming (2014) argues that the variation in performance across splits is informative, and it should be reported alongside the average.

Leakage can occur when information from the test set influences the model, for example through a preprocessing step fitted to the whole dataset, or through the repeated selection of a model that performs best on the test data. The safeguard is to fit all preprocessing and selection within the training data only. Peng (2011) argued that the steps of an analysis must be reproducible, and the separation of training and test data is a step that must be recorded.

The strongest validation is prospective, in which the model predicts outcomes before they are observed, and the predictions are recorded in advance. A prospective test cannot be affected by the investigator's knowledge of the outcome, and it is the most convincing evidence of predictive value. Munafò et al. (2017) argued that pre-registering the predictions protects them against selective reporting.

Predictive intervals should be calibrated, so that a stated coverage of ninety-five per cent contains the observed outcome about ninety-five per cent of the time. A model may be accurate on average but poorly calibrated, and a calibration check reveals this. The model should also be compared with simple baselines, since a complex model that does not beat a baseline adds little. The predictive performance should be reported together with the conditions under which it was tested.
