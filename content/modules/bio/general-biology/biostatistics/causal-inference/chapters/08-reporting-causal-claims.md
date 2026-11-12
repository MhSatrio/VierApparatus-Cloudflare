---
title: "Reporting Causal Claims"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a causal analysis must contain for its claim of an effect to be judged, including the causal question and the target population, the design and its assumptions, the causal graph drawn before the analysis, the variables adjusted for and those deliberately left out, the balance and overlap checks, the sensitivity analysis for unmeasured confounding, the estimate with its interval and the wording that matches the design, and the deposition of the data and code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "State the causal question, the target population and the assumptions that a causal claim rests on."
  - "Choose wording for a causal result that matches the design and report the sensitivity of the estimate to unmeasured confounding."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A causal claim is stronger than an association, and a report must show the assumptions on which it rests. The causal question should be stated with the exposure, the outcome and the population to which the answer applies. Greenland et al. (1999) argued that the causal assumptions should be made explicit, and the report should include the causal graph drawn before the analysis, so that the reader can see what was assumed about each variable.

The design and the analysis should be described in full. The variables adjusted for, and those deliberately left out because they lie on the causal path or are colliders, should be listed with the reason for each choice. The balance and overlap checks, for matched or weighted analyses, should be reported, since a claim built on an unbalanced comparison is not supported by the adjustment. Ioannidis (2005) described how undisclosed choices of this kind produce findings that do not hold, and the report should state the choices made.

A sensitivity analysis should show how strong an unmeasured confounder would need to be to change the conclusion. Such an analysis does not remove the uncertainty, but it shows how far the conclusion depends on an assumption that cannot be tested. Cumming (2014) argues that the estimate should be reported with its interval and that the claim should be worded to match the strength of the evidence, so that an association from an observational study is not described as an effect.

The data, the code and the graph should be deposited with identifiers. Sandve et al. (2013) recommended keeping the inputs, the steps and the outputs of an analysis together, so that the causal claim can be checked against its assumptions and repeated by others.
