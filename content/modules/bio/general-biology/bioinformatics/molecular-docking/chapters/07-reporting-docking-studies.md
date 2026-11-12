---
title: "Reporting Docking Studies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a report of a docking study must contain for its poses and scores to be checked and repeated, including the receptor structure and its preparation, the ligand preparation, the software and its version, the search settings and the number of runs, the scoring function, the validation of the protocol and its results, the screen statistics and the deposition of the input files and the poses."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a docking report must contain for another group to repeat the calculation and judge its validation."
  - "Deposit the input files and the output poses with the report so that the results can be checked."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Trott, O., & Olson, A. J. (2010). AutoDock Vina: Improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. Journal of Computational Chemistry, 31(2), 455-461. https://doi.org/10.1002/jcc.21334"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
---

A docking study produces poses and scores, and both are meaningless to a reader who cannot see how they were made. Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and for docking this means the inputs, the settings and the validation. A figure of a ligand in a site, with a score, tells the reader almost nothing about how far the pose can be trusted.

The receptor and ligand are the first item. The structure identifier, the chain and the residues defining the site, the preparation of the receptor, including the hydrogens, the protonation states, the waters and the cofactors, and the preparation of the ligand should be given. Berman (2000) describes the archive from which receptor structures are drawn, and the identifiers allow the inputs to be retrieved.

The method is the second item. The program and its version, the search settings including the effort and the number of runs, the random seed, the scoring function and any flexible residues should be listed. Trott and Olson (2010) describe a program whose settings are of this kind, and each setting that changes the poses must be reported.

The validation is the third item. The redocking deviations, the enrichment against known actives and the composition of the decoy set should be given. A docking result without its validation cannot be judged, since the reader has no measure of whether the protocol reproduces known answers.

The deposition is the fourth item. The input files, the prepared structures and the output poses should be placed in a public archive with their identifiers. Wilkinson et al. (2016) set out the principles under which such data should be findable and reusable, and a deposited set of poses with its inputs and validation meets them. Sandve et al. (2013) recommended that the outputs of an analysis be kept with its inputs and steps.
