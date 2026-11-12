---
title: "Virtual Screening"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How docking is used to screen large libraries of compounds for molecules likely to bind a target, the preparation of the library, the ranking of the compounds by score, the selection of a manageable set of candidates for experimental testing, the hit rate that measures the success of the screen and the bias of selecting the best scores from a very large library, with the reasons a screen must report all the compounds tested and the rate of confirmation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the stages of a virtual screen from library preparation to the selection of compounds for testing."
  - "Explain why a screen must report the hit rate and all the compounds tested rather than only its best scores."
references:
  - "Trott, O., & Olson, A. J. (2010). AutoDock Vina: Improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. Journal of Computational Chemistry, 31(2), 455-461. https://doi.org/10.1002/jcc.21334"
  - "Friesner, R. A., Banks, J. L., Murphy, R. B., Halgren, T. A., Klicic, J. J., Mainz, D. T., Repasky, M. P., Knoll, E. H., Shelley, M., Perry, J. K., Shaw, D. E., Francis, P., & Shenkin, P. S. (2004). Glide: A New Approach for Rapid, Accurate Docking and Scoring. 1. Method and Assessment of Docking Accuracy. Journal of Medicinal Chemistry, 47(7), 1739-1749. https://doi.org/10.1021/jm0306430"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A virtual screen docks a large library of compounds to a target and ranks them by score, in the hope of finding molecules that bind. The library may hold hundreds of thousands or millions of compounds, and docking each one in a few seconds makes the approach feasible. Friesner et al. (2004) describe the rapid docking that makes such screens practical, and Trott and Olson (2010) describe a program used for the same purpose. The screen produces a ranked list, and the list is a set of candidates for experiment rather than a set of binders.

The library must be prepared. Each compound needs a three-dimensional geometry, a protonation state at the stated pH and a set of conformations that the docking can explore. The preparation is a large task, and its decisions, such as which compounds are removed for being too small or too reactive, change the library and must be reported.

The selection of candidates for testing is the decision that connects the screen to the laboratory. Because only a few compounds can be tested, the top of the ranked list is selected, and the selection is biased toward compounds whose scores are high by chance. The best of a very large library will include many compounds whose scores exceed the true binding by the noise of the function, and the hit rate of the tested set is the measure of how well the screen worked.

Ioannidis (2005) described how selecting the best of many results inflates their apparent value, and a screen that reports only the compounds that bound, and not the rate among those tested, misleads. The screen must report the number of compounds tested, the number of candidates selected, the number confirmed and the hit rate that results.

Sandve et al. (2013) recommended recording the steps and their outcomes, and the library, its preparation, the scoring and the selection rule with the confirmation rate form the record of a virtual screen.
