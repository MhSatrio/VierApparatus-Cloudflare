---
title: "Rate Laws and Mass Action"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The rate laws that describe how fast biological reactions proceed, the law of mass action in which the rate is proportional to the product of the concentrations of the reactants, the Michaelis-Menten approximation for enzyme-catalysed reactions under the quasi-steady-state assumption, the Hill function for cooperative binding and switch-like regulation, the choice of rate law by the mechanism and the conditions, and the caution that a fitted rate law describes the data over the range measured and not the mechanism beyond it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "State the law of mass action and apply it to a bimolecular reaction."
  - "Describe the Michaelis-Menten and Hill rate laws and the conditions under which each is an appropriate approximation."
references:
  - "Alon, U. (2007). Network motifs: theory and experimental approaches. Nature Reviews Genetics, 8(6), 450-461. https://doi.org/10.1038/nrg2102"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A rate law states how fast a reaction proceeds as a function of the concentrations of its reactants. The law of mass action is the simplest: for an elementary reaction in which molecules collide, the rate is proportional to the product of the concentrations of the reactants, with the proportionality constant as the rate constant. A reaction of two molecules A and B forming C therefore has a rate of k times the concentration of A times that of B, and this form follows from the probability of collision in a well-mixed solution.

Most enzyme-catalysed reactions do not follow mass action directly, because the enzyme must bind its substrate before it reacts. The Michaelis-Menten rate law is the approximation obtained under the quasi-steady-state assumption, in which the concentration of the enzyme-substrate complex changes slowly compared with the substrate. It gives a rate that rises with substrate concentration and saturates at a maximum, and the two parameters, the maximal rate and the Michaelis constant, have biological meanings that can be measured.

Regulatory interactions are often cooperative, meaning that the binding of one molecule makes the binding of the next easier or harder. The Hill function describes this cooperativity with a coefficient, and a high coefficient gives a steep, switch-like response. Alon (2007) noted that such steep responses are important in network motifs that act as switches, and the Hill coefficient is a parameter whose value determines the switching behaviour of the model.

The choice of rate law must follow from the mechanism and the conditions. An approximation that holds at one enzyme concentration may fail at another, and a fitted rate law describes the data over the range in which they were measured. Ioannidis (2005) described how a model that fits the data within a range may be applied outside it with unwarranted confidence, and the range of validity should be reported. Sandve et al. (2013) recommended recording the rate laws and the parameters with their ranges.
