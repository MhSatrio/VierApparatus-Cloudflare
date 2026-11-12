---
title: "Shotgun Sequencing of a Community"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the DNA of a microbial community is extracted and sequenced by shotgun methods, the design decisions of sampling, extraction, library preparation and sequencing depth, the removal of host and contaminant reads, the difference between an amplicon survey and shotgun sequencing and the reasons a study must plan its sequencing depth against the diversity it expects to find."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare amplicon sequencing with shotgun metagenomic sequencing and state what each can and cannot show about a community."
  - "Plan the sequencing depth of a study and remove host and contaminant reads before analysis."
references:
  - "Quince, C., Walker, A. W., Simpson, J. T., Loman, N. J., & Segata, N. (2017). Shotgun metagenomics, from sampling to analysis. Nature Biotechnology, 35(9), 833-844. https://doi.org/10.1038/nbt.3935"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A shotgun metagenomic study sequences all the DNA of a sample, breaking it into fragments without selecting a particular gene. The contrast is with an amplicon survey, which amplifies one marker gene by PCR and sequences only that gene. An amplicon survey is cheaper and needs less depth, but it reveals only the organisms whose marker it amplifies, and it carries the biases of the PCR. Shotgun sequencing sees every gene in the sample, which allows the functions of the community to be studied as well as its membership. Quince et al. (2017) describe the workflow from sampling to analysis, and the choice between the two methods is the first design decision.

Sequencing depth determines what can be seen. A community of a few species can be described with modest depth, while a soil community of thousands of species needs far more reads to detect the rare members at all. The depth should be planned from the diversity expected, and a study that sequences too little will describe only the most abundant organisms. Rarefaction, which compares the number of species found with the number of reads, shows whether the sampling has saturated.

Host and contaminant DNA must be removed. A sample from an animal or a plant contains the host genome, which can make up most of the reads, and reagents may carry their own microbial DNA. The reads that match the host are filtered out, and the contaminant reads are identified by comparison with blank samples processed alongside the real ones. A result that includes host or contaminant reads describes the wrong community.

The extraction and the library preparation introduce biases. Some microbes lyse more easily than others, so the extraction favours some groups, and the library preparation may favour fragments of certain lengths or compositions. These biases affect the apparent abundance of each organism, and they must be reported with the study.

Sandve et al. (2013) recommended that the steps of an analysis be recorded, and the extraction, the depth, the filters and the blanks are the steps of a shotgun study that must be recorded for the result to be judged.
