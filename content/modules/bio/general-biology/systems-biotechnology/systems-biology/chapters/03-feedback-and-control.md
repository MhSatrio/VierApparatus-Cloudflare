---
title: "Feedback and Control"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Feedback and feedforward control in biological systems, the negative feedback that stabilises a level against perturbation as in homeostasis, the positive feedback that amplifies a signal or creates bistability, the feedforward loop that filters transient inputs, the role of time delays in turning a stable loop into an oscillator, the sensitivity of a system to a parameter as a measure of how strongly its output depends on that parameter, and the need to measure the feedback in the system rather than infer it from the diagram."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Classify a feedback loop as negative or positive and state the behaviour that each produces in a biological system."
  - "Explain how a time delay in a negative feedback loop can produce sustained oscillation."
references:
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Elowitz, M. B., & Leibler, S. (2000). A synthetic oscillatory network of transcriptional regulators. Nature, 403(6767), 335-338. https://doi.org/10.1038/35002125"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Feedback is the return of part of a system's output to its input. Negative feedback opposes a change and tends to stabilise a level, as when a rise in a hormone reduces its own production and keeps the concentration within a range. Positive feedback reinforces a change, and it can amplify a small signal or create two stable states between which a system switches. Both are common in cells, and the behaviour of a system depends on the sign of its loops and on their strength.

Alon (2007) described how particular feedback and feedforward patterns recur in biological networks and perform defined functions. A feedforward loop, in which an input acts both directly and through an intermediate on the same output, can filter out brief transient inputs and respond only to sustained ones. The network motif that produces a specific function is one of the ways in which systems biology identifies the design principles of a network.

Time delays change the behaviour of negative feedback. A loop with a delay can overshoot the target level, and if the delay is long enough the system oscillates rather than settling. Elowitz and Leibler (2000) built a synthetic oscillator from transcriptional repressors, in which the delays of transcription and translation provide the necessary lag. The oscillation is a property of the loop and its delays, and it cannot be seen from the diagram of the loop alone.

The sensitivity of a system to a parameter measures how strongly its output changes when the parameter changes, and it is a quantitative guide to which components control a behaviour. Cumming (2014) argues that a sensitivity should be reported with its interval, since a sensitivity estimated from few experiments can be imprecise. Sandve et al. (2013) recommended recording the loop structure, the parameters and the sensitivity analysis together, so that the feedback can be measured and not assumed.
