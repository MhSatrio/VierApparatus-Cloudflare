---
title: "Containers and Environments"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How containers package a bioinformatic program with its libraries and dependencies into a single image that runs the same way on different systems, the difference between containers and installed environments, how a container image is versioned and recorded and how containers help reproducibility on clusters and in the cloud, together with the limits of containers as a substitute for careful reporting."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a container packages a program with its dependencies and why this helps an analysis run the same way on different systems."
  - "State what a container image record must contain to allow the analysis to be rerun, and identify what a container does not guarantee."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A container is a package that holds a program together with the libraries and other dependencies it needs, and runs it in an isolated part of the operating system. The container image can be copied to any machine that runs the container software, and the program inside it sees the same versions of its dependencies wherever it runs. For bioinformatics, where a tool may depend on a particular version of a compiler and several libraries, this portability is valuable.

Containers differ from the isolated environments of the command-line topic. An environment installs packages into a directory on the host system, whereas a container includes its own operating system libraries and is isolated from the host. A container therefore fixes more of the software stack, and it can run on a cluster or in the cloud with the same contents.

Peng (2011) argued that the ability to repeat a computational result is central to its credibility, and a fixed container image supports that. The image must be versioned and recorded, with its identifier or digest, so that the exact image used for a result can be retrieved later. A tag such as latest can change its contents and should not be used for a record of an analysis.

Containers do not guarantee correctness. A program inside a container can still contain errors, use the wrong parameters or read the wrong input, and the container does not check any of these. Taschuk and Wilson (2017) recommended that research software be tested independently of its packaging, and a container is a means of distribution, not a substitute for testing.

Sandve et al. (2013) recommended recording the software environment of each analysis, and a container image with its digest is one of the most complete records of that environment. The record should be kept with the results, alongside the commands and the parameters that were used.
