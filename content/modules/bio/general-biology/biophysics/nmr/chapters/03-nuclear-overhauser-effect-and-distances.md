---
title: "Nuclear Overhauser Effect and Distances"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The nuclear Overhauser effect, through which nuclei close in space exchange magnetisation and produce cross-peaks whose intensity falls steeply with distance, how the intensities are converted into distance restraints between assigned atoms, the sources of error from spin diffusion and molecular motion and the way the distance restraints define the fold of a molecule."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how the nuclear Overhauser effect reports the distance between two nuclei and how this is converted to a distance restraint."
  - "Explain how spin diffusion and molecular motion distort the intensities and how this affects the restraints."
references:
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

The nuclear Overhauser effect transfers magnetisation between nuclei that are close in space, through their dipolar coupling, which depends on the inverse sixth power of the distance between them. Nuclei within about five ångströms of one another give measurable cross-peaks, and the intensity of the peak reports the distance, although only roughly. The effect is the NMR structure's principal source of spatial information, since it links atoms that are far apart in the sequence but close in the folded structure, and each such pair is a distance restraint.

The intensity must be converted to a distance, and the conversion depends on the motion of the molecule and on the calibration of a reference distance. Strong peaks are interpreted as short distances and weak ones as long, and the ranges are usually grouped into bins with upper bounds rather than measured precisely. The restraints are therefore inequalities rather than exact values, and the structure must be built from them with this in mind.

Spin diffusion is a source of error. Magnetisation can pass from one nucleus to another through a chain of intermediate nuclei, so that a pair of atoms that are far apart can show a cross-peak through the intermediates. The longer the mixing time, the greater the spin diffusion, and the restraint derived from a long mixing time is less reliable than one from a short time. Ioannidis (2005) described how an apparent close contact may be an artefact of this transfer, and the experiments must be designed to exclude it.

Molecular motion also affects the intensity. A pair of atoms that move rapidly averages the dipolar coupling, and the effective distance differs from the static one. The restraints are then an average over the motions, and the flexible parts of the molecule give restraints that are less specific. The structure should reflect the motion as an uncertainty, not as a precise distance.

The distance restraints define the fold. A set of restraints that is dense enough constrains the position of each atom relative to the others, and the fold of the molecule is the arrangement consistent with all of them. Anfinsen (1973) showed that the fold is determined by the chain, and the restraints are the experimental evidence of that determination.

Platt (1964) recommended a test that could show the restraints to be inconsistent with the structure, such as the presence of restraints that cannot be satisfied simultaneously, which reveals errors in the assignment or the calibration.

The nuclear Overhauser effect gives the distances between nuclei close in space, and the restraints built from them define the fold only as far as the intensities and the motions allow.
