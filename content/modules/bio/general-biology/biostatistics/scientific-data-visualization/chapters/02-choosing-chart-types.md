---
title: "Choosing Chart Types"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The choice of chart by the structure of the data, namely the comparison of groups, the relation between two continuous variables, the change of a quantity over time, the composition of a whole, and the distribution of a variable, the reasons that a pie chart or a stacked bar chart is a poor choice for most biological comparisons, the use of a scatter plot, a line plot or a box plot for their respective tasks, and the rule that the chart should answer the question the data pose rather than display the software's default."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Select a chart type from the structure of the data and the question it answers."
  - "Explain why a stacked bar chart or a pie chart is a poor choice for comparing several biological proportions."
references:
  - "Weissgerber, T. L., Milic, N. M., Winham, S. J., & Garovic, V. D. (2015). Beyond Bar and Line Graphs: Time for a New Data Presentation Paradigm. PLOS Biology, 13(4), e1002128. https://doi.org/10.1371/journal.pbio.1002128"
  - "Rougier, N. P., Droettboom, M., & Bourne, P. E. (2014). Ten Simple Rules for Better Figures. PLoS Computational Biology, 10(9), e1003833. https://doi.org/10.1371/journal.pcbi.1003833"
  - "Cleveland, W. S., & McGill, R. (1984). Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods. Journal of the American Statistical Association, 79(387), 531-554. https://doi.org/10.1080/01621459.1984.10478080"
---

The first decision in designing a figure is the kind of chart, and it should follow from the structure of the data and the question. A comparison of groups calls for points or intervals on a common axis, a relation between two continuous variables calls for a scatter plot, a change over time calls for a line, and a distribution calls for a plot that shows the spread of the observations. Choosing the chart by the software's default, or by what is familiar, often hides the structure the reader needs.

For a comparison of several groups, a dot plot or an interval plot is generally clearer than a bar chart. Weissgerber et al. (2015) showed that bar charts of means conceal the distribution of the data, and a dot plot with the observations shows both the centre and the spread. A box plot summarises the distribution with its quartiles and extremes, and it is useful when the sample is too large to show every point, although it still hides the individual values.

A scatter plot shows the relation between two continuous variables, and it is the chart for a correlation or a regression. The points should not be joined by lines unless the order of the points is meaningful, since joined points imply a sequence that the data may not have. A line plot is appropriate for a change over time, where the order is the point, and the lines should represent the mean or the trajectory of a measured unit rather than a set of unrelated samples.

Pie charts and stacked bar charts are poor choices for most biological comparisons. Cleveland and McGill (1984) found that people judge angles and areas less accurately than lengths on a common scale, so a pie chart makes proportions hard to compare. Rougier et al. (2014) advised that a figure should be read easily, and a table or a dot plot of the proportions is generally clearer. The chart should answer the question the data pose, and the choice should be explained in the figure's legend.
