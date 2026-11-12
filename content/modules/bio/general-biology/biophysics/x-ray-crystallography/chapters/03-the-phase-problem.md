---
title: "The Phase Problem"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The phase problem of crystallography: the detector records the intensities of the diffracted waves but not their phases, which are needed to calculate the electron density, and the methods used to recover the phases for macromolecules, including isomorphous replacement with heavy atoms, anomalous scattering and molecular replacement from a homologous structure."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why the phases are lost in the measurement and why they are needed to calculate the electron density."
  - "Describe the methods used to recover phases for a macromolecule and the assumptions each makes."
references:
  - "Kendrew, J. C., Bodo, G., Dintzis, H. M., Parrish, R. G., Wyckoff, H., & Phillips, D. C. (1958). A three-dimensional model of the myoglobin molecule obtained by X-ray analysis. Nature, 181(4610), 662-666. https://doi.org/10.1038/181662a0"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

The diffraction experiment measures the intensity of each spot, which is the square of the amplitude of the scattered wave, and the phase of the wave is lost. The electron density, which is the structure, is the Fourier transform of the amplitudes and phases together, and without the phases the density cannot be calculated directly. The loss of the phases is the phase problem, and it is the central difficulty of crystallography. Kendrew et al. (1958) solved it for myoglobin by combining several sources of phase information, and the process took years of work.

The most traditional solution is isomorphous replacement, in which heavy atoms are introduced into the crystal at specific sites without changing the lattice. The changes in intensity caused by the heavy atoms reveal their positions, and the phases of the protein can be determined from the positions of the heavy atoms. The method requires that the derivative crystals be isomorphous with the native crystal, which means that the heavy atom must not change the lattice, and the choice of derivative is a matter of trial.

Anomalous scattering exploits the fact that the scattering of X-rays by some atoms changes near their absorption edges. The change breaks the symmetry of the intensities and provides phase information, and the method can be used with the atoms already in the protein, such as sulphur or selenium introduced by substitution. The experimental requirement is a precisely tuned X-ray wavelength.

Molecular replacement uses a known structure of a homologous protein as a starting model. The model is placed in the new crystal by searching for its orientation and position, and its calculated phases are used as the initial estimate. The method is widely used when a close homologue exists, and its success depends on the similarity of the models, since a model that differs substantially from the true structure gives phases that mislead the refinement.

Each method makes assumptions, and the phases obtained are estimates with errors. Ioannidis (2005) described how a phase model can be refined to a result that looks plausible while being biased by the starting model, and Platt (1964) recommended an independent check, such as the fit of the calculated density to a feature known from another source.

The phase problem is solved by bringing in information from outside the diffraction measurement, and each source of phase information carries its own assumptions.
