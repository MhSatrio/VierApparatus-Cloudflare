---
title: "Structure in Biology and Drug Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Applications of structural bioinformatics in biology and drug design, including the inference of function from shape, the study of evolution through the conservation of folds, the use of models of unknown proteins to guide mutagenesis and the use of binding-site structures to support the design of ligands, with the limits that model accuracy, the uncertainty of predicted sites and the gap between a shape and its biological effect place on each claim."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe three applications of structural bioinformatics and the question each answers."
  - "Judge whether a structural result supports the biological or medicinal claim made in a given application."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Holm, L., & Sander, C. (1993). Protein structure comparison by alignment of distance matrices. Journal of Molecular Biology, 233(1), 123-138. https://doi.org/10.1006/jmbi.1993.1489"
  - "Šali, A., & Blundell, T. L. (1993). Comparative protein modelling by satisfaction of spatial restraints. Journal of Molecular Biology, 234(3), 779-815. https://doi.org/10.1006/jmbi.1993.1626"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Structural bioinformatics is applied where the shape of a protein matters for a decision. It informs the inference of function, since a fold can suggest the kind of activity a protein may have. It informs the study of evolution, since the conservation of folds across distant species reveals ancient relationships. It guides experiments, since a model of an unknown protein can identify residues to mutate, and it supports drug design, since the shape of a binding site is the target for a ligand. Alberts et al. (2022) describe how molecular shape underlies recognition in the cell, and each application builds on that principle.

Each application asks a different question. An inference of function from shape asks what a protein might do, and the answer is a hypothesis. A model that guides mutagenesis asks which residues to test, and the model's accuracy in the region of interest determines whether the choice is sound. A ligand design asks whether a molecule can fit a site, and the answer depends on the accuracy of the site and on the chemistry that the model omits.

The distance between a shape and its effect is the main limit. A ligand that fits a predicted site may not bind in the cell, and a mutation that disrupts a modelled residue may not disrupt the protein's function. Ioannidis (2005) described how a result that is selected from many candidates can overstate its reliability, and a screen of many predicted sites is exposed to this failure. Each candidate must be tested experimentally before the claim is made.

Comparative models are useful where no experimental structure exists, but their accuracy depends on the identity to the template. A model with a close template can guide detailed work, while a distant model can suggest only the broad fold. Holm and Sander (1993) and Šali and Blundell (1993) describe the comparison and modelling methods on which these applications rest, and the claim made must match the accuracy of the model.

The applications share a rule: the structure should be used for the question its accuracy can answer, and the claim should be tested against the evidence that question requires.
