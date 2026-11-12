---
title: "Assembly Metrics and Their Limits"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The metrics used to describe a genome assembly, including the number and length of contigs and scaffolds, the N50 statistic and its definition, the completeness measured by the recovery of conserved single-copy genes, the contamination that inflates an assembly, and the limits of each metric, since an assembly can score well on contiguity while being wrong, incomplete or contaminated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define the N50 statistic and explain why it measures contiguity but not correctness."
  - "Use a measure of gene completeness and a check for contamination to judge an assembly alongside its contiguity."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Koren, S., Walenz, B. P., Berlin, K., Miller, J. R., Bergman, N. H., & Phillippy, A. M. (2017). Canu: scalable and accurate long-read assembly via adaptive k-mer weighting and repeat separation. Genome Research, 27(5), 722-736. https://doi.org/10.1101/gr.215087.116"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

The most familiar measure of an assembly is the N50, which is the length of the contig at which half of the assembly is contained in contigs of that length or longer. A high N50 means that the assembly is made of long pieces, and it is a measure of contiguity. Koren et al. (2017) report contiguity alongside other measures of quality, and the N50 is easily compared between assemblies. Its weakness is that it says nothing about whether the pieces are correct. A set of long contigs can be a collapsed or chimeric assembly that is confidently wrong.

Completeness is measured differently. A set of genes that are expected to occur once in almost every genome of a given group can be searched for in the assembly, and the fraction found indicates how much of the expected gene content is present. A missing gene may mean that the region is absent from the assembly, that it was split across contigs or that the gene is absent from the species. Each of these possibilities changes the conclusion, and the measure must be read with the biology.

Contamination is sequence in the assembly that comes from another organism. Bacterial or human reads in a sample of another species, or a sample mixed in the laboratory, can produce contigs that do not belong to the target genome. A contaminated assembly can have an excellent N50 and a misleading content, and the contigs should be checked against the expected taxonomy before the assembly is used.

Each metric has a limit, and no single metric is enough. An assembly judged only by its N50 may be fragmented in a different way from one that is chosen for other reasons, and a high completeness score may hide a large contaminant. Ioannidis (2005) described how a single favourable statistic can make a result look more reliable than the whole evidence supports, and the same is true of an assembly summarised by one number.

The metrics should be reported together with the tool that computed them and the reference set used, so that another group can compute the same values on the same assembly. Sandve et al. (2013) recommended that the measures of an analysis be recorded with their methods, and this applies directly to assembly quality.
