---
title: "Ligands, Waters and Missing Residues"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the ligands, the water molecules and the missing residues of a PDB entry are recorded and how they should be handled in an analysis, including the identification of a ligand by its three-letter code, the reasons waters are often located and kept, the regions absent from the model because they were disordered and the effect of including or removing these components on a binding or structural analysis."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the ligands and water molecules in a PDB entry and decide which to keep for a given analysis."
  - "Recognise the missing residues of an entry and state how their absence affects the conclusions drawn from it."
references:
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A structure file contains more than the protein chain. The ligands are small molecules bound to the protein, identified by a three-letter code in the HETATM records, and the water molecules are the solvent that the experiment located. Berman (2000) describes the archive that stores these components with each entry, and they differ in their role. A ligand is usually of interest because it shows where a molecule binds, while a water may or may not be part of the functional structure.

The waters are often kept for the sake of completeness, because they are located in the diffraction data and they can take part in the hydrogen bonding of a binding site. An analysis of a binding site should decide which waters are structural, typically those that bridge the protein and the ligand, and remove the rest. Keeping every water can produce false contacts, and removing all of them can remove real ones, so the choice should be stated.

The missing residues are the parts of the chain for which no coordinates were recorded. They are usually disordered regions, such as flexible loops or termini, that were too mobile to be located. Alberts et al. (2022) describe the flexibility of protein regions that determines which parts are seen in a structure, and the missing residues are the record of that flexibility in the model.

The absence of a residue from the model is not the absence of the residue from the protein. A conclusion about a loop that is missing from the structure is a conclusion about a region the experiment did not see, and an analysis that depends on that loop must say so. The sequence of the entry, in the header, is the reference against which the missing residues are identified.

Sandve et al. (2013) recommended that the processing of data be explicit, and the decision to keep or remove each class of component is part of that processing. The code that makes the decision should be recorded with the analysis.
