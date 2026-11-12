---
title: "Version Control in Practice"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The day-to-day practice of version control for scientific code, covering the initialisation of a repository and the decision of what to track and what to ignore, the commit of small, coherent changes each with a message that states the reason, the use of branches to try an alternative analysis without disturbing the main line, the merging of branches with review, the recovery of earlier states to reproduce a past result, the avoidance of committing large data files and secrets to the repository, and the tagging of the state of the code that corresponds to each manuscript version."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Commit small, coherent changes to a repository with messages that state the reason for each change."
  - "Use a branch to test an alternative analysis and recover the exact earlier state that produced a published result."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Version control is most useful when it is practised consistently. A repository is initialised at the start of a project, and the decision of what to track is made early: scripts, configuration and documentation are tracked, while generated outputs and large raw data files are excluded. Sandve et al. (2013) recommended that the repository contain everything needed to regenerate the results, and that it exclude what can be regenerated, since this keeps the history small and the regeneration honest.

Commits should be small and coherent, each making a single logical change with a message that explains the reason. A message such as changed threshold to match the protocol is far more useful later than one such as update. Peng (2011) argued that the history of a project is part of its documentation, and a history of clear commits allows a reader to reconstruct how the analysis developed.

Branches allow an alternative analysis to be tried without disturbing the main line. A branch might test a different model or a different exclusion rule, and it can be merged into the main line only when the change is justified and reviewed. This separation prevents an exploratory idea from entering the published analysis without scrutiny, and Munafò et al. (2017) argued that such separation between exploration and confirmation is a basis of credible research.

Recovering an earlier state reproduces a past result exactly. When a reviewer asks how a figure was produced, the investigator can check out the commit or tag that generated it and run the analysis again. Secrets such as passwords and access tokens must never be committed, and large data files should be stored in a dedicated location with a checksum recorded in the repository, so that the data remain verifiable without bloating the history.
