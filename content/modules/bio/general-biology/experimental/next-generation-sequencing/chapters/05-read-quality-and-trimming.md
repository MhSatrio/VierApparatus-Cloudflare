---
title: "Read Quality and Trimming"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How the quality score of each base is read and summarised, how adapters and low-quality ends are trimmed from reads and how the thresholds chosen for trimming change the data that remain and must be reported."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Read the quality scores of a run and identify the positions where quality falls."
  - "Choose trimming thresholds and state how they change the data retained."
references:
  - "Shendure, J., & Ji, H. (2008). Next-generation DNA sequencing. Nature Biotechnology, 26(10), 1135-1145. https://doi.org/10.1038/nbt1486"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Each base in a read carries a quality score, which estimates the probability that the base call is wrong. A score of thirty corresponds to an error probability of one in a thousand, and a score of twenty to one in a hundred. The scores are summarised for the whole run, and the summary shows the positions along the read where quality falls, which usually happens towards the end of the read as the chemistry degrades. Shendure and Ji (2008) described how the error rate rises with the cycle number, and the quality profile is the first check on a run.

Trimming removes the parts of reads that are unreliable. Adapter sequences that were not removed during library preparation are cut from the reads, because they do not come from the sample and would otherwise align to the reference in the wrong place. Low-quality bases at the ends are trimmed to a chosen threshold, and reads that fall below a minimum length after trimming are discarded. Each step changes the data, and the thresholds must be chosen before the analysis.

The choice of threshold is a trade-off. A strict threshold removes more errors but also removes more true information, and it can bias the data towards regions with high quality. A lenient threshold keeps more data but admits more errors. Platt (1964) argued that alternatives should be tested against one another, and the trimming should be compared under two or more settings to show that the result does not depend on the choice.

Ioannidis (2005) described how a threshold chosen after the results are seen can produce an apparent effect, and the trimming settings should be fixed and reported. The number of reads before and after trimming is stated, since the loss shows how much of the run was used.

Alberts et al. (2022) describe the sequence features, such as adapters and repeats, that trimming is designed to handle.
