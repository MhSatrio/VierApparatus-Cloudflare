---
title: "Statistics of Sparse Count Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The statistical treatment of sparse, overdispersed count data from single-cell experiments, covering the normalisation that adjusts for differences in sequencing depth between cells, the transformation of counts that stabilises their variance, the negative binomial model that captures overdispersion in counts better than the Poisson model, the zero-inflated models that represent dropout separately from true absence, the differential expression tests that compare groups of cells while accounting for the cell as a source of replication, the pseudoreplication that arises when cells from one donor are treated as independent, and the reporting of effect sizes with intervals and the model used."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a count model that captures overdispersion and explain why the Poisson model is usually inadequate for single-cell data."
  - "Identify pseudoreplication in a differential expression analysis and state how the donor should be treated as the unit of replication."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Single-cell counts are sparse and overdispersed: most genes are zero in most cells, and the variance among cells exceeds what a simple Poisson model would predict. The normalisation must first adjust for the differences in sequencing depth between cells, since a cell that was sequenced more deeply will show higher counts for every gene. Without this adjustment, differences in depth are mistaken for differences in biology.

The transformation of counts stabilises their variance, so that the statistical methods designed for approximately normal data can be applied. The choice of transformation affects the results, and it should be stated. Ioannidis (2005) described how analytic choices made after the data are seen can change the conclusion, and the transformation should be fixed in advance of the test.

The negative binomial model captures overdispersion more accurately than the Poisson model, and it is widely used for single-cell count data. Zero-inflated models go further by representing the excess zeros as dropout, separate from the true absence of expression. The choice between them depends on the data, and the fit should be checked against the observed distribution. Cumming (2014) argues that the estimated fold change should be reported with its interval, since the precision of the estimate depends on the model.

The most important statistical error in single-cell work is pseudoreplication. Cells from one donor, one animal or one culture are not independent replicates of the condition, because they share the environment and the genetic background of their source. Treating each cell as an independent replicate produces intervals that are far too narrow and p-values that are far too small. The donor or the culture should be treated as the unit of replication, and the analysis should use a model that accounts for the hierarchy. Peng (2011) argued that the structure of the data must be stated for the analysis to be reproducible, and Munafò et al. (2017) argued that the unit of replication should be reported explicitly.
