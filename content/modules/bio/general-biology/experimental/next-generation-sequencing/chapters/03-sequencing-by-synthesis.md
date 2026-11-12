---
title: "Sequencing by Synthesis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How the dominant parallel platforms read bases by sequential incorporation of labelled nucleotides and imaging, how clusters are formed on a flow cell, how paired-end reads are generated and how sequencing errors arise and are quantified."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a base is read by sequential incorporation and imaging in each cycle."
  - "Explain how sequencing errors arise and how paired-end reads help to reduce them."
references:
  - "Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. Nature Biotechnology, 26(10), 1135-1145. https://doi.org/10.1038/nbt1486"
  - "Sanger, F., Nicklen, S., & Coulson, A. R. (1977). DNA sequencing with chain-terminating inhibitors. Proceedings of the National Academy of Sciences of the United States of America, 74(12), 5463-5467. https://doi.org/10.1073/pnas.74.12.5463"
  - "Watson, J. D., & Crick, F. H. C. (1953). Molecular structure of nucleic acids: A structure for deoxyribose nucleic acid. Nature, 171(4356), 737-738. https://doi.org/10.1038/171737a0"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Most parallel platforms read a sequence by sequential synthesis, a principle that echoes the method of Sanger et al. (1977). The clusters of identical copies on the flow cell are supplied with a primer and with labelled nucleotides, each carrying a fluorescent tag and a block that stops further incorporation. In each cycle one base is added to every cluster, and the instrument images the flow cell to record which base was incorporated. The block is then removed and the next cycle begins. Shendure and Ji (2008) described how the reads are built base by base from these images.

Clusters are formed by amplifying each library molecule on the surface, so that each cluster carries many copies of one fragment. The copies give a signal strong enough to be detected, and the cluster is read as a single template. The density of clusters must be controlled: too few give a low yield, and too many overlap so that the images cannot separate them.

Paired-end reads sequence both ends of each fragment. The two reads are separated by a known distance, which helps the alignment of repetitive regions and allows structural variants to be detected. The pairing also gives a check on the reads, since the two ends of a fragment must agree with the fragment length.

Errors arise from several sources. The incorporation of a wrong base, the incomplete blocking of some copies and the overlap of neighbouring clusters all reduce accuracy. The error rate changes along the read, and it is reported as a quality score for each base. Watson and Crick (1953) established the base pairing that the sequence represents, and the quality score is a statement of confidence in each base.

Ioannidis (2005) described how a result that depends on rare bases can be produced by errors, and the quality of the base calls supporting a claim should be checked.
