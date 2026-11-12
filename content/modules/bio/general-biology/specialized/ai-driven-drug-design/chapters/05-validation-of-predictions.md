---
title: "Validation of AI Predictions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The validation of AI predictions in drug design against data and experiments that the model has not seen, covering the random and scaffold splits of the data used to test generalisation, the prospective validation in which predictions are made and then tested in the laboratory, the calibration of predicted probabilities against observed rates of activity, the measures of performance that are appropriate for imbalanced data, the comparison with simple baseline models that may match a complex model, and the reporting of validation with the split used, the baselines and the confidence in each prediction."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the difference between a random split and a scaffold split and state why a scaffold split gives a more honest estimate of generalisation."
  - "Describe the baseline models against which an AI model must be compared and state why a complex model must beat them."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Stokes, J. M., Yang, K., Swanson, K., Jin, W., Cubillos-Ruiz, A., Donghia, N. M., MacNair, C. R., French, S., Carfrae, L. A., Bloom-Ackermann, Z., Tran, V. M., Chiappino-Pepe, A., Badran, A. H., Andrews, I. W., Chory, E. J., Church, G. M., Brown, E. D., Jaakkola, T. S., Barzilay, R., & Collins, J. J. (2020). A Deep Learning Approach to Antibiotic Discovery. Cell, 180(4), 688-702. https://doi.org/10.1016/j.cell.2020.01.021"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A model is validated when it predicts compounds that it has not seen, and the split of the data determines how honest the test is. A random split places compounds from the same chemical series in both the training and test sets, so the test measures the model's ability to interpolate within known chemistry. A scaffold split places compounds with different core structures in the two sets, so the test measures the ability to generalise to new chemistry, which is what drug discovery requires. Ioannidis (2005) described how a flattering test set makes a model appear more accurate than it is, and the scaffold split is the more demanding test.

Stokes et al. (2020) validated their antibiotic predictions against compounds that were not in the training data and then tested the predicted compounds in the laboratory, which is the strongest form of validation. A prospective test in which predictions are made before the results are known cannot be shaped by the investigator, and it is the most convincing evidence that a model is useful.

Predicted probabilities must be calibrated, so that a predicted activity of 0.3 corresponds to an observed rate of activity near 0.3 among such compounds. A model that is accurate in ranking may be poorly calibrated, and the calibration should be checked and reported. For imbalanced data, the measures should account for the rarity of the active class, since accuracy alone can be high for a model that predicts inactivity for every compound.

A complex model must be compared with simple baselines, such as nearest-neighbour similarity or a linear model on fingerprints, which often perform as well. A model that does not beat a baseline adds complexity without value. Cumming (2014) argues that the difference between the model and the baseline should be reported with its interval, and the split, the baselines and the confidence of each prediction should be stated.
