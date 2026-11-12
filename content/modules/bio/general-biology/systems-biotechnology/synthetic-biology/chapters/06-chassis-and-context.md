---
title: "Chassis and Context"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The choice of a chassis organism in which a synthetic circuit is built, the properties of common chassis such as Escherichia coli and yeast that make them suitable for different designs, the context effects that alter the behaviour of a part when the host, the growth phase, the medium or the other genes change, the burden that an engineered circuit imposes on host resources and reduces growth, the use of orthogonal components to isolate a circuit from the host, and the testing of a design in more than one context before it is relied upon."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Justify the choice of a chassis organism for a design and state the context effects that could alter its behaviour."
  - "Explain how metabolic burden changes a circuit's behaviour and state a test that reveals it."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Gardner, T. S., Cantor, C. R., & Collins, J. J. (2000). Construction of a genetic toggle switch in Escherichia coli. Nature, 403(6767), 339-342. https://doi.org/10.1038/35002131"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A synthetic circuit must be built in a host organism, the chassis, and the host determines much of its behaviour. Escherichia coli is the most widely used chassis because of its genetic tools and its rapid growth, and yeast and other organisms are chosen for designs that need eukaryotic features. Gardner et al. (2000) built their toggle switch in Escherichia coli, and the choice of host has shaped which circuits can be built and tested. The chassis should be justified by the design's requirements rather than by convenience alone.

The behaviour of a part depends on its context. The same promoter may be stronger in one strain than another, its activity may change with growth phase, and its output may depend on the medium and on the other genes that compete for the same machinery. These context effects are often larger than the differences between designs, and a part characterised in one context cannot be assumed to behave the same way in another. Ioannidis (2005) described how a result obtained under one condition may fail to hold under another, and the context should be recorded with every measurement.

Metabolic burden is the cost that an engineered circuit places on the host. The expression of the circuit uses ribosomes, energy and amino acids, which slows the growth of the cell, and the slower growth changes the expression of the circuit itself. A circuit that works well in a short experiment may fail over a longer one as the cells evolve to reduce the burden. A test for burden compares the growth of the engineered cell with that of a control carrying an inert construct.

Orthogonal components reduce the dependence of a circuit on the host, because they are designed to act only on their intended targets. The use of such components isolates the circuit from the host's regulation and makes its behaviour more predictable, although no component is perfectly orthogonal. Peng (2011) argued that a design is reproducible only when its context is known, and Sandve et al. (2013) recommended recording the chassis, the strain and the medium, so that the behaviour of a construct in another context can be understood.
