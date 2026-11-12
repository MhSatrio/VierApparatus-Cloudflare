---
title: "Taxonomic Profiling with Marker Genes"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the taxonomic composition of a metagenome is estimated by mapping reads to clade-specific marker genes, the choice of markers that are unique to a clade and present in its members, how the relative abundance of each clade is calculated from the coverage of its markers and why profiling by markers gives an estimate that is more specific than a search of all the reads against a whole genome database."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why clade-specific marker genes give a more specific profile than matching reads to whole genomes."
  - "Estimate the relative abundance of clades in a sample from marker coverage and state the assumptions the estimate makes."
references:
  - "Segata, N., Waldron, L., Ballarini, A., Narasimhan, V., Jousson, O., & Huttenhower, C. (2012). Metagenomic microbial community profiling using unique clade-specific marker genes. Nature Methods, 9(8), 811-814. https://doi.org/10.1038/nmeth.2066"
  - "Quince, C., Walker, A. W., Simpson, J. T., Loman, N. J., & Segata, N. (2017). Shotgun metagenomics, from sampling to analysis. Nature Biotechnology, 35(9), 833-844. https://doi.org/10.1038/nbt.3935"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A metagenome contains reads from thousands of organisms, and matching every read to every genome in a database is slow and imprecise, because related genomes share sequence and reads are assigned to the wrong member of a group. Segata et al. (2012) proposed a different strategy: find genes that occur in a single clade of organisms and in nearly all of its members, and use their presence in the reads as the signal for that clade. Such marker genes are specific to the group they mark, so a read that matches one can be assigned with more confidence.

The markers are chosen from reference genomes. A candidate gene is kept if it is found in the members of one clade and not in others, and if it is present in most of the genomes of that clade. The selection must account for the genomes available, since a marker chosen from a few well-studied species may be absent from many others in the same clade. The method's accuracy depends on the reference set, and the set should be stated with the profile.

The abundance of a clade is estimated from the coverage of its markers. Each marker is expected to be present once per genome, so the average depth of reads over the markers of a clade estimates how many genomes of that clade are present. The estimate assumes that the markers are equally covered across the sample, which is not true when the library preparation favours some sequences, and the assumption should be tested.

The profile is an estimate, and it is limited to the clades that the markers represent. An organism that lacks the chosen markers, or a clade that is not in the reference set, will be missing or misassigned in the profile. Ioannidis (2005) described how the apparent precision of a result can exceed its real accuracy when the method depends on choices made in advance, and a marker profile is open to the same caution.

Quince et al. (2017) describe the place of profiling within the wider analysis of a shotgun study, and the reference set and the markers used should be reported with each profile.
