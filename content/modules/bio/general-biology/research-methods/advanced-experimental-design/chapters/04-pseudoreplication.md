---
title: "Pseudoreplication and the Unit of Replication"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "Pseudoreplication and the correct identification of the unit of replication in experiments, covering the definition of the experimental unit as the smallest entity that can receive a treatment independently, the distinction between that unit and the sampling units measured within it, the common forms of pseudoreplication in biological work such as repeated measurements from one culture or several tissue sections from one animal, the consequences of pseudoreplication for the apparent sample size and the width of the interval, the use of hierarchical or mixed models to analyse data with several levels, and the statement of the unit of replication in every report."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the experimental unit in a design and distinguish it from the sampling units measured within it."
  - "Explain how pseudoreplication narrows the interval and state how a hierarchical analysis corrects for it."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

The experimental unit is the smallest entity that can receive a treatment independently of the others. A culture flask, a plant or an animal may each be an experimental unit, depending on how the treatment is applied. Measurements taken within a unit, such as several readings from one flask, are sampling units, and they are not independent replicates of the treatment. Confusing the two is the root of pseudoreplication, and the first task in any analysis is to identify the unit correctly.

Pseudoreplication is common in biological work. Several sections taken from one animal, several wells from one plate or repeated measurements from one culture are often analysed as though they were separate replicates. The apparent sample size then exceeds the true number of independent units, and the interval around the estimate is too narrow. Ioannidis (2005) described how inflated sample sizes produce false confidence in results that do not hold up under replication.

The consequence is a systematic overstatement of precision. A p-value computed on pseudoreplicated data is too small, and an interval is too narrow, so a difference that is not reliable may appear to be strongly supported. Cumming (2014) argues that the interval should reflect the true uncertainty, and the correct unit of replication is required to achieve this.

Designs with several levels of structure are analysed with hierarchical or mixed models, which estimate the variation at each level and treat the units appropriately. Peng (2011) argued that the analysis should be reproducible, and a model that states its levels explicitly makes the structure of the data visible to others. Every report should state the unit of replication, and the number of units, not the number of measurements, should be reported as the sample size.
