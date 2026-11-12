---
title: "The Stoichiometric Matrix"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The stoichiometric matrix whose rows are metabolites and whose columns are reactions, with negative entries for substrates and positive entries for products, the steady-state assumption that the net production of each internal metabolite is zero so that the flux vector lies in the null space of the matrix, the reasons that this assumption defines a space of feasible fluxes without requiring kinetic parameters, and the checks for mass and charge balance that catch errors in the matrix before any analysis is performed."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct a stoichiometric matrix from a list of reactions and explain the sign convention for substrates and products."
  - "State the steady-state assumption and explain how it defines the space of feasible fluxes."
references:
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Thiele, I., & Palsson, B. Ø. (2010). A protocol for generating a high-quality genome-scale metabolic reconstruction. Nature Protocols, 5(1), 93-121. https://doi.org/10.1038/nprot.2009.203"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

The stoichiometric matrix S represents a reconstruction as a table of numbers. Each row corresponds to a metabolite and each column to a reaction, and the entry in row i and column j is the stoichiometric coefficient of metabolite i in reaction j. Substrates have negative coefficients, since they are consumed, and products have positive coefficients, since they are formed. The matrix is the mathematical core of constraint-based modelling, and every analysis of the network begins from it. Orth et al. (2010) described how the matrix defines the model without the need for kinetic parameters.

The central assumption is steady state. For each internal metabolite, the net rate of production must equal the net rate of consumption, so that the concentration does not change over time. In matrix terms, the vector of fluxes v must satisfy S times v equal to zero. The set of flux vectors that satisfy this equation is the null space of S, and every feasible steady state of the network lies within it. Orth et al. (2010) emphasised that this assumption is a modelling choice that holds for a growing cell in balanced growth, not a general truth.

The advantage of the approach is that it requires only the stoichiometry and the bounds on the fluxes, and not the kinetics of each enzyme, which are rarely known. The disadvantage is that it describes the possible behaviours of the network rather than the one that occurs, so additional constraints or an objective function are needed to choose among them. Thiele and Palsson (2010) recommended checking the matrix before analysis, because an error in one reaction changes the whole space of feasible fluxes.

Mass and charge balance are the first checks. Each reaction should conserve the number of atoms of each element and the net charge, and an unbalanced reaction allows a flux to be produced from nothing. Such errors are found automatically by checking the sums of the elements on each side of the equation. Peng (2011) argued that a computational result must be reproducible, and the matrix, the balance checks and their outcomes should be deposited with the reconstruction.
