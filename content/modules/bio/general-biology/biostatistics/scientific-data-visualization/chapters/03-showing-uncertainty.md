---
title: "Showing Uncertainty"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The display of the precision of an estimate in a figure through error bars, confidence intervals, standard errors and prediction intervals, the confusion between standard deviation and standard error that makes a bar of the mean with error bars ambiguous, the choice of the quantity shown and its label, the interpretation of overlapping intervals, and the principle that a figure should show the uncertainty of an estimate rather than only its central value."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish a standard deviation, a standard error and a confidence interval and state which one a figure shows."
  - "Label the error bars of a figure so that a reader can tell what they represent and how to interpret overlap."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Weissgerber, T. L., Milic, N. M., Winham, S. J., & Garovic, V. D. (2015). Beyond Bar and Line Graphs: Time for a New Data Presentation Paradigm. PLOS Biology, 13(4), e1002128. https://doi.org/10.1371/journal.pbio.1002128"
  - "Rougier, N. P., Droettboom, M., & Bourne, P. E. (2014). Ten Simple Rules for Better Figures. PLoS Computational Biology, 10(9), e1003833. https://doi.org/10.1371/journal.pcbi.1003833"
---

A figure that shows only the central value of an estimate hides how precise the estimate is. Error bars are the usual means of showing precision, but the term is used for several quantities, and a bar with error bars means different things depending on which quantity is drawn. Cumming (2014) argues that the interval of an estimate is the quantity of interest, and a figure should show it explicitly rather than leaving the reader to guess.

The standard deviation describes the spread of the observations, and it does not shrink as the sample grows. The standard error is the standard deviation divided by the square root of the sample size, and it describes the precision of the mean. A confidence interval is a range around the mean, usually two standard errors wide for a large sample, that covers the true value with a stated probability. Each quantity answers a different question, and a figure that does not state which one it shows invites misreading, since a standard deviation bar can look like a confidence interval.

The label of the error bars should state the quantity shown, and the legend should give the sample size. A reader who sees a bar of the mean with a bar of the standard deviation may compare it with a difference in means and conclude wrongly. Weissgerber et al. (2015) noted that many figures in the biological literature do not state what their error bars represent, and this ambiguity is easily removed by a label.

Overlapping intervals are often misread as evidence for or against a difference. Two intervals that overlap may still show a difference, and two that do not overlap are not always different in the way the reader supposes. Rougier et al. (2014) advised that figures should show the quantity that the analysis tests, and the interval of the difference is usually more informative than the intervals of the two means. Cumming (2014) recommended showing the difference with its interval for this reason.
