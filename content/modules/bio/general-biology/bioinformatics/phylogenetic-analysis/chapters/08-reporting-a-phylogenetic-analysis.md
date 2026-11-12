---
title: "Reporting a Phylogenetic Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a phylogenetic analysis must contain for another group to rebuild and judge the tree, including the taxa and their accessions, the alignment and its method, the model and its selection, the search settings and the number of runs, the support values with their replicates, the rooting and the software versions, together with the deposition of the alignment and the tree file."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a phylogenetic report must contain for its tree to be rebuilt from the same sequences."
  - "Deposit the alignment and the tree file with the report so that a reader can check the tree without repeating the search."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
---

A phylogenetic tree is reported as a result, but a tree alone cannot be checked. Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and for a tree this means the inputs, the steps and the settings, together with the output itself. A report that gives only a picture of the tree leaves the reader unable to tell whether the tree depends on a particular alignment, model or rooting, and cannot test whether it would change under a different choice.

The inputs are the first item. The taxa should be listed with their accessions, their source and the gene or genes used, so that the sequences can be retrieved and the dataset rebuilt. The alignment method, its version and its parameters should be stated, since the alignment is the input to the tree. Felsenstein (1985) showed that the support for each branch depends on the data, and the dataset defines what the support refers to.

The methods are the second item. The model and the method for choosing it, the search settings and the number of independent runs should be given, together with the software and its version. The rooting and the reason for it belong here, and the support values should be reported with the number of replicates that produced them.

The output is the third item. The tree should be deposited as a file in a standard format, along with the alignment, so that a reader can view the tree, check the support values and rerun any analysis on it. Wilkinson et al. (2016) set out the principles by which such data should be findable and reusable, and a deposited alignment and tree meet those principles.

Sandve et al. (2013) recommended that the complete chain from data to result be recorded, and a phylogenetic report that includes its alignment, its tree file and its settings satisfies that recommendation.
