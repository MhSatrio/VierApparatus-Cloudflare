---
title: "Multivariate Displays and Heatmaps"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The display of many variables at once in biological data, including the scatter plot matrix for pairwise relations, the parallel coordinates plot for profiles across conditions, and the heatmap of a matrix of values coloured by magnitude, the role of ordering the rows and columns by clustering in revealing structure, the choice of a colour scale that reflects the centring of the data, and the warning that a heatmap of z-scores can exaggerate small differences in low-variance features."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a multivariate display for pairwise relations, profiles or a matrix of values and state its limits."
  - "Build a heatmap with a colour scale suited to the centring of the data and explain how row ordering affects what is seen."
references:
  - "Cleveland, W. S., & McGill, R. (1984). Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods. Journal of the American Statistical Association, 79(387), 531-554. https://doi.org/10.1080/01621459.1984.10478080"
  - "Rougier, N. P., Droettboom, M., & Bourne, P. E. (2014). Ten Simple Rules for Better Figures. PLoS Computational Biology, 10(9), e1003833. https://doi.org/10.1371/journal.pcbi.1003833"
  - "Weissgerber, T. L., Milic, N. M., Winham, S. J., & Garovic, V. D. (2015). Beyond Bar and Line Graphs: Time for a New Data Presentation Paradigm. PLOS Biology, 13(4), e1002128. https://doi.org/10.1371/journal.pbio.1002128"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Biological datasets often have many variables, such as the expression of thousands of genes across many samples, and a figure must show the structure among them. The scatter plot matrix displays every pair of variables, which is useful for a small number of variables but becomes unreadable as the number grows. The parallel coordinates plot draws each sample as a line across the variables, and it shows profiles, although it is hard to read when many lines overlap.

The heatmap displays a matrix of values as a grid of coloured cells, and it is the usual display for expression data and similar matrices. Its power depends on the ordering of the rows and columns. Clustering the rows and columns brings similar profiles together, and the resulting blocks reveal the structure of the data. The order should be stated, since an arbitrary order hides the structure and a clustered order can exaggerate it if the clustering method is chosen poorly.

The colour scale of a heatmap must match the centring of the data. A sequential scale suits values that are all positive, such as counts or intensities, while a diverging scale centred on zero suits values that can be above or below a reference, such as log fold changes. Cleveland and McGill (1984) showed that colour is read less precisely than position, so the cells should carry the values in a legend, and the scale should be stated with its limits.

A heatmap of standardised values can exaggerate small differences. Standardising each row to a common variance gives a low-variance feature the same visual weight as a high-variance one, so a trivial difference in a feature that barely varies can appear as strong as a large difference elsewhere. Weissgerber et al. (2015) argued for showing the data behind a display, and Rougier et al. (2014) advised that a display should show what it claims. The transformation and the scaling should be stated with the heatmap, and Sandve et al. (2013) recommended depositing the matrix from which it was drawn.
