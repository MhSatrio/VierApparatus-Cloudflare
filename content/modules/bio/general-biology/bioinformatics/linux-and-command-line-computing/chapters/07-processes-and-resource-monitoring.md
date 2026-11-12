---
title: "Processes and Resource Monitoring"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the operating system runs programs as processes, how to list and stop them, how processes use the central processor and memory, how to watch the resource use of a long bioinformatic job and why an analysis that exhausts memory or runs without limit must be detected early, with the practices that keep shared computers usable for everyone."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the processes that are using the processor and memory and stop a process that has stopped responding."
  - "Explain why a bioinformatic job can exhaust memory and how resource monitoring detects this early."
references:
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Li, H., & Durbin, R. (2009). Fast and accurate short read alignment with Burrows-Wheeler transform. Bioinformatics, 25(14), 1754-1760. https://doi.org/10.1093/bioinformatics/btp324"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

An operating system runs each program as one or more processes, and each process has an identifier, an owner and a share of the processor and memory. A process listing shows which programs are running, how much processor time each uses and how much memory it holds. A process that has stopped responding can be ended by sending it a signal, and a process that is still running but no longer needed should be ended to free its resources.

Bioinformatic jobs can be heavy users of both processor and memory. An alignment program may use every available processor core for hours, and an assembly may require more memory than the machine has. When memory runs out, the system may slow down, start swapping data to disk or kill the process, and the analysis is lost. Monitoring the memory use during the first minutes of a job reveals whether it will fit, and a job that grows without limit is a sign of an error in the input or the parameters.

Li and Durbin (2009) built an alignment method that was designed to use memory efficiently, and the design choices of a method determine how much memory a job needs. The user should know the memory requirement before the job is submitted, and should check the actual use against it.

Stein (2010) described the move of genome analysis to shared computing, where the resources are a common pool. A job that uses more than its share affects every other user, so the monitoring is also a matter of courtesy and of the rules of the system.

Taschuk and Wilson (2017) recommended that research software be tested with realistic data sizes, so that its resource needs are known before a long run. A short run on a sample of the data gives a reliable estimate of the time and memory required for the full run.
