---
title: "Genetic Circuit Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The design of genetic circuits that process signals in living cells, covering the specification of a circuit as a logic function, the automated design of circuits from a library of characterised gates, the insulation of gates from one another and from the host, the simulation of a design before it is built, the debugging of circuits that fail in the cell, the quantitative models that connect gate behaviour to the parts, the validation of a circuit across inputs and conditions, and the reporting of a circuit design so that it can be rebuilt and its performance compared."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a genetic circuit as a logic function and describe how an automated design tool maps it onto characterised gates."
  - "Explain how insulation, simulation and debugging each reduce the risk that a circuit fails when built in a cell."
references:
  - "Nielsen, A. A. K., Der, B. S., Shin, J., Vaidyanathan, P., Paralanov, V., Strychalski, E. A., Ross, D., Densmore, D., & Voigt, C. A. (2016). Genetic circuit design automation. Science, 352(6281), aac7341. https://doi.org/10.1126/science.aac7341"
  - "Elowitz, M. B., & Leibler, S. (2000). A synthetic oscillatory network of transcriptional regulators. Nature, 403(6767), 335-338. https://doi.org/10.1038/35002125"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A genetic circuit is a designed set of regulatory genes that performs a logic function on its inputs, such as producing an output only when two signals are both present. Early circuits were designed by hand, and each new circuit required a long process of trial and rebuilding. Nielsen et al. (2016) showed that a circuit can be specified in a formal language, mapped automatically onto a library of characterised gates and checked against its specification, which turns circuit design into a more systematic engineering task.

The design begins with the specification. The inputs, the outputs and the logic that links them are written as a truth table, and the design tool selects gates whose behaviour, when combined, reproduces the table. The quality of the design depends on the library, since a tool can only use gates that have been characterised, and the library must cover the range of behaviours that the design needs. Elowitz and Leibler (2000) showed that regulatory genes can form functional networks, and the library is built from such components.

Insulation keeps each gate from interfering with the others, and with the host, so that the behaviour of a gate is the same in the circuit as in isolation. Orthogonal regulators and insulated promoters reduce crosstalk, and the design must consider the load that the circuit places on the cell. The simulation of a design before it is built predicts its behaviour, but the predictions depend on parameters that must be measured, and Ioannidis (2005) described how a model fitted without independent checks can mislead.

Circuits that fail in the cell are debugged by measuring each gate separately and then the whole circuit, so that the failing component can be identified. Cumming (2014) argues that the performance of a circuit should be reported as a distribution across cells and experiments, rather than as a single truth table. Sandve et al. (2013) and Peng (2011) recommended recording the design, the library and the measurements, so that a circuit can be rebuilt and its success compared with other designs.
