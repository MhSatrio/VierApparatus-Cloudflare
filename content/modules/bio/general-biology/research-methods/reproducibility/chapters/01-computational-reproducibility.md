---
title: "Computational Reproducibility"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "Computational reproducibility, the ability to regenerate a result from the same data and code, covering the recording of the software environment including language, library versions and operating system, the scripting of every step from raw data to figure so that no manual edit is needed, the use of version control to track changes to code and to link each result to a commit, the fixing of random seeds and the recording of their values, the use of containers or environment files to reproduce the computational environment, and the checking of a result by an independent person who runs the analysis from the deposited materials."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Script an analysis from raw data to final figure so that the result can be regenerated without manual intervention."
  - "Record the software environment and random seeds needed to reproduce a computational result exactly."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Computational reproducibility asks whether the same data and the same code produce the same result. It is the minimum standard for a computational finding, and Peng (2011) argued that it is achievable for most analyses if the work is planned for it. The principle is that the path from raw data to final figure is recorded in a form that a second person can run, rather than in a sequence of manual steps that exist only in the memory of the analyst.

Sandve et al. (2013) recommended that every step be scripted, so that no figure is produced by hand. Manual edits to a spreadsheet or a figure file break the chain, because they cannot be repeated. A script that reads the raw data, applies the transformations and writes the output is the basis of reproducibility. Each script should be run from the start, so that the whole pipeline is shown to work.

The software environment must also be recorded. The version of the language, of each library and of the operating system can change the numerical result, and a record of these versions allows the environment to be recreated. Munafò et al. (2017) argued that the tools used in a study are part of its methods, and their versions should be reported with the results.

Random processes, such as the shuffling of data or the initialisation of a model, produce different results unless the seed is fixed. The seed should be set in the script and its value reported, so that the random steps can be repeated. Version control links each result to a specific state of the code, and a figure can then be traced to the commit that produced it. Peng (2011) emphasised that the link between result and code is what makes the result checkable.
