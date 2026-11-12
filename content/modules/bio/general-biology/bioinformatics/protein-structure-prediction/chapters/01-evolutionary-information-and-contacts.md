---
title: "Evolutionary Information and Contacts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the evolutionary record in a multiple sequence alignment reveals which residues of a protein are in contact, the principle that residues in contact tend to change together during evolution, the construction of the alignment that supplies this signal, the role of the depth and diversity of the alignment and the way contact predictions guide the folding of a model."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why correlated change between two alignment columns suggests that the corresponding residues are in contact."
  - "State how the depth of a multiple sequence alignment affects the reliability of the contacts predicted from it."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Yang, J., Anishchenko, I., Park, H., Peng, Z., Ovchinnikov, S., & Baker, D. (2020). Improved protein structure prediction using predicted interresidue orientations. Proceedings of the National Academy of Sciences, 117(3), 1496-1503. https://doi.org/10.1073/pnas.1914677117"
  - "Katoh, K., & Standley, D. M. (2013). MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability. Molecular Biology and Evolution, 30(4), 772-780. https://doi.org/10.1093/molbev/mst010"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A protein's residues are not independent. Residues that touch in the folded structure often have a functional or structural reason to remain compatible, and when one changes during evolution the other tends to change with it. Alberts et al. (2022) describe how protein folding depends on the interactions between residues, and this coupling leaves a signature in the sequences of a family. Jumper et al. (2021) use this evolutionary signal as one input to their predictions, and the signal is read from the multiple sequence alignment.

The alignment must contain many sequences of the family. Katoh and Standley (2013) describe MAFFT, one of the programs that build such alignments, and the depth and diversity of the alignment determine how much coupling can be seen. A family with few sequences gives a weak signal, and the contacts predicted from it are unreliable. A family with a large and diverse alignment gives a much stronger signal, and the predictions are correspondingly better.

Co-variation is a statistical signal, and it can arise from shared ancestry rather than from contact. Two columns that change together may do so because they both respond to a common pressure, or because the sequences are phylogenetically clustered. Methods that predict contacts correct for these effects, and the correction is part of why the predictions are informative. Yang et al. (2020) describe a method that predicts the orientations between residues, not only their contacts, and the orientation information improves the model further.

Contact predictions guide the folding of a model. The predicted contacts and distances are treated as restraints, and the structure is assembled to satisfy them, in a way that resembles the restraint-based modelling of the earlier topic. The predicted contacts are the evidence, and the model is the consequence of the evidence together with the learned knowledge of protein geometry.

The depth of the alignment should be reported with any prediction. A reader who knows how many related sequences supported a model can judge whether the model rests on a strong or a weak signal, and the omission of this figure hides the main determinant of the prediction's reliability.
