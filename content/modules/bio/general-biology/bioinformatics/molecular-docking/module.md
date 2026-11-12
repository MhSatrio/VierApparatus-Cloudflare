---
title: "Molecular Docking"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The computational prediction of how a small molecule binds to a protein, covering the preparation of the receptor and ligand, the search over poses and conformations, the scoring functions that rank poses and their known limits, the treatment of protein flexibility, the validation of a docking protocol against known complexes and the reporting that prevents a docking score from being mistaken for a measured binding affinity."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Set up a docking calculation with a prepared receptor and ligand and explain the search and scoring steps."
  - "Validate a docking protocol against known complexes and state what a docking score can and cannot show."
references:
  - "Trott, O., & Olson, A. J. (2010). AutoDock Vina: Improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. Journal of Computational Chemistry, 31(2), 455-461. https://doi.org/10.1002/jcc.21334"
  - "Friesner, R. A., Banks, J. L., Murphy, R. B., Halgren, T. A., Klicic, J. J., Mainz, D. T., Repasky, M. P., Knoll, E. H., Shelley, M., Perry, J. K., Shaw, D. E., Francis, P., & Shenkin, P. S. (2004). Glide: A New Approach for Rapid, Accurate Docking and Scoring. 1. Method and Assessment of Docking Accuracy. Journal of Medicinal Chemistry, 47(7), 1739-1749. https://doi.org/10.1021/jm0306430"
  - "Morris, G. M., Huey, R., Lindstrom, W., Sanner, M. F., Belew, R. K., Goodsell, D. S., & Olson, A. J. (2009). AutoDock4 and AutoDockTools4: Automated docking with selective receptor flexibility. Journal of Computational Chemistry, 30(16), 2785-2791. https://doi.org/10.1002/jcc.21256"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Docking predicts the pose of a small molecule in the binding site of a protein and estimates how strongly it binds. The task has two parts that are solved together. The search explores the positions and orientations of the ligand within the site, and the scoring function ranks each pose by an estimate of the binding energy. Trott and Olson (2010) describe AutoDock Vina, a widely used program that combines an efficient search with a simple scoring function, and the principles of the method are shared by the other programs of the field.

The topic covers the stages of a docking study. It begins with the preparation of the receptor and the ligand, since the protonation states, the missing atoms and the geometry of the inputs determine the poses that can be found. The search and the scoring follow, with the comparison of programs such as Glide, described by Friesner et al. (2004), and AutoDock4, described by Morris et al. (2009), which handles receptor flexibility. The validation of a protocol and the reporting of its results complete the topic.

A docking score is an estimate, not a measurement. Its relation to a measured binding affinity is loose, and the ranking of ligands by score is often less reliable than the ranking of poses within one ligand. The topic keeps this distinction in view, since the enthusiasm for docking has often led to claims that the scores cannot support.
