---
title: "Spatial Data and Point Patterns"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The kinds of spatial data that biology produces, namely point locations of events or organisms, areal counts for regions, and continuous measurements sampled at locations, the coordinate reference system and the distance measure that give the locations meaning, the first-order properties of a point pattern in its intensity and the second-order properties in its interactions, and the way that the sampling frame limits what a pattern can show."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Classify a spatial dataset as point, areal or continuous and choose the analysis that matches its type."
  - "Describe a point pattern by its intensity and state how the sampling frame limits the conclusions."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Legendre, P. (1993). Spatial autocorrelation: Trouble or new paradigm? Ecology, 74(6), 1659-1673. https://doi.org/10.2307/1939924"
---

Spatial data come in three main forms. Point data record the locations of discrete events or organisms, such as the nests of a bird or the cases of a disease. Areal data record counts or averages for regions with defined boundaries, such as the number of cases in each district. Continuous data are measurements taken at sampled locations that represent a surface, such as soil moisture or temperature, and the surface is estimated between the samples. The type of data determines the analysis, and mixing the types without care produces results that cannot be interpreted.

Every spatial analysis depends on a coordinate system and a distance measure. A projection that distorts distances over a large area changes the apparent clustering, and a geographic coordinate system measured in degrees has distances that vary with latitude. The coordinate reference system should be stated with the data, since the same locations in different systems give different distances and different conclusions. Wilkinson et al. (2016) set out principles under which such data should be described so that they can be found and reused.

A point pattern is described first by its intensity, which is the number of events per unit area, and whether the intensity varies across the region. Its second-order properties describe the interactions between events, such as whether events occur closer together than expected under random placement. Legendre (1993) argued that these properties are the subject of study rather than a nuisance, and the first step is to establish whether the events are distributed randomly, clustered or regularly spaced.

The sampling frame limits what a pattern can show. The region observed, the detection of events within it and the edges of the study area all affect the apparent pattern, and an event near the boundary may have neighbours outside the area that were never recorded. Sandve et al. (2013) recommended recording the region, the detection process and the coordinates, since a reader cannot judge a pattern without knowing what was observed and what was missed.
