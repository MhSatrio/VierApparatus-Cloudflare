---
title: "Stochastic and Agent-Based Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Stochastic and agent-based models of biological systems in which randomness and individual behaviour determine the outcome, covering the representation of chemical reactions and population events as random processes simulated by exact or approximate algorithms, the distribution of outcomes across many simulated runs as the quantity to be predicted, the agent-based model in which individual cells or organisms follow rules that give rise to emergent patterns, the sensitivity of emergent behaviour to the rules and to the parameters, the number of runs needed to estimate an outcome probability with a stated precision, and the reporting of the model, the seeds and the convergence of the estimates."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the probability of an outcome from a stochastic simulation and determine the number of runs needed for a stated precision."
  - "Describe how the rules of an agent-based model produce emergent patterns and state how their sensitivity is tested."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Many biological processes involve small numbers of molecules or individuals, and their behaviour is random. A stochastic model represents each event as a random process, and simulating many runs gives a distribution of outcomes rather than a single trajectory. The quantity of interest is often the probability of an outcome, such as extinction or a switch in cell fate, and this probability is estimated from the proportion of runs in which it occurs. Ioannidis (2005) described how a single run can mislead about a stochastic system, and the distribution must be examined.

The probability of an outcome is an estimate with an uncertainty that depends on the number of runs. Cumming (2014) argues that the interval of such a probability should be reported, and the number of runs needed for a given precision can be calculated in advance. A probability estimated from a hundred runs has a wide interval, and a claim that rests on it must state the width.

Agent-based models represent individual cells or organisms, each following rules, and the population-level pattern emerges from their interactions. Such models can reproduce complex patterns from simple rules, but the emergent behaviour may be highly sensitive to the rules and to the parameters. The sensitivity must be tested by varying the rules and the parameters, and the conclusions should be shown to survive reasonable variation.

Each simulation uses a random seed, and the seed must be recorded so that the runs can be reproduced exactly. Peng (2011) argued that a stochastic result is reproducible only with its seeds and its code, and Munafò et al. (2017) argued that the number of runs and the convergence of the estimates should be reported. An estimate that has not converged is not yet an estimate, and the reader must be able to see whether it has.
