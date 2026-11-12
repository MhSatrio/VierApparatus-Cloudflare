---
title: "Why Biology Needs High-Performance Computing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The growth of biological data that exceeds the capacity of a single computer, the examples of analyses that need large-scale resources including genome assembly, population sequencing and molecular simulation, the economics of shared computing and the decision of when a laboratory should move a job from its desktop to a shared system."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Give examples of biological analyses whose size or time requirements exceed a single desktop computer."
  - "Describe the decision of when to move an analysis from a local computer to a shared high-performance system."
references:
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Abraham, M. J., Murtola, T., Schulz, R., Páll, S., Smith, J. C., Hess, B., & Lindahl, E. (2015). GROMACS: High performance molecular simulations through multi-level parallelism from laptops to supercomputers. SoftwareX, 1-2, 19-25. https://doi.org/10.1016/j.softx.2015.06.001"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The amount of biological data grew faster than the computing power of individual laboratories during the years of large-scale sequencing. A single sequencing run can produce data that take days to process on a desktop, and a whole-genome comparison of many individuals multiplies the work. Stein (2010) argued that the data of genome informatics had outgrown local resources, and that shared and remote computing was the natural response.

Several kinds of analysis require large resources. Genome assembly builds a sequence from millions of short reads and needs large memory and many processor hours. Population studies that align the reads of many individuals repeat the same work hundreds of times. Molecular dynamics simulations of proteins and membranes follow the motion of many atoms over long times, and they are often run on hundreds of processor cores. Abraham et al. (2015) describe the design of a simulation package for such work, which spreads the computation across many cores and accelerators.

The decision to use shared computing depends on the size of the job and the frequency with which it will be repeated. A small analysis that finishes in an hour on a laptop does not need a cluster, and the overhead of setting up a remote job can exceed its benefit. A job that takes days, that will be repeated for many datasets or that needs more memory than a laptop provides is a candidate for a shared system.

The move has costs. Data must be transferred, the software must be installed and tested on the remote system, and the work must be run through a scheduler. These costs are justified only when the job is large enough, and the analysis should be written so that it can run on either system without changes.

Sandve et al. (2013) recommended that the computing environment of each analysis be recorded, and a job that moves between systems makes the record more important, since the same program may behave differently on different machines.
