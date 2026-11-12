---
title: "Deep Learning Predictors"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The deep learning methods that predict protein structures from sequence and alignment, including the neural network architecture of AlphaFold that combines the alignment with the structure being built, the three-track design of RoseTTAFold that models sequence, distance and coordinates together, the training on the experimental structures of the archive and the reasons these methods improved on earlier physics and template-based approaches."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the main inputs and outputs of a deep learning structure predictor and state what the network learns from the training structures."
  - "Explain how a three-track network integrates sequence, pairwise and coordinate information and why this matters for the prediction."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Baek, M., DiMaio, F., Anishchenko, I., Dauparas, J., Ovchinnikov, S., Lee, G. R., Wang, J., Cong, Q., Kinch, L. N., Schaeffer, R. D., Millán, C., Park, H., Adams, C., Glassman, C. R., DeGiovanni, A., Pereira, J. H., Rodrigues, A. V., van Dijk, A. A., Ebrecht, A. C., . . . Baker, D. (2021). Accurate prediction of protein structures and interactions using a three-track neural network. Science, 373(6557), 871-876. https://doi.org/10.1126/science.abj8754"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The predictors of recent years are neural networks, trained on the experimental structures in the archive. Jumper et al. (2021) describe a network that takes the alignment and a set of pair representations, refines them through repeated stages that exchange information between sequence and structure, and produces a set of atomic coordinates together with confidence estimates. Their network learns the relationships between residue pairs and the geometry of folded chains from the many structures on which it was trained.

Baek et al. (2021) describe a network with three tracks of information, one for the sequence, one for the distances between residues and one for the three-dimensional coordinates, which are updated together. The design allows the predicted distances and the coordinates to inform each other, and the method also predicts the structures of complexes between proteins. The three-track approach shows that the separation of sequence, pairing and geometry into different stages is not necessary, and that a single network can carry the information through all of them.

The training data are the experimental structures, and the network can only predict what its training data resemble. A protein with a fold unlike any in the training set may be predicted poorly, and a protein with an unusual composition may fall outside the patterns the network has learned. The reliability of a prediction is therefore related to how well the protein is represented in the knowledge the network carries, which the confidence scores attempt to estimate.

Earlier methods relied on a template of known structure or on physical energy functions, and both were limited. The deep learning methods combine the strengths of these approaches, learning from the archive and enforcing the geometry of folded chains, and they improved the accuracy of predictions for many proteins. Berman (2000) describes the archive that makes such training possible, and the quality of the archive is part of the quality of the predictors.

Sandve et al. (2013) recommended recording the version of the method, its settings and the databases it searched, since a predicted structure depends on each.
