---
title: "Exporting Views and Reproducible Figures"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a view from a genome browser is exported as an image or a session, how the export records the assembly, release, tracks and zoom that produced it, the difference between a screenshot and a reproducible figure, and how a figure built from browser data is regenerated from a script with its inputs recorded."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Export a genome browser view together with the information needed to reproduce it."
  - "Explain why a screenshot is not a reproducible figure and how a scripted figure avoids the problem."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Robinson, J. T., Thorvaldsdóttir, H., Winckler, W., Guttman, M., Lander, E. S., Getz, G., & Mesirov, J. P. (2011). Integrative genomics viewer. Nature Biotechnology, 29(1), 24-26. https://doi.org/10.1038/nbt.1754"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Genome browsers allow a view to be exported as an image, and most also allow the session to be saved, which records the tracks and the region. An image is convenient, but it records only what was drawn. It does not record the assembly, the release, the track settings or the data source behind each track, so a reader cannot tell from it what was shown or check it against the data. Peng (2011) argued that a computational figure should be reproducible from its inputs, and a screenshot alone does not meet that standard.

A session file or an exported view with its metadata is closer to a record. It names the assembly and the release, the tracks and their versions, the region and the zoom. Robinson et al. (2011) describe a viewer in which the tracks and their data sources are set explicitly, and the same details are needed to reconstruct a view from a browser.

A reproducible figure is produced by a script. The script reads the data files, applies the same settings each time and draws the figure from the data rather than from a screen. The figure can then be regenerated when the data or the release changes, and a change in the output can be traced to a change in the input.

The record for a figure should list its inputs: the release of each annotation, the assembly, the query or export that produced each data file and the script that draws the figure. Sandve et al. (2013) recommended that the scripts and inputs behind each figure be kept together, and a figure built this way can be checked by someone who was not present at its creation.

The practical rule is to export the data, not only the picture. A figure drawn from an exported table with a stated release can be redrawn at any time, while a screenshot can only be displayed.
