---
title: "Genetic Circuits"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Genetic circuits built from transcriptional regulators that compute logical functions of their inputs, including the NOT, NOR and AND gates made from repressors and activators, the cascading of gates to build more complex functions, the input and output signals that connect a circuit to the cell's environment, the orthogonality of regulators that prevents crosstalk between circuit parts, the effects of the load a circuit places on the host's resources, and the characterisation of a circuit by its truth table and its response to a range of inputs."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Build a logic gate from transcriptional repressors and state its truth table."
  - "Explain how orthogonality and resource load limit the complexity of a genetic circuit."
references:
  - "Elowitz, M. B., & Leibler, S. (2000). A synthetic oscillatory network of transcriptional regulators. Nature, 403(6767), 335-338. https://doi.org/10.1038/35002125"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A genetic circuit is a set of regulatory genes whose products control one another, so that the circuit computes a function of its inputs. A repressor that turns off its target when an input is absent produces a NOT gate, since the output is high only when the input is low. Two repressors in series, or a repressor whose activity is blocked by an input, can form NOR and AND-like gates, and these logic elements are the building blocks of more complex devices. Elowitz and Leibler (2000) showed that such regulatory networks can be built from defined components in bacteria.

The gates are composed into cascades, in which the output of one gate is the input of the next. Each composition adds delays and load, so a deep circuit may behave differently from the sum of its gates. The design must consider the signal levels that pass between gates, since a gate that produces an output too weak to drive the next gate will fail the cascade even if each gate works alone.

Orthogonality means that each regulator acts only on its intended target and not on the others in the circuit. Crosstalk, in which a regulator binds the wrong promoter, can create unintended interactions that change the function of the circuit. The more parts a circuit contains, the more opportunities there are for crosstalk, and this is one of the main limits on the size of circuits that can be built reliably.

A circuit consumes the resources of the host, including the ribosomes, the energy and the amino acids needed for its expression. The load can slow the growth of the cell and change the behaviour of the circuit itself, since the expression of the circuit depends on the state of the host. Ioannidis (2005) described how a result obtained under one set of conditions may not hold in another, and a circuit should be characterised by its truth table across the range of inputs and conditions in which it will operate.

Sandve et al. (2013) recommended recording the circuit's design, the regulators, the strains and the conditions, so that its behaviour can be reproduced and compared. Each characterisation should report the truth table with the variability between cells and experiments.
