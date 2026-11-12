---
title: "Packages and Environments"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How R packages are installed from repositories, why package versions can change the results of an analysis, the use of environment management tools to fix the versions used for a project, the recording of session information and the way Bioconductor releases tie package versions to a version of R."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a change in the version of an R package can change the output of an analysis."
  - "Record the session information and the package versions needed to reproduce an analysis, and explain how Bioconductor release versions help."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Huber, W., Carey, V. J., Gentleman, R., Anders, S., Carlson, M., Carvalho, B. S., Bravo, H. C., Davis, S., Gatto, L., Girke, T., Gottardo, R., Hahne, F., Hansen, K. D., Irizarry, R. A., Lawrence, M., Love, M. I., MacDonald, J., Obenchain, V., Oleś, A. K., . . . Morgan, M. (2015). Orchestrating high-throughput genomic analysis with Bioconductor. Nature Methods, 12(2), 115-121. https://doi.org/10.1038/nmeth.3252"
---

An R package is installed from a repository, and the version installed on a given day depends on when it was installed. Two researchers who run the same script with different versions of a package can obtain different results, either because a default has changed or because a bug has been fixed. Sandve et al. (2013) listed the recording of software versions as a basic requirement of reproducible computation, and Peng (2011) made the same argument for computational science in general.

Environment management tools address the problem. A project environment holds a fixed set of package versions, separate from the system installation and from other projects, and a lock file records the exact versions so that the environment can be recreated. The tools make it possible to restore the environment of an old analysis, which a fresh installation of the current packages cannot guarantee.

Session information is a record of the state of the R session at the time of analysis. It lists the version of R, the operating system, the packages loaded and their versions. Including it in the output of an analysis makes the environment visible to the reader, and it is a short addition to a report.

Bioconductor ties its packages to release versions of R. Each Bioconductor release works with a particular version of R, and mixing packages from different releases is a frequent source of errors. The Bioconductor project releases its packages in cycles tied to versions of R, and using a single release for an analysis keeps the packages consistent with one another.

The practical rule is to fix the versions for each project, record them and rerun the analysis in a fresh environment before it is shared.
