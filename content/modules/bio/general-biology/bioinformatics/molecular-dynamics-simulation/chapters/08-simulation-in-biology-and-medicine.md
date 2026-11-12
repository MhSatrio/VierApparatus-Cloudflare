---
title: "Simulation in Biology and Medicine"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Applications of molecular dynamics simulation in biology and medicine, including the study of how proteins move and change shape, the observation of how drugs and ligands bind and unbind, the investigation of membranes and ion channels, the interpretation of mutations through their effect on dynamics and the use of simulation to explain experimental measurements, with the limits that the force field, the sampling and the time scale place on each claim."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe three applications of molecular dynamics and the question each answers."
  - "Judge whether a simulation supports the biological claim made in a given application, given its sampling and validation."
references:
  - "Phillips, J. C., Hardy, D. J., Maia, J. D. C., Stone, J. E., Ribeiro, J. V., Bernardi, R. C., Buch, R., Fiorin, G., Hénin, J., Jiang, W., McGreevy, R., Melo, M. C. R., Radak, B. K., Skeel, R. D., Singharoy, A., Wang, Y., Roux, B., Aksimentiev, A., Luthey-Schulten, Z., . . . Tajkhorshid, E. (2020). Scalable molecular dynamics on CPU and GPU architectures with NAMD. The Journal of Chemical Physics, 153(4), 044130. https://doi.org/10.1063/5.0014475"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

Molecular dynamics is applied wherever the motion of a biomolecule matters to its function. It shows how a protein's flexible regions move, how an enzyme's site opens and closes, how a ligand finds and leaves its binding site and how a membrane channel conducts ions. Phillips et al. (2020) describe the large simulations that make such studies possible, and Alberts et al. (2022) describe the conformational changes and the molecular recognition that these simulations are used to examine.

Each application asks a different question, and each needs a different amount of sampling. A question about the flexibility of a loop may be answered by a short simulation, while a question about the rate of a binding event may need far longer than a simulation can reach without enhanced methods. The claim should be matched to the sampling, and a rate claimed from a few unbinding events is weak.

The applications are sensitive to the force field, and an inaccurate parameter can produce a motion that is an artefact of the model. A claim about the mechanism of a channel or a binding event depends on the force field's description of the relevant interactions, and the claim should be validated against experiment where possible. Ioannidis (2005) described how a result that is found under flexible choices can look more reliable than it is, and simulation studies have many such choices.

Simulation can also be used to explain experimental results. A mutation that changes a measured property may be explained by a change in dynamics observed in the simulation, and this explanation is a hypothesis. Platt (1964) recommended that the hypothesis be tested against alternatives, and the experiment that discriminates between them is the strongest support for the explanation.

The applications share a rule: a simulation should be used for the question its sampling and validation can answer, and the claim should be restricted to what the trajectory can show.
