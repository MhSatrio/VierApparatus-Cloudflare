---
title: "Factorial and Nested Designs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "Factorial and nested experimental designs for questions with several factors or hierarchical structure, covering the crossing of two or more factors to estimate main effects and their interaction, the interpretation of an interaction as a dependence of one effect on another, the number of runs needed for a full factorial design and the fractional designs that reduce it, the nested arrangement in which units such as cells sit within animals and the need to treat the animal as the unit of replication, the split-plot arrangement in which one factor is applied to whole units and another within them, and the analysis appropriate to each structure."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a factorial design and interpret its main effects and interaction correctly."
  - "Identify a nested structure and state the level at which the treatment must be analysed."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A factorial design crosses two or more factors so that every combination is tested. Its advantage is that it estimates the main effect of each factor and also their interaction, which asks whether the effect of one factor depends on the level of another. Cumming (2014) argues that an interaction is often the more informative result, since it shows where a treatment works and where it does not, and a series of separate one-factor experiments cannot reveal it.

An interaction is interpreted as a difference in the effect of one factor across the levels of another. A drug that lowers a measurement in one strain and raises it in another shows an interaction, and reporting the main effect alone would hide it. Ioannidis (2005) described how averaging over subgroups can conceal real differences and produce a misleading general conclusion, so the interaction term must be estimated and reported with its interval.

The number of experimental runs in a full factorial design grows rapidly with the number of factors. Fractional designs test only a carefully chosen subset of combinations, and they are efficient when higher-order interactions can be assumed negligible. The choice must be justified in the design, because an assumption that proves false may confound effects that the fraction was designed to separate.

Nested designs arise when units sit within higher-level units, such as several cells within each animal. The animal is the unit to which the treatment was applied, and it is the appropriate unit of replication for the main comparison. Analysing the cells as independent replicates is pseudoreplication, and it produces intervals that are too narrow. Peng (2011) argued that the structure of the data must be described so that the correct analysis can be reproduced by others.
