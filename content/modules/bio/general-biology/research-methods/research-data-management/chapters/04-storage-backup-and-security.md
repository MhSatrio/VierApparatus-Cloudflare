---
title: "Storage, Backup and Security"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The storage, backup and security of research data during a project, covering the choice of storage with adequate capacity, redundancy and access control for the sensitivity of the data, the backup strategy that keeps copies in at least two independent locations and tests their restoration, the versioning of files that allows an earlier state to be recovered after an error, the encryption of sensitive data at rest and in transit, the control of access by role with records of who accessed what, the avoidance of storing sensitive data on personal devices or unapproved services, and the response plan for loss, breach or corruption of data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a backup strategy with independent copies and a tested restoration procedure."
  - "Match the security of stored data to their sensitivity and state how access is controlled and recorded."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3, 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Data that are lost cannot be checked, reused or defended, so storage is a scientific responsibility as well as a technical one. The storage chosen must have enough capacity for the data, enough redundancy that a single failure does not destroy them, and enough access control for their sensitivity. Peng (2011) argued that the availability of the data underlies the reproducibility of the result, and storage that fails the result is a failure of the science.

A backup strategy keeps at least two independent copies in different locations, so that a fire, a theft or a failed disk cannot remove all of them at once. Backups must be tested by restoring them, since a backup that cannot be restored provides no protection. Ioannidis (2005) described how the reliability of a result depends on the reliability of the evidence behind it, and the tested restoration of that evidence is part of the same discipline.

Versioning allows an earlier state of a file to be recovered after an error, a deletion or an unwanted change. Versioned storage keeps a history of each file, and the history should be preserved for the period during which the data may be needed. Wilkinson et al. (2016) described how the stability of a dataset supports its citation, and versioning provides that stability.

Sensitive data, such as identifiable information about participants, must be encrypted at rest and in transit, and access must be restricted to those who need it. Access should be recorded, so that a question about who viewed a file can be answered. Data should not be stored on personal devices or on services that have not been approved for the level of sensitivity, and the response plan should state what will be done if a loss, a breach or a corruption occurs.
