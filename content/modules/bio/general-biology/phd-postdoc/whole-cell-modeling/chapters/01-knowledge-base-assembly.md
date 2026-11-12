---
title: "Assembling the Knowledge Base"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The assembly of the knowledge base from which a whole-cell model is built, covering the annotation of the genome with its genes, their functions and their regulatory elements, the collection of measured transcript and protein abundances and their conditions, the metabolic reconstruction of the enzymatic reactions and their stoichiometry, the sources of kinetic and thermodynamic parameters with their conditions and uncertainties, the handling of conflicting measurements across sources, the documentation of each entry with its source and its evidence, and the explicit record of the entries that are inferred by homology or assumption rather than measured."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Assemble a knowledge base entry for a gene or reaction with its source, its conditions and its evidence level."
  - "Distinguish measured entries from inferred or assumed ones and state how the distinction affects the model."
references:
  - "Karr, J. R., Sanghvi, J. C., Macklin, D. N., Gutschow, M. V., Jacobs, J. M., Bolival, B., Assad-Garcia, N., Glass, J. I., & Covert, M. W. (2012). A whole-cell computational model predicts phenotype from genotype. Cell, 150(2), 389-401. https://doi.org/10.1016/j.cell.2012.05.044"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A whole-cell model is only as reliable as the knowledge base from which it is built, and the knowledge base is assembled from many sources of different quality. Genome annotation provides the genes and their presumed functions, measured abundances provide the levels of transcripts and proteins, and reconstruction provides the reactions and their stoichiometry. Karr et al. (2012) assembled such a base for a bacterium, and the documentation of each entry is what allows the base to be checked and improved.

Measurements of abundance and kinetics are taken under particular conditions, and an entry is valid only for those conditions. A rate measured at one temperature or in one medium may not apply to the cell under another. Each entry must therefore carry its conditions, and the model must use the entry only where the conditions match. Cumming (2014) argues that each parameter should be reported with its interval, since the parameters from different sources carry different uncertainties.

Measurements from different sources sometimes conflict, and the conflict must be recorded rather than resolved silently. The choice of which measurement to use is a modelling decision that affects the predictions, and it should be reported with its reason. Ioannidis (2005) described how the selection of favourable measurements can distort a model, and the selection rules should be stated in advance.

Each entry should be documented with its source and its evidence, so that the origin of every prediction can be traced back. Entries that are inferred by homology from other organisms or assumed for convenience must be marked as such, since their reliability is lower than that of direct measurements. Peng (2011) argued that the provenance of each input is part of the reproducibility of a computational result, and the marking of inferred entries makes the provenance visible.
