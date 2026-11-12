---
title: "The Search over Poses"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a docking program searches the positions, orientations and conformations of a ligand within the binding site, the stochastic and systematic strategies used to explore the space, the grid maps that accelerate the scoring of each pose, the role of the search exhaustiveness in finding the best pose and the reasons the search may stop at a local optimum that is not the true binding mode."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a docking search explores the position, orientation and conformation of a ligand and how the search effort is set."
  - "Describe why a search can miss the true binding pose and how repeated runs test the stability of the result."
references:
  - "Trott, O., & Olson, A. J. (2010). AutoDock Vina: Improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. Journal of Computational Chemistry, 31(2), 455-461. https://doi.org/10.1002/jcc.21334"
  - "Friesner, R. A., Banks, J. L., Murphy, R. B., Halgren, T. A., Klicic, J. J., Mainz, D. T., Repasky, M. P., Knoll, E. H., Shelley, M., Perry, J. K., Shaw, D. E., Francis, P., & Shenkin, P. S. (2004). Glide: A New Approach for Rapid, Accurate Docking and Scoring. 1. Method and Assessment of Docking Accuracy. Journal of Medicinal Chemistry, 47(7), 1739-1749. https://doi.org/10.1021/jm0306430"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The search is the part of docking that moves the ligand. The ligand has six degrees of freedom for its position and orientation, and one for each rotatable bond, so the space of poses is large even for a small molecule. The search explores this space, and the best pose is the one it finds with the lowest score. Trott and Olson (2010) describe the search of Vina, which combines a stochastic global exploration with local optimisation of each candidate, and the balance between the two determines how thoroughly the space is covered.

The search effort is a setting, often called exhaustiveness, that controls how many independent searches are run and how long each lasts. A higher effort finds better poses more reliably and takes longer. The effort should be chosen so that repeated runs give the same best pose, and a result that changes between runs signals that the search has not converged on the true minimum.

Grid maps accelerate the search. The receptor's properties are precomputed on a grid around the binding site, so that the score of each pose is read from the grid rather than computed from scratch. Friesner et al. (2004) describe a docking approach in which the receptor's shape and the scoring are organised for rapid evaluation, and the grid is a standard means of achieving speed in this field.

A search can stop at a local optimum, a pose that scores well but is not the true binding mode. Local optima are common, and a single run may return one of them. The remedy is repeated runs and a comparison of the poses found, with the frequency of each pose reported. A pose that is found repeatedly is more credible than one that is found once.

Sandve et al. (2013) recommended recording the settings of an analysis, and the search effort, the number of runs and the random seed belong to the record of a docking study.
