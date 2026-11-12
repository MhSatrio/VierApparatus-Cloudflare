---
title: "Data Frames and Tidy Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The tidy data principles for organising biological measurements, with each variable in a column and each observation in a row, how the tidyverse functions select, filter, reshape and summarise data frames, how a wide table of sample measurements is converted to a long table and how grouped summaries are computed correctly."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Reshape a wide table of expression values into a tidy long table with one row per gene and sample."
  - "Compute grouped summaries of a biological dataset and check that each group contains the expected number of observations."
references:
  - "Wickham, H., Averick, M., Bryan, J., Chang, W., McGowan, L., François, R., Grolemund, G., Hayes, A., Henry, L., Hester, J., Kuhn, M., Pedersen, T., Miller, E., Bache, S., Müller, K., Ooms, J., Robinson, D., Seidel, D., Spinu, V., . . . Yutani, H. (2019). Welcome to the Tidyverse. Journal of Open Source Software, 4(43), 1686. https://doi.org/10.21105/joss.01686"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

A biological dataset is easiest to analyse when it is tidy. In a tidy table, each variable is a column, each observation is a row and each type of observational unit forms its own table. A table of expression values in which each sample is a column is wide, and a grouping by treatment requires the wide form to be reshaped. The long form, with one row for each gene in each sample and columns for the gene, the sample, the treatment and the value, is the form in which most functions of the tidyverse operate. Wickham et al. (2019) describe the packages that implement these operations.

The verbs of data manipulation select the columns, filter the rows, create new variables, arrange the rows and summarise the groups. Each verb takes a data frame and returns a new one, so a sequence of verbs can be written as a pipeline that reads in the order in which the steps are performed. The pipeline is also a record of the analysis, which helps reproducibility.

Grouped summaries are a frequent source of error. A mean computed by treatment is correct only if the grouping is applied to the observations and the counts are checked, and a group with an unexpected number of observations usually indicates a join or a filter that has removed or duplicated rows. The check is simple: count the rows in each group before and after the operation and compare them with the design of the experiment.

Taschuk and Wilson (2017) recommended testing data manipulation steps on small inputs, and a grouped summary of a few invented samples whose answer is known provides such a test.

Alberts et al. (2022) describe the biological variables, such as genes, cell types and conditions, that these tables record, and a tidy table makes those variables explicit in a way that a spreadsheet of mixed layouts often does not.
