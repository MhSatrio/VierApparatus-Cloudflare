---
title: "Cloud Computing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How cloud computing provides rented computing and storage for biological analysis, the models of virtual machines, managed batch services and object storage, the way cloud costs depend on the resources used and the time they are held, the transfer of large datasets to and from the cloud and the trade-offs between cloud and institutional clusters for bioinformatic work."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the main services of a cloud platform used for bioinformatic work and the cost drivers of each."
  - "Compare the costs and the data-transfer requirements of running an analysis on a cloud platform and on an institutional cluster."
references:
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

Cloud computing supplies computing power and storage that are rented by the hour or by the gigabyte, so that a laboratory can run a large analysis without owning a cluster. Stein (2010) argued that the cloud suited genome informatics because its resources could be expanded to match a burst of demand and then released, which fits the irregular workload of sequencing projects. The cloud is not the only means of large-scale computing, and its use is a decision about cost, convenience and data management.

The cloud offers several service models. A virtual machine is a rented computer that the user configures, a managed batch service runs a queue of jobs on demand and object storage holds large files at low cost. Each model has its own charges, which depend on the processor time, the memory, the storage held and the data transferred out of the platform. A job that is badly sized or left running is an expensive mistake, and monitoring the charges is part of the work.

Data transfer deserves particular attention. Moving a large dataset into the cloud takes time, and moving results out may incur charges. For a project whose data are already on an institutional server, the transfer may outweigh the saving in computing cost. The choice between the cloud and an institutional cluster depends on the size of the data, the frequency of the work and the existing infrastructure.

Wilkinson et al. (2016) described the FAIR principles, which ask that data be findable, accessible, interoperable and reusable. A cloud store must be documented with its identifiers and access conditions to meet these principles, and the convenience of the cloud does not remove the need for that documentation.

Sandve et al. (2013) recommended recording the computing environment of each analysis, and a cloud analysis is recorded by its machine image, its configuration and the charges it incurred, which together form the record of how the result was produced.
