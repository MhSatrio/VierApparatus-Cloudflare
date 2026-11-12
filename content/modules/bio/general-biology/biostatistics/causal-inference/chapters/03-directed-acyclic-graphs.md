---
title: "Directed Acyclic Graphs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Directed acyclic graphs as diagrams of causal assumptions in which nodes are variables and arrows are direct causal effects, the rules for reading paths between an exposure and an outcome as open or blocked, the backdoor path that carries confounding and the set of variables that blocks it, the mediator that lies on the causal path and should not be adjusted for when estimating the total effect, and the dependence of every adjustment decision on the graph that the investigator has drawn."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Read a directed acyclic graph and identify the backdoor paths that carry confounding between an exposure and an outcome."
  - "State which variables must be adjusted for and which must not, given a graph of causal assumptions."
references:
  - "Greenland, S., Pearl, J., & Robins, J. M. (1999). Causal Diagrams for Epidemiologic Research. Epidemiology, 10(1), 37-48. https://doi.org/10.1097/00001648-199901000-00008"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A directed acyclic graph draws the causal assumptions of a study. Each variable is a node, and each arrow from one node to another represents a direct causal effect that the investigator believes exists. The graph is acyclic because no variable can cause itself through a loop, and it is the investigator's statement of how the biology works, which the data cannot provide. Greenland et al. (1999) introduced these diagrams to epidemiology so that the assumptions behind an adjustment could be seen and discussed.

A path between an exposure and an outcome is open or blocked according to rules that follow from the arrows. A backdoor path is one that begins with an arrow pointing into the exposure, and such a path carries confounding, since it makes the exposure and the outcome associated through a common cause. To estimate the effect of the exposure, the backdoor paths must be blocked by conditioning on a set of variables, and the graph shows which sets will do this.

A mediator lies on the causal path from exposure to outcome, so the arrows run exposure, mediator, outcome. Adjusting for a mediator blocks part of the effect that the investigator wishes to estimate, and it should not be done when the total effect is the target. The graph therefore determines which variables to adjust for and which to leave alone, and an analysis that adjusts for every available covariate may remove the very effect it aims to measure.

Every adjustment decision is conditional on the graph, and a different graph implies a different adjustment. Ioannidis (2005) described how flexible choice of variables produces findings that do not hold, and the graph should be fixed by the biology and recorded before the analysis. Sandve et al. (2013) recommended recording the graph with the analysis, since a reader must be able to see the assumptions on which the adjustments rest.
