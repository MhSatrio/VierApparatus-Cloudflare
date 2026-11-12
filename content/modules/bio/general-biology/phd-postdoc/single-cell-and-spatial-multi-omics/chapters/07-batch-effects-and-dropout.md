---
title: "Batch Effects and Dropout"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The technical variation between batches of single-cell experiments and the dropout that affects detection, covering the sources of batch effect such as the day of processing, the reagent lot, the operator and the instrument, the design of experiments in which batches are balanced across conditions so that batch and condition are not confounded, the correction of batch effects by regression or by integration methods and the risk that correction removes biological signal, the assessment of batch effects before and after correction, the handling of dropout by imputation with its own uncertainty or by avoiding imputation altogether, and the reporting of batch structure and of the correction applied."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a single-cell experiment in which batch is balanced across the conditions being compared."
  - "Assess whether a batch correction removes technical variation without removing the biological signal of interest."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Batch effects are the technical differences that arise when cells are processed on different days, with different reagent lots, by different operators or on different instruments. They can be as large as the biological differences under study, and a batch effect that aligns with a condition will be mistaken for a biological result. Ioannidis (2005) described how a confounded design can produce a spurious finding that no analysis can remove, and the first defence against batch effects is the design.

Batches should be balanced across the conditions being compared, so that each condition is represented in each batch. A design in which all treated cells were processed on one day and all controls on another confounds the treatment with the day, and no correction can fully separate them afterwards. Cumming (2014) argues that the design should be planned so that the comparison of interest is not confounded with a source of variation.

Batch effects can be corrected by regression on the batch, or by integration methods that align the batches in a shared space. Correction carries a risk, because a method that is too aggressive can remove the biological difference of interest along with the technical variation. The assessment of a correction should compare the batches before and after, and should check that known biological differences remain. Peng (2011) argued that the method of correction must be reported, so that its effect can be assessed and repeated.

Dropout produces zeros that may be technical rather than biological, and some analyses impute values to replace them. Imputation introduces its own uncertainty and can create relationships that are not in the data. The alternative of avoiding imputation and modelling dropout explicitly is often preferable, and the choice should be stated and justified. Munafò et al. (2017) argued that the batch structure and the correction should be reported in full, so that a reader can judge whether a result could be an artefact of processing.
