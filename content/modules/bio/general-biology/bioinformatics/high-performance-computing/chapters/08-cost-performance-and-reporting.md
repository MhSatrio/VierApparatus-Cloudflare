---
title: "Cost, Performance and Reporting"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the time, memory, storage and money used by a high-performance analysis are measured and compared, the choice of resources that balances speed against cost, the use of benchmarks on representative data, the sources of variation between runs and the reporting of the computing resources used so that another group can judge the feasibility and repeat the analysis."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Measure the time, memory and cost of a bioinformatic job and choose the resource request that balances speed against cost."
  - "List the computing resources that a report of a high-performance analysis must state for another group to reproduce it."
references:
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

The resources of a high-performance analysis are time, memory, storage and money, and they trade against one another. More processors may finish a job sooner but cost more and may be wasted if the program does not scale. A large memory request may allow a job to run without splitting it, at a higher price per hour. Choosing the right balance requires measurement, not guesswork, and the measurement should be made on data that represent the full task.

A benchmark is a controlled test of a job on a representative input, with the time and memory recorded. Running the job on a subset of the data and extrapolating gives an estimate of the full run, and the estimate should be checked on a second subset to confirm that it holds. Taschuk and Wilson (2017) recommended that performance claims be supported by such measurements, since an impression of speed is not reliable evidence.

Results vary between runs. The load on a shared system, the placement of the job on the hardware and the state of the storage can change the time by a substantial amount. A report should give the range of times observed, not a single number from one run, and it should state the hardware on which the runs were made.

Stein (2010) described how cost became part of the choice of computing resource for genome informatics, and the cost of an analysis is a legitimate part of its report. The price of the resources used, and the reasoning that led to the choice, help other groups plan their own work.

Peng (2011) argued that the reproducibility of computational results depends on the details of the process, and the computing resources are part of that process. Sandve et al. (2013) recommended recording the environment of each analysis, and a report should state the processor, memory, storage, software versions and the time and cost of the run, so that the analysis can be repeated and its feasibility judged.
