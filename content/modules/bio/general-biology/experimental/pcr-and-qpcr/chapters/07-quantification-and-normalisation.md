---
title: "Quantification and Normalisation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How qPCR data are converted into quantities, through a standard curve for absolute quantification and through relative comparison with a reference gene, and why normalisation to stable reference genes is needed to compare samples."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish absolute quantification from relative quantification and state when each is used."
  - "Choose and validate reference genes for normalising qPCR data."
references:
  - "Bustin, S. A. (2000). Absolute quantification of mRNA using real-time reverse transcription polymerase chain reaction assays. Journal of Molecular Endocrinology, 25(2), 169-193. https://doi.org/10.1677/jme.0.0250169"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A threshold cycle is a number, and it becomes a quantity only after it is related to a known standard or to a reference. Absolute quantification uses a standard curve, made from a dilution series of a template of known copy number. The threshold cycles of the standards are plotted against the logarithm of their copy number, and the unknowns are read from the line. The slope of the line gives the efficiency, and the curve must be linear over the range of the samples. Bustin (2000) argued that absolute quantification is only as accurate as the standard, which must itself be quantified and stable.

Relative quantification compares the target in one sample with the target in another, normalised to a reference gene. The reference is a gene whose expression is assumed to be constant across the conditions being compared, and it corrects for differences in the amount and quality of the starting material. Expression is then reported as a fold change, calculated from the difference in threshold cycles between the target and the reference.

The assumption that a reference gene is stable must be tested. Many commonly used genes change with cell type, treatment or growth state, and an unstable reference can produce a spurious change in the target. Stability should be checked across the full set of conditions, and more than one reference gene is usually used, combined into a single factor.

Normalisation is therefore a claim that must be supported by data. Ioannidis (2005) described how a result that depends on a single chosen normaliser can change when a different one is used, and the choice should be justified and the alternatives reported.

Anfinsen (1973) showed that the function of a protein depends on its structure, and the transcript level is an indirect measure of the protein produced. Alberts et al. (2022) describe the regulation of gene expression that makes such indirect measures necessary. The report should state the quantification method, the standards or the reference genes, and the calculation used.
