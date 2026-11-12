---
title: "Reporting UniProt Versions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What a study must report about the UniProt data it used so that the protein records can be retrieved again, including the release number, the accessions, the isoforms, the review status, the date of retrieval, the query and the mapping rules, together with the reasons this information matters as entries are revised over time."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the UniProt information that a study must report for its protein records to be retrieved and checked."
  - "Write a short data statement for a protein dataset that another group could use to repeat the retrieval."
references:
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Protein records change. The UniProt Consortium (2023) describes a resource that is revised in regular releases, and an entry may gain a new function, a new isoform or a corrected sequence between releases. A study that reports only the names of its proteins cannot be repeated when the entries have changed, so the report must fix the version of the data it used.

The release number is the first item. It identifies the state of the knowledgebase on which the analysis was run, and it should be stated in the methods, together with the date on which the data were retrieved. A release number alone is not enough, since a later release may differ in ways that matter.

The accessions and the isoforms are the second item. Each protein should be listed by its accession, with the isoform used and its sequence length, so that a reader can find the same protein in the same form. The review status of each entry belongs to this list, because a reader needs to know which entries were curated.

The query and the mapping rules are the third item. The search that produced the list, the identifier conversion and the decisions taken for one-to-many and unmapped identifiers should be written out. Peng (2011) argued that the steps of a computational result must be available for it to be checked, and these steps are the part of the protein analysis that a reader needs most.

Sandve et al. (2013) recommended that the inputs and steps of an analysis be recorded so that the analysis can be repeated, and a short data statement that lists the release, the accessions, the query and the mapping meets that recommendation for a protein dataset.
