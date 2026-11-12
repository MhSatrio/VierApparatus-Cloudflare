---
title: "Sequencing the Microbiome"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The sequencing approaches used to characterise the microbiome, covering the marker gene sequencing of the 16S ribosomal RNA gene that identifies bacteria and archaea, the choice of hypervariable region and its taxonomic resolution, the shotgun metagenomic sequencing that reads all the DNA and reveals the genes and the species, the primer bias and the extraction bias that distort the community, the sequencing depth required for rare taxa, the contamination of low-biomass samples, and the reporting of sequencing with the region, the primers, the depth and the controls."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe marker gene sequencing and shotgun metagenomics and state the information that each provides about the community."
  - "Explain how primer and extraction bias distort the community and how sequencing depth limits the detection of rare taxa."
references:
  - "Turnbaugh, P. J., Ley, R. E., Hamady, M., Fraser-Liggett, C. M., Knight, R., & Gordon, J. I. (2007). The Human Microbiome Project. Nature, 449(7164), 804-810. https://doi.org/10.1038/nature06244"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Marker gene sequencing amplifies a region of the 16S ribosomal RNA gene from the community and sequences it, which allows bacteria and archaea to be identified and their relative abundances estimated. The gene contains variable regions that differ among taxa, and the choice of region determines how finely the taxa can be resolved. Turnbaugh et al. (2007) described the early use of this approach in the study of the human microbiome, and the same principle is used in most surveys today.

Shotgun metagenomic sequencing reads all the DNA in the sample, including the DNA of bacteria, archaea, fungi and viruses, and it reveals the genes as well as the species. It requires more sequencing and more analysis than marker gene sequencing, but it can identify functions and strains that the marker cannot. The choice between the two depends on the question and the budget.

Primer bias and extraction bias distort the community. A primer that matches some taxa better than others will amplify them more, and an extraction method that lyses some cells more efficiently than others will change the proportions in the DNA. These biases are systematic, and they can alter the apparent composition of a community even when the sequencing is accurate. Mock communities of known composition are used to measure the biases, as in environmental genomics.

The depth of sequencing determines how many rare taxa are detected, and a community with many rare taxa requires a deeper sequencing than one dominated by a few. Low-biomass samples, such as those from healthy tissues, are vulnerable to contamination from reagents and from the environment, and controls must be included. Cumming (2014) argues that the abundance estimates should be reported with their intervals, and Sandve et al. (2013) recommended recording the region, the primers, the depth and the controls for every sequencing run.
