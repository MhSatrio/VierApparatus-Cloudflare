---
title: "Protein Engineering"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The engineering of proteins with new or improved properties through changes to their sequence, covering the vast space of possible sequences and the small fraction that fold and function, the methods of mutagenesis that generate variants, the design of libraries that sample the space efficiently, the fitness landscape that relates sequence to function and that may contain ridges and valleys, machine-guided design that learns the landscape from measured variants, the expression and folding of variants in a host, the characterisation of variants with replicate measurements, and the reporting of protein variants so that their sequences, functions and conditions can be compared."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the sequence space of a protein and the fraction of it that folds and functions."
  - "Explain the fitness landscape concept and state how a library design and a machine model can explore it efficiently."
references:
  - "Packer, M. S., & Liu, D. R. (2015). Methods for the directed evolution of proteins. Nature Reviews Genetics, 16(7), 379-394. https://doi.org/10.1038/nrg3927"
  - "Bornscheuer, U. T., Huisman, G. W., Kazlauskas, R. J., Lutz, S., Moore, J. C., & Robins, K. (2012). Engineering the third wave of biocatalysis. Nature, 485(7397), 185-194. https://doi.org/10.1038/nature11117"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A protein is a chain of amino acids, and the number of possible chains of even a modest length is far larger than the number of molecules that could ever be made. Only a tiny fraction of these sequences fold into stable structures that function, and protein engineering is the search for useful sequences within this vast space. The problem is to find the rare, functional variants efficiently, and the methods of the field are designed to exploit the structure of the space rather than to search it at random.

The topic begins with the sequence space and the fitness landscape, which assigns a function to each sequence. The landscape is rugged, with peaks of high function separated by valleys, and the path from a starting sequence to an improved one may require passing through less functional intermediates. Packer and Liu (2015) described how the directed evolution methods traverse such landscapes, and their success depends on the ruggedness and on the size of the steps taken.

Libraries of variants are designed to sample the landscape in a way that is likely to find improvements. The mutagenesis method determines which changes are made, and the design determines how many changes each variant carries and where. Bornscheuer et al. (2012) described how the choice of positions and changes can focus a library on regions most likely to improve the protein, and this reduces the size needed to find a hit.

Machine-guided design learns the relation between sequence and function from measured variants, and uses the learned model to propose new variants. The model is valuable when it can predict the function of unseen sequences, and it must be validated on variants that were not used to train it. Ioannidis (2005) described how a model that is evaluated on the data that trained it gives an inflated impression of its accuracy, so a held-out set of variants is required.

Cumming (2014) argues that the function of each variant should be measured with replicates and reported with its interval. Sandve et al. (2013) and Peng (2011) recommended recording the sequences, the assays and the models so that the variants and the claims about them can be reproduced.
