---
title: "Alignment and Variant Calling"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How trimmed reads are aligned to a reference genome, how mapping quality is assessed, how candidate variants are called from the aligned reads and how filtering and the choice of reference determine which variants are reported."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how reads are aligned to a reference and what mapping quality reports."
  - "Call and filter variants and state how the choice of reference and filters affects the variant set."
references:
  - "Watson, J. D., & Crick, F. H. C. (1953). Molecular structure of nucleic acids: A structure for deoxyribose nucleic acid. Nature, 171(4356), 737-738. https://doi.org/10.1038/171737a0"
  - "Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. Nature Biotechnology, 26(10), 1135-1145. https://doi.org/10.1038/nbt1486"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

Alignment places each read at the position in a reference genome that matches it best. The matching uses the base pairing described by Watson and Crick (1953), allowing for mismatches and for small insertions and deletions. Each alignment receives a mapping quality, which estimates the confidence that the read belongs to that position. A read that matches several places equally well has a low mapping quality, and it is usually excluded from variant calling, because a variant found in such a read may belong to any of the matching sites.

Variant calling compares the bases in the aligned reads with the reference at each position. A position that differs from the reference in a proportion of reads is a candidate variant, and the proportion, the number of reads and the quality of the bases supporting it determine the call. A heterozygous variant appears in about half the reads, and a homozygous one in nearly all. Shendure and Ji (2008) described how the calls are built from these counts, and the caller converts the evidence into a probability.

Filters remove calls that are likely to be errors. Variants supported by few reads, by reads of low quality or by reads with low mapping quality are excluded, and variants in regions of known difficulty are treated with caution. The filters are chosen before the analysis, and their effect is reported.

The reference genome shapes the variant set. A variant that is absent from the reference will be called as a difference, and a region that is absent from the reference cannot be aligned at all. The choice of reference, its version and its population must be stated, since the same reads can give different variant sets against different references.

Ioannidis (2005) described how a pipeline with many adjustable settings can produce many different results, and the pipeline should be fixed and reported. Platt (1964) recommended comparing alternatives, and running the analysis with two references or two callers tests whether the variants are robust.
