---
title: "Analysis Planned With the Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The planning of the statistical analysis together with the experimental design so that the experiment answers the question it was built to answer, covering the matching of the model to the design structure, including blocks, nested levels and interactions, the specification of the primary contrast and its estimate with an interval before the data are seen, the handling of multiple comparisons when several contrasts are tested, the decision rules for transformation and for outliers fixed in advance, the power of the planned analysis for the effect of interest, and the reporting of the analysis in a form that allows an independent analyst to reproduce the result."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify the statistical model that matches the blocking, nesting and interaction structure of a given design."
  - "Explain why the primary contrast must be fixed before the data are seen and how multiple comparisons are controlled."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

An experiment is only as informative as the analysis that is applied to it, and the analysis should be planned together with the design. The model must reflect the structure of the experiment, including the blocks, the nested levels and the interactions that the design was built to test. An analysis that ignores the structure, such as one that treats repeated measurements as independent, will answer a different question from the one the experiment asks, and it may give a misleading answer with apparent confidence.

The primary contrast, which is the comparison that the study is designed to estimate, should be specified before the data are seen. The estimate should be reported with its interval, since the interval conveys the uncertainty of the main finding. Cumming (2014) argues that a single well-specified contrast with its interval is more informative than a long list of tests, and the primary analysis should be presented first.

When several contrasts are tested, the chance of finding a spurious difference increases with their number. A correction for multiple comparisons, or a hierarchical testing procedure that fixes the order of the tests, controls this risk. Ioannidis (2005) described how the testing of many outcomes without correction is a common route to false findings, and the procedure should be stated in the analysis plan.

Decisions about transformation of the data and the treatment of outliers should be made in advance and recorded. A rule adopted after the data are seen can change the result, and a reader cannot tell whether it was chosen to favour a conclusion. Peng (2011) argued that the analysis must be reproducible, which requires that each decision be written down and its code shared. The power of the planned analysis for the effect of interest should be calculated and reported, so that the reader knows what the experiment could have detected.
