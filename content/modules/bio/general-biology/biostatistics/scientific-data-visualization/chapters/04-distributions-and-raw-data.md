---
title: "Distributions and Raw Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The display of the distribution of a variable and of the individual observations behind a summary, including the strip plot and the beeswarm plot that show every point, the violin plot and the density plot that show the shape of the distribution, the histogram and its sensitivity to the choice of bin width, the box plot with its quartiles and its whiskers, and the principle that the raw observations should be visible wherever the sample size makes it possible."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a display that shows the distribution of a variable and the individual observations for a sample of a given size."
  - "Explain why two samples with the same mean and standard deviation can have very different distributions and how a figure reveals this."
references:
  - "Weissgerber, T. L., Milic, N. M., Winham, S. J., & Garovic, V. D. (2015). Beyond Bar and Line Graphs: Time for a New Data Presentation Paradigm. PLOS Biology, 13(4), e1002128. https://doi.org/10.1371/journal.pbio.1002128"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Rougier, N. P., Droettboom, M., & Bourne, P. E. (2014). Ten Simple Rules for Better Figures. PLoS Computational Biology, 10(9), e1003833. https://doi.org/10.1371/journal.pcbi.1003833"
---

A summary of a sample, such as its mean or its median, can describe very different data. Two samples may have the same mean and standard deviation while one is symmetric and the other has two peaks, or while one contains a few extreme values and the other has none. Weissgerber et al. (2015) demonstrated this with biological examples, and their point is that a figure of a summary alone cannot show the distribution the summary stands for.

For small samples, every observation can be shown. A strip plot places each point along a line, with small horizontal offsets to separate points that share a value, and a beeswarm plot arranges the points so that they do not overlap. These displays show the sample size, the gaps and the outliers, and they allow a reader to see the data that the summary conceals. Rougier et al. (2014) advised that a figure should show the data rather than an impression of them, and the individual points are the most direct form of this.

For larger samples, the shape of the distribution is shown by a density plot or a violin plot, which draws the smoothed distribution along the axis. The smoothing depends on a bandwidth, and a different bandwidth can change the apparent number of peaks, so the bandwidth should be stated. A histogram is a coarser alternative whose appearance depends on the bin width, and a reader should be able to see the effect of that choice.

The box plot summarises the quartiles, the median and the extent of the data, and it is useful for comparing many groups. It hides the distribution within the box, and it should be accompanied by the points when the sample is small enough. Cumming (2014) argues that the raw data are the foundation of an estimate, and a figure that omits them when it could show them asks the reader to trust a summary they cannot check.
