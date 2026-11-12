---
title: "Using Predicted Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How predicted models are used in biological research, including the design of mutations to test a predicted residue, the interpretation of a predicted fold to suggest a function, the use of a model in molecular replacement for crystallography, the comparison of predicted and experimental structures and the checks that a model must pass before its use changes a conclusion."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe three uses of a predicted model in research and the evidence each use requires."
  - "Explain how a predicted model can guide a mutation experiment and why the model's confidence in the target region determines whether the design is sound."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A predicted model is useful when it generates a testable question. A biologist who knows the predicted fold of a protein can identify a residue that is likely to line a binding site and design a mutation to test it. Jumper et al. (2021) describe the predictions whose accuracy makes such designs practical in many cases, and the design is sound only where the model is confident. A mutation chosen from a low-confidence loop tests nothing about the protein that the model could support.

Platt (1964) recommended that an experiment be designed to exclude alternatives, and a mutation test of a predicted site is such an experiment when the alternative explanations are considered. A mutation that abolishes activity supports the predicted site, but the same effect might come from misfolding of the mutant. The control, a mutation at a residue predicted to be far from the site, distinguishes the two.

Predicted models also serve as starting points for other methods. A model can be used as the search model in molecular replacement, a crystallographic method that places a known fold into an experimental map, and this use has made predictions valuable for solving structures. The success of such use depends on the model's accuracy in the regions that dominate the fold, and a model that is confident in the core but not in the loops may still solve the structure.

Ioannidis (2005) described how a result that is selected from many predictions can overstate its meaning, and a screen of many predicted sites is open to the same caution. The candidates chosen for experiment should be fixed by a rule before the results are seen, and the rule should be reported.

Sandve et al. (2013) recommended recording the steps by which a conclusion was reached, and the model used, its confidence and the rule for choosing the experimental target form the record of such a study.
