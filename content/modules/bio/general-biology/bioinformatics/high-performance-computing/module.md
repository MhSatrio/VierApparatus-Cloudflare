---
title: "High-Performance Computing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How high-performance computing is used for biological analysis, covering the parallel computing concepts of threads and processes, the architecture of clusters with their nodes and schedulers, the demands of memory and input and output on large datasets, containers that package software for portable use, cloud computing and the use of graphics processors, together with the measurement of performance and cost."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a bioinformatic task is divided across processor cores and cluster nodes and what limits the speed-up that parallelism can achieve."
  - "Submit a job to a cluster scheduler with a stated resource request and measure whether the request was adequate."
references:
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Abraham, M. J., Murtola, T., Schulz, R., Páll, S., Smith, J. C., Hess, B., & Lindahl, E. (2015). GROMACS: High performance molecular simulations through multi-level parallelism from laptops to supercomputers. SoftwareX, 1-2, 19-25. https://doi.org/10.1016/j.softx.2015.06.001"
  - "Phillips, J. C., Hardy, D. J., Maia, J. D. C., Stone, J. E., Ribeiro, J. V., Bernardi, R. C., Buch, R., Fiorin, G., Hénin, J., Jiang, W., McGreevy, R., Melo, M. C. R., Radak, B. K., Skeel, R. D., Singharoy, A., Wang, Y., Roux, B., Aksimentiev, A., Luthey-Schulten, Z., . . . Tajkhorshid, E. (2020). Scalable molecular dynamics on CPU and GPU architectures with NAMD. The Journal of Chemical Physics, 153(4), 044130. https://doi.org/10.1063/5.0014475"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

Many biological analyses are too large or too slow for a single computer. A genome assembly, a set of alignments for hundreds of samples or a molecular dynamics simulation may require more processor time and more memory than a desktop provides, and high-performance computing supplies them by combining many processors. Stein (2010) described how genome analysis came to rely on such shared and distributed resources, and the topic explains how they are used.

The chapters cover the concepts of parallel computing, the architecture of clusters, the management of memory and of input and output, the packaging of software in containers, the use of cloud resources and the use of graphics processors. Each concept is tied to the way a bioinformatic program uses the machine, since a program that is designed for one kind of resource may perform poorly on another.

Parallel programs run faster only up to a limit. The part of a program that cannot be divided sets a ceiling on the speed-up, and the overhead of communication between processes reduces the gain further. Molecular simulation programs such as GROMACS and NAMD have been designed to use many cores and accelerators, and Abraham et al. (2015) and Phillips et al. (2020) describe the design choices that make large simulations feasible.

A cluster is managed by a scheduler that queues jobs and allocates them resources. A job states how many processors, how much memory and how much time it needs, and the scheduler starts it when the resources are free. Requesting too little causes the job to fail, and requesting too much delays it and wastes shared capacity, so measuring the actual use is part of good practice.

The topic ends with performance and cost. A faster run is not always the cheaper one, and the measurement of time, memory and money must be reported with the result, so that the choice of resources can be justified and repeated. Taschuk and Wilson (2017) noted that performance claims should be supported by measurements, and Sandve et al. (2013) recommended that the resources used for each result be recorded.
