---
title: "Free Energy and Enhanced Sampling"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The methods that estimate free energy differences from simulations and the enhanced sampling methods that reach rare states, including the free energy perturbation and thermodynamic integration approaches for the cost of a change, the umbrella sampling and replica exchange methods that overcome energy barriers, the collective variables that define the reaction coordinate, and the cautions needed because these estimates depend strongly on the sampling and on the choice of variables."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why an unbiased simulation rarely samples the states separated by a large energy barrier and how enhanced sampling addresses this."
  - "Describe how a free energy difference is estimated from simulations and state what makes the estimate unreliable."
references:
  - "Phillips, J. C., Hardy, D. J., Maia, J. D. C., Stone, J. E., Ribeiro, J. V., Bernardi, R. C., Buch, R., Fiorin, G., Hénin, J., Jiang, W., McGreevy, R., Melo, M. C. R., Radak, B. K., Skeel, R. D., Singharoy, A., Wang, Y., Roux, B., Aksimentiev, A., Luthey-Schulten, Z., . . . Tajkhorshid, E. (2020). Scalable molecular dynamics on CPU and GPU architectures with NAMD. The Journal of Chemical Physics, 153(4), 044130. https://doi.org/10.1063/5.0014475"
  - "Hornak, V., Abel, R., Okur, A., Strockbine, B., Roitberg, A., & Simmerling, C. (2006). Comparison of multiple Amber force fields and development of improved protein backbone parameters. Proteins: Structure, Function, and Bioinformatics, 65(3), 712-725. https://doi.org/10.1002/prot.21123"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Many of the events that matter in biomolecules are rare on the timescale of a simulation. A ligand leaving its site, a loop opening or a protein folding may take far longer than a simulation can reach, and an unbiased trajectory may never observe them. Enhanced sampling methods add a bias that drives the system over the barriers, and the free energy of the states is then recovered from the biased simulation. Phillips et al. (2020) describe the performance of the large simulations on which such methods are run, and the methods themselves are implemented in the common packages.

Free energy differences are estimated by methods such as free energy perturbation and thermodynamic integration, which compute the work of changing one state into another along a path, and umbrella sampling, which samples a series of windows along a reaction coordinate and reconstructs the free energy profile from them. Replica exchange methods run copies of the system at different conditions and exchange them, so that one copy can cross barriers that another cannot. Each method makes assumptions about the path or the windows, and the estimate depends on them.

Collective variables define the reaction coordinate along which the sampling is enhanced, and the choice of variables determines the result. A variable that does not describe the true pathway gives a free energy profile that is misleading, since the barrier along it is not the barrier of the process. The variables should be justified, and the sensitivity of the result to them tested.

The estimates are sensitive to the force field, which Hornak et al. (2006) describe as having parameters that determine the preferred conformations of the chain. A small error in the energy of one state relative to another changes the free energy difference by the same amount, and such differences are of the order that matter for binding and folding. The estimate must be checked for convergence across the windows or replicas, and its uncertainty reported.

Ioannidis (2005) described how a result that depends on flexible choices can appear more reliable than it is, and a free energy estimate depends on many choices. Sandve et al. (2013) recommended recording these choices, and the variables, the windows, the sampling time and the uncertainty form the record of an estimate.
