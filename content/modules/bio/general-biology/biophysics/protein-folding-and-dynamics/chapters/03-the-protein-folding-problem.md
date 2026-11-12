---
title: "The Protein-Folding Problem"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The protein-folding problem as Dill and MacCallum described it: the question of how the sequence determines the native structure, the Levinthal paradox of the vast search space, the prediction of structure from sequence and the progress and remaining gaps in solving the problem a half century after Anfinsen's demonstration."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "State the protein-folding problem and the paradox of the search space that makes it difficult."
  - "Describe the progress made in predicting structure from sequence and the gaps that remain."
references:
  - "Dill, K. A., & MacCallum, J. L. (2012). The protein-folding problem, 50 years on. Science, 338(6110), 1042-1046. https://doi.org/10.1126/science.1219021"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

The protein-folding problem asks how the amino acid sequence of a chain determines its three-dimensional native structure, and whether the structure can be predicted from the sequence alone. Anfinsen (1973) showed experimentally that the sequence contains the information for the fold, and this result made the problem a physical and computational one. Dill and MacCallum (2012) reviewed the problem fifty years on, noting that the principle is established while the means of predicting the fold from the sequence remain incomplete.

The Levinthal paradox illustrates the difficulty. A chain of a hundred residues can adopt a number of conformations so large that a random search would take longer than the age of the universe, yet proteins fold in milliseconds to seconds. The paradox shows that folding is not a random search, and the landscape of the earlier chapter explains how the search is guided. The paradox does not, by itself, explain how the guidance arises from the sequence.

Prediction from sequence has advanced through the accumulation of known structures, the statistical relations between residues and the physical models of the interactions. Some proteins can now be predicted with useful accuracy, particularly where close homologues of known structure exist, and the predictions of new folds are less reliable. The accuracy is measured against structures determined experimentally, and the measurement must be made on proteins not used to train the method.

The gaps are substantial. Predictions are weakest for proteins with no close relatives, for flexible and disordered regions and for the conformations that a protein adopts when it functions, which are not the single static structure a prediction returns. Ioannidis (2005) described how a method that performs well on the cases that resemble its training may fail on new cases, and the test must include the cases most unlike the training set.

Platt (1964) recommended a test that could show a prediction to be wrong, and an experimental determination of a structure that the method failed to predict is such a test. The problem is therefore advanced by the discrepancies as much as by the successes.

The protein-folding problem is solved in principle, and the practical task of predicting the fold from the sequence is an ongoing test of the physical understanding.
