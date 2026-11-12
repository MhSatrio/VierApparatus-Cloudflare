---
title: "Variograms and Kriging"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The variogram as a function of distance that records half the average squared difference between pairs of observations, its components of nugget, sill and range that describe measurement error, the spatial scale of dependence and the total variance, the fitting of a model to the empirical variogram, and kriging as the best linear unbiased prediction of a value at an unsampled location, together with the prediction variance that shows where the surface is uncertain."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the empirical variogram and interpret its nugget, sill and range."
  - "Explain how kriging predicts a value at an unsampled location and why its prediction variance matters."
references:
  - "Legendre, P. (1993). Spatial autocorrelation: Trouble or new paradigm? Ecology, 74(6), 1659-1673. https://doi.org/10.2307/1939924"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

The variogram describes how the dissimilarity between observations changes with the distance that separates them. For each pair of locations at a given distance, half the squared difference of their values is averaged, and the result is plotted against distance. At short distances the values are similar and the variogram is low, and as the distance grows the values become less related and the variogram rises towards a plateau. The shape of this curve summarises the spatial dependence of the surface.

The variogram has three features. The nugget is the value at zero distance, and it reflects measurement error and variation at scales smaller than the sampling. The sill is the plateau, approximately equal to the total variance of the values. The range is the distance at which the plateau is reached, beyond which observations are effectively independent. A model is fitted to the empirical variogram to give these parameters, and the fitted range defines the scale over which the surface is correlated.

Kriging uses the fitted variogram to predict the value at a location where none was measured. It is the best linear unbiased predictor, weighting the observed values by their spatial relation to the target, so that nearby samples carry more weight. The method also gives a prediction variance at each location, which is low near the samples and high far from them. Legendre (1993) emphasised that the interpolated surface is a model, and the prediction variance is needed to show where the surface should not be trusted.

Cumming (2014) argues that an estimate should be reported with its interval, and a kriged map should be accompanied by a map of its uncertainty. The variogram model, its parameters and the prediction method should be stated, since a surface produced with a different model may look quite different even from the same samples.
