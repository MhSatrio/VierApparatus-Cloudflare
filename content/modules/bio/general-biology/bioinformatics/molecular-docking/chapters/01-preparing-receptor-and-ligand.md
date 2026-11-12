---
title: "Preparing the Receptor and Ligand"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the protein receptor and the small-molecule ligand are prepared for docking, covering the selection of a structure and its binding site, the addition of hydrogen atoms and the assignment of protonation states at a stated pH, the handling of waters and cofactors, the generation of the three-dimensional geometry and the charges of the ligand and the decisions in preparation that change the poses a docking can find."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Prepare a receptor structure for docking and state the decisions made about hydrogens, protonation and waters."
  - "Prepare a ligand with a correct three-dimensional geometry and state how its charges and rotatable bonds were set."
references:
  - "Trott, O., & Olson, A. J. (2010). AutoDock Vina: Improving the speed and accuracy of docking with a new scoring function, efficient optimization, and multithreading. Journal of Computational Chemistry, 31(2), 455-461. https://doi.org/10.1002/jcc.21334"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A docking result is fixed by its inputs before the search begins. The receptor usually comes from the Protein Data Bank, described by Berman (2000), and its structure must be checked for the region of the binding site, for missing residues in that region and for the alternate locations of atoms. A structure that lacks the side chains of the site cannot place a ligand correctly, and the choice of structure, including its resolution and its ligand, is the first decision of the study.

Hydrogen atoms are often absent from crystal structures, and they must be added with a stated protonation state. The state of a histidine or an acidic residue depends on the pH and on the local environment, and an incorrect state changes the hydrogen bonds that a ligand can form. The pH and the method used to assign the states should be reported, since the same receptor prepared differently gives different poses.

Waters and cofactors are removed or kept by a rule. A water that bridges the ligand and the protein may be part of the binding site, and removing it can lose a real interaction, while keeping all waters can introduce false contacts. Cofactors such as metal ions are often essential, and the decision about each should be stated.

The ligand must be given a three-dimensional geometry, its charges and its rotatable bonds. The protonation of the ligand at the same pH as the receptor is as important as the receptor's, and the number of rotatable bonds sets the size of the search. Trott and Olson (2010) describe the preparation that their program requires, and the steps are the same in principle for other programs.

Sandve et al. (2013) recommended recording the inputs of an analysis, and the structure identifier, the protonation method, the handling of waters and cofactors and the ligand preparation are the inputs of a docking study.
