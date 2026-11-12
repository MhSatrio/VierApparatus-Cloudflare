---
title: "Comparative Protein Modelling"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the three-dimensional structure of a protein is modelled from the structure of a related template, covering the alignment of the target sequence to the template, the satisfaction of spatial restraints derived from the template that Šali and Blundell introduced, the construction of loops and side chains, the choice of template by sequence identity and coverage and the accuracy that a model can claim as a function of the identity to its template."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps of comparative modelling from the target-template alignment to the final model."
  - "State how the accuracy of a comparative model depends on the sequence identity between target and template."
references:
  - "Šali, A., & Blundell, T. L. (1993). Comparative protein modelling by satisfaction of spatial restraints. Journal of Molecular Biology, 234(3), 779-815. https://doi.org/10.1006/jmbi.1993.1626"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Comparative modelling builds the structure of a protein, the target, from the known structure of a related protein, the template. The method rests on the observation that proteins with related sequences tend to have similar structures, so that the template's structure, adjusted to the target's sequence, gives a model of the target. Šali and Blundell (1993) described the approach in which the template provides a set of spatial restraints, distances and angles between residues, and the model is the arrangement of atoms that satisfies these restraints as far as possible.

The first step is the alignment of the target sequence to the template. The alignment determines which residues of the target correspond to which of the template, and it is the most important input to the model. An error in the alignment places residues in the wrong positions, and a model built on a wrong alignment is wrong in its structure even if its geometry is excellent. The alignment methods of the sequence alignment topic apply here.

The model is built by satisfying the restraints. The restraints from the aligned residues are combined with the stereochemical rules of the protein, and an optimisation finds the arrangement that satisfies them best. Loops that are absent from the template are modelled separately, and side chains are placed by rules. Each of these steps adds uncertainty, and the regions built without a template are the least reliable part of the model.

The accuracy of a model depends on the sequence identity between target and template. A close template gives a model close to the experimental structure, while a distant template gives a model whose overall fold may be right and whose details are not. Platt (1964) recommended a test that can discriminate between alternatives, and a model should be checked against the data that could show it to be wrong, such as the known positions of residues that were not used in building it.

Berman (2000) describes the archive from which templates are taken, and the template must be chosen with its resolution and its coverage in mind. Sandve et al. (2013) recommended recording the template, the alignment and the method used to build the model, since the model cannot be judged without them.
