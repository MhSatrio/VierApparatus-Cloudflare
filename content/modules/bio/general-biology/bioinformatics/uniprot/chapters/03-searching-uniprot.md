---
title: "Searching UniProt"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How to search the UniProt Knowledgebase with field-based queries, how the reviewed filter, the organism filter and the gene name filter combine, how a search returns the entries, and how the search results are exported as a list of accessions and a table with the chosen fields, with the checks needed to confirm the search found the intended proteins."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a UniProt search that restricts results to reviewed entries from one organism with a given gene name."
  - "Export the accessions and selected fields of a search and check the result for missing or unexpected proteins."
references:
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A UniProt search combines field-based terms, each restricting the results to a property of the entry. A term may name the gene, the organism, the review status or a keyword, and the terms are joined with Boolean operators. The UniProt Consortium (2023) describes the knowledgebase that these searches run against, and the query is the means of asking it a precise question. A search for the reviewed proteins of one gene in one species is a common starting point.

The review status is a filter that is worth using by default for a question about function. A search without it returns both sections, and the unreviewed entries may outnumber the reviewed ones for a large family. The organism can be given by name or by its taxonomic identifier, and the identifier is less ambiguous because a name may have synonyms.

Results are exported as a table with the fields chosen by the user, and the accession should always be one of them. The export can be saved as a list of accessions, which is the form used to retrieve sequences later. A list that lacks the accession cannot be traced back to the entries it came from.

Every search needs a check. The number of results should be compared with the number expected, and the entries should be read for the organism and the gene name. A gene name shared by an unrelated protein is a common source of false results, and an entry that matches the name but not the organism must be removed before the list is used.

Sandve et al. (2013) recommended that a search be written down in full so that it can be repeated, and the exact query, the date and the number of results are the record of the search.
