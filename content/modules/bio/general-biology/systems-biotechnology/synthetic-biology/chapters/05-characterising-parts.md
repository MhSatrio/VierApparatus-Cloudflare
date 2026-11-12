---
title: "Characterising Parts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The measurement of the behaviour of a biological part, such as the strength of a promoter or the response of a regulator, in terms of standard units and reference controls, the use of a reference part to calibrate measurements across laboratories, the dose response of a part to its input as a curve with its parameters, the variability between cells, plasmids and days of measurement, the use of fluorescence and its calibration to molecule numbers, and the reporting of characterisation with the conditions and the reference that make it comparable."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Characterise the response of a promoter to an input with a dose-response curve and report its parameters with their intervals."
  - "Explain why a reference part is needed to make measurements comparable across laboratories."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Characterisation measures how a part behaves under defined conditions. A promoter is characterised by the expression it produces, a regulator by the response of its target to its concentration, and a device by its input-output relation. Without characterisation a part cannot be chosen for a design, because the designer cannot predict its performance. The data are usually a dose-response curve, which shows the output across a range of inputs, and the parameters of the curve, such as the maximal output and the input at half maximum, summarise it.

Measurements made in different laboratories are not directly comparable, because the instruments, the strains and the growth conditions differ. A reference part, a promoter whose behaviour is agreed, is measured alongside the test part, and the test part's output is reported relative to the reference. This calibration allows results from different groups to be compared, and it is a practical requirement for any shared library of parts.

Fluorescence is the usual measure of expression, and its relation to the number of molecules must be calibrated before absolute values are reported. The brightness of a reporter depends on the instrument, the gain and the medium, and a calibration with a known standard is needed to convert it to molecule numbers. Reports that give only arbitrary fluorescence units cannot be compared with those from other laboratories.

Variability is substantial between cells, between plasmid copies, between days of measurement and between replicate cultures. Cumming (2014) argues that the characterisation should be reported with its variability and interval, and the replicates at each level should be counted. Ioannidis (2005) described how a result from a few measurements can be misleading, and the number of independent experiments behind each parameter should be stated. Sandve et al. (2013) and Peng (2011) argued that the conditions and the raw data should be recorded so that the characterisation can be repeated.
