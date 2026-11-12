---
title: "Compartmental Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Compartmental models that divide a population or a system into classes, such as susceptible, infected and recovered in an epidemic, and describe the flows between them by differential equations, the threshold quantity that determines whether an infection spreads, the basic reproduction number as the average number of secondary cases produced by one case in a susceptible population, the herd immunity threshold that follows from it, the assumptions of homogeneous mixing and constant rates that limit the model, and the extensions that add age structure, heterogeneity and the delay of latent periods."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write the equations of a susceptible-infected-recovered model and state the assumptions that make the flows between classes proportional to the class sizes."
  - "Define the basic reproduction number and explain how it determines whether an infection can spread."
references:
  - "Kermack, W. O., & McKendrick, A. G. (1927). A contribution to the mathematical theory of epidemics. Proceedings of the Royal Society of London. Series A, Containing Papers of a Mathematical and Physical Character, 115(772), 700-721. https://doi.org/10.1098/rspa.1927.0118"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A compartmental model divides a population into classes and describes how individuals move between them. The classical example by Kermack and McKendrick (1927) has three classes: susceptible individuals, infected individuals and recovered individuals. New infections move individuals from the susceptible to the infected class at a rate proportional to the number of contacts between them, and recovery moves individuals from the infected to the recovered class at a constant rate. The equations are simple, and they produce the characteristic epidemic curve that rises, peaks and falls.

The basic reproduction number is the average number of secondary cases that one infected individual produces in a population in which everyone is susceptible. If this number exceeds one, the infection can spread, and if it is below one the infection dies out. The threshold is one of the most important results of the model, and it determines the conditions under which an outbreak becomes an epidemic.

From the reproduction number follows the herd immunity threshold, the proportion of the population that must be immune for the infection to stop spreading. In the simple model this proportion is one minus the reciprocal of the reproduction number, and it depends on the assumption that immunity is complete and that the population mixes homogeneously. Real populations depart from both assumptions, and the threshold must be estimated with these departures in mind.

The assumptions of the model are its limits. Homogeneous mixing assumes that every individual is equally likely to contact every other, which is not true of a real population with structure by age, place and behaviour. Constant rates assume that the parameters do not change, which is not true when behaviour or treatment changes. Extensions add age structure, heterogeneity and latent periods, and each extension adds parameters that must be estimated. Cumming (2014) argues that the estimates of the reproduction number should be reported with their intervals, since they are often uncertain.
