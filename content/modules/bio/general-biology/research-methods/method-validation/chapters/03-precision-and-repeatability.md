---
title: "Precision and Repeatability"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The assessment of the precision of a method through repeatability and intermediate precision, covering the design of replicate measurements within a single run to estimate repeatability, the design of measurements across days, operators and instruments to estimate intermediate precision, the analysis of variance that partitions the total variation into its components, the expression of precision as a standard deviation or coefficient of variation at several concentrations, the calculation of the confidence interval for the standard deviation, and the criteria that determine whether the precision is fit for the intended decision."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a study that separates repeatability within a run from intermediate precision across runs, operators and instruments."
  - "Partition the variation of a validation study into its components and express precision with an interval."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Precision describes the scatter of repeated measurements of the same material. Repeatability is the scatter obtained when the same operator measures the same material under the same conditions over a short period, and it sets the smallest difference that can be distinguished within a single run. Intermediate precision is the scatter obtained when the conditions vary across days, operators and instruments, and it is always at least as large as repeatability. Both must be reported, since a method may be repeatable in one laboratory and irreproducible across them.

The design of a precision study replicates the measurement in a structured way. Several runs are performed, each with several replicates, and the design records which operator, instrument and day each run used. Cumming (2014) argues that the estimate of precision should be reported with its interval, which depends on the number of runs as well as the number of replicates, and a study with many replicates in one run gives a narrower estimate of intermediate precision than it can support.

The analysis of variance partitions the total variation into the within-run and between-run components. The between-run component estimates the variation that arises from changing conditions, and its size determines the intermediate precision. Ioannidis (2005) described how a single run may underestimate the variation a method will show in routine use, and the partitioning exposes this underestimate.

Precision is expressed as a standard deviation or as a coefficient of variation, and it is often assessed at several concentrations because the variation frequently changes with the level measured. Peng (2011) argued that the calculation should be reproducible, so the formula and the software should be stated. The result is judged against the criteria set for the intended use, and a precision that is adequate near one concentration may be inadequate near another.
