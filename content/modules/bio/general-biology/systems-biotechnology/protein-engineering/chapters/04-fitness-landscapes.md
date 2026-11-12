---
title: "Fitness Landscapes"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The fitness landscape as a mapping from protein sequence to a measured function, its peaks corresponding to sequences of high function and its valleys to sequences of low function, the ruggedness produced by epistatic interactions between positions, the paths of single mutations that climb a landscape and the paths that must cross valleys, the local optima at which a directed search stops, the empirical estimation of a landscape from a set of measured variants, and the consequences of landscape ruggedness for the choice between sequential and combinatorial search."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a fitness landscape and explain how epistasis makes it rugged with local optima."
  - "Choose between a sequential and a combinatorial search given the ruggedness of a landscape and explain the reason."
references:
  - "Packer, M. S., & Liu, D. R. (2015). Methods for the directed evolution of proteins. Nature Reviews Genetics, 16(7), 379-394. https://doi.org/10.1038/nrg3927"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A fitness landscape assigns a value of function to each sequence, so that the protein can be pictured as moving over a surface whose height is its function. Peaks are sequences of high function, valleys are sequences of low function, and an engineer seeks to climb to the highest peak reachable from the starting point. The landscape is an abstraction, but it makes concrete the idea that improvements depend on the path taken through sequence space. Packer and Liu (2015) used this picture to explain why directed evolution succeeds in some proteins and stalls in others.

The shape of the landscape depends on epistasis. If the effect of a mutation depends on the other residues present, the landscape is rugged, with many local peaks that are not the highest. A search that makes only beneficial single changes can climb to a local optimum from which no single change improves the function, and stop there even though a higher peak exists. The ruggedness is the reason that some proteins are hard to improve by simple methods.

Crossing a valley requires a change that first lowers the function before a later change raises it. Such paths are rarely taken by a search that accepts only improvements, and this is why libraries that allow neutral and slightly deleterious changes are often more successful. The design of a search should therefore allow the exploration needed to cross valleys.

A landscape can be estimated empirically from a set of measured variants, by fitting a model that predicts function from sequence. The estimate is only as good as the variants measured, and it should be validated on variants that were not used to fit it. Cumming (2014) argues that the predicted function should be reported with its interval, since the landscape between measured points is uncertain, and Sandve et al. (2013) recommended recording the variants measured and the model used to estimate the landscape.
