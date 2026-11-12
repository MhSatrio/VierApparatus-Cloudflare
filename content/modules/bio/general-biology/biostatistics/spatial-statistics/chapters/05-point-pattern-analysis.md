---
title: "Point Pattern Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The analysis of events recorded as points, including the test of complete spatial randomness against clustering or regularity, the intensity function that describes how the expected number of events varies across a region, the K function and the pair correlation function that describe interactions at a range of distances, the edge correction needed when the region is bounded, and the simulation envelopes that show whether an observed pattern differs from the model."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Test a point pattern against complete spatial randomness and state the alternatives of clustering and regularity."
  - "Interpret a K function with its simulation envelope and explain why an edge correction is needed."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Legendre, P. (1993). Spatial autocorrelation: Trouble or new paradigm? Ecology, 74(6), 1659-1673. https://doi.org/10.2307/1939924"
---

A point pattern is a set of recorded events in a region, and the first question is whether the events are placed at random. Complete spatial randomness is the null model in which events are equally likely everywhere and independent of each other. Departures from it take two forms: clustering, in which events are closer together than random placement would give, and regularity, in which they are more evenly spaced. Each form suggests a different process, such as aggregation around a resource or competition between individuals for space.

The intensity function describes how the expected number of events varies across the region. A pattern may be random within a region of varying intensity, and in that case its clustering reflects the intensity rather than any interaction between events. Separating the two is essential, and the intensity should be estimated before the interaction is tested. Peng (2011) argued that such a decomposition must be reproducible, and the method used to estimate the intensity should be stated with its bandwidth or covariates.

The K function and the pair correlation function describe the interactions between events at a range of distances. The K function gives the expected number of further events within a distance of an event, divided by the intensity, and under complete spatial randomness it equals the area of a circle of that radius. The observed function is compared with a simulation envelope, drawn from many simulations of the model, and values outside the envelope indicate a departure at that distance. Legendre (1993) noted that the scale at which the departure occurs is as informative as its existence.

Events near the boundary of the region have neighbours outside it that were not recorded, and this edge effect biases the estimates of interaction. An edge correction adjusts for the missing neighbours, and the correction used should be stated. Sandve et al. (2013) recommended recording the simulation model, the number of simulations and the edge correction, since the envelope depends on them and a different choice can change the conclusion.
