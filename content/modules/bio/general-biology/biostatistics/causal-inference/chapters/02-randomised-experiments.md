---
title: "Randomised Experiments"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The randomised experiment as the design that makes the exposed and unexposed groups comparable on average in all characteristics, measured and unmeasured, so that their difference estimates the average causal effect, the role of random allocation in breaking the link between exposure and confounders, the intention-to-treat analysis that compares groups as randomised, the threats of non-compliance and attrition that weaken the comparison, and the reporting of the randomisation procedure and the losses."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why random allocation makes the groups comparable on average and estimates the average causal effect without adjustment."
  - "Describe the intention-to-treat analysis and state how non-compliance and attrition threaten the comparison."
references:
  - "Rubin, D. B. (1974). Estimating causal effects of treatments in randomized and nonrandomized studies. Journal of Educational Psychology, 66(5), 688-701. https://doi.org/10.1037/h0037350"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

In a randomised experiment, each unit is allocated to an exposure by a procedure unrelated to its characteristics. Because the allocation is random, the groups are comparable on average in every characteristic, whether or not it was measured, and the difference between their outcomes estimates the average causal effect without the need to adjust for confounders. Rubin (1974) showed how this follows from the potential outcomes framework, and the randomised experiment is the standard against which observational estimates are judged.

The analysis should compare the groups as they were randomised, which is the intention-to-treat principle. A patient allocated to treatment is analysed in the treatment group even if they did not take it, because a comparison that drops non-compliant patients reintroduces the confounding that randomisation removed. The intention-to-treat estimate answers the question of what the allocation achieves in practice, and it is conservative when compliance is poor.

Non-compliance and attrition threaten the comparison. If the patients who stop treatment differ from those who continue, the groups that remain are no longer comparable, and the estimate is biased. The number lost in each group, the reasons for loss and the outcome data available for the lost units should be reported, and a sensitivity analysis can show how far the estimate would change under plausible assumptions about the missing outcomes.

Cumming (2014) argues that the estimate should be reported with its interval, and the losses should be reported with it, since a large loss can make a precise estimate misleading. Sandve et al. (2013) recommended recording the randomisation procedure, the allocation concealment and the analysis plan, so that the comparison can be checked against what was planned.
