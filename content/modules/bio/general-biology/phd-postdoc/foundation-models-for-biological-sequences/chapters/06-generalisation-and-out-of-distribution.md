---
title: "Generalisation and Out-of-Distribution Performance"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The generalisation of sequence models to inputs unlike those in the training data, covering the distinction between interpolation within the training distribution and extrapolation to sequences from new families, organisms or designed sequences, the construction of out-of-distribution test sets by splitting on family, fold or taxonomic group, the degradation of performance that is often observed as the distance from the training distribution grows, the calibration of uncertainty on out-of-distribution inputs, the danger of confident predictions on inputs the model has never seen, and the reporting of performance as a function of distance from the training data with its uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct an out-of-distribution test set by splitting on family or taxonomic group and state the question it answers."
  - "Report performance as a function of distance from the training data and identify where the model should not be trusted."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A model that performs well on the sequences it was trained on has demonstrated interpolation, not generalisation. The useful question is how it behaves on sequences unlike those it has seen, such as those from a new family, a new organism or a designed sequence. Ioannidis (2005) described how claims that rest on familiar cases are often assumed to hold for unfamiliar ones, and the out-of-distribution test is the means of testing that assumption directly.

An out-of-distribution test set is constructed by splitting the data on a boundary that defines novelty, such as the family, the fold or the taxonomic group. The split answers a specific question: how well does the model perform when the boundary is crossed? The boundary must be stated, and the test must be designed before the evaluation rather than chosen after the results are known. Munafò et al. (2017) argued that the conditions of evaluation should match the claim, and a claim of generalisation requires a test across the boundary.

Performance often degrades as the distance from the training distribution grows, and the degradation should be measured rather than assumed. Performance should be reported as a function of distance, with its interval at each level, since a single average over near and far cases hides the decline. Cumming (2014) argues that the intervals at the far end are usually the widest, because there are fewer examples, and this must be shown.

Models can be confident on inputs they have never seen, and their confidence does not reliably signal error. Calibration on out-of-distribution inputs must be tested separately from calibration on the training distribution. Peng (2011) argued that the procedure for constructing each test set must be described, so that the boundary and its effect can be reproduced by others.

The report should state where the model should not be trusted, identifying the regions of input space in which its performance is unknown or poor. A model that identifies its own limits is more useful than one that claims universal validity, and the statement protects users who might otherwise apply it beyond its evidence.
