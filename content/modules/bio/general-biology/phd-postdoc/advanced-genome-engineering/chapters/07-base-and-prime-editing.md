---
title: "Base and Prime Editing"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Base editing and prime editing as genome-editing approaches that install precise changes with less reliance on double-strand breaks and repair templates, covering the cytosine and adenine base editors that convert one base to another within a window of the guided target, the bystander edits that occur when more than one base in the window is convertible, the prime editor that uses a reverse transcriptase fused to a nickase and a guide that encodes the desired change, the efficiency limits and the cell-type dependence of each approach, the assessment of the purity of the intended conversion relative to bystander and indel products, and the reporting of the product distribution with its uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the window of activity of a base editor and identify the bystander edits that its design can produce."
  - "Quantify the product distribution of an editing experiment, including the intended conversion, bystander edits and indels, with intervals."
references:
  - "Jinek, M., Chylinski, K., Fonfara, I., Hauer, M., Doudna, J. A., & Charpentier, E. (2012). A programmable dual-RNA-guided DNA endonuclease in adaptive bacterial immunity. Science, 337(6096), 816-821. https://doi.org/10.1126/science.1225829"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Base editors and prime editors install changes without relying on the repair of a double-strand break by a template, which avoids several of the unintended outcomes of classical editing. They are built on the guided nuclease, modified so that it cuts only one strand or does not cut at all, and fused to an enzyme that performs the chemical change. Jinek et al. (2012) described the guided nuclease from which these tools were derived, and their design inherits its targeting logic.

A base editor converts one base to another within a defined window of the target sequence. Because the window may contain more than one base that can be converted, the editor may change bases the investigator did not intend. These bystander edits must be identified and quantified, and their frequency is a property of the particular target and of the editor used. Cumming (2014) argues that the frequency of each product should be reported with its interval, since bystander frequencies can vary considerably between sites.

A prime editor uses a reverse transcriptase fused to a nickase and a guide that carries the desired change in an extension. The system writes the new sequence directly, which allows a wider range of changes than base editing, including insertions and deletions of short length. Its efficiency is lower and varies with the cell type, so each application requires its own optimisation. Ioannidis (2005) described how a method that works well in one system may fail in another, and the dependence on context must be tested.

The outcome of an editing experiment is a distribution of products: the intended conversion, bystander edits, small insertions and deletions, and unedited alleles. The purity of the intended conversion is the proportion of the product that carries only the desired change. Munafò et al. (2017) argued that the full product distribution should be reported, so that the reader can judge the purity of the edit and not only its frequency.
