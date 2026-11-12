---
title: "Growth Kinetics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The kinetics of cell growth, substrate consumption and product formation in a bioreactor, including the Monod relation between growth rate and substrate concentration, the yield coefficients that link substrate consumed to biomass and product formed, the maintenance energy that consumes substrate without growth, the growth-associated and non-growth-associated models of product formation, the inhibition by substrate and product that changes the rate at high concentrations, and the estimation of kinetic parameters from batch data with their intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the Monod relation between growth rate and substrate concentration and state its parameters."
  - "Estimate the yield coefficient from batch data and explain how maintenance and inhibition change the kinetics."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Growth kinetics describe how the cells grow, consume their substrate and form their product over time. The Monod relation states that the specific growth rate rises with the substrate concentration and approaches a maximum at high concentration, with a half-saturation constant at which the rate is half maximal. The relation is an empirical description rather than a mechanism, and it is used because it captures the main behaviour of many cultures with two parameters.

Yield coefficients link the consumption of substrate to the formation of biomass and product. The biomass yield is the amount of cell mass formed per amount of substrate consumed, and the product yield is the amount of product formed per amount consumed. These coefficients are estimated from batch data by regressing the change in biomass or product against the substrate consumed, and their values determine how much feed is needed for a given output.

Maintenance energy is the substrate consumed by the cell to stay alive without growing. It reduces the yield at low growth rates, and it becomes important in slow or stationary cultures. A model that omits maintenance will overestimate the biomass formed from a given substrate when the growth rate is low, and this matters in fed-batch processes where the growth rate is deliberately kept low.

Product formation may be growth-associated, when the product is made as the cell grows, or non-growth-associated, when it is made in the stationary phase. Substrate and product can both inhibit growth at high concentrations, and an inhibition term changes the shape of the curve. Cumming (2014) argues that each kinetic parameter should be reported with its interval, since parameters estimated from a few batches are often poorly determined. Ioannidis (2005) described how a model that fits one set of batches may not describe another, and Sandve et al. (2013) recommended recording the data and the fitting procedure.
