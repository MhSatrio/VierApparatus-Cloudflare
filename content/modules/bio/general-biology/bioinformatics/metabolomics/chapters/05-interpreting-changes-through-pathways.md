---
title: "Interpreting Changes Through Pathways"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the metabolites that change are placed onto metabolic pathways and their enrichment tested, the mapping of identifiers between metabolite databases and pathway resources, the problem that a pathway can look altered when its metabolites are simply well measured or well annotated, the difference between a change in a metabolite's level and a change in the flux through the pathway, and the cautions needed before a pathway is claimed to be active."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Place a list of changed metabolites onto pathways and test their enrichment against a background of measured metabolites."
  - "Explain why a change in a metabolite level does not establish a change in the flux through its pathway."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Wishart, D. S., Feunang, Y. D., Marcu, A., Guo, A. C., Liang, K., Vázquez-Fresno, R., Sajed, T., Johnson, D., Li, C., Karu, N., Sayeeda, Z., Lo, E., Assempour, N., Berjanskii, M., Singhal, S., Arndt, D., Liang, Y., Badran, H., Grant, J., . . . Scalbert, A. (2018). HMDB 4.0: the human metabolome database for 2018. Nucleic Acids Research, 46(D1), D608-D617. https://doi.org/10.1093/nar/gkx1089"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Metabolites are placed onto pathways to ask whether a process is altered. Alberts et al. (2022) describe the central metabolic pathways, glycolysis, the citric acid cycle and the synthesis of amino acids and lipids, and the metabolites of each are the members of a pathway set. A test of enrichment asks whether the changed metabolites are concentrated in one pathway more than chance allows, using the measured metabolites as the background, in the same way that gene sets are tested in transcriptomics.

The mapping of metabolites to pathways depends on identifiers, and the same metabolite may have different identifiers in different databases. Wishart et al. (2018) describe a reference database with its own identifiers, and the conversion between identifiers must be checked. A metabolite with no mapping drops out of the pathway test, and the number unmapped should be reported, since it limits what the test can show.

A pathway can look altered for reasons that are not biological. A pathway whose metabolites are well measured and well annotated will be tested with more power than one whose metabolites are poorly detected, and a pathway whose members are common in the reference database will be more easily matched. The background of measured metabolites corrects for some of this, but not all, and the result must be read with the detection of each pathway in mind.

A change in the level of a metabolite is not a change in the flux through its pathway. The level depends on both the rate at which it is made and the rate at which it is consumed, and a pathway can carry more flux with the same level. Ioannidis (2005) described how a result that is read beyond its evidence overstates its meaning, and a claim about flux requires measurements of flux, such as labelled tracers, rather than the levels alone.

The pathways tested, the background, the mapping and the number of metabolites unmapped should be reported with the enrichment, and the claim about flux should be kept separate from the claim about levels.
