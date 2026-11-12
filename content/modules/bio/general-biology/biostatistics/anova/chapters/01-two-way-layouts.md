---
title: "Two-Way Layouts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The two-way layout of an experiment with two factors, each with several levels, the cells of the design and their replicates, the partition of the variation into two main effects, an interaction and the residual, the sums of squares and mean squares of each term and the F tests that compare each term with the residual, with the reasons a balanced design makes the partition clear."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Set out a two-way design as a table of cells and state the replicates needed in each cell."
  - "Partition the variation of a balanced two-way experiment into two main effects, the interaction and the residual."
references:
  - "Nelder, J. A., & Wedderburn, R. W. M. (1972). Generalized linear models. Journal of the Royal Statistical Society. Series A (General), 135(3), 370-384. https://doi.org/10.2307/2344614"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A two-way design crosses two factors, so that every combination of their levels forms a cell of the experiment. A study of the response of two genotypes to three doses of a drug has six cells, and the design is balanced if each cell has the same number of replicates. The replicates within a cell measure the residual variation, the noise against which the effects are judged, and their number determines the power of every test in the design.

The variation of the data is partitioned into four parts. The first main effect is the variation of the means of the levels of the first factor around the overall mean, the second main effect is the same for the second factor, the interaction is the remaining variation of the cell means that the two main effects cannot explain, and the residual is the variation of the replicates within the cells. Each part has a sum of squares, and dividing by its degrees of freedom gives a mean square. For a balanced design the partition is exact, which is what makes the tests of each term clear.

Each term is tested against the residual. The ratio of a term's mean square to the residual mean square is an F statistic, and its p-value is read from the F distribution with the degrees of freedom of the term and of the residual. Nelder and Wedderburn (1972) describe the linear model that underlies this partition, and the same logic applies to any number of factors.

The design must be reported in full. The number of levels of each factor, the number of replicates in each cell and any missing cells should be given, since an unbalanced or incomplete design changes the partition and the interpretation of the main effects. Sandve et al. (2013) recommended recording the design and the model, and the table of cells is the record of the design.
