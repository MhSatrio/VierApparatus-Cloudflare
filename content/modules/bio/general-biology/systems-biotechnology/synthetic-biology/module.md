---
title: "Synthetic Biology"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The engineering of biological parts, devices and systems to perform designed functions, covering the principles of standardisation and abstraction that let parts be combined predictably, the genetic circuits that compute and switch, the toggle switch and the oscillator built from transcriptional regulators as landmark demonstrations, the characterisation of parts whose behaviour changes with their context, the choice of chassis organism, the design of containment and safety features, and the reporting of constructs so that they can be rebuilt and their behaviour compared."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain the principles of abstraction and standardisation that allow biological parts to be combined into devices."
  - "Describe the toggle switch and the repressilator as demonstrations of engineered circuit behaviour and state the characterisation needed before a design can be trusted."
references:
  - "Elowitz, M. B., & Leibler, S. (2000). A synthetic oscillatory network of transcriptional regulators. Nature, 403(6767), 335-338. https://doi.org/10.1038/35002125"
  - "Gardner, T. S., Cantor, C. R., & Collins, J. J. (2000). Construction of a genetic toggle switch in Escherichia coli. Nature, 403(6767), 339-342. https://doi.org/10.1038/35002131"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Synthetic biology applies engineering to living systems. Its aim is to design biological parts, combine them into devices and build systems that perform functions the organism does not naturally perform. The field rests on the hope that biological components can be characterised, standardised and assembled with predictable results, although the living cell is a context that often changes what a part does. Elowitz and Leibler (2000) and Gardner et al. (2000) showed in 2000 that circuits built from regulatory genes could oscillate and switch, which established the approach.

The topic begins with the principles of abstraction and standardisation. Parts are defined by their function and their interfaces, so that a designer can combine them without understanding every molecular detail, and standard parts are meant to be interchangeable. These principles are useful, but they are approximations, since a part that works alone may interact with its neighbours in ways the abstraction does not represent. The later chapters examine the circuits, the characterisation of parts and the context in which they operate.

The toggle switch and the oscillator are the landmark devices. Gardner et al. (2000) built a toggle in which two repressors inhibit each other, creating two stable states, and Elowitz and Leibler (2000) built a repressilator in which three repressors form a cycle that oscillates. Both demonstrate that the behaviour of a designed circuit can be predicted from its structure, although the predictions depend on parameters that vary between cells and conditions.

Engineering demands quantitative characterisation, and Ioannidis (2005) described how a result that is not reproduced cannot be relied upon in design. Cumming (2014) argues that the behaviour of each part should be reported with its interval, and Sandve et al. (2013) and Peng (2011) argued that the designs should be recorded and reproducible. The chapters that follow apply these requirements to the circuits, the parts, the chassis and the containment of engineered organisms.
