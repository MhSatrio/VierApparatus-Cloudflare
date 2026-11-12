---
title: "Predictive Models and Validation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biomedical Sciences"
description: "How predictive models combine molecular and clinical features to estimate an individual's risk or likely response, the distinction between the calibration and the discrimination of a model, the overfitting that makes a model look better in its development data than it is and the external validation that establishes whether a model works in new patients."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish the discrimination and the calibration of a predictive model and state what each shows."
  - "Explain how overfitting makes a model look better than it is and how external validation detects it."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Collins, F. S., & Varmus, H. (2015). A new initiative on precision medicine. New England Journal of Medicine, 372(9), 793-795. https://doi.org/10.1056/NEJMp1500523"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A predictive model combines several features of a patient, such as a molecular marker, a clinical score and a measure of tumour burden, into an estimate of risk or of the probability of response. The model is built from a development set of patients, and its performance is judged by how well it separates those who experience the outcome from those who do not, which is its discrimination, and by how well its predicted probabilities match the observed frequencies, which is its calibration. A model may discriminate well and be poorly calibrated, and both properties must be reported.

Overfitting is the principal danger. A model with many features and a limited number of patients will fit the development data closely, capturing the chance patterns that will not recur. Its apparent performance in the development set is therefore optimistic, and the optimism grows with the number of features relative to the number of outcomes. Ioannidis (2005) described how the flexibility of model building produces results that do not hold in new data, and the honest estimate of performance requires that the model be tested on patients who played no part in its construction.

External validation tests the model in a new population, ideally from a different institution and period. The model is applied without refitting, and its discrimination and calibration are measured. A model that performs well in development and poorly in validation has been overfitted, and a model that performs similarly in both is more likely to be generalisable. Platt (1964) recommended a test that could show the model to be wrong, and the external validation is that test, since the model's predictions are checked against outcomes it did not see.

The clinical value of a model depends on whether its predictions change decisions. A model with excellent discrimination may not improve care if the decision it informs would be the same without it. Collins and Varmus (2015) emphasised that precision medicine must improve outcomes, and the model must be judged by the outcomes it produces when used.

Models must also be updated as the population and the treatments change. A prediction that held for patients treated a decade ago may not hold for patients treated today, and the monitoring of performance over time is necessary.

A predictive model is a claim about the future of a patient, and its value is established only when it predicts well in patients it has not seen.
