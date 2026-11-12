---
title: "Metabolic Network Reconstruction"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The construction of a genome-scale metabolic model of an organism from its annotated genome and the biochemical literature, covering the metabolites, reactions and genes that define the network, the gene-protein-reaction associations that link the genome to the reactions, the draft reconstruction and its gaps, the curation of reactions and their balance, the compartments and transport reactions that connect them, the validation of the model against growth and gene essentiality data, and the reporting of a reconstruction so that it can be reused and corrected."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps that turn an annotated genome into a curated genome-scale metabolic reconstruction."
  - "Validate a reconstruction against growth or gene essentiality data and report the agreement with its uncertainty."
references:
  - "Thiele, I., & Palsson, B. Ø. (2010). A protocol for generating a high-quality genome-scale metabolic reconstruction. Nature Protocols, 5(1), 93-121. https://doi.org/10.1038/nprot.2009.203"
  - "Orth, J. D., Thiele, I., & Palsson, B. Ø. (2010). What is flux balance analysis? Nature Biotechnology, 28(3), 245-248. https://doi.org/10.1038/nbt.1614"
  - "Schellenberger, J., Que, R., Fleming, R. M. T., Thiele, I., Orth, J. D., Feist, A. M., Zielinski, D. C., Bordbar, A., Lewis, N. E., Rahmanian, S., Kang, J., Hyduke, D. R., & Palsson, B. Ø. (2011). Quantitative prediction of cellular metabolism with constraint-based models: the COBRA Toolbox v2.0. Nature Protocols, 6(9), 1290-1307. https://doi.org/10.1038/nprot.2011.308"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A genome-scale metabolic reconstruction is a structured list of the metabolites, reactions and genes of an organism, drawn from its annotated genome and from the biochemical literature. It describes what the organism can do metabolically, and it can be converted into a mathematical model whose predictions are tested against experiments. Thiele and Palsson (2010) set out a protocol for building such reconstructions to a high standard, and the steps of the protocol form the structure of this topic.

The reconstruction begins with the genes and the reactions they are believed to catalyse. Each reaction is written with its metabolites, their stoichiometry and their compartments, and the association between genes and reactions is recorded in rules that reflect the enzyme complexes. The draft reconstruction is incomplete, and it contains gaps where a metabolite cannot be produced or consumed. Filling these gaps and curating the reactions is the most laborious part of the process.

The reconstruction becomes a model when it is expressed as a stoichiometric matrix and constrained by measured or assumed fluxes. Orth et al. (2010) explained that flux balance analysis uses this matrix to predict steady-state fluxes that maximise an objective such as growth, and the predictions are only as good as the reconstruction behind them. Schellenberger et al. (2011) described a software toolbox that implements these methods and makes the models reusable.

Validation compares the predictions of the model with experimental data on growth and on gene essentiality. Ioannidis (2005) described how a model adjusted until it matches the data does not thereby show that it is correct, and the validation should use data that were not used in curation. The later chapters follow this sequence, from the definition of the network to the reporting that allows the reconstruction to be corrected as knowledge grows.
