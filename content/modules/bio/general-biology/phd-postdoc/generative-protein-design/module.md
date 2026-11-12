---
title: "Generative Protein Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The design of new protein sequences and structures with generative models, covering the generation of sequences from learned distributions conditioned on a desired fold or function, the backbone design in which a structure is specified and sequences are fitted to it, the filtering of designs by predicted structure confidence and by computed energies, the distinction between the novelty of a design and its success, the experimental characterisation of expressed designs for folding, stability and function, the calibration of the success rate of a design method with its interval, and the reporting of the design procedure, the filters, the success rate and the failures with the same completeness as the successes."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a generative design pipeline from backbone specification to sequence design and state the filters applied before experiments."
  - "Report the success rate of a design method with its interval and include the designs that failed."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Generative design produces new protein sequences and structures from learned distributions, and it can target a desired fold, a binding function or a catalytic activity. The field has moved from modifying natural proteins toward proposing sequences that have no close natural counterpart. Jumper et al. (2021) showed that accurate structure prediction makes it possible to evaluate a design computationally before it is made, and this evaluation is the first filter in most pipelines. A predicted structure is a prediction, however, and the designs that pass it must still be tested.

A design pipeline typically specifies a backbone structure, fits sequences to it, and filters the candidates by predicted structure confidence and by computed energies. Each stage introduces choices, and the filters determine which designs reach the laboratory. Ioannidis (2005) described how the selection of results after the fact can inflate the apparent success of a method, and the filters must be fixed before the designs are tested.

Novelty and success are different. A design that is far from any natural sequence may fail to fold, while one close to a natural sequence may be trivially successful. The report should state both the novelty and the success of the designs, and it should not treat novelty as evidence of function. Cumming (2014) argues that the success rate of a method should be reported with its interval, since a few successes from a small number of designs give a wide range.

Experimental characterisation tests the expressed designs for folding, stability and function. Each property must be measured, and the failures must be counted in the denominator, since a success rate calculated only from the designs that expressed overstates the performance of the method. Munafò et al. (2017) argued that the designs that failed should be reported with the successes, so that the success rate can be judged honestly.
