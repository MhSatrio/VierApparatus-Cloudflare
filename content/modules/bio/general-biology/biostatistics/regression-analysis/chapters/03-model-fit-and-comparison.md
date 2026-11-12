---
title: "Model Fit and Comparison"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the fit of a regression model is assessed and compared with others, including the residual standard error, the adjusted coefficient of determination that penalises additional predictors, the F test for nested models, the information criteria of Akaike that balance fit against the number of parameters, the risk of selecting a model that fits the sample but predicts new data poorly and the reasons a model should be compared with the alternatives its biology suggests rather than chosen by automated search."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare two nested regression models with an F test and with an information criterion and state what each comparison answers."
  - "Explain why a model selected by an automated search can fit the sample well and predict new data poorly."
references:
  - "Akaike, H. (1974). A new look at the statistical model identification. IEEE Transactions on Automatic Control, 19(6), 716-723. https://doi.org/10.1109/TAC.1974.1100705"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A regression model is judged by how well it fits the data and how well it would predict new data. Fit is measured by the residual error, and the proportion of variation explained by the model can always be increased by adding predictors, whether or not they carry real information. The adjusted coefficient of determination penalises this addition, and it gives a fairer comparison between models with different numbers of predictors.

Nested models, in which the simpler is a special case of the larger, are compared with an F test on the reduction in the residual sum of squares. The test asks whether the additional predictors improve the fit more than chance would allow. Akaike (1974) introduced an information criterion that balances the fit against the number of parameters, and the model with the lower criterion is preferred. Unlike the F test, the criterion can compare models that are not nested, and it does not depend on a significance threshold.

A model that fits the sample well may predict new data poorly. Adding predictors to a sample of modest size can capture the noise of that sample, and the fitted model then describes nothing beyond it. Ioannidis (2005) described how the flexibility of choosing a model produces findings that do not replicate, and the same over-fitting produces models that fail on new data.

Automated selection of predictors, which keeps the variables that pass a threshold, is a form of the flexibility that the field must avoid. The selected model has been chosen by the data it is then tested on, and its p-values and intervals are invalid. Platt (1964) recommended comparing the models that the biology suggests, and the comparison of a few considered models is more honest than the search over many.

Sandve et al. (2013) recommended recording every model compared and the criterion used to choose among them, so that the selection can be judged.
