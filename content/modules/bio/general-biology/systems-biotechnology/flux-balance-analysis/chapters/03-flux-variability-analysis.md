---
title: "Flux Variability Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Flux variability analysis as the method that finds, for each reaction, the minimum and maximum flux compatible with the optimal objective value, the identification of fluxes that are fixed by the objective and fluxes that are free among optimal solutions, the use of a fraction of the optimum to explore near-optimal solutions, the distinction between the variability of a flux and its importance, and the reporting of the ranges with the objective value and the tolerance used to define optimality."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how flux variability analysis finds the range of a flux among optimal solutions and what a narrow range implies."
  - "Describe the use of a fraction of the optimum to explore near-optimal solutions and state how it changes the ranges."
references:
  - "Schellenberger, J., Que, R., Fleming, R. M. T., Thiele, I., Orth, J. D., Feist, A. M., Zielinski, D. C., Bordbar, A., Lewis, N. E., Rahmanian, S., Kang, J., Hyduke, D. R., & Palsson, B. Ø. (2011). Quantitative prediction of cellular metabolism with constraint-based models: the COBRA Toolbox v2.0. Nature Protocols, 6(9), 1290-1307. https://doi.org/10.1038/nprot.2011.308"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

An optimal flux distribution is rarely unique, because many combinations of fluxes can achieve the same maximum objective. Flux variability analysis addresses this by finding, for each reaction, the smallest and largest flux that is compatible with the optimal value of the objective. The result is a range for every flux in the network, and it shows which reactions are determined by the objective and which are free to take many values. Schellenberger et al. (2011) implemented the method in the software that accompanies the constraint-based approach.

A narrow range means that a flux is strongly constrained by the optimum, and a wide range means that the objective does not determine it. The fixed fluxes are those that the optimal growth demands, and the free fluxes are those whose values the model cannot predict from the objective alone. Cumming (2014) argues that the width of an interval is itself informative, and a range should be read as the uncertainty that the model cannot resolve.

The analysis can be extended to near-optimal solutions by requiring the objective to reach a fraction of its optimal value, such as ninety per cent, rather than the full maximum. This allows the model to represent the sub-optimal behaviour that a real cell may show, and it widens the ranges. The fraction chosen changes the result, so it must be reported and justified.

A large variability is not the same as an important reaction. A flux that varies widely among optimal solutions may have little effect on the objective, while a narrow flux may be critical. Orth et al. (2010) noted that the method describes what is possible under the objective rather than what is important for growth, and these two questions should not be confused. Ioannidis (2005) described how a single summary can be misread when its meaning is forgotten, and the ranges should be reported with the objective value and the tolerance used to decide optimality.
