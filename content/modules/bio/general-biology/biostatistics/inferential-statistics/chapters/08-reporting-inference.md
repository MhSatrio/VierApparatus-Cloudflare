---
title: "Reporting Inference"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How inferential results are reported so that the reader can judge the estimate, its precision, the population it refers to and the assumptions behind it, including the estimate with its interval, the sample and its design, the model and the checks of its assumptions, the statement of effect sizes in the units of the study and the discipline of reporting the result that was found rather than the one that was hoped for."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write an inferential results statement that gives the estimate, its interval, the sample and the model used."
  - "Explain why a report should give the effect size and its precision rather than a yes or no decision alone."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An inferential result is a statement about a population, and a reader needs several things to judge it: the estimate, its precision, the population it refers to, the sample from which it came and the assumptions that connect the two. A report that gives only a p-value conveys none of these, and Cumming (2014) argues that the estimate with its interval should be the primary result. The reporting discipline is to give the reader enough to judge the inference without repeating the analysis.

The estimate should be reported in the units of the study with its interval, so that the size of the effect is visible. A difference in mean growth of two millimetres with an interval of one to three is a more informative statement than a p-value of 0.01. Wasserstein and Lazar (2016) state that a p-value says nothing about the size or the importance of an effect, and the estimate supplies these.

The sample, its design and the model should be stated. The number in each group, the sampling design, the distribution assumed, the method of estimation and the checks of the assumptions allow the reader to see what the inference rests on. A report that conceals the design, or that describes a clustered sample as if it were random, overstates its precision.

Peng (2011) argued that the means of reproducing a result must accompany it, and the analysis code, the data and the versions of the software complete the report. Sandve et al. (2013) recommended that the steps of the analysis be recorded, so that the estimate can be recomputed from the data.

The report should state the result that was found, not the one that was hoped for. A study that tested several outcomes should report all of them, and a finding that depends on an analysis chosen after the data were seen should be labelled as exploratory. The discipline of reporting every planned comparison is what keeps the inference honest, and it is the standard the field needs.
