---
title: "Fine-Mapping Causal Variants"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The identification of causal variants within a region associated with a trait, covering the linkage disequilibrium that makes many variants in a region statistically indistinguishable, the statistical fine-mapping that computes the posterior probability that each variant is causal under a stated number of causal variants, the credible sets that contain the causal variant with a stated probability, the functional annotation that prioritises variants in regulatory elements or coding sequence, the integration of expression and chromatin data to link a variant to a gene, the limits imposed by the reference panel and by the assumption of one or few causal variants, and the reporting of the posterior probabilities, the credible sets and the functional evidence with their uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the posterior probability that each variant in an associated region is causal and report a credible set with its stated probability."
  - "State the assumptions of fine-mapping and the consequence of violating the assumption of a single causal variant."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

An association signal rarely points to a single variant. Variants in a region that are in linkage disequilibrium are inherited together and produce similar association statistics, so the lead variant is not necessarily the causal one. Fine-mapping attempts to identify the causal variant within the region, and its inference is probabilistic. Ioannidis (2005) described how a result that appears specific can be an artefact of the correlation among measurements, and the uncertainty about which variant is causal must be stated.

Statistical fine-mapping computes the posterior probability that each variant is causal, under an assumed number of causal variants in the region. The probabilities depend on the assumption, and a region with more causal variants than assumed will yield misleading probabilities. The assumed number must be stated, and the sensitivity of the result to it should be shown. Cumming (2014) argues that the probabilities should be reported with the uncertainty that the assumptions introduce.

A credible set is the smallest collection of variants that contains the causal variant with a stated probability, such as ninety-five per cent. The size of the credible set expresses how precisely the causal variant has been located, and a large set indicates that the region cannot be resolved with the available data. Munafò et al. (2017) argued that the credible set and its stated probability should be reported, so that the resolution of the fine-mapping is visible.

Functional annotation prioritises variants that lie in regulatory elements or in coding sequence, and expression and chromatin data can link a variant to a gene whose expression it alters. These are supporting lines of evidence, and they are weighed against the statistical probabilities. Peng (2011) argued that the reference panel and the annotation sources must be documented, since the results depend on them.

The limits of fine-mapping include the dependence on the reference panel, which determines the correlation structure, and the assumption of one or few causal variants, which may be violated when several independent signals share a region. The report should state these limits and the evidence that would resolve them.
