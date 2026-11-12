---
title: "Standard Curves and Quantification"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How a standard curve is built from a dilution series of a known standard, how the sigmoidal shape is fitted with a four-parameter model, how unknown samples are read from the curve and how dilution and the working range are handled in the calculation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Build a standard curve from a dilution series and fit it with a model suited to a sigmoidal response."
  - "Read unknown samples from the curve and correct the result for dilution."
references:
  - "Engvall, E., & Perlmann, P. (1971). Enzyme-linked immunosorbent assay (ELISA): Quantitative assay of immunoglobulin G. Immunochemistry, 8(9), 871-874. https://doi.org/10.1016/0019-2791(71)90454-X"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

The standard curve turns absorbance into concentration. A standard of known concentration is diluted in a series, usually across at least six points, and each dilution is measured on the same plate as the samples. The absorbance is plotted against the concentration, and the curve is fitted to the points. Engvall and Perlmann (1971) established the quantitative form of the assay, in which the response of the enzyme label is calibrated against a standard. The fit is the step on which all quantification depends.

The response is sigmoidal, so a straight line is usually a poor model over the full range. A four-parameter logistic model describes the lower and upper plateaus, the midpoint and the slope, and it fits the curved region accurately. The fit must be checked by the residuals, which should be randomly distributed around the curve. A systematic pattern in the residuals shows that the model is wrong, and a different model or a narrower range should be used.

Unknown samples are read from the curve by inverting the fitted equation, and the result is multiplied by any dilution factor. Samples whose absorbance falls outside the range of the standard are not reliable, and they must be diluted and measured again. A sample that gives a signal below the lowest standard is reported as below the limit of quantification rather than as a value.

Platt (1964) argued that a measurement is most informative when its calibration is tested against a clear alternative, and a standard curve is a calibration that can be checked by a spiked sample of known concentration. The recovery of a known amount added to a sample shows whether the matrix changes the response.

Ioannidis (2005) described how a fitted curve can give an apparently precise value that depends on the choice of model, and the model and its fit should be reported. Alberts et al. (2022) describe the binding that produces the sigmoidal response.
