---
title: "Recoding and Design Rules"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The recoding of genetic codons in a synthetic genome and the design rules that the recoding is tested against, covering the redundancy of the genetic code that allows a codon to be replaced by a synonymous one without changing the encoded protein, the effects of codon choice on translation speed, mRNA stability and protein folding that can alter function even when the protein sequence is unchanged, the use of a recoded stop codon or an unused codon to free a code for a new amino acid, the testing of design rules on small segments before they are applied to a whole genome, and the statistical comparison of recoded and native genes across many loci with estimates and intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a synonymous codon change can alter function even when the encoded protein is unchanged."
  - "Test a recoding design rule on a small segment before applying it to a whole genome and compare the outcomes with intervals."
references:
  - "Cong, L., Ran, F. A., Cox, D., Lin, S., Barretto, R., Habib, N., Hsu, P. D., Wu, X., Jiang, W., Marraffini, L. A., & Zhang, F. (2013). Multiplex genome engineering using CRISPR/Cas systems. Science, 339(6121), 819-823. https://doi.org/10.1126/science.1231143"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

The genetic code is redundant: most amino acids are encoded by more than one codon, so a gene can be recoded with synonymous codons while producing the same protein. This redundancy is the basis of recoding in a synthetic genome, and it allows sequences to be altered to remove repeats or restriction sites, or to free a codon for a new use. Cong et al. (2013) showed that many changes could be made to a genome at once, and recoding applies this capacity to the code itself.

Synonymous changes are not always neutral. Codon choice affects the speed of translation, the stability of the messenger RNA and the folding of the nascent protein, and a recoded gene may therefore produce a protein that behaves differently even though its sequence is unchanged. Ioannidis (2005) described how an assumption of neutrality can fail, and the consequences of recoding must be tested rather than assumed.

A recoded stop codon or an unused codon can be freed to encode a new amino acid, which allows the incorporation of an unnatural residue. Such a change alters the code itself, and every gene that uses the freed codon must be recoded. The design rules that govern this must be stated, and their consequences for the whole genome must be checked.

Design rules should be tested on a small segment before they are applied to a whole genome. A segment that behaves as expected gives confidence that the rule is sound, and a segment that fails identifies a problem before it propagates. The comparison of recoded and native genes across many loci should be made with estimates and intervals. Cumming (2014) argues that the variation across loci is informative, and the mean difference alone can hide genes that are strongly affected. Munafò et al. (2017) argued that the design rules should be reported with their test results, including the failures.
