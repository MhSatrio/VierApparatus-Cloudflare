---
title: "Validating Structural Results"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a structural result, whether a comparison, a model, a classification or a predicted site, is validated before it is claimed, including the checks of geometry and stereochemistry, the comparison with the data a model was not built from, the sensitivity of a result to the template or the reference set and the independent evidence needed to confirm a structural claim."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the checks a structural model or comparison must pass before its result is reported."
  - "Explain why a structural result that depends on a single template or reference set is weaker than one that holds across alternatives."
references:
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Šali, A., & Blundell, T. L. (1993). Comparative protein modelling by satisfaction of spatial restraints. Journal of Molecular Biology, 234(3), 779-815. https://doi.org/10.1006/jmbi.1993.1626"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A structural result is a claim about shape, and it must be validated like any other claim. A model may have correct overall geometry and a wrong region, a comparison may depend on the choice of reference set, and a predicted binding site may be an artefact of the surface analysis. The checks of this chapter are the means of finding these problems before the result is reported.

The first check is the geometry. The bond lengths, angles and the conformations of the residues of a model should lie within the ranges observed in experimental structures. The checks are standard, and a model that fails them has errors that no comparison will reveal. Berman (2000) describes the experimental structures against which such ranges are established.

The second check is the comparison with data that the result was not built from. A model can be tested against the known positions of residues that were excluded from its construction, and a comparison can be tested by applying it to a set of pairs whose relationship is known. Platt (1964) recommended tests that discriminate between the result and its alternatives, and an independent test is the strongest form of this.

The third check is sensitivity. A structural result that depends on one template or one reference set is weaker than one that holds across several. A model built from different templates should give similar regions, and a comparison repeated with different reference sets should give the same relationship. A result that changes when a single input is changed is not robust.

The fourth check is independent evidence. A binding site predicted from the surface must be tested by mutation or by a binding measurement, and a relationship claimed from a comparison must be supported by sequence, function or experiment where possible. Sandve et al. (2013) recommended recording the checks, since a structural result that has passed them can be trusted in proportion to the checks it has passed.
