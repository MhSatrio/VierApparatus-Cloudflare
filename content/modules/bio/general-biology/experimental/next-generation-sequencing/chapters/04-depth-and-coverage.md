---
title: "Depth and Coverage"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "The difference between sequencing depth and coverage, how the number of reads needed for a question is estimated from the genome size and the target sensitivity and how uneven coverage and low-complexity regions limit what a run can detect."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the depth needed to detect a variant at a given allele frequency with confidence."
  - "Recognise regions where coverage is uneven or low and state their effect on the conclusions."
references:
  - "Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. Nature Biotechnology, 26(10), 1135-1145. https://doi.org/10.1038/nbt1486"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Depth is the average number of reads that cover a position, and coverage is the proportion of the target that is covered by at least one read. The two are related but not the same. A run can reach high depth on a small part of a target and leave the rest uncovered, and the coverage is the measure that shows whether the whole target was examined. Shendure and Ji (2008) described how the total output of a run is divided among the samples and the regions, and the depth achieved in practice depends on this division.

The depth needed depends on the question. A variant present in every copy of the genome, as in a heterozygous germline change, requires a modest depth to detect, since about half the reads should carry it. A variant present in a small fraction of cells, such as a somatic mutation in a tumour, requires a much greater depth, because the variant reads are a small minority of the total. The number needed to detect a variant at a given frequency with a stated confidence can be calculated from the binomial distribution, and the calculation should be done before the run.

Coverage is uneven. GC-rich regions, repetitive sequences and regions with unusual structure are often under-represented, and some regions receive no reads at all. The uneven coverage limits the detection of variants in those regions, and a negative result there is not evidence that no variant exists. The regions with low coverage are reported and excluded from claims that require them.

Platt (1964) argued that a test should be designed so that it can fail, and coverage gaps are a reason a negative result may be uninformative. Ioannidis (2005) described how a study with insufficient power can produce results that are unreliable, and the power of the depth chosen should be stated.

Alberts et al. (2022) describe the repetitive and structured regions of the genome that are difficult to cover.
