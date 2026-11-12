---
title: "Interaction Effects"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The interaction between two factors in a biological experiment, the meaning of an interaction as the dependence of one factor's effect on the level of the other, the graphical checks that show interactions as non-parallel profiles, the relation between an interaction and the scale on which the response is measured, the cases in which a main effect is uninterpretable in the presence of an interaction and the reporting of the simple effects that describe the interaction in biological terms."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe an interaction between two factors in biological terms and show it on a plot of the cell means."
  - "Explain why a main effect may be uninterpretable when an interaction is present and what should be reported instead."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An interaction is present when the effect of one factor depends on the level of the other. A drug that reduces tumour growth in one genotype and has no effect in another is an interaction between drug and genotype: the drug's effect is not one number but depends on the genotype. The interaction is the biologically interesting quantity in many experiments, since it identifies the conditions under which an intervention acts, and it is often the reason the experiment was designed.

The interaction is seen as non-parallel profiles. If the mean response is plotted for each level of one factor against the levels of the other, the lines are parallel when there is no interaction and cross or diverge when there is one. The plot is the first check, and it should be made with the individual values or with the means and their intervals, as Cumming (2014) argues, since a plot of means alone can hide the spread that determines whether the lines differ.

The scale of the response affects whether an interaction appears. An effect that is multiplicative on the original scale appears as an additive interaction on the logarithmic scale, and the absence of an interaction on one scale may be the presence of one on another. Nelder and Wedderburn (1972) describe the linear models in which the scale of the link determines the form of the interaction, and the choice of scale must be justified biologically.

When an interaction is present, the main effects are not interpretable in the simple way. The effect of the drug averaged over genotypes is a mixture of effects that differ between genotypes, and it describes no particular genotype. The report should give the simple effects, the effect of each factor at each level of the other, which describe the interaction in terms a biologist can use.

Sandve et al. (2013) recommended recording the model and the scale, and the simple effects with their intervals are the means of reporting an interaction clearly.
