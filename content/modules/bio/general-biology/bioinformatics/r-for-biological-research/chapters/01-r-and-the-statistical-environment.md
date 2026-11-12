---
title: "R and the Statistical Environment"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "What R is and why it is used for statistics in biology, the basic objects of the language including vectors, factors and data frames, how packages are installed and loaded, how the session and its workspace differ from a script, and how to write code that starts from a clean state and produces the same result each time it runs."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the basic objects of R, including vectors, factors and data frames, and choose the right one for a biological variable."
  - "Explain why an analysis should be run from a script in a clean session rather than from an interactive workspace."
references:
  - "Wickham, H., Averick, M., Bryan, J., Chang, W., McGowan, L., François, R., Grolemund, G., Hayes, A., Henry, L., Hester, J., Kuhn, M., Pedersen, T., Miller, E., Bache, S., Müller, K., Ooms, J., Robinson, D., Seidel, D., Spinu, V., . . . Yutani, H. (2019). Welcome to the Tidyverse. Journal of Open Source Software, 4(43), 1686. https://doi.org/10.21105/joss.01686"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

R is an environment for statistical computing and graphics, and it is built around vectors. A vector is an ordered set of values of one type, and most operations in R apply to whole vectors at once. A numerical vector of expression values can be log-transformed in a single call, and a logical vector of tests can select the values that pass. Factors represent categorical variables such as treatment and control, with a fixed set of levels, and a factor is the correct type for a grouping variable because the statistical functions treat it as a category and not as a number.

A data frame is the central object of biological analysis in R. It holds a table in which each column is a variable and each row an observation, and columns can have different types. A data frame of samples, with the treatment group, the batch and the sequencing depth of each sample, is the natural description of an experiment, and the models of the later chapters are fitted to it.

Packages add functions to R. A package is installed once and loaded in each session, and its version determines the behaviour of its functions. Wickham et al. (2019) describe the tidyverse collection of packages, which many biological analyses use for data manipulation and plotting.

R sessions keep an in-memory workspace that holds the objects created so far. An analysis run interactively can depend on objects that were created in an earlier session and are no longer in the script, so its results cannot be reproduced. The remedy is to write the analysis as a script and to run it in a fresh session, which confirms that every object used is produced by the code itself.

Sandve et al. (2013) recommended that the analysis be run from the raw data each time, and a script run in a clean session meets that recommendation.
