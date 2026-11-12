---
title: "Estimation and Convergence"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the parameters of a mixed model are estimated by maximum likelihood and restricted maximum likelihood, why restricted maximum likelihood gives unbiased variance components, the optimisation that searches for the estimates and the convergence warnings that signal the search has failed, the boundary estimates of variance components at zero and the way such estimates are handled and reported."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the difference between maximum likelihood and restricted maximum likelihood for the variance components of a mixed model."
  - "Recognise a convergence warning and a boundary estimate of a variance component and state how each is handled."
references:
  - "Laird, N. M., & Ware, J. H. (1982). Random-effects models for longitudinal data. Biometrics, 38(4), 963-974. https://doi.org/10.2307/2529876"
  - "Bates, D., Mächler, M., Bolker, B., & Walker, S. (2015). Fitting linear mixed-effects models using lme4. Journal of Statistical Software, 67(1), 1-48. https://doi.org/10.18637/jss.v067.i01"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A mixed model is fitted by maximising a likelihood over the fixed effects and the variance components. Maximum likelihood estimates the variance components with a downward bias in small samples, because it does not account for the degrees of freedom used to estimate the fixed effects. Restricted maximum likelihood, described for these models by Laird and Ware (1982), maximises a likelihood of the residuals after the fixed effects have been removed, and it gives less biased variance components. Bates et al. (2015) use restricted maximum likelihood as the default for the estimation of variance components.

The search for the maximum is numerical, and it can fail. The software reports a convergence warning when the optimiser does not reach a stable solution, and a warning must not be ignored. A model that does not converge gives estimates that are not the maximum, and its standard errors and p-values are unreliable. The remedy is to check the model, to simplify the random structure if it is too complex for the data or to change the optimiser, and to report that the convergence was checked.

A variance component can be estimated at zero, which is a boundary of its parameter space. A boundary estimate means that the data show no variation between the units of that factor, and it is a finding, not an error. The standard errors of the other parameters are then computed as if the component were absent, and a reader should be told when a boundary has been reached.

Wasserstein and Lazar (2016) remind readers that a p-value depends on the model, and a model whose estimates have not converged or lie on a boundary gives a p-value whose meaning is uncertain. Sandve et al. (2013) recommended recording the estimation method, the convergence and the boundary estimates, since they determine whether the reported inference can be trusted.
