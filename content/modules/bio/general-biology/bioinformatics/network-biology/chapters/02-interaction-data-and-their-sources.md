---
title: "Interaction Data and Their Sources"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Where the interaction data of biological networks come from, including the binary interactions detected by yeast two-hybrid and affinity purification methods, the curated literature, the predictions from genomic context and co-expression, and the integrated resources that combine these sources with confidence scores, together with the biases of each source and the consequences of mixing them."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the main sources of interaction data and state the kind of evidence each provides."
  - "Explain how integrated resources combine sources with confidence scores and why the score must be checked against the sources it summarises."
references:
  - "Szklarczyk, D., Gable, A. L., Lyon, D., Junge, A., Wyder, S., Huerta-Cepas, J., Simonovic, M., Doncheva, N. T., Morris, J. H., Bork, P., Jensen, L. J., & von Mering, C. (2019). STRING v11: protein-protein association networks with increased coverage, supporting functional discovery in genome-wide experimental datasets. Nucleic Acids Research, 47(D1), D607-D613. https://doi.org/10.1093/nar/gky1131"
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The edges of a biological network come from experiments and from inference. Some interactions are detected directly, such as the binding of two proteins in a pull-down or in a two-hybrid assay, and these are recorded with the method that found them. Others are taken from the literature by curators, who read the published studies and record the relationships they report. A third group is predicted from indirect evidence, such as the proximity of genes in a genome, their similar expression or their co-occurrence in related organisms. Szklarczyk et al. (2019) describe an integrated resource that combines these kinds of evidence, each with its own score.

Each source has its own bias. Experimental screens cover some proteins far more thoroughly than others, and a protein that was not in the bait set of a screen will have few recorded links, however central it is. Curated literature reflects the interests of the research community, and the proteins that are studied most have the richest annotation. Predictions depend on the method and on the data it was trained on, and a predicted link may be an artefact of the shared features that the method uses. Barabási and Oltvai (2004) discussed how such incomplete data shape the apparent structure of a network.

Integrated resources add a score to each interaction, and the score is a summary of many sources. The summary is useful for filtering, but it hides the evidence behind each edge. An edge with a high score from a combination of weak sources may be less reliable than one with a lower score from a single strong experiment, so the score must be interpreted with its components.

Ioannidis (2005) described how a result that depends on selected data can overstate its reliability, and a network built from a biased sample of the proteome inherits this problem. The analysis should state which sources were used, the score threshold and the number of edges removed by it.

Sandve et al. (2013) recommended recording the inputs of an analysis, and the version of the interaction resource, the sources included and the threshold are the inputs of a network study.
