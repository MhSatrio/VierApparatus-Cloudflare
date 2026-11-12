---
title: "Fast Maximum-Likelihood Tools"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The tools used for fast maximum-likelihood tree inference on large datasets, the speed and scale of RAxML and IQ-TREE, the stochastic and heuristic searches they use, how their settings trade speed against the thoroughness of the search, the practices for running them on a cluster and the checks that confirm a fast search has found a tree of good likelihood."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Run a maximum-likelihood tree search with a fast tool and choose its settings for a dataset of a given size."
  - "Check that a fast search has found a stable, high-likelihood tree by repeating it from different starting points."
references:
  - "Stamatakis, A. (2014). RAxML version 8: a tool for phylogenetic analysis and post-analysis of large phylogenies. Bioinformatics, 30(9), 1312-1313. https://doi.org/10.1093/bioinformatics/btu033"
  - "Nguyen, L.-T., Schmidt, H. A., von Haeseler, A., & Minh, B. Q. (2015). IQ-TREE: A Fast and Effective Stochastic Algorithm for Estimating Maximum-Likelihood Phylogenies. Molecular Biology and Evolution, 32(1), 268-274. https://doi.org/10.1093/molbev/msu300"
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

Exhaustive maximum-likelihood searches are impossible for more than a handful of sequences, since the number of possible trees grows faster than any practical search could cover. Fast tools make the problem tractable by using heuristic searches that propose changes to a tree and keep those that improve the likelihood. Stamatakis (2014) describes RAxML, a program designed for large phylogenies, and Nguyen et al. (2015) describe IQ-TREE, which uses a stochastic search to explore the space of trees.

The searches trade speed against thoroughness. A quick search may find a good tree in a short time, but it may also stop at a local optimum, a tree that cannot be improved by the moves the search considers but is not the best tree. Settings control how many moves are tried and how long the search runs, and a larger setting costs more time for a better chance of finding the best tree. The setting chosen should be justified for the dataset, and a small test on a subset helps in choosing it.

Stein (2010) described the move of genome analysis to shared and remote computing, and the large phylogenies that these tools produce are run in the same environment. A search that takes many hours is run on a cluster, with its resource request and its output recorded as described in the high-performance computing topic.

The result must be checked. Running the search several times from different random starting trees shows whether the same best tree is found each time. If independent runs give different trees with similar likelihoods, the search has not converged, and the tree should not be reported as the answer without this qualification.

Taschuk and Wilson (2017) recommended that research software be tested on inputs with known answers, and a search run on a dataset whose tree is known is such a test. The check confirms that the tool and its settings work before they are applied to the real data.
