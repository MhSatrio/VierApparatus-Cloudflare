---
title: "ANOVA"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Analysis of variance as a linear model for designs with several factors, covering the one-way and two-way layouts, the interaction between factors and why its presence changes the meaning of each main effect, the planning of contrasts that answer specific biological questions, the correction of post hoc comparisons, the assumptions of the model and their checks, and the reporting of effects and their intervals in designs such as dose by genotype or treatment by time."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a two-factor analysis of variance as a linear model and interpret its main effects and interaction."
  - "Plan contrasts that answer a specific question and correct the comparisons made after a significant model."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: A practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B (Methodological), 57(1), 289-300. https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Analysis of variance, treated as a linear model, is the method for experiments with several factors. A factor is a categorical variable under the control of the experimenter, such as a genotype, a treatment or a time point, and the model estimates the effect of each factor and of their combinations. The one-way layout of the parametric tests topic is the simplest case. Real biological designs usually have more than one factor, and the questions they answer concern how the factors act together.

The topic builds from the two-way layout, in which the interaction between factors is the central quantity. An interaction is present when the effect of one factor depends on the level of the other, such as a drug that lowers a response in one genotype and not in another, and its presence changes the meaning of each main effect. Nelder and Wedderburn (1972) placed analysis of variance within the family of linear models that this topic uses, and the same framework extends to the generalised models of a later topic.

The chapters cover the layouts, the interpretation of interactions, the planning of contrasts that answer specific questions, the comparisons made after a model and the checks of its assumptions. The reporting of effects with intervals, as Cumming (2014) argues, completes the topic. The comparisons after a model must be corrected for their number, as the false discovery rate of Benjamini and Hochberg (1995) makes possible.
