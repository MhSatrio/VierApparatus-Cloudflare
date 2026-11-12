---
title: "Clusters, Nodes and Schedulers"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The architecture of a computing cluster, with its login node, compute nodes, shared storage and network, how a batch scheduler queues and allocates jobs according to their stated resource requests, the submission and monitoring of a job script and the consequences of requesting too little or too much memory, time or processors."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the parts of a cluster and the role of the login node, the compute nodes and the shared storage."
  - "Write a batch job script with a resource request and explain how the scheduler uses the request to place the job."
references:
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A computing cluster is a set of computers, called nodes, connected by a fast network and sharing storage. Users connect to a login node, where they prepare files and submit jobs, and the work itself runs on the compute nodes, which are not used interactively. Stein (2010) described the shared resources of genome informatics as collections of this kind, and the same design is used in most research computing centres.

A batch scheduler decides when each job runs. The user writes a job script that contains the commands to be run and a resource request, which states the number of processors, the memory, the time limit and sometimes the type of node. The scheduler places the job on nodes that satisfy the request when they become free. A request for more resources than the job uses wastes capacity and delays the job, while a request for less may cause the job to be killed when it exceeds its limit.

The job script should be treated as part of the analysis. It records the commands, the environment and the resources, and a script kept under version control shows exactly how each result was produced. Taschuk and Wilson (2017) recommended that research software be run in a way that others can repeat, and a job script with its resource request meets that recommendation.

The scheduler records the resources each job used, and this record allows the requests to be refined. A first run on a sample of the data shows how much memory and time the full run will need, and the request for the full run can be set accordingly, with a margin for variation.

Sandve et al. (2013) recommended that the resources used for each result be recorded, and the scheduler's accounting data are the source of that record for a cluster analysis.
