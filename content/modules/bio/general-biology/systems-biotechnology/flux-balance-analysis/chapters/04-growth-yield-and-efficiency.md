---
title: "Growth, Yield and Efficiency"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The predicted growth rate and the yield of a product or biomass per unit of substrate as outputs of flux balance analysis, the calculation of a yield from the ratio of two fluxes at the optimum, the Pareto trade-off between growth and the production of a target metabolite, the efficiency of a pathway in converting substrate to products, the dependence of yields on the uptake bounds and the medium, and the comparison of predicted yields with experimental measurements of growth and substrate consumption."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate a predicted yield from the fluxes of a flux balance solution and state the uptake bound on which it depends."
  - "Describe the trade-off between growth and product formation and how it is shown by a Pareto front."
references:
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Flux balance analysis predicts growth rates and product yields, and these predictions are the outputs most often compared with experiment. The yield of a product is the ratio of its production flux to the uptake flux of the substrate, and the growth yield is the biomass produced per unit of substrate consumed. At the optimum these ratios are fixed by the solution, and they depend directly on the uptake bound that the modeller has chosen. Orth et al. (2010) described how yields are derived from the flux solution, and the uptake bound is an input that must be reported.

The yield depends on the stoichiometry of the pathway as well as on the bounds. A pathway that converts a substrate into a product with few intermediate losses has a high theoretical yield, and the flux balance solution gives this maximum under the given constraints. The predicted yield is therefore an upper bound that a real organism may not reach, since regulation, maintenance costs and side reactions reduce the yield in practice.

Growth and product formation often compete for the same resources. Maximising growth may leave little flux for a product, and maximising the product may slow growth. The trade-off between the two objectives is shown by a Pareto front, which records the best achievable product yield at each growth rate. Points on the front are efficient, and points inside it are sub-optimal, which gives a way to compare strategies rather than a single prediction.

Predicted yields should be compared with experimental data with their uncertainty. Ioannidis (2005) described how a comparison that is chosen after the results are known can seem to confirm a model, and the comparison should be specified in advance. Cumming (2014) argues that a predicted yield should be compared with the measured yield with its interval, and Sandve et al. (2013) recommended recording the uptake bounds and the medium used for each prediction.
