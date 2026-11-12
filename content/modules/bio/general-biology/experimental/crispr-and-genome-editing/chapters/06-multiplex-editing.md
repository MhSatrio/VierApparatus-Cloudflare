---
title: "Multiplex Editing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "Introducing several edits at once with multiple guide RNAs, how Cong et al. showed that a single Cas enzyme can cut several sites, the combinatorial outcomes that multiplexing produces and the screening needed to find cells carrying the intended combination."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a multiplex experiment with guides for several loci and state the outcomes that combinations can produce."
  - "Plan the screening needed to identify cells carrying the intended combination of edits."
references:
  - "Cong, L., Ran, F. A., Cox, D., Lin, S., Barretto, R., Habib, N., Hsu, P. D., Wu, X., Jiang, W., Marraffini, L. A., & Zhang, F. (2013). Multiplex genome engineering using CRISPR/Cas systems. Science, 339(6121), 819-823. https://doi.org/10.1126/science.1231143"
  - "Mali, P., Yang, L., Esvelt, K. M., Aach, J., Guell, M., DiCarlo, J. E., Norville, J. E., & Church, G. M. (2013). RNA-guided human genome engineering via Cas9. Science, 339(6121), 823-826. https://doi.org/10.1126/science.1232033"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Cong et al. (2013) showed that one Cas enzyme can be directed to several sites at once by several guide RNAs, so that a cell can receive multiple cuts in a single transfection. This multiplexing allows a set of genes to be disrupted together, or a set of loci to be edited to test whether they act jointly. The approach is powerful because it replaces many separate experiments with one, but it also multiplies the outcomes that must be measured.

Mali et al. (2013) showed that the same logic applies in human cells, and the efficiency of each cut is a property of the guide and the locus. When several guides are used, each cut has its own efficiency, so the fraction of cells carrying all the intended edits is the product of the individual efficiencies. If each edit occurs in half of the cells, the chance that a cell carries all four is only one in sixteen, if the events are independent. The combination is therefore usually rare, and the screen must be sized accordingly.

The number of possible outcomes grows quickly. Each locus may be repaired in several ways, and the combination of repairs across loci produces a population of genotypes, many of which are not the one intended. A sequencing readout at each locus, across single-cell clones, is the way to resolve the population. Bulk sequencing gives an average that can hide the true composition.

Platt (1964) recommended comparing alternatives, and a multiplex experiment should include single-guide controls and a non-targeting guide to separate the effect of the cutting from the effect of the edit. Ioannidis (2005) described how a large number of comparisons increases the chance of an apparent effect, and the correction for multiple testing must be applied when several loci are examined.

Alberts et al. (2022) describe the genes whose joint action a multiplex experiment tests, which gives the biological question that the design must answer.
