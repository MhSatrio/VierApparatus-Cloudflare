---
title: "Searching with Entrez"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the Entrez search system is used to find nucleotide and protein records, the field tags that restrict a query to a gene, an organism or a publication, the Boolean operators and their precedence, the use of filters and date ranges, and the checks needed to confirm that a result set contains the records intended and nothing else."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write an Entrez query that restricts a search to a gene, an organism and a date range using field tags and Boolean operators."
  - "Check the size and content of a result set before using it, and identify records that were returned by mistake."
references:
  - "Sayers, E. W., Bolton, E. E., Brister, J. R., Canese, K., Chan, J., Comeau, D. C., Connor, R., Funk, K., Kelly, C., Kim, S., Madej, T., Marchler-Bauer, A., Lanczycki, C., Lathrop, S., Lu, Z., Thibaud-Nissen, F., Murphy, T., Phan, L., Skripchenko, Y., . . . Sherry, S. T. (2022). Database resources of the National Center for Biotechnology Information. Nucleic Acids Research, 50(D1), D20-D26. https://doi.org/10.1093/nar/gkab1112"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Entrez is the search system that links the NCBI databases. A query is a string of search terms, each of which may be restricted to a field of the record by a tag written in square brackets. The tag [Organism] restricts a term to the organism field, [Gene] to the gene name and [PDAT] to the publication date. Sayers et al. (2022) describe the resources that Entrez searches, and the field tags are the means of asking those resources precise questions.

Boolean operators combine the terms. AND requires both terms, OR accepts either, and NOT excludes one. Parentheses set the order in which the operators are applied, and a query without parentheses may not mean what its author intended. A query for a gene in two species should group the species with OR inside parentheses before combining the result with the gene term by AND, so that the species do not bind to the wrong part of the query.

Filters and date ranges narrow a result set further. A date range limits the records to those deposited within a period, which is useful when a study must be repeated with the data available on a given day. The same date restriction should be recorded in the methods, since a later search of the same query will return more records.

A result set is not confirmed until it has been inspected. The number of records should match what the query was designed to find, and a sample of the records should be read to check their organism, gene and length. Records that match a term by chance, such as a gene with a similar name in another species, are common, and they are removed by a second, more specific query rather than by hand.

Sandve et al. (2013) recommended that the steps of a data search be recorded. The exact query text, the database, the date of the search and the number of records returned together make the search repeatable.
