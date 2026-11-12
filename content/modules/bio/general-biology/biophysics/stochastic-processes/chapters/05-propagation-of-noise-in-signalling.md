---
title: "Propagation of Noise in Signalling"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How noise introduced at one step of a signalling pathway propagates to later steps, how cascades amplify or attenuate fluctuations, how feedback loops change the spread of a signal and how the reliability of a cellular decision depends on the noise at its input and the structure of the pathway."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how fluctuations at one step of a signalling cascade propagate to the output."
  - "Describe how feedback changes the noise in a signal and how this affects the reliability of a decision."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Berg, H. C., & Purcell, E. M. (1977). Physics of chemoreception. Biophysical Journal, 20(2), 193-219. https://doi.org/10.1016/S0006-3495(77)85544-6"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

A signalling pathway is a sequence of steps in which one molecule activates the next, and each step adds its own randomness to the signal. Alberts et al. (2022) describe the kinase cascades and second messengers through which a cell relays a signal, and at each stage the number of activated molecules fluctuates. The fluctuation of the output depends on the fluctuations at every step, and the noise is passed down the cascade. A stage that amplifies the signal also amplifies its noise, so amplification does not by itself improve the reliability of the output.

Berg and Purcell (1977) showed that the precision with which a cell can measure a concentration is limited by the number of receptor events it can count, and noise in the receptor stage sets the floor for every later stage. Downstream steps can average out fluctuations if they integrate the signal over time, and this filtering is one way in which a pathway improves its reliability at the cost of response time.

Feedback changes the picture. Negative feedback reduces the variation of an output around its set point, while positive feedback can make the output switch between states and amplify fluctuations into distinct responses. The structure of the feedback therefore determines whether noise is suppressed or exploited, and a pathway can be built to use noise for a binary decision.

The reliability of a decision depends on the noise at the input and the structure of the pathway that carries it. A decision with a threshold is reliable only when the signal is well separated from the threshold relative to its noise, and a pathway that adds noise near the threshold makes the decision unreliable. The design of the pathway is therefore a trade-off between sensitivity and reliability.

Ioannidis (2005) described how a model of a pathway that does not include the noise may predict a precise response that the cell does not achieve, and Platt (1964) recommended measurements of the response in single cells that test whether the predicted variation is present.

The signal that a cell transmits is never perfectly faithful, and the faithfulness depends on where the noise enters and how the pathway handles it.
