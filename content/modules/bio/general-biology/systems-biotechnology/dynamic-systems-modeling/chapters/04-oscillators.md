---
title: "Oscillators"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Biological oscillators in which a negative feedback loop with a delay produces sustained rhythmic changes in concentration, the repressilator built from three transcriptional repressors arranged in a cycle, the role of the delays in transcription and translation and of the cooperativity of repression in making the system oscillate, the limit cycle as the stable oscillation of a model, the circadian rhythm as a biological example, and the reporting of the conditions under which an oscillation was observed and its period and amplitude measured."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a negative feedback loop with delays and cooperative repression can produce sustained oscillation."
  - "Describe the repressilator and state how its period and amplitude depend on the parameters and the delays."
references:
  - "Elowitz, M. B., & Leibler, S. (2000). A synthetic oscillatory network of transcriptional regulators. Nature, 403(6767), 335-338. https://doi.org/10.1038/35002125"
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An oscillator is a system whose variables rise and fall in a regular cycle. In biology, oscillations occur in circadian rhythms, in the cell cycle and in the pulsing of signalling molecules. Their common requirement is a negative feedback loop in which the output represses its own production, with a delay between the repression and the response. Without the delay, the system settles to a steady state, but with a sufficient delay and strong enough repression the state becomes unstable and the concentrations oscillate.

Elowitz and Leibler (2000) built a synthetic oscillator, the repressilator, from three transcriptional repressors arranged in a ring, in which each represses the next and the last represses the first. The circuit was introduced into Escherichia coli, and the fluorescence of a reporter showed sustained oscillations in individual cells. The period depended on the rates of transcription, translation and degradation, and the cooperativity of repression was required for the oscillation to occur.

The delays are the essential element. Transcription and translation take time, so a repressor responds to the state of its regulator some time earlier, and this lag allows the system to overshoot and swing back. Alon (2007) described how negative feedback with a time delay is one of the recurring motifs that generate such dynamics, and the design of an oscillator depends on the balance of these delays and the strength of the feedback.

The oscillation is a stable limit cycle in the model, a closed trajectory to which nearby trajectories converge. Its period and amplitude are properties of the cycle, and they can be measured in cells as well as simulated. Cumming (2014) argues that the period should be reported with its variability across cells and experiments, since individual cells in a population do not oscillate in perfect synchrony. Sandve et al. (2013) recommended recording the conditions and the measurements from which the period was derived.
