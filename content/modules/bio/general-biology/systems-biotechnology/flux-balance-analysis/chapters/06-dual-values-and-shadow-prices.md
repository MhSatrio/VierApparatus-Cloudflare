---
title: "Dual Values and Shadow Prices"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The dual values of the linear programme that flux balance analysis solves, which give the change in the optimal objective per unit relaxation of each constraint, the shadow price of a metabolite as the value of an additional unit of it to growth, the reduced costs of reactions that show how far a reaction is from being used, the interpretation of shadow prices as local sensitivities that hold only within a range, the use of these values to identify limiting nutrients, and the caution that a shadow price depends on the other active constraints and on the choice of objective."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Interpret the shadow price of a metabolite or a bound as the local change in the optimal objective per unit change of the constraint."
  - "Identify a limiting nutrient from its shadow price and state the range within which the interpretation holds."
references:
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Every linear programme has a dual problem, whose variables are the dual values of the constraints of the primal problem. In flux balance analysis, the dual value of a metabolite's balance constraint is the change in the optimal objective when that metabolite is supplied by one unit, and it is called its shadow price. Orth et al. (2010) described how these values show which metabolites limit growth and how much each contributes to it, which is a useful output beyond the flux solution itself.

A shadow price is a local sensitivity. It gives the change in the optimum for a small change in the constraint, and this linear relation holds only over a range in which the set of active constraints does not change. Beyond that range the objective may change at a different rate, or the constraint may cease to limit growth. The range should be reported with the shadow price, since a value extrapolated beyond it is misleading.

Reduced costs describe reactions that are not used at the optimum. The reduced cost of a reaction is the amount by which its objective contribution would have to improve before it would be used, and it measures how far the reaction is from being part of the optimal solution. Together with the shadow prices they give a view of the economy of the network, showing which constraints bind and which reactions are idle.

Shadow prices depend on the other constraints and on the objective. A nutrient may appear to limit growth only because a particular uptake bound is active, and changing the bounds can change which metabolite is limiting. Peng (2011) argued that a result must be reproducible from its conditions, and the objective and bounds under which each value was computed should be recorded. Cumming (2014) argues that the sensitivities should be interpreted with their range of validity, and not as fixed properties of the organism.
