---
title: "Flux Balance and Network Stoichiometry"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Biological Mechanisms"
description: "How the stoichiometry of a metabolic network constrains its possible fluxes, how flux balance analysis predicts steady-state flux distributions and the assumptions on which these predictions rest."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the steady-state assumption and write the mass balance equations of a small network."
  - "Describe how flux balance analysis finds a flux distribution that optimises an objective."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A metabolic network is a set of reactions that convert metabolites into one another, and each reaction has a stoichiometry that specifies how many molecules of each metabolite are consumed and produced. If the network is in steady state, the concentration of each internal metabolite does not change, so the total production of each metabolite must equal its total consumption. These mass balance constraints form a set of linear equations in the fluxes, and they limit the flux distributions the network can adopt.

For a small network with a few reactions, the constraints may fix all the fluxes. In a genome-scale network with thousands of reactions, the constraints leave a large space of possible flux distributions. Flux balance analysis explores this space by choosing a distribution that maximises an objective, such as the growth rate of the cell, which is written as a combination of the fluxes that produce biomass. The solution is found by linear programming, and it predicts the flux through each reaction under the assumed objective.

The predictions depend on the assumptions. The steady-state condition assumes that the cell is growing in a stable environment, and the choice of objective assumes that the cell is optimising a particular quantity. Real cells may not optimise growth, and the regulation of enzymes and transport can constrain fluxes in ways that the stoichiometry does not include. The method is therefore a hypothesis-generating tool, and its predictions require experimental testing.

Ioannidis (2005) described how models that are flexibly constructed can produce results that do not hold. A network reconstruction contains assumptions about which reactions are present and which are reversible, and these choices can change the predicted fluxes. Validation against measured growth rates and isotope labelling data is essential.

Alberts et al. (2022) describe the reactions of the central metabolism that such networks represent. Flux balance predictions are compared with measured fluxes from isotope tracing and with growth experiments under different nutrients.
