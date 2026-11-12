---
title: "Sequence Generation and Fitting"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The generation of amino acid sequences that fit a target backbone or a desired function, covering the inverse folding models that predict sequences compatible with a given structure, the sampling from a learned distribution at a chosen temperature that trades diversity against likelihood, the design of the core and the surface with different residue preferences, the avoidance of sequence features that cause aggregation or that are unlikely to be expressed, the diversity of the generated sequences and the risk that they converge on a narrow family, the redesign of natural proteins as a baseline against which novel designs are compared, and the reporting of the generation method, its settings and the diversity of the output with uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Generate sequences for a target backbone with an inverse folding model and state how the sampling temperature trades diversity against likelihood."
  - "Compare novel designs with a redesign baseline and report the diversity of the generated set."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Once a backbone is chosen, sequences are generated that are compatible with it. Inverse folding models learn the relation between structure and sequence and propose residues for each position given the target geometry. The generation is usually sampled from a learned distribution, and the sampling temperature controls the trade-off between diversity and likelihood. A low temperature produces sequences that the model finds very probable but that may be similar to one another, while a high temperature produces diversity at the cost of lower confidence.

The core and the surface of a protein favour different residues, since the core is buried and hydrophobic while the surface is exposed and often charged. A design method that treats all positions alike will produce sequences that do not fold stably. The generation should therefore reflect the burial of each position, and the procedure should be described in enough detail to be repeated. Cumming (2014) argues that the choice of temperature and its effect on the designs should be reported with intervals, since the success of the design depends on it.

Certain sequence features cause aggregation or make a protein unlikely to be expressed, and these should be avoided or filtered. Aggregation-prone stretches of hydrophobic residues and rare codons that limit expression are common examples. Ioannidis (2005) described how a method can be judged by the outcomes it was designed to produce while ignoring those it causes, and the screening for such features should be reported.

The diversity of the generated sequences matters, since a set that converges on a narrow family may succeed in one fold while failing to explore alternatives. Diversity should be measured and reported, for example by the pairwise identity among the designs. Redesign of natural proteins on the same backbone provides a baseline against which the novel designs can be compared, and the comparison should show whether the generation adds anything beyond the natural sequence record. Peng (2011) argued that the procedure must be reproducible, and Munafò et al. (2017) argued that the generation settings and the diversity of the output should be reported.
