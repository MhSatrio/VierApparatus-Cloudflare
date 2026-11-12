---
title: "Memory, Input-Output and Storage"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the memory, the input and output and the storage of a computing system constrain bioinformatic analysis, why large datasets are often limited by reading and writing rather than by processing, the hierarchy of fast memory, shared disks and archival storage, and the design choices that reduce the number of times data must be moved, such as compressing files and streaming records."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a bioinformatic analysis of large files may be limited by input and output rather than by processing speed."
  - "Choose a storage location and a file format for an intermediate result so that it is fast to read and does not exhaust shared capacity."
references:
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Li, H., & Durbin, R. (2009). Fast and accurate short read alignment with Burrows-Wheeler transform. Bioinformatics, 25(14), 1754-1760. https://doi.org/10.1093/bioinformatics/btp324"
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
---

A computing system stores data in layers, each with its own speed and capacity. Memory is the fastest and smallest, a local disk is slower and larger and shared storage on a cluster is larger still but reached over the network. An analysis that moves large files between these layers may spend more time reading and writing than computing, and in many bioinformatic workflows the input and output are the limiting factor.

Stein (2010) noted that the volume of genome data made storage and transfer as important as computation, and the design of a pipeline must consider both. A step that writes a large intermediate file to shared storage and reads it back in the next step doubles the traffic, and a step that compresses its output reduces the traffic at the cost of some processor time.

The choice of format affects the cost. A compressed binary format occupies less space and reads faster than the plain text it represents, and Li and Durbin (2009) used a compressed index to make their alignment method efficient in memory and in input and output. Streaming the records of a file, so that each record is processed and then discarded, keeps memory use small and avoids writing intermediate files at all.

Cock et al. (2009) show how a sequence library can read records one at a time, which is a practical way to keep the memory required by a pipeline constant regardless of the size of its input. The same design reduces the traffic to storage, since fewer intermediate files are created.

The rule for intermediate results is to keep them in fast local storage while they are needed, to avoid copying them to shared storage unless they must be kept, and to delete those that can be regenerated. Shared capacity is a resource for everyone, and a pipeline that leaves large intermediate files behind affects other users.
