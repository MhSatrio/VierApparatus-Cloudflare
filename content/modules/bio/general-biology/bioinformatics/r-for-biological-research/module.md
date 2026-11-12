---
title: "R for Biological Research"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Statistical analysis and visualisation of biological data in R, covering the data frame and tidy data, the grammar of graphics for figures, the Bioconductor project for genomic data, the statistical models used for count data and multiple testing, and the packaging and reporting of R analyses so that they can be reproduced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Organise a biological dataset as a tidy data frame and summarise it with the tools of the tidyverse."
  - "Use a Bioconductor package to analyse a genomic dataset and explain how its statistical model handles count data and multiple testing."
references:
  - "Wickham, H., Averick, M., Bryan, J., Chang, W., McGowan, L., François, R., Grolemund, G., Hayes, A., Henry, L., Hester, J., Kuhn, M., Pedersen, T., Miller, E., Bache, S., Müller, K., Ooms, J., Robinson, D., Seidel, D., Spinu, V., . . . Yutani, H. (2019). Welcome to the Tidyverse. Journal of Open Source Software, 4(43), 1686. https://doi.org/10.21105/joss.01686"
  - "Gentleman, R. C., Carey, V. J., Bates, D. M., Bolstad, B., Dettling, M., Dudoit, S., Ellis, B., Gautier, L., Ge, Y., Gentry, J., Hornik, K., Hothorn, T., Huber, W., Iacus, S., Irizarry, R., Leisch, F., Li, C., Maechler, M., Rossini, A. J., . . . Zhang, J. (2004). Bioconductor: open software development for computational biology and bioinformatics. Genome Biology, 5(10), R80. https://doi.org/10.1186/gb-2004-5-10-r80"
  - "Huber, W., Carey, V. J., Gentleman, R., Anders, S., Carlson, M., Carvalho, B. S., Bravo, H. C., Davis, S., Gatto, L., Girke, T., Gottardo, R., Hahne, F., Hansen, K. D., Irizarry, R. A., Lawrence, M., Love, M. I., MacDonald, J., Obenchain, V., Oleś, A. K., . . . Morgan, M. (2015). Orchestrating high-throughput genomic analysis with Bioconductor. Nature Methods, 12(2), 115-121. https://doi.org/10.1038/nmeth.3252"
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
  - "Robinson, M. D., McCarthy, D. J., & Smyth, G. K. (2010). edgeR: a Bioconductor package for differential expression analysis of digital gene expression data. Bioinformatics, 26(1), 139-140. https://doi.org/10.1093/bioinformatics/btp616"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

R is a language designed for statistics and graphics, and it is the usual choice for the statistical side of biological data analysis. Its strength lies in its packages, which implement the statistical methods used in genomics and in the visual exploration of results. This topic teaches R as it is used in biology: organising data, summarising it, fitting models, producing figures and working with the Bioconductor packages for high-throughput data.

The chapters begin with the tidy data model, in which each variable is a column and each observation a row, which makes summaries and figures straightforward. The grammar of graphics is used to build figures from layers of data, and Bioconductor provides the classes and methods for the genomic data that are too large or too complex for base R.

A central example is differential expression, the comparison of gene expression between conditions. The statistical models for count data, implemented in DESeq2 and edgeR, differ from the simple tests of the previous topic, and they account for the variance of counts and for the number of samples in each group. Love et al. (2014) and Robinson et al. (2010) describe the two most widely used approaches.

The topic ends with the reporting of R analyses. Packages change between versions, so the environment must be recorded, and the analysis should be scripted from the raw data to the final figure. Sandve et al. (2013) provide the general rules that these practices apply.
