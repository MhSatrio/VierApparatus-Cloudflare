---
title: "Risk Ratios and Odds Ratios"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The risk ratio as the ratio of the cumulative incidence in the exposed to that in the unexposed, the odds ratio as the ratio of the odds of disease, the reason that the odds ratio approximates the risk ratio only when the disease is rare, the interpretation of each measure with its interval on the log scale, and the common mistake of describing an odds ratio from a case-control study as a risk ratio."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate a risk ratio and an odds ratio from a two-by-two table and state the interval on the log scale."
  - "Explain why an odds ratio approximates a risk ratio only for a rare disease and why it cannot be read as a risk ratio in a case-control study."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

The risk ratio compares the cumulative incidence in the exposed group with that in the unexposed group. It is the risk of disease in the exposed divided by the risk in the unexposed, and a value of two means that the exposed have twice the risk. It is a direct measure of how much the exposure changes the probability of disease over the period, and it is the measure most readers expect. Its calculation requires a cohort design or a population in which the risks can be estimated directly.

The odds ratio compares the odds of disease in the two groups, where the odds are the probability of disease divided by the probability of no disease. It is calculated from a two-by-two table as the product of the diagonal counts divided by the product of the other diagonal, and it is the only measure of association that can be estimated directly from a case-control study. Its convenience for case-control designs is the reason it is widely reported, and the reason it is often misread.

The odds ratio approximates the risk ratio only when the disease is rare, since then the odds and the risk are nearly the same. For a common outcome the odds ratio exceeds the risk ratio in the direction of the association, and it can be far from it. Greenland et al. (1999) argued that the difference between the two measures should be understood before an odds ratio is interpreted, and a reader who takes an odds ratio from a common disease as a risk ratio will overstate the effect.

Both ratios are estimated on the logarithmic scale, where their sampling distribution is closer to normal, and the interval is then transformed back. Cumming (2014) argues that the interval, rather than the point estimate, shows the range of effects compatible with the data. Ioannidis (2005) described how the size of an apparent association may be exaggerated by selection, and the interval and the measure used should both be reported so that the reader can judge the result.
