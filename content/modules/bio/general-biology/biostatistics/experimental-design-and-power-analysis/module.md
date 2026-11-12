---
title: "Experimental Design and Power Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The planning of biological experiments before data are collected, covering randomisation and blocking, the unit of replication and the error of pseudoreplication, the effect size and variance that a power calculation needs, the sample size for two groups and for several factors, sequential designs with their stopping rules, and the reporting of the design and its power so that a null result can be interpreted."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Plan the number of units per group for a comparison, stating the effect size, variance, significance level and power that the calculation assumes."
  - "Explain how randomisation, blocking and the unit of replication determine what an experiment can and cannot show."
references:
  - "Button, K. S., Ioannidis, J. P. A., Mokrysz, C., Nosek, B. A., Flint, J., Robinson, E. S. J., & Munafò, M. R. (2013). Power failure: why small sample size undermines the reliability of neuroscience. Nature Reviews Neuroscience, 14(5), 365-376. https://doi.org/10.1038/nrn3475"
  - "Lehr, R. (1992). Sixteen S-squared over D-squared: A relation for crude sample size estimates. Statistics in Medicine, 11(8), 1099-1102. https://doi.org/10.1002/sim.4780110811"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Power analysis asks how many units an experiment needs to detect an effect of a stated size with a stated probability. The question is best asked before any data are collected. A study too small to detect the effect it was designed for wastes animals, cells and money, and its null result says little about whether the effect exists. Button et al. (2013) showed that many studies in neuroscience had power well below the level that their claimed effects required, and the reliability of their findings suffered accordingly.

The design of an experiment comes before its power. Randomisation allocates units to treatments without regard to their characteristics, blocking groups units that resemble each other so that comparisons are made within them, and replication supplies the estimate of variability on which every test depends. Lehr (1992) gave a simple rule for the sample size of a two-group comparison, which approximates the exact calculations that software now performs and shows how the required size grows with the variance and falls with the square of the difference to be detected.

The calculation needs three inputs that the experimenter must justify: the smallest effect worth detecting, the variance of the response, and the significance level and power chosen. Cumming (2014) argues that the effect of interest should be set by its biological meaning rather than by what makes the study feasible, and that the calculation is a statement about precision as well as about a test.

The chapters follow the order of a design. They cover randomisation and blocking, the unit of replication, the effect size and variance, the components of power, the sample size for two groups, unbalanced and multifactor designs, sequential designs, and the reporting of the design. Ioannidis (2005) described how small studies and flexible analyses produce findings that do not replicate, and a design fixed in advance is the main defence against that pattern. Sandve et al. (2013) recommended depositing the protocol with the data for the same reason.
