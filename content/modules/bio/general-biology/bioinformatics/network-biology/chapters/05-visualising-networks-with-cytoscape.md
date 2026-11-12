---
title: "Visualising Networks with Cytoscape"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How biological networks are visualised and explored with the Cytoscape software environment, covering the import of interaction tables and attributes, the choice of layout that places nodes so that structure is visible, the mapping of data to node and edge appearance, the filtering of a network by attributes and the caution that a visual layout can suggest clusters and gaps that the data do not contain."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Import an interaction table and its attributes into a network visualisation and map a data attribute to the appearance of the nodes."
  - "Explain why a layout can suggest clusters that are an artefact of the algorithm and how to check the structure with measures."
references:
  - "Shannon, P., Markiel, A., Ozier, O., Baliga, N. S., Wang, J. T., Ramage, D., Amin, N., Schwikowski, B., & Ideker, T. (2003). Cytoscape: A Software Environment for Integrated Models of Biomolecular Interaction Networks. Genome Research, 13(11), 2498-2504. https://doi.org/10.1101/gr.1239303"
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Cytoscape, described by Shannon et al. (2003), is a software environment for displaying biological networks together with the data attached to their nodes and edges. A network is imported from a table of interactions, the data such as expression or confidence are attached as attributes, and the attributes are mapped to visual properties such as colour, size and shape. The visual representation is a way of seeing the data, and the mapping is a choice that determines what the eye notices first.

The layout places the nodes on the screen. Force-directed layouts pull connected nodes together and push unconnected ones apart, so that clusters appear as groups in the picture. The position of a cluster on the screen depends on the algorithm and on its random start, and a cluster that is apparent in one layout may disappear in another. A visual cluster is therefore a suggestion, and its reality must be checked with measures such as modularity, as the earlier chapters described.

Filtering reduces a large network to the part of interest. Edges can be removed by their confidence, nodes by their attributes, and the remaining network examined. Barabási and Oltvai (2004) described how the structure of a network depends on its completeness, and a filter that removes weak edges changes the structure as much as it clarifies the picture. The filter and its threshold must be reported.

The display can mislead. A dense cluster drawn in the centre of the screen looks more important than a sparse one at the edge, and a node drawn large by a mapped attribute appears to be more central than it is. The viewer should check the numbers behind the picture, and a figure should state the layout, the filter and the mapping that produced it.

Sandve et al. (2013) recommended recording the steps of an analysis, and a Cytoscape session should be saved with its layout, filter and mapping so that the figure can be regenerated.
