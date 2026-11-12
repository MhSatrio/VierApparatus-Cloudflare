---
title: "Stochastic Effects"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The randomness of biochemical reactions when the numbers of molecules are small, the noise in gene expression that makes identical cells differ, the stochastic simulation algorithm that simulates reaction events one at a time, the difference between the deterministic average of a stochastic process and the trajectory of a single cell, the conditions under which noise is large enough to change the behaviour of a switch or an oscillator, and the reporting of the number of replicates and runs needed to characterise a stochastic model."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a deterministic differential equation model can fail when the numbers of molecules are small and identify the conditions that make noise important."
  - "Describe a stochastic simulation and state the number of runs needed to estimate the distribution of an outcome."
references:
  - "Elowitz, M. B., & Leibler, S. (2000). A synthetic oscillatory network of transcriptional regulators. Nature, 403(6767), 335-338. https://doi.org/10.1038/35002125"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Deterministic models describe the average behaviour of a system, but a cell contains a small number of many of its molecules, and their reactions are random events. When a gene is expressed at a low level, a single transcription event can change its product number substantially, and identical cells in the same environment differ in their protein content. Elowitz and Leibler (2000) observed this cell-to-cell variation in their oscillator, which showed that the behaviour of a single cell can differ from the population average.

The random timing of reactions is described by the stochastic simulation algorithm, which chooses the next reaction and the time at which it occurs from the rates of all possible reactions. Each run produces one trajectory, and the trajectories differ because the random choices differ. A deterministic model gives the mean of these trajectories only in the limit of large numbers, and this mean may not be a typical trajectory of any cell.

Noise is important when it can change the behaviour of a system. A switch whose two states are separated by a threshold may flip randomly if the noise is large, and an oscillator may lose its regularity or its synchrony between cells. The importance of noise depends on the number of molecules involved and on the time scales of the reactions, and a model should be checked for stochastic effects before its deterministic predictions are trusted.

A stochastic model must be characterised by its distribution, not by a single run. The number of runs needed depends on the precision required for the quantity of interest, and the variability across runs should be reported. Cumming (2014) argues that the distribution and its summaries should be shown with their intervals, and Sandve et al. (2013) recommended recording the random seeds and the number of runs, so that the stochastic results can be reproduced.
