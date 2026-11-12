---
title: "Reporting Spatial Analyses"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a spatial analysis must contain for its maps and statistics to be interpreted and reproduced, including the data type and coordinate system, the sampling design with its grain and extent, the spatial weights or model used, the measures of autocorrelation with their significance and the number of permutations, the simulation envelopes, the uncertainty of any interpolated surface, and the deposition of the data, the coordinates and the code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the spatial information that a report must give, including the coordinate system, the grain, the extent and the weights."
  - "Report a spatial result with its significance, its uncertainty and the scale to which it applies."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A spatial result is meaningful only when the reader knows where and at what scale it was obtained. The data type, the coordinate reference system, the study region and the sampling design should be described first, with the grain and extent of the observations. Peng (2011) argued that a result must be reproducible from the means of producing it, and for a spatial result these means include the coordinates, the projection and the boundaries used.

The statistics should be reported with their assumptions. The spatial weights or the model, the neighbour definition, the distance threshold and the edge correction should all be stated, since each changes the value obtained. Measures of autocorrelation should be reported with their expected values, their significance and the number of permutations or simulations used, together with the seed of any random procedure. A simulation envelope should be described by the model that generated it.

An interpolated surface must be reported with its uncertainty. The variogram model, the prediction method and a map of the prediction variance show where the surface can be relied upon, and a surface without its uncertainty suggests a precision that the samples do not support. Cumming (2014) argues that estimates should be reported with their intervals, and for a surface the interval is a map as well as a number.

The data, the coordinates and the code should be deposited with identifiers. Wilkinson et al. (2016) set out principles under which such data should be findable and reusable, and Sandve et al. (2013) recommended keeping the inputs, the steps and the outputs together, so that a map can be regenerated and its analysis checked by others.
