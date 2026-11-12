---
title: "Metagenomics of Ecosystems"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Shotgun metagenomics of environmental communities that sequences all the DNA in a sample rather than a single marker, covering the assembly of short reads into longer contigs and the binning of contigs into draft genomes of individual organisms, the functional annotation that reveals the metabolic capacity of a community, the comparison of communities across habitats and seasons, the limits set by the incomplete recovery of rare organisms and by the diversity of the community, and the reporting of metagenomes with their depth, their assembly and their binning."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how shotgun metagenomics assembles and bins sequences into genomes of individual organisms and state the limit on what can be recovered."
  - "Explain how functional annotation describes the metabolic capacity of a community and why this is not the same as the activity."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Taberlet, P., Coissac, E., Pompanon, F., Brochmann, C., & Willerslev, E. (2012). Towards next-generation biodiversity assessment using DNA metabarcoding. Molecular Ecology, 21(8), 2045-2050. https://doi.org/10.1111/j.1365-294X.2012.05470.x"
---

Shotgun metagenomics sequences all the DNA in an environmental sample, without targeting a single marker. The reads come from every organism in the community, including those that cannot be cultured, and the aim is to reconstruct the genomes and the functions of the community. Metagenomics complements metabarcoding, which identifies taxa by a single gene, by revealing what the organisms can do as well as which organisms are present. Taberlet et al. (2012) described the earlier marker-based approach against which the genome-wide approach is compared.

The reads are assembled into longer sequences called contigs, and the contigs are grouped by their composition and coverage into bins that approximate the genomes of individual organisms. The recovery of complete genomes is rare, and most bins are partial, so the genomes must be judged by their completeness and contamination. The binning can mix the sequences of closely related organisms, and the errors should be estimated and reported.

Functional annotation assigns the genes to functions, which describes the metabolic capacity of the community. A community that carries the genes for the degradation of a pollutant has the potential to degrade it, but whether it does so depends on the expression of those genes and on the conditions. The capacity is therefore a hypothesis about activity rather than a measure of it, and transcriptomic or proteomic data are needed to test the hypothesis.

The comparison of communities across habitats and seasons requires that the sampling and the sequencing be comparable, and differences in depth can produce apparent differences in diversity. Rare organisms are often not recovered, so the diversity of a community is underestimated, and the limit should be stated. Ioannidis (2005) described how an apparent difference between communities may reflect the sampling rather than the biology, and Sandve et al. (2013) recommended recording the depth, the assembly and the binning parameters for every metagenome.
