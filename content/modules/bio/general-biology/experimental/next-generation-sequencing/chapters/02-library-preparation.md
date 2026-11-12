---
title: "Library Preparation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How nucleic acid is fragmented, repaired, ligated to adapters and amplified to form a sequencing library, how the size distribution is controlled and how PCR duplicates and bias introduced during preparation are recognised."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps that convert a nucleic acid sample into a sequencing library."
  - "Recognise PCR duplicates and the bias that library preparation can introduce."
references:
  - "Saiki, R. K., Gelfand, D. H., Stoffel, S., Scharf, S. J., Higuchi, R., Horn, G. T., Mullis, K. B., & Erlich, H. A. (1988). Primer-directed enzymatic amplification of DNA with a thermostable DNA polymerase. Science, 239(4839), 487-491. https://doi.org/10.1126/science.2448875"
  - "Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. Nature Biotechnology, 26(10), 1135-1145. https://doi.org/10.1038/nbt1486"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A sequencing instrument cannot read genomic DNA directly, because the molecules are too long and too varied. The library is the form in which the sample is presented to the instrument. The DNA is fragmented to a chosen size, its ends are repaired to be blunt or tailed, and short synthetic adapters are ligated to each fragment. The adapters carry the sequences that bind the fragment to the instrument's surface and that allow it to be primed for reading. An index sequence within the adapter identifies the sample, so that many samples can be pooled and separated afterwards.

The library is often amplified by PCR, as Saiki et al. (1988) described, so that enough material is present for the run. Amplification introduces duplicates, which are reads that arise from the same original molecule and are not independent. Duplicates inflate the apparent depth, and they can make a single variant look well supported when it is present in one molecule only. Unique molecular identifiers, short random tags added before amplification, allow duplicates to be recognised and removed.

The fragment size is controlled by the method of fragmentation and by size selection. Fragments that are too short or too long give poor cluster formation or lower the quality of the reads, and the size distribution is measured before sequencing. Shendure and Ji (2008) noted that the library determines what the instrument can see, and the bias of the preparation is carried into the data.

Bias is introduced at several stages. Some sequences amplify more efficiently than others, and regions that are rich in guanine and cytosine are often under-represented. The degree of bias is measured, and it is reported as a limitation of the data.

Ioannidis (2005) described how a method that appears to measure the sample may in fact measure the preparation, and the preparation should be described in full. Alberts et al. (2022) describe the nucleic acid fragments that the library represents.
