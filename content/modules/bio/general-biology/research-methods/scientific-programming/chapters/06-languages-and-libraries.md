---
title: "Languages and Libraries"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The choice of programming languages and libraries for scientific analysis, covering the criteria of suitability for the data types and the analysis required, the maturity and the testing of a library, its licence and its maintenance, the reliance on established statistical routines rather than reimplementation of standard methods, the pinning of library versions so that an analysis runs identically later, the trade-off between performance and readability, the interoperability of tools that allows an analysis to pass data between stages, and the reporting of the software used with its version so that others can reproduce the results."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a language and libraries for an analysis on the basis of maturity, testing, licence and suitability for the data."
  - "Pin library versions and report the software used so that the analysis can be run again with the same results."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

The choice of language and libraries shapes what an analysis can do and how reliably it can be repeated. The language should suit the data and the methods, with a community that uses it for similar work. The libraries should be mature, widely used and tested, since a statistical routine that few have checked is a risk to every result that depends on it. Peng (2011) argued that established software is preferable to bespoke code for standard procedures, because it has been examined by many users.

Reimplementing a standard method is a common source of error. A hand-written calculation of a confidence interval may differ from the established routine in its handling of edge cases, and the difference may not be visible in a simple example. Where a validated library exists, it should be used, and any custom code should be tested against it. Sandve et al. (2013) recommended that the reliance on tested components be balanced against the need for transparency in the components that are used.

Library versions change, and a change can alter a result. Pinning the version of each library in a project file means that the analysis can be run again with the same software. Cumming (2014) argues that the precision of an estimate should be reported with the method that produced it, and the software version is part of that method. A report that names the software and its version allows a reader to judge whether an apparent discrepancy arises from the code.

Performance and readability often pull in opposite directions. A fast implementation may be hard to follow, and a clear one may be slow for large data. The choice should be made by the needs of the analysis, with readability preferred unless speed is essential, and the trade-off should be recorded. Munafò et al. (2017) argued that the tools of a study are part of its methods, and reporting them completely supports the transparency on which reproducibility depends.
