---
title: "Diagnostics and Influential Observations"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The diagnostics that examine a fitted regression for observations that have an undue influence on its estimates, including the leverage that measures how unusual a predictor value is, the residual that measures how far an observation lies from the fitted line and Cook's distance that combines the two, the plots that show influence, the decision to investigate, correct or retain an influential observation and the reporting of the sensitivity of the conclusion to such observations."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the leverage and Cook's distance of the observations of a regression and identify the observations with undue influence."
  - "Decide what to do with an influential observation by checking its measurement and report the sensitivity of the conclusion to it."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Bland, J. M., & Altman, D. G. (1986). Statistical methods for assessing agreement between two methods of clinical measurement. The Lancet, 327(8476), 307-310. https://doi.org/10.1016/S0140-6736(86)90837-8"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Some observations have more effect on a fitted regression than others. An observation with an unusual value of a predictor has high leverage, and one that lies far from the fitted line has a large residual. An observation with both high leverage and a large residual may dominate the fit, so that the coefficients describe it rather than the bulk of the data. Diagnostics identify these observations, and their identification is a necessary step before the coefficients are interpreted.

Leverage measures how far an observation's predictor values lie from the centre of the data, and the residual measures how far its response lies from the fitted line. Cook's distance combines the two into a single measure of how much the fitted coefficients would change if the observation were removed. A common rule flags observations whose Cook's distance is large relative to the others, and the plot of Cook's distance against the observation number is the usual display. Cumming (2014) argues that such displays should be part of any analysis that reports a fitted line.

A flagged observation is investigated, not automatically removed. The first question is whether its measurement is correct. A recording error, a sample mix-up or an instrument failure produces an influential observation that should be corrected or excluded with a stated reason. A genuine extreme value of a real biological process should be retained, since removing it discards the biology. Bland and Altman (1986) emphasised that an outlying difference between methods is itself informative about the methods, and the same attention is due to influential points in a regression.

The conclusion should be reported with and without the influential observations. If the coefficients change little, the result is robust, and if they change substantially, the reader needs to know that the conclusion depends on a few points. The sensitivity is the honest form of the result.

Sandve et al. (2013) recommended recording the diagnostics and the decisions made about each flagged observation, since these decisions change the fitted model.
