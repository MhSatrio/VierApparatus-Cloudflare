---
title: "Predicted Structures and AlphaFold Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How predicted protein structures from AlphaFold are stored and used alongside the experimental entries of the Protein Data Bank, the meaning of the per-residue confidence score, the difference between a prediction and a determined structure, the regions that should not be interpreted and the way a predicted model is chosen, checked and cited for a biological question."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Read the per-residue confidence of a predicted structure and identify the regions that are reliable enough for interpretation."
  - "Explain how a predicted model differs from an experimental entry and how each should be cited and reported."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Baek, M., DiMaio, F., Anishchenko, I., Dauparas, J., Ovchinnikov, S., Lee, G. R., Wang, J., Cong, Q., Kinch, L. N., Schaeffer, R. D., Millán, C., Park, H., Adams, C., Glassman, C. R., DeGiovanni, A., Pereira, J. H., Rodrigues, A. V., van Dijk, A. A., Ebrecht, A. C., . . . Baker, D. (2021). Accurate prediction of protein structures and interactions using a three-track neural network. Science, 373(6557), 871-876. https://doi.org/10.1126/science.abj8754"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Predicted structures are models of a protein's three-dimensional shape computed from its sequence. Jumper et al. (2021) describe AlphaFold, a method that predicts these structures with a neural network trained on the experimental structures in the archive, and Baek et al. (2021) describe a related approach that uses a three-track network to model both structures and interactions. Their predictions are now archived for a large number of proteins, and they are used alongside the experimental entries described by Berman (2000).

A predicted model is not a determined structure. It is the output of a method that has learned patterns from known structures, and its accuracy varies by region. The method reports a confidence score for each residue, which estimates how well the position of that residue is predicted. A region with high confidence in a compact domain is often reliable at the level of its fold, while a region of low confidence, typically a disordered loop or a terminus, should not be interpreted as having a fixed shape.

The confidence measure is the first thing to read. A map of the score along the sequence shows which domains can be discussed and which should be left aside. A conclusion about an active site must rest on residues whose confidence is high, and a conclusion that depends on a low-confidence loop must be presented as unsupported by the model.

The comparison with experimental structures is a test of the prediction. Where an experimental structure of the same protein exists, the two can be compared, and the agreement in the high-confidence regions gives a measure of trust in the prediction for the rest. A result that has not been tested against independent evidence is a weaker claim, and a prediction that has not been compared with an experiment is a hypothesis about the structure.

A predicted model must be cited and reported as a prediction. The method, its version, the date of retrieval and the confidence of the residues used should accompany any conclusion drawn from it, so that a reader can tell a prediction from an experiment.
