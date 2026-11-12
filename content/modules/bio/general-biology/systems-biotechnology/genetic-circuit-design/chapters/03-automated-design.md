---
title: "Automated Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Automated design of genetic circuits in which a tool searches a library of characterised gates for an arrangement that implements a specified logic, the representation of the logic as a graph of operations that is mapped onto gates, the constraints such as orthogonality, the number of gates and the load that restrict the search, the ranking of candidate designs by predicted performance, and the reasons that an automated design must be checked by experiment before it is trusted."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how an automated design tool maps a logic specification onto gates from a library."
  - "State the constraints that restrict the search and explain why a predicted design still needs experimental testing."
references:
  - "Nielsen, A. A. K., Der, B. S., Shin, J., Vaidyanathan, P., Paralanov, V., Strychalski, E. A., Ross, D., Densmore, D., & Voigt, C. A. (2016). Genetic circuit design automation. Science, 352(6281), aac7341. https://doi.org/10.1126/science.aac7341"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

An automated design tool takes a logic specification and searches for a circuit that implements it from a library of gates. The logic is first represented as a graph of operations, which the tool maps onto gate types, and the mapping is then realised by choosing specific gates from the library. The search is combinatorial, since there are many ways to implement the same logic with different gates, and the tool ranks the candidates by how well they are predicted to perform. Nielsen et al. (2016) described this approach as the step that makes the design of larger circuits possible.

The search is restricted by constraints. The gates must be orthogonal, so that they do not interact, the number of gates must be limited by what can be built and characterised, and the predicted load on the host must be acceptable. Each constraint removes candidates, and a specification that is too demanding may have no feasible design at all, in which case the tool must report the failure rather than return a poor design silently.

The ranking of candidates depends on the model that predicts their performance. A design predicted to have a large output margin between its high and low states is preferred, but the margin is only as reliable as the gate parameters on which it depends. Ioannidis (2005) described how a method that selects the best of many candidates will tend to overstate the performance of the one chosen, and the selection should be validated on designs not used in the search.

An automated design is a hypothesis about the behaviour of a circuit. It must be built and tested, and its performance compared with the prediction, before it is relied upon. Sandve et al. (2013) recommended recording the search settings, the library version and the constraints, and Peng (2011) argued that a design is reproducible only when its means of generation are available. Each design should be reported with the prediction it was given and the measurement that tested it.
