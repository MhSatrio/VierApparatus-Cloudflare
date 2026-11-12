---
title: "Emergent Structure and Contacts"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The emergence of structural information in the representations of protein language models trained without structural labels, covering the observation that attention maps and embeddings correlate with residue contacts, the logistic regression that predicts contacts from the representation and the control that tests whether the prediction exceeds what local sequence statistics alone would give, the distinction between a contact predicted from the representation and a contact that is physically present in a structure, the evaluation of contact prediction on proteins whose families are held out, the precision of the top-ranked contacts as a function of sequence separation, and the reporting of contact precision with intervals and the controls used."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Predict residue contacts from a model's representation and compare the prediction with a control based on local sequence statistics."
  - "Report the precision of top-ranked contacts as a function of sequence separation with intervals."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

When a protein language model is trained only on sequences, it can nonetheless represent which residues are close in three-dimensional space. Residues that contact one another in a folded protein tend to co-vary across evolution, and a model that learns the statistics of sequence can capture some of this covariation. Jumper et al. (2021) showed that evolutionary information can predict structure, and the emergence of contacts in language models is a related observation that must be tested with care.

A simple test asks whether a logistic regression on the model's representation can predict which residue pairs are in contact. The result must be compared with a control based on local sequence statistics, since a pair of residues that are close in sequence may be predicted as contacts for trivial reasons. The improvement of the representation over the control is the quantity of interest, and its size should be reported. Cumming (2014) argues that such an improvement should be stated with its interval, since a small gain over a strong control may not be distinguishable from noise.

A predicted contact is not a physical contact. The contact is defined in a structure, and the prediction is a claim about the pattern of co-variation, which may reflect functional or evolutionary constraint rather than direct physical proximity. Ioannidis (2005) described how the definition of a success criterion can determine the apparent success of a method, and the definition of contact must be stated.

Evaluation of contact prediction should use proteins whose families are held out from training. Precision among the top-ranked contacts is often reported as a function of sequence separation, since long-range contacts are the most informative and the hardest to predict. The precision in each separation band should be reported with its interval. Munafò et al. (2017) argued that the controls and the definition of success should be stated in the report, so that the claim of emergent structure can be assessed.
