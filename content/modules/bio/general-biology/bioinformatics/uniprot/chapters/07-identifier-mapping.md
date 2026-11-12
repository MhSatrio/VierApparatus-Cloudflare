---
title: "Identifier Mapping"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a list of gene, protein or external identifiers is converted to UniProt accessions with the UniProt ID mapping service, how one-to-many and many-to-one mappings are handled, how unmapped identifiers are reported and how the mapping is recorded with its date and release so that the conversion can be repeated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Convert a list of gene identifiers to UniProt accessions and report the identifiers that did not map."
  - "Handle one-to-many and many-to-one mappings and record how each was resolved."
references:
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A list of identifiers from an experiment is rarely a list of UniProt accessions. It may contain gene symbols, Ensembl identifiers, RefSeq protein identifiers or the names used by a particular instrument, and each must be converted before it can be used with UniProt. The UniProt ID mapping service performs this conversion between a set of databases, and the UniProt Consortium (2023) describes the knowledgebase to which the mapped accessions belong.

A mapping may be one-to-many or many-to-one. A gene may encode several proteins, so one identifier maps to several accessions, and several identifiers may map to one protein. Each case needs a rule. The rule may keep the reviewed entry, keep the canonical isoform or keep all the accessions and carry them forward, but it must be stated, since the choice changes the number of proteins in the analysis.

Identifiers that do not map must be reported, not dropped. A list of unmapped identifiers shows what the conversion could not reach, and it may reveal a gene that has been renamed or a species that is not in the resource. The count of input identifiers, mapped accessions and unmapped identifiers should be written down, as a reader needs them to judge the coverage of the conversion.

The mapping is a dataset in its own right, and it changes with each release of the resource. The release, the date and the source identifier type should be recorded with the mapped list. Wilkinson et al. (2016) recommended that identifiers be described precisely, and a mapping with its release meets that standard for the converted identifiers.

Sandve et al. (2013) recommended that every transformation applied to data be recorded, and the mapping table with its rules and counts is the record of this one.
