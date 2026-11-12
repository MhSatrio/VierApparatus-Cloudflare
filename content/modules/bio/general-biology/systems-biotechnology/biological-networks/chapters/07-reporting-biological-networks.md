---
title: "Reporting Biological Networks"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "What a report of a biological network must contain for its structure and conclusions to be judged and repeated, including the definition of nodes and edges and their biological meaning, the sources and versions of the interaction data, the evidence and confidence thresholds, the filtering applied, the network measures with their null models and intervals, and the deposition of the network in a standard format together with the code that computed its properties."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the definitions, sources, filters and null models that a network report must give."
  - "Report a network's measures with their intervals and the null model against which they are compared."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A network is a representation, and a report must state what it represents before its structure can be interpreted. The meaning of a node and an edge, the kind of interaction an edge records and the organism and conditions to which the network applies should all be given. Peng (2011) argued that a result must be reproducible, and for a network the means of reproduction are the data sources, the filters and the code that computed the measures.

The sources and versions of the interaction data determine the network, and databases change over time. Each source should be named with its version and access date, and the confidence scores and the threshold used to filter the edges should be stated. Ioannidis (2005) described how the choice of evidence and thresholds can determine the findings, so these choices must be fixed in advance or reported as a sensitivity analysis.

The measures should be reported with their null models and their intervals. A degree distribution, a clustering coefficient or a motif count is interpretable only against the expectation of a randomised network, and the randomisation used must be stated. Cumming (2014) argues that a measure should be reported with its uncertainty, which for a network can be estimated by resampling the edges or by repeating the analysis on different thresholds.

The network should be deposited in a standard format together with the code that computed its measures. Sandve et al. (2013) recommended keeping the inputs, the steps and the outputs together, so that the network and its analysis can be rebuilt when the databases change. A network deposited without its code cannot be checked against the measures reported, and a network without its sources cannot be updated.
