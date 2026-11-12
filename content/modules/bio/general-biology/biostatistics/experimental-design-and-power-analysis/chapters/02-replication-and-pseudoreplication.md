---
title: "Replication and Pseudoreplication"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The distinction between true replication, in which each experimental unit receives its own treatment, and pseudoreplication, in which repeated measurements or subsamples of one unit are counted as independent replicates, the consequences of pseudoreplication for the error term and the p-values, the choice of the experimental unit as the level of replication, and the designs in which nested or repeated measurements must be analysed with a model that respects their structure."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the experimental unit in a study and count the replicates at that level rather than at the level of measurement."
  - "Explain how pseudoreplication shrinks the error term and state two designs that avoid it."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Button, K. S., Ioannidis, J. P. A., Mokrysz, C., Nosek, B. A., Flint, J., Robinson, E. S. J., & Munafò, M. R. (2013). Power failure: why small sample size undermines the reliability of neuroscience. Nature Reviews Neuroscience, 14(5), 365-376. https://doi.org/10.1038/nrn3475"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A replicate is an experimental unit that has received the treatment independently of the other units. The experimental unit is the smallest entity to which a treatment is applied, which may be an animal, a culture flask, a plot of land or a patient. Replication at this level provides the variability on which the comparison depends, and the number of replicates is the number of experimental units in each group, not the number of measurements taken from them.

Pseudoreplication occurs when repeated measurements, subsamples or units that share a treatment are counted as independent replicates. Ten wells taken from one culture, all treated together, give one replicate of the treatment at the level of the culture, however many wells are measured. Treating the wells as independent inflates the sample size and shrinks the error term, so the p-values are too small and the confidence intervals too narrow. Button et al. (2013) noted that small and unreliable studies are a common product of such design errors, since the true number of independent units is hidden by the count of measurements.

Pseudoreplication can be avoided by two designs. In a nested design, the measurements sit inside a higher level, such as animals within litters or cells within cultures, and the analysis must include the level at which the treatment was allocated. In a repeated design, each unit is measured over time, and the correlation between its measurements must be modelled. The analysis must follow the structure of the design, and a test that ignores the structure is wrong even when its arithmetic is correct.

The count of replicates is part of the result. Cumming (2014) argues that an estimate should be reported with the number of independent units behind it, since the precision of the estimate depends on that number. Sandve et al. (2013) recommended recording the unit of replication in the description of the data, so that a reader can see whether the result rests on ten animals or on a hundred measurements from two animals.
