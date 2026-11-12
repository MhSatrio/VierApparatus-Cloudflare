---
title: "Real-Time Detection"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How quantitative PCR measures product during the exponential phase using fluorescent reporters, the threshold cycle that is recorded for each reaction and the difference between DNA-binding dyes and sequence-specific probes."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a fluorescent signal rises with each cycle and how the threshold cycle is determined."
  - "Compare DNA-binding dyes with sequence-specific probes for real-time detection."
references:
  - "Bustin, S. A. (2000). Absolute quantification of mRNA using real-time reverse transcription polymerase chain reaction assays. Journal of Molecular Endocrinology, 25(2), 169-193. https://doi.org/10.1677/jme.0.0250169"
  - "Mullis, K. B., & Faloona, F. A. (1987). Specific synthesis of DNA in vitro via a polymerase-catalyzed chain reaction. Methods in Enzymology, 155, 335-350. https://doi.org/10.1016/0076-6879(87)55023-6"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Real-time PCR measures the product as it accumulates, rather than at the end of the run. A fluorescent signal is generated in proportion to the amount of double-stranded product, and the instrument records it after every cycle. The signal is low at first, because the product is below the detectable level, and it rises exponentially as the reaction proceeds. The cycle at which the signal crosses a set threshold is the threshold cycle, and it is the value recorded for each reaction. Because the threshold is reached earlier when the starting template is more abundant, the threshold cycle carries quantitative information.

Mullis and Faloona (1987) described the exponential amplification that makes this possible. Bustin (2000) emphasised that the threshold must be set within the exponential phase, where the signal is proportional to the template, and not in the plateau, where the relationship is lost. The threshold is therefore fixed in the same position for all the reactions in a comparison, and its position is reported.

Two classes of reporter are common. DNA-binding dyes fluoresce when they bind double-stranded DNA, so they report any product, including primer-dimers and off-target bands. Sequence-specific probes carry a reporter and a quencher that separate when the probe is cleaved during amplification, so they report only the intended product. The probes give greater specificity at a higher cost, and the dye requires a melting curve to show that the product is single.

The data are plotted as amplification curves, and the efficiency is calculated from the slope of the threshold cycle against the logarithm of a dilution series. An efficiency close to one hundred per cent is the standard for a reliable assay.

Ioannidis (2005) described how automated thresholds can produce differences that depend on the software setting, so the threshold rule should be fixed in advance and reported. Alberts et al. (2022) describe the transcripts commonly measured this way.
