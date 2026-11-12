---
title: "Neural Data Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The statistical and information-theoretic analysis of recorded neural data, including the estimation of firing rates and their variability, the spike train statistics such as the coefficient of variation and the correlation between spike trains, the decoding of stimuli or behaviour from population activity, the mutual information between neural responses and stimuli, the dimensionality reduction that finds low-dimensional structure in population activity, the correction of analyses for the number of neurons and the multiple comparisons they involve, and the reporting of analyses with their data and code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the firing rate of a neuron and its variability from a spike train and state the window or kernel choice that the estimate depends on."
  - "Decode a stimulus from population activity and report the accuracy of the decoder with its interval and the cross-validation used."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Recorded neural data are analysed to extract the quantities that a model or a hypothesis predicts. The firing rate of a neuron is estimated by counting spikes in a window or by convolving the spike train with a kernel, and the estimate depends on the width of the window or the kernel. A narrow window follows rapid changes but is noisy, and a wide window is smooth but blurs the timing. The choice must be reported, and the conclusions should be checked against a range of choices.

The variability of spiking is described by statistics such as the coefficient of variation of the interspike intervals, and the correlations between the spike trains of pairs of neurons reveal shared input or coupling. These statistics are sensitive to the recording length and to the rate of firing, and their estimates from short recordings are unreliable. Cumming (2014) argues that the statistics should be reported with their intervals, since a correlation estimated from a short recording may be far from its true value.

Decoding asks how well a stimulus or a behaviour can be recovered from the activity of a population of neurons. A decoder is trained on part of the data and tested on the rest, and its accuracy is the measure of how much information the population carries. The cross-validation scheme must keep the training and test data separate, since a decoder tested on the data that trained it will look too accurate.

Mutual information measures how much the response of a neuron reduces the uncertainty about the stimulus, and it is estimated from the joint distribution of responses and stimuli. Its estimate is biased upward when the number of responses is small relative to the number of possible values, and a bias correction must be applied and reported. Ioannidis (2005) described how the flexibility of an analysis can produce a result that does not hold, and the analysis should be fixed before the data are examined. Sandve et al. (2013) recommended recording the estimator, the window and the correction used.
