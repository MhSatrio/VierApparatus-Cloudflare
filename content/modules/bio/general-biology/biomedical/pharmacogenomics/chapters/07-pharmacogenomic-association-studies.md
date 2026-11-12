---
title: "Pharmacogenomic Association Studies"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biomedical Sciences"
description: "How genetic association studies in pharmacogenomics are designed, including candidate gene studies and genome-wide association studies, the problems of winner's curse, population stratification and multiple testing and the replication required before an association is accepted."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare candidate gene and genome-wide association designs and state the errors each is prone to."
  - "Explain why replication in an independent population is needed before a pharmacogenomic association is accepted."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Evans, W. E., & Relling, M. V. (1999). Pharmacogenomics: Translating functional genomics into rational therapeutics. Science, 286(5439), 487-491. https://doi.org/10.1126/science.286.5439.487"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A candidate gene study examines one or a few genes chosen because their biology suggests a role in the response to a drug. It is efficient and easy to interpret, but the choice of gene is based on prior belief, and the number of variants examined can be large. Ioannidis (2005) described how a field in which many small studies test many variants will produce false positives, because the studies that report significant results are the ones published. The chance that a reported association is true depends on the prior probability that it exists and on the power of the study.

A genome-wide association study examines hundreds of thousands of variants across the genome without a prior choice of gene. It avoids the bias of choosing candidates, but it requires a stringent threshold for significance, because the number of tests is very large, and the sample size needed to reach the threshold is large. The results are reported as associations with the variants nearest to the causal site, and the causal variant is often not identified.

The winner's curse is a bias that affects the first report of an association. When a variant is selected because its effect in the discovery sample is large, the estimate of its effect is inflated, since the selection favours chance overestimates. The effect in a replication sample is typically smaller. Pharmacogenomic associations have often been reported with strengths that later studies did not reproduce, and the winner's curse is a common reason.

Population stratification is a confounding problem. Allele frequencies differ between populations, and a difference in drug response between populations may reflect ancestry rather than the variant studied. The analysis must adjust for ancestry, and the association must be tested within populations. Failure to do so produces spurious associations that replicate only in the population in which they were found.

Replication in an independent population is the decisive test. An association that is found in a discovery sample and confirmed in a separate sample, with a similar effect size, has passed a test it could have failed. Platt (1964) recommended such tests, since a result that survives a test designed to refute it is more secure than one that does not.

The design of an association study determines which errors it is prone to, and the strength of the evidence depends on how these errors have been addressed.
