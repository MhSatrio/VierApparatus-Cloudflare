---
title: "Linear Systems and Matrices"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How systems of linear equations and matrices describe biological networks, such as the balance of metabolic fluxes at steady state, the transition probabilities between states and the linear regression that relates a response to several predictors, with the assumptions that make these descriptions valid."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a biological network as a linear system and solve it for its steady state."
  - "Interpret a regression as a linear model and state the assumptions required for its estimates to be valid."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
---

A metabolic network is a set of reactions that convert substrates into products, and at steady state the production and consumption of each intermediate are equal. These balance conditions form a system of linear equations in the fluxes through the reactions, and the solution gives the flux through each step. Alberts et al. (2022) describe the metabolic pathways whose fluxes this approach estimates, and the matrix of the system records which reactions produce and which consume each metabolite. The method gives the steady state without requiring the detailed kinetics of each enzyme, which is its strength and its limitation.

Linear systems also describe transitions between discrete states. A matrix of transition probabilities gives the chance that a system in one state moves to another in a time step, and its powers describe the state after many steps. The long-run distribution is found from the eigenvector of the matrix, and this approach describes, for example, the proportions of cells in the states of a differentiation process at equilibrium.

Regression is a linear model that relates a response to one or more predictors. The coefficients are estimated by minimising the squared differences between the observed and predicted responses, and the estimates are valid when the errors are independent, have constant variance and are approximately normal. Violation of these assumptions, which is common in biological data, makes the standard errors and the p-values unreliable, and the assumptions must be checked against the residuals.

Hodgkin and Huxley (1952) fitted their model to measurements that were not linear in the voltage, and the nonlinear dependence of their rate constants required a different treatment. Linear methods apply only within a range where the relation is close to linear, and the range must be stated.

Ioannidis (2005) described how a regression with many predictors can find apparent associations by chance, and Platt (1964) recommended testing the model against an experiment in which the predictors are changed deliberately, which distinguishes a cause from a correlation.

Linear algebra makes the structure of biological networks and data explicit, and its conclusions hold only as far as the linear approximation is valid.
