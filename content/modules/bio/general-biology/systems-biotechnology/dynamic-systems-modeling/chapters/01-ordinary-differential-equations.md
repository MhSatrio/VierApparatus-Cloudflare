---
title: "Ordinary Differential Equations"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The formulation of a biological process as a system of ordinary differential equations in which the rate of change of each concentration is the sum of its production and consumption terms, the state variables and parameters that define the model, the initial conditions that a trajectory requires, the numerical integration that produces a simulated time course, and the checks of mass conservation and of the units of each term that catch errors before the model is simulated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a system of ordinary differential equations for a simple biological pathway and state its variables, parameters and initial conditions."
  - "Check the units and the mass conservation of a model before it is simulated."
references:
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A dynamic model is a set of ordinary differential equations, one for each variable whose concentration changes. The equation for a species gives its rate of change as the sum of the rates that produce it minus the rates that consume it. For a simple pathway in which a substrate is converted to a product by an enzyme, the substrate decreases and the product increases at the rate of the reaction, and the equations make this bookkeeping explicit. Kitano (2002) described this formulation as the basis of quantitative systems biology.

The state variables are the quantities that change, and the parameters are the constants that govern their rates, such as the maximal rate of an enzyme or a degradation constant. The initial conditions give the values of the variables at the start of the simulation, and they are needed because a system of differential equations has a family of solutions, each determined by its starting point. The initial conditions are part of the model and must be reported.

Numerical integration produces a simulated time course from the equations and the initial conditions. The method of integration and its step size affect the result, and a step size that is too large can produce spurious oscillations or instability. The solver and its tolerances should be recorded, and the simulation should be repeated with a smaller step to confirm that the result does not depend on it.

Before simulation, the model should be checked for unit consistency and for mass conservation. Each term in each equation must have the units of the rate, and the total mass of each conserved moiety must remain constant. An equation that violates these checks contains an error that the simulation will not reveal, since the numbers it produces will look plausible. Peng (2011) argued that a result must be reproducible from its means, and Sandve et al. (2013) recommended recording the equations, units and conserved quantities with the model.
