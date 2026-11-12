---
title: "Identification Against Libraries"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How metabolites are identified by searching measured spectra against reference libraries and databases, the use of accurate mass to restrict the candidate formulas, the scoring of fragment spectra against library spectra, the coverage gaps of the libraries and the handling of unknown features that match nothing, with the reasons the search settings must be fixed and reported."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Use accurate mass to restrict candidate formulas and explain why a mass alone leaves several candidates."
  - "Score a measured fragment spectrum against a library spectrum and report the match with its settings."
references:
  - "Wishart, D. S., Feunang, Y. D., Marcu, A., Guo, A. C., Liang, K., Vázquez-Fresno, R., Sajed, T., Johnson, D., Li, C., Karu, N., Sayeeda, Z., Lo, E., Assempour, N., Berjanskii, M., Singhal, S., Arndt, D., Liang, Y., Badran, H., Grant, J., . . . Scalbert, A. (2018). HMDB 4.0: the human metabolome database for 2018. Nucleic Acids Research, 46(D1), D608-D617. https://doi.org/10.1093/nar/gkx1089"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Identification by library search compares a measured spectrum with the spectra of reference compounds and ranks the references by their similarity. The comparison is a scoring problem of the kind met in sequence search, in which the best match is only meaningful against the scores expected by chance. Altschul et al. (1990) introduced the framework for judging such scores in sequence comparison, and the same logic, a comparison of a measurement with references and an assessment of how far the best match stands above the rest, applies to spectra.

Accurate mass narrows the candidates before the spectra are compared. A measured mass can be explained by a limited set of molecular formulas within a given tolerance, and the formula restricts the library entries that can match. A tighter tolerance removes more candidates, but a feature whose mass is measured imprecisely may then lose its true match. The tolerance must match the accuracy of the instrument, and it should be reported.

The fragment spectrum gives the more specific evidence. The fragments observed depend on the structure of the molecule, and a library match on several fragments is far more convincing than a match on the parent mass alone. Scoring methods weigh the fragments by their intensity and by the agreement of their masses, and the score is then ranked among the library entries.

The libraries are incomplete. A metabolite that is not in the reference set cannot be identified, however good the measurement, and an unknown feature that matches nothing is a result in itself. It should be reported as unknown rather than forced onto the nearest entry, which would be a false identification.

Sandve et al. (2013) recommended recording the parameters of an analysis, and the library version, the mass tolerance, the scoring rule and the threshold for a match determine the identifications that the search can make.
