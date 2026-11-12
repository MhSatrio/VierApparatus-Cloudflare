---
title: "Bulk Queries and BioMart"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How many features are exported at once from Ensembl with the BioMart interface and from the UCSC table browser, how a query chooses its filters, attributes and output format, how the query is saved so that it can be repeated and how a bulk export is checked for missing and duplicated rows before it is used in an analysis."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Build a BioMart query that exports the genes and coordinates of a set of identifiers in a chosen release."
  - "Check a bulk export for missing and duplicated rows and record the query so that it can be repeated."
references:
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
  - "Kent, W. J., Sugnet, C. W., Furey, T. S., Roskin, K. M., Pringle, T. H., Zahler, A. M., & Haussler, D. (2002). The human genome browser at UCSC. Genome Research, 12(6), 996-1006. https://doi.org/10.1101/gr.229102"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A browser view shows one region at a time, and a study usually needs the same information for a list of genes or a region of many thousands of bases. BioMart is the query interface through which Ensembl exports this information in bulk. A query chooses a dataset for a species, the filters that select the features, the attributes that define the columns of the output and a format. Cunningham et al. (2022) describe the Ensembl resource that BioMart queries, and the query is the means of reaching its contents at scale.

The UCSC Genome Browser offers a table browser for the same purpose. It exports the tracks of a region as a table, with a choice of the track, the region and the fields, and Kent et al. (2002) describe the browser on which the table browser is built. The two tools differ in their interfaces, but both reduce a manual search to a defined export.

A bulk export must be checked. A filter that is too loose returns features outside the region, and a filter that is too tight drops some of the genes. A gene may also appear more than once if it has several transcripts and the query returns one row per transcript. The export should be compared with the expected number of genes, and duplicates should be removed or explained before the table is used.

The query itself is the record. The dataset, the release, the filters, the attributes and the date should be saved with the export, and a query that is saved as a file can be run again on a new release to see what has changed. Sandve et al. (2013) recommended that the steps of a data retrieval be recorded so that they can be repeated, and a saved query meets that requirement.
