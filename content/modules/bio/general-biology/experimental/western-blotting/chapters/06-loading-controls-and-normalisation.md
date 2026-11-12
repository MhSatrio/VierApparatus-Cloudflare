---
title: "Loading Controls and Normalisation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How a loading control, a protein assumed to be constant across samples, is used to correct the target signal for differences in the amount loaded, how the choice of loading control is validated and why normalisation can mislead when the control itself changes."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a loading control and test that its signal is constant across the conditions being compared."
  - "Normalise a target band to a loading control and report the calculation so that it can be checked."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Towbin, H., Staehelin, T., & Gordon, J. (1979). Electrophoretic transfer of proteins from polyacrylamide gels to nitrocellulose sheets: Procedure and some applications. Proceedings of the National Academy of Sciences of the United States of America, 76(9), 4350-4354. https://doi.org/10.1073/pnas.76.9.4350"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

Western blots are compared between samples, and the amount of protein loaded into each lane must be equal for the comparison to mean anything. A loading control is a protein that is assumed to be present at the same level in every sample, and its band is used to correct the target band for differences in loading and transfer. Towbin et al. (1979) established the transfer on which the comparison depends, and the loading control is what allows the transfer and loading to be separated from the biology.

The assumption that the control is constant must be tested. Commonly used housekeeping proteins, such as those of the cytoskeleton or of glycolysis, change with cell type, treatment and growth conditions, and a control that moves with the treatment will remove or create the effect the experiment is looking for. The stability of the candidate control is checked across the full set of conditions, and a control that is unstable is replaced.

The normalisation is the division of the target band intensity by the control intensity, within the linear range of both signals. The result is a ratio that can be compared between lanes. The calculation must be stated, including whether the control was taken from the same membrane and whether the ratio was then compared to a reference lane.

Platt (1964) argued that a method is most informative when it tests a clear alternative, and a loading control is a test of the alternative that the difference is due to loading. A result that disappears when the loading is corrected is a warning, and it should be reported.

Ioannidis (2005) described how a choice of normalisation made after seeing the data can produce an apparent effect, and the control should be chosen before the experiment. Alberts et al. (2022) describe the housekeeping functions of the proteins commonly used as controls, which explains why some of them are not constant.
