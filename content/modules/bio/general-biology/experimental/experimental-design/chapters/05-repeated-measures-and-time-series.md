---
title: "Repeated Measures and Time Series"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "Designs in which the same subjects are measured repeatedly over time, the advantages and risks of within-subject comparison, carry-over effects and the analysis of longitudinal data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the advantage of measuring the same subjects repeatedly and its risks."
  - "Describe the carry-over and order effects that can compromise a repeated-measures design."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Measuring the same subjects repeatedly removes the variation between subjects from the comparison, which can make the experiment much more powerful. A cell line measured before and after treatment, or an animal followed through several time points, serves as its own control. The design is common in biology, and it allows the change in each subject to be estimated directly.

The design brings its own risks. A treatment given at one time may leave effects that carry over into later measurements, so that the response to a second treatment depends on the first. Order effects occur when the sequence of treatments matters, and a fixed order confounds the treatment with the time. The remedies are washout periods, counterbalancing of the order and designs in which each subject receives a different sequence.

Subjects also change over time for reasons unrelated to the treatment, such as growth, ageing or the progression of a disease. A repeated-measures comparison must include controls that are measured on the same schedule, so that these changes are separated from the treatment effect. A treatment group compared with an untreated group at the same times isolates the effect.

Time series data have autocorrelation: measurements close together in time are more similar than those far apart, and this violates the independence assumed by many tests. The analysis must model the correlation, or it will overstate the number of independent observations, as Ioannidis (2005) pointed out for non-independent data in general.

Alberts et al. (2022) describe the biological processes that change over time, such as the cell cycle and the circadian rhythm, which can confound a time series if they are not controlled. Repeated measures are designed in advance, with the schedule and the controls specified in the protocol.
