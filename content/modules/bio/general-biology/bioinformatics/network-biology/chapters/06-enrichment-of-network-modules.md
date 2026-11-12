---
title: "Enrichment of Network Modules"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the modules of a network are tested for enrichment in functional annotation, the use of a background of all the nodes of the network, the bias that arises when well-annotated proteins fill many modules and the correction for the number of modules and terms tested, with the reasons a module that is enriched for a function is a hypothesis about that function rather than evidence that the module performs it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Test a module for enrichment in functional terms against a background of the network's nodes and correct for the number of tests."
  - "Explain how annotation bias can make a module appear enriched for a function that is simply well studied."
references:
  - "Szklarczyk, D., Gable, A. L., Lyon, D., Junge, A., Wyder, S., Huerta-Cepas, J., Simonovic, M., Doncheva, N. T., Morris, J. H., Bork, P., Jensen, L. J., & von Mering, C. (2019). STRING v11: protein-protein association networks with increased coverage, supporting functional discovery in genome-wide experimental datasets. Nucleic Acids Research, 47(D1), D607-D613. https://doi.org/10.1093/nar/gky1131"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A module is tested for enrichment in a functional category by asking whether its members carry that category more often than the rest of the network. The test is the same hypergeometric comparison used for gene sets, with the background being the nodes of the network. Szklarczyk et al. (2019) describe a resource that provides functional annotations for the proteins in such networks, and the enrichment is computed against the annotations of the background.

The background must be the nodes of the network, not the whole proteome, since a network built from a subset of proteins includes only that subset. A module drawn from a network of experimentally studied proteins will be enriched for the functions of those proteins when compared with the proteome, and the enrichment disappears when the background is the network. The background is therefore a decision that changes the result, and it must be reported.

Annotation bias is the main danger. Well-studied functions, such as the basic machinery of the cell, are annotated to many proteins, and a module that contains several well-studied proteins will appear enriched for these functions whatever its real biology. The defence is to compare the enrichment against a background that shares the bias, or to test whether the enrichment survives after the annotation depth of each protein is taken into account.

Ioannidis (2005) described how the testing of many categories inflates the number of apparent findings, and a module examined against hundreds of terms will produce some with small p-values by chance. The correction for the number of terms and of modules must be applied, and the correction shown.

The enrichment result is a hypothesis about the function of a module, and it should be tested by experiment. Barabási and Oltvai (2004) described the modular organisation that such hypotheses explore, and the claim that a module performs a function requires evidence beyond the annotation that the module shares.

Sandve et al. (2013) recommended recording the background, the terms and the corrections of an enrichment, since the result depends on each.
