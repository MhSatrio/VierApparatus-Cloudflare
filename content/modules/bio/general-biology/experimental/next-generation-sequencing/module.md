---
title: "Next-Generation Sequencing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "Next-generation sequencing as a complete method: preparing libraries, generating millions of reads in parallel, choosing depth and coverage, checking read quality, aligning reads and calling variants, measuring RNA expression and reporting data in a form that can be reproduced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Plan a sequencing experiment with a library, depth and controls suited to the question."
  - "Describe the steps from raw reads to aligned, quality-checked data and the decisions at each step."
references:
  - "Sanger, F., Nicklen, S., & Coulson, A. R. (1977). DNA sequencing with chain-terminating inhibitors. Proceedings of the National Academy of Sciences of the United States of America, 74(12), 5463-5467. https://doi.org/10.1073/pnas.74.12.5463"
  - "Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. Nature Biotechnology, 26(10), 1135-1145. https://doi.org/10.1038/nbt1486"
  - "Watson, J. D., & Crick, F. H. C. (1953). Molecular structure of nucleic acids: A structure for deoxyribose nucleic acid. Nature, 171(4356), 737-738. https://doi.org/10.1038/171737a0"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

# Next-Generation Sequencing

Sequencing reads the order of bases in DNA or RNA. Sanger et al. (1977) developed the chain-termination method that read one fragment at a time, and it remained the standard for decades. Next-generation sequencing reads millions of fragments in parallel, which changed the scale of genomics. Shendure and Ji (2008) reviewed the platforms that made this possible, and the method now underlies the measurement of genomes, transcriptomes and the variation between individuals.

The chapters follow the path from sample to result. The principles of the method come first, followed by library preparation, in which the nucleic acid is fragmented and given adapters that allow it to be read. The sequencing run generates reads, and the depth and coverage determine how many reads support each base. Quality control and trimming then remove poor reads, alignment places the reads on a reference, and variant calling identifies differences. RNA sequencing measures expression, and the final chapter addresses the reporting that makes the analysis repeatable.

The stages of analysis are each a set of choices, and each choice affects the result. Ioannidis (2005) described how such flexibility can produce findings that do not replicate, and the analysis pipeline should be fixed and reported. Platt (1964) recommended tests that could distinguish between explanations, and the controls and the quality measures serve that purpose.

Watson and Crick (1953) described the double helix whose sequence is read, and Alberts et al. (2022) describe the genome and transcriptome that the sequencing reveals.
