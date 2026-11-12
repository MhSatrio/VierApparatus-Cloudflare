---
title: "Docking in Drug Discovery"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The role of docking in drug discovery, including its use to generate hypotheses about how a candidate binds, to prioritise compounds for synthesis and testing, to guide the optimisation of a lead by modelling changes to its structure and to explain the activity of compounds measured by experiment, with the gap between a docking score and a measured effect that limits each use."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the uses of docking in drug discovery and the decision each use supports."
  - "Explain why a docking pose is a hypothesis to be tested and how an experimental result either supports or undermines it."
references:
  - "Friesner, R. A., Banks, J. L., Murphy, R. B., Halgren, T. A., Klicic, J. J., Mainz, D. T., Repasky, M. P., Knoll, E. H., Shelley, M., Perry, J. K., Shaw, D. E., Francis, P., & Shenkin, P. S. (2004). Glide: A New Approach for Rapid, Accurate Docking and Scoring. 1. Method and Assessment of Docking Accuracy. Journal of Medicinal Chemistry, 47(7), 1739-1749. https://doi.org/10.1021/jm0306430"
  - "Trott, O., & Olson, A. J. (2010). AutoDock Vina: Improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. Journal of Computational Chemistry, 31(2), 455-461. https://doi.org/10.1002/jcc.21334"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Docking is used in drug discovery to decide where to spend the effort of synthesis and testing. It proposes how a candidate molecule might bind its target, it ranks candidates for testing, it suggests the chemical changes that might strengthen a binding interaction and it offers an explanation for the activity of compounds that have already been measured. Friesner et al. (2004) and Trott and Olson (2010) describe the methods on which these uses are built, and each use turns a computed pose into a decision.

The uses differ in the claim they make. A hypothesis about the binding mode asks whether the pose is plausible, and the answer is supported by experiment if a mutation at the proposed contact disrupts binding. A ranking of candidates asks whether the top compounds are likely to be active, and the answer is the hit rate of the tested set. A suggested chemical change asks whether a modified compound will bind better, which requires synthesis and measurement. Alberts et al. (2022) describe how drugs act through the molecular recognition that docking tries to model, and the molecular detail is the reason the method is valued.

A docking pose is a hypothesis. A pose that fits the site well may not reflect the binding mode in solution, and a score that ranks one compound above another may reflect the function's errors rather than a real difference in affinity. Platt (1964) recommended that a hypothesis be framed so that an experiment can exclude it, and each docking claim should be tested against a measurement that could show it to be wrong.

The history of docking in drug discovery contains many optimistic predictions that did not hold, and Ioannidis (2005) described how the selection of results and the flexibility of analysis produce findings that are less reliable than they appear. The practical defence is to report every compound tested, every prediction made and the proportion that the experiments confirmed.

A docking result should be used to decide which experiment to run, and its success should be judged by the experiments it guides.
