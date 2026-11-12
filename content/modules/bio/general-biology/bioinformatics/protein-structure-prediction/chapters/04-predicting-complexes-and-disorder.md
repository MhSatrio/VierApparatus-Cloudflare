---
title: "Predicting Complexes and Disorder"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The prediction of the structures of protein complexes from the sequences of their partners, the use of paired alignments and the joint network of Baek et al. to model interactions, the recognition of intrinsically disordered regions that lack a stable structure and the limits of prediction for flexible proteins, the conformational ensembles that a single model cannot represent and the cautions needed before a predicted complex is interpreted as a biological interaction."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a predictor models a complex of two proteins and what the predicted interface depends on."
  - "Recognise a region that is likely disordered and state why a single predicted structure is inadequate to describe it."
references:
  - "Baek, M., DiMaio, F., Anishchenko, I., Dauparas, J., Ovchinnikov, S., Lee, G. R., Wang, J., Cong, Q., Kinch, L. N., Schaeffer, R. D., Millán, C., Park, H., Adams, C., Glassman, C. R., DeGiovanni, A., Pereira, J. H., Rodrigues, A. V., van Dijk, A. A., Ebrecht, A. C., . . . Baker, D. (2021). Accurate prediction of protein structures and interactions using a three-track neural network. Science, 373(6557), 871-876. https://doi.org/10.1126/science.abj8754"
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Many proteins act with partners, and some of the most important biology is in their complexes. Baek et al. (2021) describe a network that models the structure of two or more chains together, using the paired information between them, and the predicted interface shows which residues of each partner contact one another. The method extends the single-chain predictors, and its output is a model of a complex rather than of a single protein.

A predicted complex depends on the evidence that the partners interact. The paired alignment must carry signals of co-evolution between the two proteins, and these are weaker for partners whose interaction is transient or whose sequences do not co-vary. A confident interface is a model of how the two proteins could fit, and it is not evidence that they fit in the cell. The interaction must be tested experimentally before the complex is described as biological.

Many regions of proteins are intrinsically disordered. Alberts et al. (2022) describe how such regions lack a fixed structure, and some become ordered only when they bind a partner. Jumper et al. (2021) show that the prediction of a disordered region yields a low-confidence structure, and the low confidence is the correct signal. A single predicted structure cannot describe a region that exists as an ensemble of conformations, and the ensemble, not the model, is the appropriate description.

The limits of prediction are clearest for flexible proteins. A protein that changes shape upon binding, or that exists in several states, is represented by a prediction of one state, and the other states are absent from the model. The prediction is then a description of a single conformation, and a claim about the protein's behaviour must acknowledge the missing states.

Sandve et al. (2013) recommended recording the method and its settings, and for a complex the partners, the paired alignment and the confidence of the interface are the record that makes the claim checkable.
