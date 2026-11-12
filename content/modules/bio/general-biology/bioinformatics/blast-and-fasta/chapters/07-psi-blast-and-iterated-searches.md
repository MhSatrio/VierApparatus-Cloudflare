---
title: "PSI-BLAST and Iterated Searches"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How PSI-BLAST builds a position-specific scoring matrix from the hits of one round and uses it to search again, how iterated searches find distant relatives that a single search misses, the way a false hit included in the profile can carry further false hits into the next round and the controls that keep an iterated search from drifting away from the query."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a position-specific scoring matrix is built from the hits of one iteration and why it can find distant relatives."
  - "Describe how a false hit can contaminate later iterations and state the controls that limit the risk."
references:
  - "Altschul, S. (1997). Gapped BLAST and PSI-BLAST: a new generation of protein database search programs. Nucleic Acids Research, 25(17), 3389-3402. https://doi.org/10.1093/nar/25.17.3389"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Eddy, S. R. (2011). Accelerated Profile HMM Searches. PLoS Computational Biology, 7(10), e1002195. https://doi.org/10.1371/journal.pcbi.1002195"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A single search compares the query with each database sequence using one fixed scoring matrix. A family of proteins may contain members that share only a few conserved positions with the query, and a fixed matrix does not reward those positions strongly enough to find them. PSI-BLAST addresses this by building a position-specific scoring matrix, or profile, from the hits of the first round. Each column of the profile records which residues are seen at that position across the hits, and the profile is then used as the query for the next round.

Altschul (1997) described the iterated procedure, in which each round adds the newly found hits to the profile and searches again. The profile becomes a summary of the family as it has been found so far, and it can reach relatives that the query alone would miss. The method is powerful for finding distant members of a family, and it is the reason that iterated searches are common in the study of new proteins.

The risk is that the profile is built from the hits, and a hit that does not belong to the family enters the profile and changes it. The next round then finds hits that resemble the false hit, and the error can spread through several rounds. Eddy (2011) described the related profile methods and the care with which their models must be built, and the same concern applies to the profile of an iterated search.

The controls are the threshold for including a hit in the profile and the number of rounds allowed. A stricter threshold admits fewer hits and a smaller risk of contamination, and a fixed number of rounds prevents the profile from drifting indefinitely. The results of each round should be inspected, and the point at which the search stops finding new members should be noted.

Sandve et al. (2013) recommended that the steps of an analysis be recorded. The number of iterations, the inclusion threshold and the list of hits included at each round are the record of an iterated search, and they are needed for the result to be checked.
