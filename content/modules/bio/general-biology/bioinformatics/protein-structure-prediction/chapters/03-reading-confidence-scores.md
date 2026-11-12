---
title: "Reading Confidence Scores"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the per-residue confidence score and the predicted aligned error of a predicted structure are read, the meaning of a high confidence in a compact domain, the low confidence of disordered and poorly supported regions, the use of the predicted aligned error to judge the relative placement of domains and the interpretation of a confident prediction as a claim about structure that still requires validation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Read the per-residue confidence along a predicted chain and identify the regions that can be interpreted."
  - "Use the predicted aligned error to judge whether two domains are placed reliably relative to each other."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A predicted structure comes with two kinds of confidence. The first is the per-residue confidence, which estimates how reliably each residue's position is predicted. Jumper et al. (2021) report this measure along the chain, and it is the first thing to read. Regions with high confidence are, in general, compact folded domains where the evidence and the training data agree, and regions with low confidence are usually loops, termini or segments that do not fold without a partner.

A low-confidence region is often a disordered region, and Alberts et al. (2022) describe how many proteins contain flexible segments that do not adopt a fixed shape. The predicted structure of such a segment is a single arrangement that the network happened to produce, and it carries no information about the many arrangements the segment can take. A conclusion drawn from the position of a low-confidence residue is unsupported, however confident the rest of the model.

The predicted aligned error describes the expected error in the position of one residue when the model is superposed on another. It is the measure for the relative placement of parts of the structure. Two domains may each be predicted with high confidence and yet be placed at an uncertain angle to one another, and the aligned error between them reveals this. A model of a multi-domain protein must be read with the aligned error, not the per-residue score alone.

A high confidence is a claim that the model is probably correct where it is confident, and it is not a guarantee. Ioannidis (2005) described how a single favourable statistic can make a result look more reliable than the whole evidence supports, and a predicted structure reported with one confidence number carries the same risk. The confidence should be shown along the chain and between the domains, and the claims restricted to the regions that deserve them.

Sandve et al. (2013) recommended recording the outputs of an analysis, and the confidence profile of each predicted model belongs with any claim made from the model.
