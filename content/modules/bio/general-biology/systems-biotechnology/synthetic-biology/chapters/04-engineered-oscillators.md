---
title: "Engineered Oscillators"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Engineered oscillators built from transcriptional repressors arranged in a loop, the repressilator of three repressors that each inhibit the next, the role of the number of repressors and the strength of their repression in determining whether the circuit oscillates, the period set by transcription and translation rates and the degradation of the proteins, the damping of oscillations in individual cells and their loss of synchrony across a population, and the measurement of period and amplitude in single cells with fluorescent reporters."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the repressilator and explain why three repressors in a cycle can oscillate while two cannot."
  - "Measure the period and amplitude of an engineered oscillator in single cells and report their variability across the population."
references:
  - "Elowitz, M. B., & Leibler, S. (2000). A synthetic oscillatory network of transcriptional regulators. Nature, 403(6767), 335-338. https://doi.org/10.1038/35002125"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Elowitz and Leibler (2000) designed the repressilator as an engineered oscillator. Three transcriptional repressors are arranged in a ring, so that the first represses the second, the second represses the third and the third represses the first. The loop is negative feedback with delays, and when the repression is strong and cooperative enough the concentrations of the three repressors rise and fall in turn. The design was chosen because a loop of three is the smallest ring that can oscillate under these conditions, and the two-component version does not produce the required delay.

The oscillation depends on the balance of the parameters. The strength of each repression, the rates of transcription and translation and the rates at which the proteins are degraded all determine whether the circuit oscillates and with what period. A circuit that degrades its proteins too quickly loses the delay it needs, and one that represses too weakly settles to a steady state. The parameters are therefore design targets, and the circuit must be tuned to them.

The period of the repressilator is set by the time scales of its reactions, which in Elowitz and Leibler's construction was of the order of hours, and its amplitude is limited by the repression. The fluorescent reporters used to observe the circuit allowed the oscillation to be followed in single cells, and the period and amplitude of each cell could be measured over time.

Individual cells oscillate with variable periods and amplitudes, and the oscillations lose synchrony across the population over time. Cumming (2014) argues that the period should be reported as a distribution across cells with its interval, rather than as a single value from a population average that hides the variation. Sandve et al. (2013) recommended recording the reporters, the imaging conditions and the method for measuring the period, so that the oscillation can be compared between laboratories.
