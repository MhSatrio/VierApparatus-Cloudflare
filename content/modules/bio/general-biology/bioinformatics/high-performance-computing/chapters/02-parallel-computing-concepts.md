---
title: "Parallel Computing Concepts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The concepts of parallel computing for biological analysis, including threads that share memory within one machine, processes that run independently, the division of a problem into tasks that can be done at once, the limit set by the part of a program that must run in sequence and the overhead of communication that reduces the speed-up when many workers share a problem."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish threads from processes and explain when each is appropriate for a bioinformatic task."
  - "Explain why the speed-up from adding processors is limited by the part of a program that cannot be parallelised."
references:
  - "Abraham, M. J., Murtola, T., Schulz, R., Páll, S., Smith, J. C., Hess, B., & Lindahl, E. (2015). GROMACS: High performance molecular simulations through multi-level parallelism from laptops to supercomputers. SoftwareX, 1-2, 19-25. https://doi.org/10.1016/j.softx.2015.06.001"
  - "Li, H., & Durbin, R. (2009). Fast and accurate short read alignment with Burrows-Wheeler transform. Bioinformatics, 25(14), 1754-1760. https://doi.org/10.1093/bioinformatics/btp324"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

Parallel computing runs parts of a problem at the same time. A bioinformatic task that processes many independent samples is the easiest to parallelise, because each sample can be handled by a separate worker without the workers needing to communicate. The division of work by sample is the most common form of parallelism in the field, and it requires no change to the program that analyses each sample.

Threads and processes are the two basic units of parallel work. Threads are parts of one program that share the same memory, so they can cooperate on a single large calculation, such as the alignment of one read set against a reference. Processes are separate programs with their own memory, so they suit independent tasks that do not need to share data. Li and Durbin (2009) built their alignment method so that it could use several threads on one machine, and Abraham et al. (2015) describe a simulation package that combines threads and processes across many cores.

A program has parts that can be divided and parts that cannot. The part that must run in sequence, such as the reading of an input file or the final merging of results, sets a ceiling on the speed-up. If one tenth of a program must run in sequence, no number of processors can make it more than ten times faster. The concept is known as Amdahl's law, and it explains why a job may not speed up as expected when more cores are added.

Communication between workers costs time. When workers must exchange data often, the time spent sending and waiting can exceed the time saved by the division, and the speed-up falls or reverses. A design that minimises communication, by giving each worker a large independent piece of work, usually performs best.

Taschuk and Wilson (2017) recommended that performance be measured rather than assumed, and a test of the speed-up with increasing numbers of cores shows where the gains stop.
