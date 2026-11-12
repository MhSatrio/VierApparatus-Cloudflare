---
title: "Vector-Borne Disease Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Mathematical models of vector-borne disease that couple the dynamics of a vector population to the transmission of a pathogen between vectors and hosts, covering the basic reproduction number of such a system, the temperature dependence of the vector's survival, feeding and development rates that shape the risk, the extension of the compartmental framework of Kermack and McKendrick to two host types, the projection of the risk under scenarios of warming, and the validation of these projections against observed outbreaks and the caution needed when they are applied outside the conditions for which they were fitted."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a model of vector-borne transmission between vectors and hosts and state the quantities that determine its reproduction number."
  - "Explain how temperature enters the model through the vector's traits and why projections require validation against observed outbreaks."
references:
  - "Kermack, W. O., & McKendrick, A. G. (1927). A contribution to the mathematical theory of epidemics. Proceedings of the Royal Society of London. Series A, Containing Papers of a Mathematical and Physical Character, 115(772), 700-721. https://doi.org/10.1098/rspa.1927.0118"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Vector-borne diseases are transmitted by an organism such as a mosquito or a tick, which carries the pathogen from one host to another. The transmission therefore depends on two populations, the vectors and the hosts, and on the rates at which the pathogen passes between them. Models of such diseases extend the compartmental framework of Kermack and McKendrick (1927) by including the vector population, with its own compartments and its own dynamics, and by coupling it to the host compartments.

The basic reproduction number of a vector-borne system depends on the biting rate of the vector, its survival, the time it takes for the pathogen to develop inside it, the probability of transmission at each bite and the duration of infection in the host. The reproduction number is the product of these quantities across the cycle of transmission, and it determines whether the disease can invade a population. Each of these quantities may depend on temperature, so the reproduction number changes with the climate.

Temperature acts on the vector through its survival, its feeding rate and the speed of development of the pathogen within it. Each trait has a thermal optimum and a range, and the response is usually non-linear. The model must represent these responses, and the functions that describe them must be fitted to laboratory data on the vector. The representation of temperature is therefore a central choice in the model.

Projections of risk under warming scenarios are made by running the model with the temperature changes expected in each scenario. Such projections must be validated against observed outbreaks, since a model that reproduces the historical distribution of disease may still fail when conditions change. Cumming (2014) argues that the projections should be reported with their intervals, which should reflect the uncertainty in the thermal functions. Ioannidis (2005) described how a model used outside the conditions in which it was fitted may give unreliable results, and Sandve et al. (2013) recommended recording the thermal functions and the scenarios used.
