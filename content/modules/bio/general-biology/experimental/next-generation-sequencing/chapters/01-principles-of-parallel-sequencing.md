---
title: "Principles of Parallel Sequencing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How next-generation sequencing differs from the one-fragment-at-a-time chain-termination method of Sanger, how millions of fragments are read in parallel and why the cost per base fell so sharply."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how parallel sequencing differs from the chain-termination method introduced by Sanger et al."
  - "Describe why the output of a parallel run is a set of short reads rather than a single continuous sequence."
references:
  - "Sanger, F., Nicklen, S., & Coulson, A. R. (1977). DNA sequencing with chain-terminating inhibitors. Proceedings of the National Academy of Sciences of the United States of America, 74(12), 5463-5467. https://doi.org/10.1073/pnas.74.12.5463"
  - "Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. Nature Biotechnology, 26(10), 1135-1145. https://doi.org/10.1038/nbt1486"
  - "Watson, J. D., & Crick, F. H. C. (1953). Molecular structure of nucleic acids: A structure for deoxyribose nucleic acid. Nature, 171(4356), 737-738. https://doi.org/10.1038/171737a0"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Sanger et al. (1977) read a sequence by making a set of copies of a fragment, each terminated at a different base by a chain-terminating analogue, and separating the products by size. The method produced long, accurate reads, but it processed one template at a time, and it was slow and expensive for large projects. The principle of reading the order of bases in a template, however, remained the same, and the next generation of methods kept that principle while changing the scale.

Shendure and Ji (2008) described the platforms that read millions of templates at once. The DNA is fixed to a surface in spatially separated clusters or single molecules, and each is read in parallel by repeated cycles of base addition and imaging. The number of reads per run is very large, while each read is shorter than a Sanger read. The gain in throughput reduced the cost per base by orders of magnitude, which made whole-genome projects and large surveys routine.

The output is therefore a set of short reads, each covering a few hundred bases, rather than a single continuous sequence. The reads must be assembled or aligned to a reference to recover the full sequence, and this step is a computational one, with its own errors and assumptions. A sequence that is assembled from short reads can be wrong in regions that are repetitive or that differ from the reference.

Watson and Crick (1953) established the base-pairing that makes each read interpretable against the complementary strand, and Alberts et al. (2022) describe the genome whose sequence the reads reconstruct.

Ioannidis (2005) described how a large volume of data can give an impression of certainty that the method does not warrant, and the error rate and the coverage should be reported with every sequence.
