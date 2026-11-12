---
title: "Measuring Rhythms"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The measurement of biological rhythms in living organisms and in tissues, covering the sampling of a variable at regular intervals over several cycles, the detection of a rhythm and the estimation of its period, amplitude and phase by sinusoidal fitting and by periodogram methods, the minimum number of cycles and of samples per cycle needed for reliable estimates, the separation of the circadian rhythm from the masking effects of the environment such as light and feeding, the recording of activity, temperature and gene expression as rhythmic markers, and the constant conditions that reveal an endogenous rhythm."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the period, amplitude and phase of a rhythm from a time series by fitting a sinusoid and state the sampling needed for a reliable estimate."
  - "Explain why an endogenous circadian rhythm must be measured in constant conditions and how masking by light or feeding can mislead."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A rhythm is measured by sampling a variable repeatedly over time and then estimating the features of the cycle. The period is the time of one complete cycle, the amplitude is the size of the rise and fall, and the phase is the time at which the cycle reaches its peak. These quantities are estimated by fitting a sinusoid to the data or by computing a periodogram, which shows the strength of the rhythm at each candidate period. The fit gives the three quantities together with their uncertainties.

The reliability of the estimate depends on the sampling. Several cycles must be observed, since a rhythm seen over one cycle cannot be distinguished from a transient change, and several samples per cycle are needed to define its shape. The number of cycles and the number of samples per cycle determine the precision of the period and the phase, and these should be chosen before the measurement is made.

Rhythms measured in the natural environment are masked by the environment, because light and feeding follow their own daily cycles and change the variable directly. An apparent circadian rhythm may be a masking effect of the light cycle, and the endogenous rhythm is revealed only in constant conditions, where light and feeding are held constant. The study design must include such conditions when an endogenous rhythm is claimed.

Recordings of activity, body temperature and gene expression are the usual rhythmic markers. Each has its own dynamics and its own noise, and a marker should be chosen for its relation to the clock. Cumming (2014) argues that the period, amplitude and phase should be reported with their intervals, and Ioannidis (2005) described how a rhythm detected in a few animals may not be found in a larger study. Sandve et al. (2013) recommended recording the sampling schedule, the conditions and the method of fitting.
