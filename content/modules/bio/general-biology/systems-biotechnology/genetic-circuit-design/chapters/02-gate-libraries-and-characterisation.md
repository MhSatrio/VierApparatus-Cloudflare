---
title: "Gate Libraries and Characterisation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The library of characterised gates from which a circuit is assembled, each gate described by its response function from input to output with parameters such as the maximal output, the threshold and the steepness, the need for each gate to be measured in the same context in which it will be used, the range of inputs over which the response is reliable, the storage of gate data as structured records so that a design tool can use them, and the reasons that a library built in one laboratory may need recalibration in another."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a gate by its response function and the parameters that summarise it."
  - "Explain why a gate library must be measured in the context of its use and why a library may need recalibration elsewhere."
references:
  - "Nielsen, A. A. K., Der, B. S., Shin, J., Vaidyanathan, P., Paralanov, V., Strychalski, E. A., Ross, D., Densmore, D., & Voigt, C. A. (2016). Genetic circuit design automation. Science, 352(6281), aac7341. https://doi.org/10.1126/science.aac7341"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A gate library is a collection of characterised gates, and each gate in it is described by its response function, which gives the output for each level of the input. The response is usually a Hill-type curve with a maximal output, a threshold and a steepness, and these parameters are the data that a design tool uses to predict how a gate will behave in a circuit. Nielsen et al. (2016) showed that a library of this kind allows a tool to compose gates into circuits whose behaviour can be predicted before they are built.

Each gate must be measured in the context in which it will be used. A gate characterised in isolation on a plasmid may behave differently when it is integrated into the genome, or when it sits downstream of another gate that changes its input. The library should therefore record the context, including the host, the copy number and the position of the gate, so that the designer knows which measurements apply to which design.

The reliable range of each gate is limited. A response function fitted over a range of inputs may not describe the behaviour outside that range, and a design that drives a gate beyond its measured range relies on extrapolation. The library should state the input range over which each gate was measured, and the design tool should refuse to use a gate outside that range or should flag the extrapolation.

Gate data should be stored as structured records, with the parameters, their uncertainties and the conditions of measurement. Cumming (2014) argues that each parameter should be reported with its interval, since a threshold estimated from few measurements is uncertain. Ioannidis (2005) described how a library assembled without independent checks can carry errors forward, and a gate that works in one laboratory may need recalibration in another, so the library should record the laboratory and the measurement method for each gate.
