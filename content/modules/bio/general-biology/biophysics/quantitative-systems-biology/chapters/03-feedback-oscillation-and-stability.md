---
title: "Feedback, Oscillation and Stability"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How negative and positive feedback loops regulate biological systems, how feedback produces stable steady states, bistable switches and sustained oscillations, the conditions under which a steady state is stable, and why these properties explain homeostasis, cell-fate decisions and circadian rhythms."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how negative feedback stabilises a biological variable and how positive feedback can produce two stable states."
  - "Describe the conditions under which a network of reactions oscillates and how a stable steady state is identified."
references:
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Feedback is the central regulatory idea of systems biology. In negative feedback, the output of a process reduces its own rate, so that a variable is held near a set point. A cell that produces an enzyme whose product inhibits the enzyme's own synthesis keeps the product concentration within a narrow range, and many homeostatic systems in the body work this way. Kitano (2002) discussed how such loops are common in the signalling networks that control cellular responses, and how they determine how quickly a cell returns to its normal state after a disturbance.

Positive feedback, in which a product increases its own production, can make a system switch. A network with two self-activating proteins that repress each other can settle into one of two stable states, depending on its history, and a cell that commits to a fate often does so by this kind of bistable switch. Alberts et al. (2022) describe the switches that control the cell cycle and cell differentiation, in which a threshold must be crossed before the change becomes irreversible.

A steady state is stable if small disturbances decay back to it. The stability can be assessed by linearising the equations around the steady state and examining the eigenvalues of the resulting matrix. If all eigenvalues have negative real parts, the state is stable. Where some eigenvalues have positive real parts, the system moves away from the steady state, and this can lead to oscillation if the eigenvalues are complex.

Sustained oscillations require at least one negative feedback loop with a time delay, which is provided by the time needed for transcription, translation or transport. The circadian clock is an example, in which a set of genes and proteins inhibit their own expression with a delay of roughly a day. The period of the oscillation depends on the delays and on the strength of the feedback.

These properties make feedback an essential object of study. A model of a network that lacks the correct feedback will fail to reproduce the stability or the switching that the cell displays.
