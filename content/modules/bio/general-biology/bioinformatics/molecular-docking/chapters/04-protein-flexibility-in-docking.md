---
title: "Protein Flexibility in Docking"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the flexibility of the protein is treated in docking, the rigid-receptor approximation that most calculations use, the selected flexibility of side chains that AutoDock4 allows, the ensemble docking that uses several receptor structures to represent conformational change and the reasons a rigid receptor can give a wrong pose where the binding site changes shape on binding."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why most docking treats the receptor as rigid and state the cases in which this approximation fails."
  - "Describe how selected side-chain flexibility and ensemble docking address receptor flexibility and what each assumes."
references:
  - "Morris, G. M., Huey, R., Lindstrom, W., Sanner, M. F., Belew, R. K., Goodsell, D. S., & Olson, A. J. (2009). AutoDock4 and AutoDockTools4: Automated docking with selective receptor flexibility. Journal of Computational Chemistry, 30(16), 2785-2791. https://doi.org/10.1002/jcc.21256"
  - "Trott, O., & Olson, A. J. (2010). AutoDock Vina: Improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. Journal of Computational Chemistry, 31(2), 455-461. https://doi.org/10.1002/jcc.21334"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A protein is not rigid, and its binding site can change shape when a ligand arrives. Alberts et al. (2022) describe how proteins undergo conformational changes in their function, and the induced fit of a ligand is one example. Most docking calculations ignore this and treat the receptor as a fixed structure, which is a strong approximation. It works well when the site is preformed for the ligand and fails when the site must reorganise to accept it.

Morris et al. (2009) describe AutoDock4, which allows selected side chains of the binding site to move during the docking, and this selective flexibility captures some of the induced fit without the cost of moving the whole protein. The choice of which side chains to allow is a decision that must be justified, since allowing too many increases the search space and the chance of a spurious pose. The flexible residues should be reported.

Trott and Olson (2010) describe a program that treats the receptor as rigid and achieves speed by its search and scoring. For a protein whose site changes, the rigid treatment may give the correct pose only if the site in the chosen structure is already in a compatible state, and the choice of structure becomes critical.

Ensemble docking uses several receptor structures, each representing a conformation of the site, and docks the ligand to each. The ensemble can represent a range of shapes, and it is useful when the structures of several states are known. The ensemble is only as complete as the states it contains, and a state not in the ensemble cannot be found.

Sandve et al. (2013) recommended recording the assumptions of an analysis, and the treatment of flexibility, including the flexible residues or the members of the ensemble, is an assumption that changes the poses found.
