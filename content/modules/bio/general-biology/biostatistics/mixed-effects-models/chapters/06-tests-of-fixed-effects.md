---
title: "Tests of Fixed Effects"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the fixed effects of a mixed model are tested, including the Wald test that compares an estimate with its standard error, the likelihood ratio test that compares nested models fitted by maximum likelihood, the degrees of freedom problem that makes the reference distribution uncertain in small samples and the approximations used to obtain p-values, with the reasons a fixed effect should be tested with the correct random structure and the reporting that shows which approximation was used."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Test a fixed effect of a mixed model with a Wald test and with a likelihood ratio test and explain when each is appropriate."
  - "Explain why the degrees of freedom of a mixed model test are uncertain in small samples and state the approximation used."
references:
  - "Bates, D., Mächler, M., Bolker, B., & Walker, S. (2015). Fitting linear mixed-effects models using lme4. Journal of Statistical Software, 67(1), 1-48. https://doi.org/10.18637/jss.v067.i01"
  - "Laird, N. M., & Ware, J. H. (1982). Random-effects models for longitudinal data. Biometrics, 38(4), 963-974. https://doi.org/10.2307/2529876"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A fixed effect is tested by comparing its estimate with the standard error, in a Wald test, or by comparing the likelihood of the model with and without the effect, in a likelihood ratio test. The two tests are asymptotically equivalent for large samples, and they can differ considerably in small ones. Laird and Ware (1982) gave the likelihood framework for these models, and Bates et al. (2015) describe the tests implemented in the software they describe.

The reference distribution of the test is the difficulty. In a linear model the degrees of freedom of the test are known from the design, but in a mixed model the effective degrees of freedom depend on the random structure, and they are not exact. Approximations, such as the Satterthwaite or the Kenward-Roger methods, are used to obtain the degrees of freedom and the p-value, and the choice of approximation changes the result in small samples. The approximation used must be reported.

The likelihood ratio test for fixed effects must be carried out by maximum likelihood, not restricted maximum likelihood, since the fixed effects change the residual part of the likelihood that restricted maximum likelihood uses. A test made under restricted maximum likelihood with models of different fixed effects is not a valid comparison, and the software warns of this in some cases.

Wasserstein and Lazar (2016) note that a p-value answers a question about the model and its approximations, and an approximate p-value for a fixed effect in a small study is correspondingly uncertain. The interval of the estimate, given in the units of the study, conveys the uncertainty more honestly than the p-value.

Sandve et al. (2013) recommended recording the test used, the method of approximating the degrees of freedom and the estimation method, since each affects the reported p-value.
