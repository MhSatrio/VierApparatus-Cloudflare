---
title: "Waiting Times and Single Events"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The distribution of waiting times between rare biological events, including the exponential distribution that describes events of constant rate, the gamma distribution that arises when several sequential steps must occur, how the waiting time distribution reveals the number of hidden steps and how these distributions are estimated from single-molecule and single-cell records."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a constant-rate event has an exponential waiting time distribution and what a multi-step process gives instead."
  - "Estimate the number of hidden sequential steps from the shape of a measured waiting time distribution."
references:
  - "Gillespie, D. T. (1977). Exact stochastic simulation of coupled chemical reactions. The Journal of Physical Chemistry, 81(25), 2340-2361. https://doi.org/10.1021/j100540a008"
  - "Berg, H. C., & Purcell, E. M. (1977). Physics of chemoreception. Biophysical Journal, 20(2), 193-219. https://doi.org/10.1016/S0006-3495(77)85544-6"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

A rare event that occurs at a constant rate, such as the binding of a molecule to a site at a fixed concentration, has a waiting time that follows an exponential distribution. The distribution is memoryless: the chance that the event occurs in the next interval does not depend on how long the system has already waited. The mean waiting time is the inverse of the rate, and the distribution is fully described by that single parameter. Gillespie (1977) built the simulation of reactions on this property, since each reaction's time to occur is exponentially distributed.

Many biological events are not memoryless, because they require several steps in sequence. A molecule that must undergo two conformational changes before it can act has a waiting time that is the sum of two exponential times, which is a gamma distribution with shape parameter two. The distribution is skewed, with few very short waits, and its shape reveals the number of steps that were hidden in the process. Berg and Purcell (1977) analysed the waiting times of molecules arriving at receptors, where the statistics of arrival and binding set the limits of detection.

The estimation of the waiting time distribution requires many observations. A single-molecule or single-cell record gives one waiting time, and a distribution is built from hundreds, so the resolution of the number of steps depends on the sample size. A small sample can be fitted equally well by several step numbers, and the choice must be tested with more data.

Ioannidis (2005) described how a fitted distribution with a free shape parameter can be made to match any histogram, and the choice of the number of steps must be justified by a comparison of models with a penalty for complexity. Platt (1964) recommended an experiment that could distinguish between the models, such as one that changes the rate of the first step and tests whether the waiting time distribution changes as predicted.

The waiting time reveals the process, and its shape reports the number of steps that the process contains.
