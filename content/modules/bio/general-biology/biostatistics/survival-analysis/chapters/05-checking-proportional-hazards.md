---
title: "Checking Proportional Hazards"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The assumption of proportional hazards on which the Cox model and the log-rank test depend, the checks that test it, including the plot of log cumulative hazards against log time, the test of scaled Schoenfeld residuals against time and the time-varying coefficients that relax the assumption, the consequences of a violated assumption for the average hazard ratio and the options of stratifying the baseline or modelling the time dependence when the hazards are not proportional."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Check the proportional hazards assumption of a Cox model with a plot and a residual test and state what each shows."
  - "Explain what a violated assumption means for the reported hazard ratio and state how the model is adapted."
references:
  - "Cox, D. R. (1972). Regression models and life-tables. Journal of the Royal Statistical Society Series B: Statistical Methodology, 34(2), 187-202. https://doi.org/10.1111/j.2517-6161.1972.tb00899.x"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The Cox model assumes that the hazard ratio of a predictor is constant over time. If the effect of a treatment is strong early and disappears later, the hazard ratio changes with time, and the single constant summarises an average that describes no particular period. The assumption must be checked, since the reported hazard ratio is meaningful only when it holds. Cox (1972) introduced the model with this assumption, and the checks address whether it is tenable.

The most direct check is a plot of the log of the cumulative hazard against the log of time for each group. Under proportional hazards the two curves are parallel, and a systematic departure from parallel indicates that the hazard ratio changes. The plot is simple to produce and easy to read, and it should be made for every categorical predictor in the model.

A formal test uses the Schoenfeld residuals, which are the differences between each observed predictor value at an event and its expected value given the risk set. Plotted against time, or tested for correlation with it, they reveal a time dependence in the coefficient. A significant correlation indicates non-proportionality, but the test has the same limitations as any test: with a large sample a trivial departure is significant, and with a small sample a large one may not be.

When the assumption fails, the model can be adapted. The baseline may be stratified, so that each stratum has its own baseline hazard while the predictor's coefficient is common, or the coefficient may be allowed to vary with time. Each adaptation changes what is estimated, and the report must say which was used and why. Wasserstein and Lazar (2016) remind readers that a p-value depends on the model, and a model whose assumption is violated gives a p-value that does not answer the question asked.

Ioannidis (2005) described how the flexibility of model choice can produce findings that do not hold, and the adaptation should be chosen for the biology and not for the result. Sandve et al. (2013) recommended recording the assumption checks and the adaptation, since they determine the interpretation of the hazard ratio.
