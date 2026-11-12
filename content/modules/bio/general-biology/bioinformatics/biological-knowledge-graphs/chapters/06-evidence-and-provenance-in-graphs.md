---
title: "Evidence and Provenance in Graphs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the evidence and provenance of each edge in a biological knowledge graph are recorded and carried through the graph's queries, the source, the method and the date of each relation, the distinction between an asserted relation and an inferred one, the attachment of confidence to each edge and the reason a path is only as reliable as the weakest edge on it, with the standards that make a graph-based claim traceable to its sources."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Attach source, method and date to each edge of a knowledge graph and carry them through a query result."
  - "Explain why the reliability of a path is limited by its weakest edge and how this is reported with the path."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Himmelstein, D. S., Lizee, A., Hessler, C., Brueggeman, L., Chen, S. L., Hadley, D., Green, A., Khankhanian, P., & Baranzini, S. E. (2017). Systematic integration of biomedical knowledge prioritizes drugs for repurposing. eLife, 6, e26726. https://doi.org/10.7554/eLife.26726"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Every edge of a knowledge graph should carry the means of judging it. The source that asserted the relation, the method by which it was found, the date of the assertion and the confidence attached to it are the provenance of the edge. A relation that came from a curated database is different from one that came from a text-mining system, and a relation inferred from other relations is different from one that was observed. Without this information, the graph presents all edges as equal, and its paths mix well-supported and poorly supported claims without any sign.

Wilkinson et al. (2016) set out the FAIR principles, under which data should carry rich descriptions of their provenance and licence, and the provenance of each edge is the graph's application of that principle. The description must travel with the edge into the results of queries, since a path that is reported without its sources cannot be checked by the user.

A path is as reliable as its weakest edge. A chain of three well-supported relations that includes one inferred relation is no stronger than that inferred relation, and a reader who sees the path must be told the lowest level of support on it. Himmelstein et al. (2017) used paths whose edges had different origins, and the interpretation of their rankings depends on knowing which edges supported them.

Inferred relations need to be marked as such. A relation that the graph deduces from others, or predicts by a method, is a hypothesis within the graph, and it should not be displayed as an observed fact. The distinction between what was asserted and what was inferred is the most important one a user of the graph must be able to see.

Peng (2011) argued that a computational result must be accompanied by the means of reproducing it, and Sandve et al. (2013) recommended that the sources and versions of an analysis be recorded. Provenance is the form in which that recording is carried into the graph itself.
