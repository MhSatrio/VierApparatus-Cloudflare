---
title: "Multiple Regression and Adjustment"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Multiple linear regression with several predictors, the interpretation of each coefficient as the expected change in the response per unit of that predictor with the others held constant, the adjustment for confounders that this interpretation provides, the partial effects and their intervals, the matrix formulation of the least squares solution and the difference between an adjusted effect and a causal effect, which requires assumptions about the design beyond the model."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Interpret a coefficient of a multiple regression as the effect of its predictor adjusted for the others."
  - "Explain why an adjusted coefficient is not a causal effect unless the design and the model support that reading."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

With several predictors, the regression coefficient of each is the expected change in the response for a unit change in that predictor while the others are held constant. This is the adjusted effect, and it is the reason multiple regression is used in biology: a study of the effect of a drug on blood pressure that also records age and weight can estimate the drug's effect with the influence of age and weight removed. The adjustment is a statistical operation, and it can remove a confounder only if the confounder was measured and correctly modelled.

Each coefficient has its own standard error and interval, and the interval shows the precision of the adjusted effect. The partial effect of a predictor is its contribution to the fit after the others have been included, and it may differ from its simple effect when predictors are correlated. Nelder and Wedderburn (1972) describe the least squares solution in matrix form, in which the coefficients are obtained by a single linear operation on the data, and the adjustment is built into that operation.

The adjusted effect is not automatically a causal effect. The model removes the influence of the measured predictors, but an unmeasured confounder, a mediator that lies on the causal path or a collider that is conditioned on can all bias the coefficient. Reading the coefficient causally requires a design or a set of assumptions that the model cannot supply, and the report should say which reading is intended and why.

Ioannidis (2005) described how the choice of which predictors to include can produce findings that are less reliable than they appear, and Platt (1964) recommended comparisons that discriminate between the models considered. The adjustment set should be fixed on the basis of the biology before the data are analysed, and the sensitivity of the effect to the adjustment should be shown.

Sandve et al. (2013) recommended recording every model considered and the adjustment set chosen, since the coefficient depends on what is held constant.
