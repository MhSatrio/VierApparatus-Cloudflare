---
title: "Protein Structure Prediction"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The prediction of protein three-dimensional structure from amino acid sequence by deep learning, covering the use of multiple sequence alignments that encode the evolutionary history of a protein, the attention-based architecture that learns the pairwise relations between residues, the confidence measures that estimate the accuracy of each predicted region, the regions of low confidence that are often disordered or flexible, the use of predicted structures as the basis for docking and design, the risk that a predicted structure is wrong in its binding site or its conformational states, and the experimental validation of predictions by structural methods."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a deep learning structure predictor uses evolutionary information and state the confidence measure that accompanies each prediction."
  - "Explain why a predicted structure must be used with care when it is the basis for docking and state the experimental check that validates it."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Protein structure prediction from sequence has long been a goal of biology, and Jumper et al. (2021) described a system that achieves an accuracy close to that of experimental methods for many proteins. The system uses the multiple sequence alignment of the protein, which encodes the evolutionary history of its residues, and it learns the relations between residues that are close in the folded structure. Residues that have evolved together are likely to be in contact, and the network uses this information to build the three-dimensional fold.

The prediction is accompanied by confidence measures that estimate the accuracy of each region. The confidence is highest for well-conserved and well-packed regions, and it is low for regions that are disordered, flexible or poorly represented in the alignment. A low-confidence region is not a structure, and it should not be interpreted as one.

Predicted structures are used as the basis for docking and for the design of molecules, and this use requires care. The prediction of the binding site may be inaccurate, and the side chains that line the site may be placed incorrectly. Proteins also change conformation, and a single predicted structure may not represent the state that binds the ligand. Jumper et al. (2021) showed high accuracy for the backbone, but the details of a binding site must be checked.

The experimental validation of a prediction uses structural methods such as X-ray crystallography, cryo-electron microscopy or nuclear magnetic resonance, and the agreement between the prediction and the experimental structure should be reported with the measure used. Cumming (2014) argues that the accuracy should be reported with its interval across proteins, since the accuracy varies widely between them.
