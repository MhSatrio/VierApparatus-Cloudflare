---
title: "High-Throughput Functional Screening"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The use of high-throughput screens to characterise many genes at once and their interpretation, covering the design of pooled and arrayed screens in which each gene is perturbed and its effect on a measurable phenotype is read out, the statistical treatment of screen data with replicate guides and controls, the estimation of effect sizes and of the false discovery rate that controls the number of spurious hits, the validation of hits by individual perturbation in an independent assay, the risk of off-target effects and of guide-specific artefacts, and the reporting of screen data with the full distribution of results and not only the hits selected."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a high-throughput screen with replicate perturbations and controls and analyse it with an estimated false discovery rate."
  - "Validate screen hits by individual perturbation in an independent assay before interpreting them as functional genes."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Cong, L., Ran, F. A., Cox, D., Lin, S., Barretto, R., Habib, N., Hsu, P. D., Wu, X., Jiang, W., Marraffini, L. A., & Zhang, F. (2013). Multiplex genome engineering using CRISPR/Cas systems. Science, 339(6121), 819-823. https://doi.org/10.1126/science.1231143"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A high-throughput screen perturbs many genes in parallel and measures the effect of each on a phenotype. Pooled screens introduce a library of perturbations into a population of cells and select or count them by their effect, while arrayed screens test each perturbation in a separate well. The approach produces far more data than a gene-by-gene study, and it introduces statistical problems that must be solved before its hits can be trusted. Cong et al. (2013) described the multiplex editing that made such libraries practical.

Each gene should be targeted by several independent perturbations, and each perturbation should be replicated. A single guide that produces a hit may do so through an off-target effect or an artefact of its sequence, and agreement between several guides is much stronger evidence. Ioannidis (2005) described how the multiplicity of tests in a large screen generates many false positives, and the design must limit them.

The statistical analysis estimates the effect of each gene with its interval and controls the false discovery rate, which is the expected proportion of hits that are spurious. A threshold chosen to produce many hits without control will produce many false ones. Cumming (2014) argues that the effect sizes and their intervals should be reported for all genes, and not only the hits, since the distribution of effects is informative about the screen as a whole.

Hits must be validated by individual perturbation in an independent assay before they are interpreted as functional genes. A screen identifies candidates; it does not establish mechanism. Munafò et al. (2017) argued that the full set of results should be deposited and the selection criteria stated in advance, so that the hits can be judged against the whole screen and not only the subset that was selected for publication.
