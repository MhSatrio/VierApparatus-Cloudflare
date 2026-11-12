---
title: "Accessions and Versions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The difference between an accession number and a version number in NCBI records, how accession prefixes indicate the source of a record, why a sequence can change while its accession stays the same, the retirement of GI numbers and the practice of recording the exact accession and version used in every analysis so that a later reader gets the same sequence."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a version number is needed alongside an accession and what changes when a version increases."
  - "Record the accession and version of every sequence in a dataset and check that they are still current."
references:
  - "Benson, D. A., Cavanaugh, M., Clark, K., Karsch-Mizrachi, I., Lipman, D. J., Ostell, J., & Sayers, E. W. (2012). GenBank. Nucleic Acids Research, 41(D1), D36-D42. https://doi.org/10.1093/nar/gks1195"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

An accession number is the stable identifier of a GenBank record. It consists of letters and digits, and the prefix indicates the archive from which the record came: a prefix from the international sequence collaboration, for instance, identifies a record that was exchanged between the partner archives. Benson et al. (2012) describe the collaboration that keeps these records consistent across the partner archives, which is why the same accession can be used in each of them.

The version number follows the accession, after a period. It increases when the sequence or the annotation of the record is revised. The accession stays the same across revisions, which means that a search by accession alone may return a sequence that differs from the one an analysis used a year earlier. The version is the identifier that fixes the sequence.

GI numbers, an older identifier, were used for a time as a second identifier for each sequence. NCBI retired them, and an analysis that still records GI numbers should convert them to accession and version, since the GI numbers no longer work as a reference.

The practice of recording identifiers follows from these facts. Every sequence used should be listed with its accession and version, together with the date on which it was retrieved. A list of accessions without versions is incomplete, and a result that depends on it cannot be repeated with confidence.

Wilkinson et al. (2016) recommended that data be identified by persistent and unambiguous identifiers, and the accession with its version is the NCBI form of that identifier. Sandve et al. (2013) recommended that the inputs to an analysis be recorded precisely, which is the same requirement in practice.
