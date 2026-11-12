---
title: "Lineage-Specific Genes"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What it means for a gene to be specific to one lineage, how such genes are identified by comparing gene sets across genomes, the sources of lineage-specific genes such as duplication, horizontal transfer and de novo origin, the difficulty of distinguishing a truly new gene from a gene that has diverged beyond detection and the evidence needed before a gene is called lineage-specific."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify genes that are specific to one lineage by comparing gene sets across genomes and state the limits of the comparison."
  - "Name the main sources of lineage-specific genes and the evidence that distinguishes them."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A lineage-specific gene is one that is found in one group of organisms and not in others. The comparison of gene sets across genomes identifies these genes as those with no detectable match in the genomes of the other lineages. The principle is simple, but its result depends on how far the search can see. A gene that has diverged beyond the reach of the search will appear to be unique, and it is then mistaken for a new gene. Altschul et al. (1990) describe the sensitivity of the similarity search on which such comparisons depend, and the limit of that sensitivity bounds what can be called specific.

The sources of such genes differ. A duplication of an existing gene followed by divergence can produce a gene that has no relative in other lineages if its ancestral copy has been lost there. Transfer of a gene from another organism, which is common in some microbial groups, can introduce a gene with no relative in the recipient's lineage. A gene can also arise from non-coding sequence, a de novo origin, though such cases are rarer and harder to establish. Alberts et al. (2022) describe the duplication and divergence that generate new gene functions, which is the most frequent of these sources.

The evidence needed to call a gene lineage-specific is strong. A search that fails to find a relative must be repeated with more sensitive methods, the region must be checked in the reads and the gene must have transcript or protein support. A gene that is found only in the annotation of one genome, and not in its reads, may be a prediction without a real counterpart.

The claim also depends on the sampling of the other lineages. A gene specific to one group in a comparison of five genomes may be present in a sixth that was not sampled, so the claim is limited to the genomes compared. The number and choice of genomes should be stated with the result.

Sandve et al. (2013) recommended that the data and their limits be reported, and the list of genomes, the search methods and the thresholds used are the context in which a lineage-specific claim must be read.
