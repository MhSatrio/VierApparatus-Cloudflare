---
title: "Repair Pathways"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The cellular pathways that repair the double-strand break made by a nuclease and so determine the outcome of an edit, including non-homologous end joining, which joins the broken ends with small insertions or deletions, and homology-directed repair, which copies a donor template to restore or change the sequence, the relative frequency of the pathways depending on the cell cycle and the cell type, the design of donor templates with homology arms, the measurement of the spectrum of outcomes by sequencing, and the reporting of the proportions of each outcome."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish non-homologous end joining from homology-directed repair and state the outcome of each."
  - "Describe how the repair pathway determines the edit and how the spectrum of outcomes is measured by sequencing."
references:
  - "Doudna, J. A., & Charpentier, E. (2014). The new frontier of genome engineering with CRISPR-Cas9. Science, 346(6213), 1258096. https://doi.org/10.1126/science.1258096"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

The nuclease creates a break, and the cell repairs it. The repair pathway determines the edit, and the cell has more than one pathway, each with its own outcome. Non-homologous end joining rejoins the broken ends directly and is active throughout the cell cycle. It is error-prone, and it commonly introduces small insertions or deletions at the break. This outcome is useful for disrupting a gene, since a frameshift often destroys its function, but it does not produce a chosen sequence.

Homology-directed repair uses a homologous template to restore the sequence, and it can be exploited to introduce a chosen change. A donor template carrying the desired sequence, flanked by regions matching the target, is copied into the break. This pathway is more active in dividing cells in certain phases, and its efficiency is usually lower than that of end joining, so an experiment aiming for a precise change may recover few edited cells.

The donor template should be designed with arms of homology on each side of the change, and the length of the arms affects the efficiency of repair. The template should also be protected from re-cutting by the nuclease, since a repaired site that is still recognised will be cut again. These design choices determine what fraction of the repaired cells carry the intended change, and they should be stated.

The outcome spectrum is measured by sequencing the target region in many cells, and the proportion of each class of outcome is reported. Cumming (2014) argues that these proportions should be shown with their intervals, since the frequency of rare outcomes depends on the number of cells sequenced. Sandve et al. (2013) recommended recording the sequencing depth and the classification of outcomes, so that the spectrum can be compared across experiments.
