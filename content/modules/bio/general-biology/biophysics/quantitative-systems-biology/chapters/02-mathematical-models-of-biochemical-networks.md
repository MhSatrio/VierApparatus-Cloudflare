---
title: "Mathematical Models of Biochemical Networks"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How biochemical reactions are written as ordinary differential equations, the law of mass action and the rate laws that follow from it, how enzyme kinetics and transport steps are represented in a network model and how the concentrations of molecules change over time as the reactions proceed."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write the rate equations for a simple reversible reaction and for a reaction in which an enzyme converts a substrate into a product."
  - "Explain how a set of rate equations describes the change in the concentrations of all species in a network."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
---

A biochemical network is a set of molecular species connected by reactions. In a model, each species has a concentration, and each reaction has a rate that depends on the concentrations of its reactants. The law of mass action states that, for a reaction in dilute solution at constant temperature, the rate is proportional to the product of the concentrations of the reactants raised to the powers of their stoichiometric coefficients. For a reaction A converting to B with rate constant k, the rate is k times the concentration of A, and the concentration of A falls exponentially toward zero.

Enzymes complicate the picture. An enzyme binds its substrate, forms a complex and releases the product, so the substrate concentration does not simply multiply a constant rate. Under the assumption that the enzyme-substrate complex reaches a quasi-steady state, the rate takes the familiar saturating form, in which the rate rises with substrate concentration and approaches a maximum. Alberts et al. (2022) describe the enzyme mechanisms from which these rate laws are derived, and the same reasoning underlies most kinetic models of metabolism.

A network of many reactions is written as a system of ordinary differential equations, one for each species. The change in a concentration is the sum of the rates of the reactions that produce it minus the sum of the rates of the reactions that consume it. The equations are often coupled, because a product of one reaction may be the substrate of another, and the coupling is what gives the network its behaviour.

Solving such a system usually requires numerical methods, since analytical solutions exist only for simple networks. The solutions show how each concentration changes over time from a given starting state, and they can be compared with time-course measurements from an experiment.

Kitano (2002) emphasised that the value of such models lies in their ability to show how the network as a whole responds, and a single set of concentration curves is only the starting point for that analysis.
