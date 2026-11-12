---
title: "Flux Control"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The control of the flux through a metabolic pathway, in which a small number of steps determine most of the flux, the flux control coefficient that measures how much a change in one enzyme changes the flux, the rate-limiting step that can be identified by overexpressing each enzyme and measuring the change in production, the distribution of control among several enzymes in a branched pathway, the shift of control as conditions change, and the caution that an enzyme identified as limiting in one condition may not limit production in another."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the flux control coefficient and how it is estimated by changing the level of an enzyme."
  - "Identify the rate-limiting steps of a pathway and state why control can shift between conditions."
references:
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A pathway is rarely limited equally at every step. Some enzymes exert more control over the flux than others, and increasing the activity of a controlling enzyme raises the flux while increasing a non-controlling one has little effect. Identifying these enzymes shows where engineering effort will pay off, and it prevents time being spent on steps that do not limit production. Orth et al. (2010) described how the flux of a network responds to changes in its constraints, and flux control is the experimental counterpart of that response.

The flux control coefficient of an enzyme measures the fractional change in the flux that results from a small fractional change in the enzyme's activity. It is estimated by changing the level of the enzyme, typically by expressing it from a promoter of different strength, and measuring the resulting change in production. A coefficient near one indicates that the enzyme controls the flux, and a coefficient near zero indicates that it does not. Cumming (2014) argues that the coefficient should be reported with its interval, since it is estimated from a few levels of expression.

In a branched pathway, control is distributed among several enzymes, and no single step may dominate. The coefficients of the enzymes sum to one, which means that control is shared, and the most effective strategy may involve changing several enzymes together. The distribution of control is a property of the pathway and its conditions, and it should be measured rather than assumed from the pathway's structure.

Control can shift as conditions change. An enzyme that limits production in one medium may not limit it in another, and the coefficients measured at one point describe that point alone. Ioannidis (2005) described how a conclusion drawn from one set of conditions may not hold in another, and the coefficients should be measured under the conditions of the process. Sandve et al. (2013) recommended recording the conditions and the expression levels used in each measurement.
