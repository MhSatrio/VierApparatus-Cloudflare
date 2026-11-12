---
title: "Interpreting and Reporting a Meta-Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The interpretation and reporting of a meta-analysis so that its pooled estimate can be understood and checked, covering the reporting of the pooled estimate with its confidence interval and prediction interval, the distinction between statistical significance and the magnitude of the effect, the presentation of forest plots that show each study and the pooled result, the statement of the model, the software, the effect measure and every heterogeneity statistic, the grading of the certainty of the pooled evidence, the limitations arising from the included studies and from the analyses performed, and the deposition of the extracted data and analysis code so that the meta-analysis can be reproduced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Report a meta-analysis with its model, software, effect measure, heterogeneity statistics and both intervals."
  - "Interpret a pooled estimate in terms of its magnitude and precision rather than its statistical significance alone."
references:
  - "Page, M. J., McKenzie, J. E., Bossuyt, P. M., Boutron, I., Hoffmann, T. C., Mulrow, C. D., Shamseer, L., Tetzlaff, J. M., Akl, E. A., Brennan, S. E., Chou, R., Glanville, J., Grimshaw, J. M., Hróbjartsson, A., Lalu, M. M., Li, T., Loder, E. W., Mayo-Wilson, E., McDonald, S., . . . Moher, D. (2021). The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ, 372, n71. https://doi.org/10.1136/bmj.n71"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A meta-analysis is interpreted by its magnitude and its precision, not by whether a single test crossed a threshold. The pooled estimate is read together with its confidence interval, which shows the range of values consistent with the evidence, and with its prediction interval, which shows the range of effects expected in a comparable new study. Cumming (2014) argues that the estimate and its interval convey more than a declaration of significance, and the report should be built around them.

The report must state the model, the software and the version used, the effect measure, the method of estimating tau squared, and every heterogeneity statistic with its value. Page et al. (2021) required these details, and without them a reader cannot judge the analysis or repeat it. Forest plots should show each study with its interval and the pooled result, so that the reader can see how the evidence is distributed.

The pooled estimate should be given a grade of certainty, as described in the chapter on systematic reviews, since a precise average from biased or inconsistent studies may be less certain than it appears. Ioannidis (2005) described how the apparent strength of a combined result can exceed the reliability of the evidence behind it, and the grade communicates that reliability. The limitations arising from the included studies, from the search and from the analyses should be stated plainly in the discussion.

Munafò et al. (2017) argued that a meta-analysis is trustworthy only when its data and analysis code are available. Sandve et al. (2013) recommended that the extracted data, the scripts and the outputs be deposited with identifiers, so that every figure can be regenerated. The report is complete when a reader can take the deposited data and reproduce the pooled estimate, its intervals and each sensitivity analysis.
