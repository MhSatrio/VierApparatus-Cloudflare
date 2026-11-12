---
title: "Querying Paths and Connections"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a biological knowledge graph is queried for paths and connections between entities, the use of typed path patterns that specify the kinds of nodes and relations along a path, the counting of paths and the weighting of short and long paths, the problem that highly connected nodes create many spurious paths and the limits that a path places on the claim it suggests."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a typed path pattern and retrieve the paths in a knowledge graph that match it between two kinds of entity."
  - "Explain why a highly connected node creates many spurious paths and how the weighting of paths limits their influence."
references:
  - "Himmelstein, D. S., Lizee, A., Hessler, C., Brueggeman, L., Chen, S. L., Hadley, D., Green, A., Khankhanian, P., & Baranzini, S. E. (2017). Systematic integration of biomedical knowledge prioritizes drugs for repurposing. eLife, 6, e26726. https://doi.org/10.7554/eLife.26726"
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A query on a knowledge graph asks for the paths between two entities, such as a drug and a disease, that pass through a given kind of intermediate. A typed path pattern specifies the sequence of node and edge types, so that only paths of the form drug, targets protein, participates in pathway, associated with disease are returned. Himmelstein et al. (2017) used such patterns to find the connections that supported a candidate drug for a disease, and the pattern expresses the hypothesis that a particular kind of mechanism links the two.

Many paths exist between most pairs of entities in a dense graph, and the number of paths grows rapidly with their length. A highly connected node, a protein that many drugs and diseases touch, lies on a large share of these paths, and it creates connections between almost any two entities. Barabási and Oltvai (2004) described the hubs of biological networks, and their presence means that a count of paths is dominated by the hubs unless the count is corrected.

The paths are therefore weighted. Short paths and paths through specific nodes are given more weight than long paths and paths through hubs, and the weighting must be stated, since it changes the ranking. A ranking that depends strongly on a single weighting is not robust, and the sensitivity of the ranking to the weights should be examined.

A path records a chain of relations, not a mechanism. Ioannidis (2005) described how a result that is selected from many candidates is inflated by the selection, and a ranking of many drug-disease pairs through the graph will include strong-looking paths by chance. The candidates chosen for experiment should be fixed by a rule, and the number of pairs examined should be reported with the ranking.

Sandve et al. (2013) recommended recording the queries and the weighting, since the ranking that results depends on both.
