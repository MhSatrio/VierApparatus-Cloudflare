---
title: "Structural Features: Pockets and Interfaces"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How pockets and binding sites are detected on a protein surface from its structure, the geometric and physicochemical properties that mark a cavity as a likely binding site, how protein-protein interfaces are identified from the residues that lie close together in a complex and the reasons a predicted site must be checked against experimental evidence, with the limits of surface analysis on structures of uncertain quality."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the properties used to detect a pocket on a protein surface and state why a pocket is only a candidate binding site."
  - "Identify a protein-protein interface in a complex and state how the choice of distance cut-off changes the interface."
references:
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Proteins act on other molecules at their surfaces, in pockets where a ligand binds and at interfaces where another protein docks. A structure contains the information needed to find these sites, since the shape of a pocket and the chemistry of its lining determine what can bind there. Alberts et al. (2022) describe how enzymes and receptors recognise their partners by shape and by chemical complementarity, and the structural analysis of pockets attempts to find those sites from the coordinates.

Pocket detection looks for cavities on the surface that are large enough to hold a ligand and lined by residues with suitable properties. Geometric methods find the regions where the surface is concave, and physicochemical scoring weighs the hydrophobicity, the charge and the hydrogen-bonding potential of the lining. A detected pocket is a candidate, not a confirmed binding site, since many cavities are not used for binding and some binding sites are shallow.

Interfaces in a protein complex are the residues of each partner that lie within a distance of the other. The choice of cut-off distance changes the interface, since a larger cut-off includes residues that are near but not in contact. The interface must be defined with the cut-off stated, and the residues that are in contact should be distinguished from those that are merely close.

Ioannidis (2005) described how a result selected from many candidates can overstate its meaning, and a pocket or interface predicted for many structures and selected for its strength is open to the same caution. The predicted sites should be checked against the experimental evidence of the binding, such as mutations that disrupt it, before they are described as functional.

Berman (2000) describes the archive from which the structures come, and the quality of the coordinates limits the surface analysis. Sandve et al. (2013) recommended recording the thresholds of an analysis, and the cut-off distance and the scoring rule for pockets belong to that record.
