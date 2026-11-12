---
title: "Code as a Research Output"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The treatment of research code as a formal output that must be deposited, licensed, cited and maintained, covering the deposition of the code in a public repository with a persistent identifier, the choice of an open licence that states how the code may be reused, the citation of software in the same way as a publication with its version and identifier, the documentation needed for reuse by others, the maintenance commitments and the handling of dependencies that will age, and the recognition of software as a contribution in its own right within the evaluation of research."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Deposit analysis code in a public repository with a persistent identifier and an open licence."
  - "Cite software with its version and identifier in the same way as a published work."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Research code is an output of the research, and it deserves the same care as the manuscript that reports it. A published analysis without its code is an incomplete account, because the reader cannot see the decisions that produced the result. Peng (2011) argued that code should be made available with the publication, and Sandve et al. (2013) recommended that it be deposited in a form that others can run.

Deposition in a public repository with a persistent identifier makes the code findable and citable. The identifier allows the exact version used in a publication to be retrieved years later, even if the working repository changes. The licence should state how the code may be reused, since code without a licence is legally difficult to reuse, whatever the intention of its authors. Munafò et al. (2017) argued that openness is a precondition for the trust that science requires.

Software should be cited in the reference list with its version and identifier, in the same way as any other work. The citation credits the authors of the software and allows readers to identify the version that produced a result. Documentation written for reuse should explain how to install the software, how to run it on a new dataset and what its limitations are, so that a researcher unfamiliar with the code can use it.

Maintenance is a commitment that must be stated. Dependencies age, and an analysis that runs today may fail when its libraries change. The authors should state how long the code will be maintained and how users should proceed if it no longer runs. Software contributions should be recognised within the evaluation of research, so that the effort of making code reusable is rewarded as the effort of writing papers is.
