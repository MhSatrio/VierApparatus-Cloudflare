---
title: "Model Selection and Quasi-Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How competing generalised linear models are compared and selected, the use of the Akaike information criterion for models fitted to the same data, the quasi-likelihood approach that specifies only the mean and variance relation and estimates a dispersion scale, the risk of selecting a model by automated search and the discipline of comparing a small set of biologically motivated models and reporting the sensitivity of the conclusion to the choice."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare two generalised linear models with the Akaike information criterion and state what the difference in criterion value means."
  - "Explain the quasi-likelihood approach and when a dispersion scale is preferred to a full distributional model."
references:
  - "Akaike, H. (1974). A new look at the statistical model identification. IEEE Transactions on Automatic Control, 19(6), 716-723. https://doi.org/10.1109/TAC.1974.1100705"
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Generalised linear models are compared with the same tools as regression models: the likelihood ratio test for nested models and the Akaike information criterion for any pair fitted to the same data. The criterion balances the maximised likelihood against the number of parameters, and a difference of several units is conventionally taken as strong support for the model with the lower value. Akaike (1974) introduced the criterion, and it is the usual basis for comparing models whose families or links differ.

The quasi-likelihood approach is an alternative for count and proportion data with overdispersion. It specifies only the relation between the mean and the variance, as Nelder and Wedderburn (1972) describe, and estimates a dispersion scale from the data. The coefficients are the same as for the corresponding family, and the standard errors are scaled by the dispersion. It avoids committing to a distribution that may be wrong, at the cost of not providing a full likelihood for prediction or for criteria such as the Akaike.

Automated model selection carries the same danger as in regression. A search over many predictors, links and families, followed by the reporting of the best model, produces inferences that are not valid, since the reported p-values ignore the search. Ioannidis (2005) described how such flexibility produces findings that do not hold, and the discipline of comparing a small number of models motivated by the biology is the remedy.

Platt (1964) recommended comparing the alternatives that the biology suggests and designing a test that discriminates between them. A model comparison is most informative when the models make different predictions that an experiment could test.

The sensitivity of the conclusion to the choice of model should be reported. If the coefficient of interest is similar across the plausible models, the conclusion is robust, and if it changes sign or magnitude, the reader must know that the conclusion depends on the model. Sandve et al. (2013) recommended recording every model compared, since the selection itself is a result that must be visible.
