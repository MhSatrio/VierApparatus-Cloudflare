---
title: "Strain Improvement Cycles"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The iterative cycle of strain improvement in metabolic engineering, in which a design is built, tested, analysed and redesigned, the use of high-throughput screening to test many variants and of selection to enrich the best, the role of models in choosing the next modification, the diminishing returns that set in as the easy gains are taken, the risk that improvements found in a screen do not survive scale-up, and the record of each cycle so that the engineering history can be traced and repeated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the design, build, test and analyse cycle of strain improvement and state the decision taken at each step."
  - "Explain why improvements found in a screen may not survive scale-up and how to test them."
references:
  - "Keasling, J. D. (2012). Synthetic biology and the development of tools for metabolic engineering. Metabolic Engineering, 14(3), 189-195. https://doi.org/10.1016/j.ymben.2012.01.004"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Strain improvement proceeds by cycles. A design is proposed, the modified strain is built, its performance is tested, and the results are analysed to decide the next design. Keasling (2012) described this iteration as the central practice of metabolic engineering, in which each cycle adds knowledge of how the host responds, and the cycles continue until the strain reaches the performance the process requires.

Screening allows many variants to be tested at once, which is useful when the effect of a change cannot be predicted. Variants may be grown in plates or microtitre wells, and their production is measured by a reporter or an assay. Selection enriches the best variants by making growth depend on production, so that the cells that produce more grow faster. Each method has its limits, since a screen measures a proxy of production, and a selection can favour variants that exploit the selection rather than produce the target.

Models help to choose the next modification. A model that predicts the effect of each change directs the engineer to the modifications most likely to help, and it reduces the number of variants that need to be built. The predictions must be tested, and the model should be refitted to the results of each cycle so that it improves as the strain does.

Improvements become harder to find as the easy gains are taken. The first changes often give large increases in performance, and later changes give small increments that may be within the variation between cultures. Ioannidis (2005) described how a result that is selected from many candidates is likely to overstate its effect, and an improvement found in a screen should be confirmed in replicate cultures before it is adopted. Cumming (2014) argues that each improvement should be reported with its interval, and Sandve et al. (2013) recommended recording every cycle so that the history of the strain can be followed.
