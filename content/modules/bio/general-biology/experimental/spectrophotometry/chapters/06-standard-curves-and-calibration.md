---
title: "Standard Curves and Calibration"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How a standard curve is constructed, how its linear range is determined, how unknowns are read from it and how the uncertainty of a concentration is propagated from the curve."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct a standard curve and determine its linear range."
  - "Estimate the uncertainty of an unknown concentration read from a curve."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Most spectrophotometric and fluorescence measurements are converted into concentrations with a standard curve, which relates the signal to the concentration of known standards. The standards are prepared by serial dilution of a stock whose concentration is itself known, and each standard is measured under the same conditions as the unknowns. The curve is fitted by regression, and the unknowns are read from it. The accuracy of every result depends on the quality of the curve, and the curve must be made again whenever the reagents or instrument settings change.

The linear range is the interval over which the signal is proportional to concentration. Outside that range the curve bends, because the detector saturates, the reagent is exhausted or the molecules interact. Unknowns must fall within the linear range, and samples that give signals above it must be diluted and remeasured. Extrapolation beyond the highest standard gives unreliable values and should be avoided.

The regression should be checked. A correlation coefficient close to one is not sufficient, because a poorly fitting curve can still give a high correlation. The residuals should be examined for a pattern, and a weighted fit may be needed when the variance of the signal increases with concentration. The intercept should be compared with the blank, since a large intercept indicates a background problem.

The uncertainty of an unknown is propagated from the uncertainty of the curve. Replicate standards and replicate unknowns estimate the random error, and the confidence interval of the unknown concentration widens as the signal lies further from the centre of the curve. Reporting only the central value hides this uncertainty.

Ioannidis (2005) described how a method that is fitted and refitted until it gives the expected result can produce misleading findings. The standard curve should be fixed by the protocol and not adjusted to suit the data. Alberts et al. (2022) describe the molecules whose quantities are estimated by these curves. The record should include the standards, the fit, the residuals and the linear range used.
