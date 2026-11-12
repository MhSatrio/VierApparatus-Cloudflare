---
title: "Navigating a Region"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a genomic region is found by a gene name or a coordinate, how the tracks of a genome browser are read from the top down, how the zoom levels show sequence and feature detail, how the evidence tracks behind a gene model are interpreted and how a track that is hidden or collapsed can change what a reader concludes from a view."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Find a gene by name and by coordinate and move through the region at several zoom levels."
  - "Read the evidence tracks behind a gene model and state which kinds of evidence support its exons."
references:
  - "Robinson, J. T., Thorvaldsdóttir, H., Winckler, W., Guttman, M., Lander, E. S., Getz, G., & Mesirov, J. P. (2011). Integrative genomics viewer. Nature Biotechnology, 29(1), 24-26. https://doi.org/10.1038/nbt.1754"
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
---

A genome browser opens on a region that may be a gene name, an identifier or a coordinate range. Typing a gene symbol moves the view to the gene, but the symbol may match more than one gene in a species, so the browser's list of results must be checked before the view is trusted. A coordinate range gives an exact region, and it is the form used in most analyses because it is unambiguous once the assembly is known.

The tracks are read from the top down. The sequence and the coordinate ruler sit at the top, then the gene models, then the evidence that supports them and the variation and regulatory tracks below. Robinson et al. (2011) describe a viewer that displays a set of tracks in this way, with the aligned reads beneath the annotation, and the same layout is used by the genome browsers. The reader should look at the evidence before the model, since a gene model is a claim and the evidence is what supports it.

Zoom changes the detail shown. At the scale of a whole chromosome, the browser shows genes as blocks. At the scale of a few kilobases, it shows exons, and at the scale of a few dozen bases, it shows the sequence itself. A conclusion about the exact boundary of an exon must be drawn at the finest scale, not from the block view.

The evidence behind a gene model comes from several sources. Cunningham et al. (2022) describe how Ensembl uses transcripts, proteins and experimental data to build its models, and a gene supported by many independent sources is more reliable than one supported by a prediction alone. The evidence track shows which of these sources agree with each exon.

Tracks can be hidden, collapsed or set to a display that hides detail. A view that shows only the collapsed gene track may hide an alternative transcript or a variant, so the track settings are part of the record of a view and should be reported.
