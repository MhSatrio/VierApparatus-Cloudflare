---
title: "Genome Annotation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How an assembled genome is annotated with its genes, transcripts and functions, covering ab initio gene prediction with hidden Markov models, the use of transcript and protein evidence to refine gene models, the combination of several evidence sources into a consensus annotation, the functional annotation of predicted proteins by homology, the annotation of non-coding elements, the measurement of annotation quality and the release of an annotation with its version."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how gene prediction combines a statistical model of gene structure with evidence from transcripts and proteins."
  - "Describe how an annotation is assessed for quality and released with a version that others can cite."
references:
  - "Stanke, M., & Waack, S. (2003). Gene prediction with a hidden Markov model and a new intron submodel. Bioinformatics, 19(Suppl. 2), ii215-ii225. https://doi.org/10.1093/bioinformatics/btg1080"
  - "Haas, B. J., Salzberg, S. L., Zhu, W., Pertea, M., Allen, J. E., Orvis, J., White, O., Buell, C. R., & Wortman, J. R. (2008). Automated eukaryotic gene structure annotation using EVidenceModeler and the Program to Assemble Spliced Alignments. Genome Biology, 9(1), R7. https://doi.org/10.1186/gb-2008-9-1-r7"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An assembled genome is a sequence without meaning until it is annotated. Annotation identifies the genes, the transcripts they produce, the exons and introns of each, and the non-coding elements that regulate them, and then attaches a function to the predicted proteins. The result is a set of coordinates and labels that the rest of biology can use. Stanke and Waack (2003) describe a gene prediction method that finds genes from the sequence alone, and Haas et al. (2008) describe the means of combining such predictions with experimental evidence.

The topic follows the steps of an annotation pipeline. It starts with ab initio prediction, which finds genes from statistical models of their structure, then adds evidence from transcripts and proteins, combines the evidence into a consensus, and assigns functions to the predicted proteins by their similarity to characterised sequences, which Altschul et al. (1990) made practical. The final chapters address the non-coding elements, the measurement of annotation quality and the release of the annotation.

An annotation is a set of claims, and each claim has a level of support. A gene supported by transcripts and proteins is a stronger claim than one predicted from the sequence alone, and the pipeline should record which evidence supports each feature. The record of evidence is what allows a later user to decide how far to trust an annotation.
