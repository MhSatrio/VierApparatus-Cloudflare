---
title: "Fermentation Monitoring"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The monitoring of a fermentation during its run through online sensors and offline samples, covering the measurement of biomass by optical density and dry weight, the measurement of substrate and product by chromatography and enzymatic assays, the mass balance that closes the account of carbon and nitrogen across the run, the use of off-gas analysis to estimate the metabolic activity, the detection of deviations from the expected profile that signal a problem, and the record of the monitoring data so that the performance of a run can be assessed and compared."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the methods used to measure biomass, substrate and product during a fermentation and state the limit of each."
  - "Close a carbon mass balance over a run and explain what an unclosed balance indicates."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A fermentation is monitored so that its state is known and problems can be detected early. Biomass is measured by optical density, which is quick but depends on the size and the shape of the cells, and by dry weight, which is slower but more direct. The substrate and the products are measured by chromatography or by enzymatic assays on samples taken from the vessel. Each method has a range and a precision, and the choice depends on the quantity needed and the speed required.

The mass balance accounts for the carbon and the nitrogen that enter and leave the vessel. The carbon in the substrate must appear in the biomass, the products, the by-products and the carbon dioxide, and a balance that closes within the measurement error shows that the measurements are consistent. An unclosed balance indicates a missing product, a measurement error or a loss from the vessel, and it should be investigated before the yield is reported. Peng (2011) argued that such checks are part of what makes a result reproducible.

Off-gas analysis measures the oxygen consumed and the carbon dioxide produced, and from these the respiratory activity of the culture is estimated. The respiratory quotient, the ratio of carbon dioxide produced to oxygen consumed, indicates the substrates being used and the products being formed. The off-gas signal is continuous and is therefore valuable for detecting changes in the metabolism between samples.

Deviations from the expected profile signal a problem, such as a contamination, a failure of a control or a change in the strain. The expected profile is compared with the measured one at each time, and a departure beyond the expected variation triggers an investigation. Cumming (2014) argues that the variation should be shown with the measurements, and Ioannidis (2005) described how a deviation that is not examined may go unnoticed. Sandve et al. (2013) recommended recording the monitoring data with the run so that its performance can be assessed.
