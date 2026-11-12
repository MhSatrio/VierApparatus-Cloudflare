---
title: "What an Entry Contains"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The contents of a Protein Data Bank entry, including its four-character identifier, the title and the citation of the structure, the experimental method and its details, the macromolecules and their chains, the ligands and the coordinate file, and how each part of the entry is used when deciding whether the structure fits a question."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify the identifier, the method, the chains and the citation in a PDB entry."
  - "State what each part of an entry tells a reader about the reliability and the scope of the structure."
references:
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Each Protein Data Bank entry has a four-character identifier, the PDB ID. The identifier is the handle by which the entry is cited and retrieved, and it is the value an analysis should record. Berman (2000) describes the archive in which each entry is held, and the entry is the unit of deposition: one set of coordinates, with its experimental information, is one entry.

The entry opens with a title and a citation. The title describes the molecule, and the citation names the paper or the deposition that reports the structure. The method states how the structure was determined, such as X-ray crystallography, nuclear magnetic resonance or electron microscopy, and the method determines which quality indicators apply. The methods are the subject of the structural topics, and a reader should know the method before judging the model.

The macromolecular content lists each chain, the molecule it belongs to and its sequence. A chain may be a protein, a nucleic acid or a peptide, and a complex may have several chains of different kinds. The chains show what the entry covers, and a chain that is shorter than the full protein indicates that only part of it was modelled.

The entry also lists the ligands, which are small molecules bound to the macromolecule, and the water molecules that were located in the experiment. Alberts et al. (2022) describe the binding of small molecules to proteins that these records document, and a ligand in the entry is evidence of a binding site as well as a component of the model.

A reader should check the entry against the question. The chains, the ligands and the method must match the molecule and the state of the protein that the analysis concerns, and a structure that differs in these respects is a different experiment.
