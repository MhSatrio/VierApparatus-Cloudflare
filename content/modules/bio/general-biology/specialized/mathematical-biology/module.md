---
title: "Mathematical Biology"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The use of mathematical models to describe and predict biological processes, covering the compartmental models of infectious disease descended from the epidemic theory of Kermack and McKendrick, the population dynamics of growth, competition and predation, the reaction-diffusion equations that produce spatial patterns, the stochastic models that capture the randomness of small populations, the estimation of parameters and the analysis of their sensitivity, the validation and forecasting of models against data, and the reporting of mathematical models so that their assumptions, equations and predictions can be tested and reproduced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Formulate a compartmental model of a biological process and state the assumptions on which its equations rest."
  - "Explain how a model is validated and why a model that fits its data is not thereby shown to predict new cases."
references:
  - "Kermack, W. O., & McKendrick, A. G. (1927). A contribution to the mathematical theory of epidemics. Proceedings of the Royal Society of London. Series A, Containing Papers of a Mathematical and Physical Character, 115(772), 700-721. https://doi.org/10.1098/rspa.1927.0118"
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Mathematical biology uses equations to express how biological quantities change, and it turns verbal hypotheses into statements that can be tested. Kermack and McKendrick (1927) showed that a simple set of equations describing susceptible, infected and recovered people could reproduce the rise and fall of an epidemic, and their framework became the basis of modern infectious disease modelling. The approach has since been extended to populations, tissues, cells and molecules, and it is one of the principal tools of theoretical biology.

The topic begins with models as hypotheses. A model is a simplified representation of a system, and it makes assumptions about which quantities matter and how they interact. Each assumption is a claim that can be wrong, and the value of a model lies in the predictions that follow from its assumptions. Hodgkin and Huxley (1952) showed how a model built from measured mechanisms could reproduce a biological phenomenon in detail, and their work set the standard for mechanistic modelling.

The later chapters examine compartmental models, population dynamics, spatial patterns, stochastic effects, parameter estimation and the validation of models. A recurring theme is the gap between a model that describes the data it was built from and a model that predicts new cases. Ioannidis (2005) described how flexibility in modelling can produce results that do not hold, and the validation of a model against new data is the means of distinguishing these cases.

The reporting of mathematical models must make their assumptions and equations visible, and it must give the parameters with their uncertainties. Cumming (2014) argues that the predictions should be reported with their intervals, and Sandve et al. (2013) and Peng (2011) recommended depositing the equations and the code so that a model can be reproduced and tested.
