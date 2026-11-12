---
title: "Screening and Selection"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The methods that identify improved enzyme variants among a library, namely screening, in which each variant is assayed individually for its activity, and selection, in which the survival or growth of the host depends on the activity of the variant, the throughput and sensitivity of each method, the risk that a selection favours variants that exploit the selection rather than the enzyme function, the false positives that arise from background activity and the need for confirmation of hits in replicate assays, and the way that the size of a library determines the chance of finding a rare improvement."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish screening from selection and state the throughput and the main failure mode of each."
  - "Explain why a hit from a screen must be confirmed in replicate assays and how the library size affects the chance of finding a rare improvement."
references:
  - "Packer, M. S., & Liu, D. R. (2015). Methods for the directed evolution of proteins. Nature Reviews Genetics, 16(7), 379-394. https://doi.org/10.1038/nrg3927"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Screening and selection are the two ways of finding improved variants in a library. In screening, each variant is assayed on its own, and its activity is measured and compared with the parent. Selection links the activity of the variant to the survival or growth of the host cell, so that the variants that perform best are the ones that persist. Screening is slower and more informative, since it gives a value for each variant, while selection can test very large libraries at low cost. Packer and Liu (2015) reviewed both approaches and their uses.

The throughput of a method determines how large a library can be searched, and the sensitivity determines how small an improvement can be detected. Plate-based assays test thousands of variants, while microfluidic and cell-sorting methods test millions, but each has a limit on the precision with which activity can be measured. A method that is fast but imprecise will miss small improvements and pass false ones.

A selection can be exploited. A variant may survive the selection by a mechanism unrelated to the enzyme, such as overproduction of a resistance factor or mutation of the host, and such a variant appears improved without improving the enzyme. Controls that separate the enzyme's activity from the survival mechanism are needed, and the hits should be checked.

Background activity and noise produce false positives in a screen, and a hit must be confirmed in replicate assays before it is accepted. Ioannidis (2005) described how the best of many candidates is likely to overstate its improvement, and the chance of finding a true improvement depends on the library size and the rarity of the improvement. Cumming (2014) argues that each hit should be reported with its interval across replicates, and the size of the library and the confirmation rate should be stated.
