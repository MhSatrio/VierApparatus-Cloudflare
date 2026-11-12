---
title: "Multiplex Editing"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The editing of several genomic loci in a single experiment and the management of the complexity it introduces, covering the simultaneous delivery of several guides that target different sites, the demonstration that multiple cuts can be made and repaired in one cell, the statistical problem of the combinatorial outcomes when each locus may be edited or not independently, the design of screening strategies that identify clones carrying the desired combination, the effect of multiple breaks on chromosomal integrity and on cell fitness, and the reporting of the combination of edits with the frequency of each outcome."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate the expected frequency of each combination of edits in a multiplex experiment and design a screen that identifies the desired combination."
  - "Explain how multiple breaks can compromise chromosomal integrity and cell fitness, and how this is assessed."
references:
  - "Cong, L., Ran, F. A., Cox, D., Lin, S., Barretto, R., Habib, N., Hsu, P. D., Wu, X., Jiang, W., Marraffini, L. A., & Zhang, F. (2013). Multiplex genome engineering using CRISPR/Cas systems. Science, 339(6121), 819-823. https://doi.org/10.1126/science.1231143"
  - "Mali, P., Yang, L., Esvelt, K. M., Aach, J., Guell, M., DiCarlo, J. E., Norville, J. E., & Church, G. M. (2013). RNA-guided human genome engineering via Cas9. Science, 339(6121), 823-826. https://doi.org/10.1126/science.1232033"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Multiplex editing targets several loci in one experiment, and Cong et al. (2013) demonstrated that multiple cuts could be made and repaired in the same cells. The approach is efficient, because a single transformation can produce many changes, but it creates a combinatorial problem. If each of three loci may be edited or left unedited independently, there are eight possible combinations, and the desired one may be rare.

The expected frequency of each combination can be calculated from the efficiency at each locus, assuming independence, and the calculation must be checked against the observed frequencies. Independence is often not met, since the cutting at one locus may affect the repair at another. Ioannidis (2005) described how an assumption of independence that is not checked can produce misleading conclusions, and the observed frequencies should be compared with the expected.

Screening strategies identify clones that carry the desired combination. Each clone is genotyped at every target, and the clones with the correct combination are selected. The number of clones screened must be large enough that the desired combination is expected to be found, and the probability of finding it should be estimated before the experiment. Cumming (2014) argues that such probabilities should be reported with their intervals, since the outcome depends on a limited number of samples.

Multiple breaks can compromise chromosomal integrity, producing deletions, translocations or the loss of fragments between the cut sites. They can also reduce cell fitness, since the response to damage slows growth or triggers death. Both effects must be assessed, and the fitness of edited cells should be compared with that of controls. Munafò et al. (2017) argued that the frequency of such side effects should be reported, so that the cost of multiplex editing is visible to others who might adopt the method.
