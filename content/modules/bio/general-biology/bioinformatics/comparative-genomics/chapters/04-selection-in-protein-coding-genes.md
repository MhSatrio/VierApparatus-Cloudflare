---
title: "Selection in Protein-Coding Genes"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How evolutionary selection on protein-coding genes is detected by comparing the rate of nonsynonymous substitutions, which change the protein, with the rate of synonymous substitutions, which do not, what the ratio indicates about purifying, neutral and positive selection, the models used to estimate it across a phylogeny and the cautions needed because the ratio is an average over many sites and can hide selection acting on a few."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why the ratio of nonsynonymous to synonymous substitution rates is used to infer selection on a protein-coding gene."
  - "State what a ratio below, near and above one suggests and the cautions that apply to each."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Felsenstein, J. (1985). Confidence limits on phylogenies: An approach using the bootstrap. Evolution, 39(4), 783-791. https://doi.org/10.1111/j.1558-5646.1985.tb00420.x"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A change in a protein-coding gene can alter the protein, which is a nonsynonymous substitution, or leave it unchanged, which is a synonymous substitution, because the genetic code is redundant. Alberts et al. (2022) describe the genetic code and its redundancy, and this redundancy is what makes the two kinds of change distinguishable. Comparing the rate of nonsynonymous change with the rate of synonymous change is the standard means of asking whether selection has acted on a gene's protein.

The ratio of the two rates, often written omega, has a direct interpretation. A ratio well below one indicates purifying selection, in which changes to the protein are removed because they are harmful. A ratio near one indicates that the protein changes at the rate expected from neutral drift. A ratio above one indicates positive selection, in which protein changes were favoured. Most genes have a ratio well below one, since most protein changes are harmful.

The estimation is done on a phylogeny, with models that assign a rate to each branch and to each site. Felsenstein (1985) described the statistical treatment of trees that such models build on, and the estimate depends on the tree and on the model. A poor tree or an inadequate model will bias the ratio, so the tree and the model must be justified.

The average ratio can hide selection that acts on a few sites. A gene under positive selection at a small number of residues may have an average ratio below one, because the many other sites are constrained. Site models that allow the ratio to vary among sites detect such cases, and the analysis should report whether the test was applied to sites or to the gene as a whole.

Sandve et al. (2013) recommended that the models and the tests of an analysis be recorded, since the conclusion about selection depends on both.
