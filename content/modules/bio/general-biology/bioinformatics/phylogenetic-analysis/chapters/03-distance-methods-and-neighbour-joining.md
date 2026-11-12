---
title: "Distance Methods and Neighbour Joining"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a distance matrix is computed from an alignment by counting or correcting the differences between sequences, how a tree is built from the distances by the neighbour-joining method, why the correction for multiple substitutions matters for divergent sequences, the speed of distance methods for large datasets and the loss of information that comes from reducing the sequences to a single number for each pair."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute a distance matrix from an alignment, applying a correction for multiple substitutions, and explain why the correction is needed."
  - "Build a tree from a distance matrix by neighbour joining and state what the method gains in speed and loses in information."
references:
  - "Tamura, K., Stecher, G., Peterson, D., Filipski, A., & Kumar, S. (2013). MEGA6: Molecular Evolutionary Genetics Analysis Version 6.0. Molecular Biology and Evolution, 30(12), 2725-2729. https://doi.org/10.1093/molbev/mst197"
  - "Katoh, K., & Standley, D. M. (2013). MAFFT Multiple Sequence Alignment Software Version 7: Improvements in Performance and Usability. Molecular Biology and Evolution, 30(4), 772-780. https://doi.org/10.1093/molbev/mst010"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A distance method reduces each pair of aligned sequences to a single number, the evolutionary distance between them, and then builds a tree from the matrix of these distances. The simplest distance is the proportion of sites that differ. This underestimates the true distance between divergent sequences, because a site may change more than once and the changes may cancel. A correction for multiple substitutions estimates the number of changes that actually occurred, and the correction is needed as soon as the sequences are far apart.

The alignment is the starting point, and a distance matrix is only as good as the alignment it is computed from. Katoh and Standley (2013) described MAFFT, which produces the alignments commonly used for this purpose, and a poor alignment inflates some distances and deflates others. The alignment should be checked, and the regions of low confidence removed or treated with care before the distances are computed.

Neighbour joining builds a tree from the distance matrix by repeatedly joining the pair of taxa that minimises a criterion of total tree length, then treating the joined pair as a single taxon. The method is fast and gives a reasonable tree for many datasets, which makes it a common first step. Tamura et al. (2013) describe MEGA, a software package that implements distance methods of this kind along with other tools, and the package is widely used for this reason.

The method discards information. The sequences are summarised as a single distance per pair, so the pattern of changes at each site is lost. A tree built from distances can therefore be less accurate than a tree built from the sequences themselves, especially when the sequences are divergent or when the model of change is unusual. The method is most useful as a fast starting point or for very large datasets, and its results should be compared with a method that uses the sequences directly.

Sandve et al. (2013) recommended that the method and its settings be recorded. The correction used, the alignment and the version of the software belong in the record of a distance-based tree.
