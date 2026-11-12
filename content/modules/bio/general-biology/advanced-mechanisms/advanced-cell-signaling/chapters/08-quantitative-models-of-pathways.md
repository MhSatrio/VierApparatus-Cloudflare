---
title: "Quantitative Models of Pathways"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Biological Mechanisms"
description: "How ordinary differential equations describe the time course of a signalling pathway, how parameters are estimated and how models are tested against data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write simple rate equations for a phosphorylation cycle and solve them for the steady state."
  - "Explain how parameter uncertainty affects the predictions of a model."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A quantitative model of a signalling pathway is a set of equations that describe how the concentrations of its components change over time. The usual form is a set of ordinary differential equations, one for each component, in which the rate of change of each concentration is the sum of its production and its loss. Production and loss are given by rate laws derived from the mechanisms, such as mass-action kinetics for binding and Michaelis-Menten kinetics for enzymes, as described in the Biochemistry module.

Consider a phosphorylation cycle in which a substrate S is converted to a phosphorylated form Sp by a kinase with rate k1 times the kinase activity, and back by a phosphatase with rate k2. The rate of change of Sp is then k1 times the amount of unphosphorylated substrate times the kinase activity, minus k2 times the amount of phosphorylated substrate times the phosphatase activity. At steady state the two rates balance, and the fraction phosphorylated depends on the ratio of kinase and phosphatase activities. The model shows immediately that the steady state responds to the balance of the two enzymes and not to their absolute levels.

Models predict the time course of a response. After a step change in the kinase activity, the phosphorylated fraction approaches its new steady state exponentially, with a time constant that depends on the sum of the two rate constants. The prediction can be tested by stimulating cells and measuring the phosphorylation at several times.

Parameters must be estimated from data, and their uncertainty propagates into the predictions. Two parameters that compensate each other in the data may be impossible to separate, and a model with many parameters can fit almost any dataset. Good modelling therefore includes an analysis of identifiability, and it compares the predictions of alternative models with independent data. Ioannidis (2005) described how flexibility in analysis can produce misleading results, and modelling is subject to the same risk when the model is chosen after the data have been seen.

Anfinsen (1973) showed that the structure of a protein determines its behaviour, and the parameters of a model are ultimately properties of the molecular structures involved. Models that link parameters to structure are the most informative, because they can predict the effect of a mutation.

Alberts et al. (2022) describe the biochemical reactions that the equations represent. Models are tested by comparing simulated and measured time courses, by perturbing components in the model and in cells and by checking whether the predictions hold.
