---
title: "Force Fields and Parameters"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The force fields that describe the energies of biological molecules, their functional forms for bonds, angles, torsions and electrostatic and van der Waals interactions, how their parameters are derived from quantum calculations and experimental data, the transferability of parameters between molecules and the errors that a force field carries into every simulation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the terms of a biomolecular force field and what each represents physically."
  - "Explain how force field parameters are derived and why they carry errors that propagate into the simulation."
references:
  - "Karplus, M., & McCammon, J. A. (1983). Dynamics of proteins: Elements and function. Annual Review of Biochemistry, 52(1), 263-300. https://doi.org/10.1146/annurev.bi.52.070183.001403"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A force field is the set of mathematical functions and parameters that give the energy of a molecule as a function of its atomic positions. The bonds are represented as springs that resist stretching, the angles as springs that resist bending, the torsions as periodic barriers to rotation and the non-bonded interactions as electrostatic charges and van der Waals attractions and repulsions between atoms that are not bonded. Karplus and McCammon (1983) built their early simulations on such functions, and the form of the terms has been refined since. The terms are simplifications, and each represents a physical effect in an approximate way.

The parameters are derived from quantum chemical calculations of small molecules and from experimental data such as crystal structures, vibrational spectra and the energies of conformations. The parameters are fitted so that the force field reproduces the reference data, and the fitting involves choices about which data to use and how to weight them. Anfinsen (1973) showed that the structure of a protein is the outcome of its interactions, and a force field that misrepresents an interaction will misrepresent the structures it produces.

Transferability is a central problem. A parameter fitted to one molecule is applied to others, and the parameter may not be appropriate for the new context. The charges of a residue in a protein differ from those of the isolated amino acid, and the force field must represent the environment without refitting every case. The choice of how charges are assigned is one of the largest sources of difference between force fields.

Every simulation carries the errors of its force field. A systematic error in the balance between protein and water, or in the stability of a helix, is propagated into every trajectory that uses the field, and the error can be larger than the statistical uncertainty of the simulation. The uncertainty of the force field must therefore be considered alongside the sampling error.

Ioannidis (2005) described how a force field validated on a few systems may be used without validation on the system of interest, and Platt (1964) recommended comparing the predictions of different force fields with experiment, which shows which errors are shared and which are particular to a field.

The force field is the model of the interactions, and the simulation can be no more accurate than the field that drives it.
