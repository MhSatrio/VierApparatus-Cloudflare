---
title: "Protein Structure Prediction"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The prediction of protein structures from sequence alone, covering the evolutionary information in multiple sequence alignments that constrains contacts between residues, the deep learning methods AlphaFold and RoseTTAFold that predict full structures and their confidence, the interpretation of per-residue confidence scores, the use of predicted models to explore function and the limits of prediction for proteins with few homologues, disordered regions and complexes."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how evolutionary information from a multiple sequence alignment is used to predict which residues are in contact."
  - "Read the confidence scores of a predicted structure and state which regions can be interpreted and which cannot."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Baek, M., DiMaio, F., Anishchenko, I., Dauparas, J., Ovchinnikov, S., Lee, G. R., Wang, J., Cong, Q., Kinch, L. N., Schaeffer, R. D., Millán, C., Park, H., Adams, C., Glassman, C. R., DeGiovanni, A., Pereira, J. H., Rodrigues, A. V., van Dijk, A. A., Ebrecht, A. C., . . . Baker, D. (2021). Accurate prediction of protein structures and interactions using a three-track neural network. Science, 373(6557), 871-876. https://doi.org/10.1126/science.abj8754"
  - "Yang, J., Anishchenko, I., Park, H., Peng, Z., Ovchinnikov, S., & Baker, D. (2020). Improved protein structure prediction using predicted interresidue orientations. Proceedings of the National Academy of Sciences, 117(3), 1496-1503. https://doi.org/10.1073/pnas.1914677117"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

For most proteins, the structure is not known, and the sequence is far easier to determine than the shape. Structure prediction tries to bridge the gap by computing a three-dimensional model from the sequence alone. The breakthrough of recent years came from deep learning methods that use the evolutionary record in multiple sequence alignments. Jumper et al. (2021) describe AlphaFold, and Baek et al. (2021) describe a network that models both structures and interactions, and the two approaches changed what can be predicted with confidence.

The topic explains how these methods work in outline and how their output must be read. The evolutionary information in an alignment reveals which residues tend to be in contact, since residues that are in contact tend to co-vary across related sequences. A network trained on known structures turns these signals into a predicted structure. The chapters then address the confidence scores that accompany each prediction, the use of predictions in biology and the cases in which prediction fails.

A predicted structure is a model with a stated confidence, and its value depends on reading that confidence correctly. The topic keeps the distinction between a prediction and an experiment in view throughout, since the methods are powerful but not infallible.
