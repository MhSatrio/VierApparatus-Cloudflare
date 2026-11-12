---
title: "Open Code and Software"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The open sharing of research code and software so that the computations behind a result can be inspected, run and reused, covering the public deposition of the code in a repository with a persistent identifier, the choice of an open-source licence that states how the code may be used, modified and redistributed, the documentation and tests that make the code usable by others, the inclusion of a record of the software environment, the citation of software in the reference list with its version, and the treatment of commercial and proprietary dependencies where code cannot be fully opened."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Release analysis code under an open-source licence with documentation, tests and a record of the software environment."
  - "Identify the dependencies that limit how far code can be opened and state how the limitation is reported."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Research code is part of the evidence for a result, and open code allows others to check what the analysis actually did. A repository with a persistent identifier makes the code citable and retrievable, and an open-source licence states how it may be used, changed and shared. Peng (2011) argued that the computational steps behind a result are part of the result, and Sandve et al. (2013) recommended that they be made available in a form that others can run.

Code that is opened must be usable. A readme that explains the purpose, the inputs and the commands needed to run the analysis is the minimum, and documentation of the functions and their assumptions makes the code intelligible. Tests that check the functions against known answers give others confidence that the code is correct, and they show what the authors themselves verified.

A record of the software environment, including the language version and the versions of the libraries, allows the code to be run as it was when the result was produced. Munafò et al. (2017) argued that the tools of a study are part of its methods, and their versions are needed to reproduce it. Software that is cited in a publication should be cited with its version and identifier, in the same way as any other source.

Some code depends on commercial or proprietary software that cannot be opened. Where this is the case, the limitation should be stated, and the parts that can be opened should be released with a description of what the proprietary component does. Where possible, the authors should provide an open alternative or a verification that the open parts reproduce the result. Ioannidis (2005) described how results that cannot be checked are weaker evidence, and the statement of the limitation allows readers to judge the strength of the claim.
