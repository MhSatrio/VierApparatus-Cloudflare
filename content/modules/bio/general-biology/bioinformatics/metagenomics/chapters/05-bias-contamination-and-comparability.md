---
title: "Bias, Contamination and Comparability"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The sources of bias in metagenomic studies, from sampling and extraction to sequencing and reference databases, the role of negative and positive controls in detecting contamination and bias, the difficulty of comparing results between studies that used different methods and the standards that allow metagenomic results to be compared and reproduced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Name the main sources of bias in a metagenomic study and state the control that detects each."
  - "Explain why results from two metagenomic studies cannot be compared unless their methods are matched or the differences are accounted for."
references:
  - "Quince, C., Walker, A. W., Simpson, J. T., Loman, N. J., & Segata, N. (2017). Shotgun metagenomics, from sampling to analysis. Nature Biotechnology, 35(9), 833-844. https://doi.org/10.1038/nbt.3935"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Metagenomic results are shaped by many steps, and each can distort the picture of the community. The sample may be collected in a way that favours some organisms, the extraction may lyse some cells more easily than others, the library may be amplified unevenly and the reference database may lack the organisms present. Quince et al. (2017) describe these steps as the path from sampling to analysis, and each step contributes its own bias to the final profile.

Controls detect the bias. A negative control, a sample of the reagents without any environmental material, reveals contamination that enters through the laboratory, and it is used to remove the contaminant taxa from the real samples. A positive control, a mock community of organisms in known proportions, reveals the bias of the extraction and sequencing, since the profile of the mock should match its known composition. Ioannidis (2005) described how bias in the collection and analysis of data can produce results that look strong and are not reliable, and the controls are the means of detecting that bias in a metagenomic study.

Comparability is the hardest problem. Two studies of the same environment that used different extraction methods, different sequencing platforms and different reference databases will report different communities, and the differences may be methodological rather than ecological. The comparison is valid only when the methods are matched, or when the differences are estimated and accounted for.

The standard for comparison is the complete record. A study should state its sampling, extraction, sequencing depth, controls, database version and profiling method, so that another group can match them. Wilkinson et al. (2016) set out the FAIR principles, under which a dataset must be described well enough to be found, understood and reused, and a metagenomic study that meets this standard can be compared with others.

Sandve et al. (2013) recommended recording the steps of an analysis, and the controls and the methods of a metagenomic study are the steps that make its comparison possible.
