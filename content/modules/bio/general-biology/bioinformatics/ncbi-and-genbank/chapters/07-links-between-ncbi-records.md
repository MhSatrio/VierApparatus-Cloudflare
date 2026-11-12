---
title: "Links Between NCBI Records"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How records in different NCBI databases are linked, including the link from a nucleotide record to its protein translation, to its literature and to its genome, the use of the elink function to move between databases, the limits of automatic links and the checks needed to confirm that a linked record describes the same molecule."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Move from a nucleotide record to its protein record and its literature record using the NCBI link tools."
  - "Explain why an automatic link between two records should be checked before it is used in an analysis."
references:
  - "Sayers, E. W., Bolton, E. E., Brister, J. R., Canese, K., Chan, J., Comeau, D. C., Connor, R., Funk, K., Kelly, C., Kim, S., Madej, T., Marchler-Bauer, A., Lanczycki, C., Lathrop, S., Lu, Z., Thibaud-Nissen, F., Murphy, T., Phan, L., Skripchenko, Y., . . . Sherry, S. T. (2022). Database resources of the National Center for Biotechnology Information. Nucleic Acids Research, 50(D1), D20-D26. https://doi.org/10.1093/nar/gkab1112"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Benson, D. A., Cavanaugh, M., Clark, K., Karsch-Mizrachi, I., Lipman, D. J., Ostell, J., & Sayers, E. W. (2012). GenBank. Nucleic Acids Research, 41(D1), D36-D42. https://doi.org/10.1093/nar/gks1195"
---

The NCBI databases are linked, and the links are one of their most useful features. A nucleotide record that encodes a protein links to the protein record, a sequence that has been reported in a paper links to the publication and a genome record links to its genes and to its taxonomy entry. Sayers et al. (2022) describe the collection as a set of resources that share a common search and linking system, and the links make it possible to move from one kind of record to another without retyping identifiers.

The link tool of the programming utilities returns the records in one database that are associated with a record in another. A script can therefore take a list of nucleotide accessions and return the protein identifiers of their translations, which is a common step before a protein analysis. The result is a list of links, and each link must be checked as a result, not accepted as a fact.

Automatic links have limits. A nucleotide record may link to a protein that is only partly the same as its translation, or to a literature record that mentions the gene without describing its sequence. The link describes an association recorded in the database, and the association may be correct, incomplete or out of date. Benson et al. (2012) describe the sequence archive from which many of these associations come, and the reliability of a link depends on the record that carries it.

The checks are straightforward. The length of the linked protein should match the length of the translation of the nucleotide record, the organism of the two records should agree and the literature record should describe the gene in question. A linked record that fails one of these checks should be examined before it is used.

Wilkinson et al. (2016) recommended that data be interoperable, which means that records should be linked to other records through shared identifiers. The NCBI links are an example of that principle, and the checks keep the links from being trusted beyond what they show.
