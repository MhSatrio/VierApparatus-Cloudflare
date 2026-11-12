---
title: "Metadata and Standards"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The description of research data by metadata and standards so that they can be understood and reused, covering the distinction between descriptive metadata that identifies a dataset, structural metadata that describes how its parts relate, and administrative metadata that records its provenance, rights and access, the use of controlled vocabularies and ontologies that give shared meaning to terms, the documentation of each variable with its definition, unit, coding and missing-value convention, the use of standard file formats that are open and widely supported, the data dictionary that accompanies a dataset, and the recording of the instrument settings and calibration that determine the values."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a data dictionary that defines each variable with its unit, coding and missing-value convention."
  - "Select controlled vocabularies and open file formats that allow a dataset to be interpreted by others."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3, 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Metadata are the information that makes a dataset interpretable. Descriptive metadata identify the dataset and its subject, structural metadata describe how its tables or files relate to one another, and administrative metadata record its provenance, its rights and the conditions of access. Wilkinson et al. (2016) argued that rich metadata are the first requirement of findable and reusable data, and a dataset without them is difficult to use even when its values are correct.

A data dictionary is the most useful form of metadata for a tabular dataset. For each variable it states the definition, the unit, the coding of categories and the convention for missing values. A value of minus 999 that means missing, or a category coded as 1 in one file and 0 in another, is a common source of error when data are reused. Peng (2011) argued that the meaning of the data must be recoverable from the materials that accompany them, and the dictionary provides this recovery.

Controlled vocabularies and ontologies give shared meaning to the terms used in the data. A species, a tissue or a method named from a standard list can be matched across datasets, whereas free text cannot. Choosing these terms during data collection is far easier than translating them afterwards, and the choice should be documented with the version of the vocabulary used.

File formats should be open, documented and widely supported, so that the data remain readable as software changes. Proprietary formats can become unreadable when their software is discontinued. The instrument settings and calibration that determine the values should also be recorded, since a measurement cannot be compared with another without them. Cumming (2014) argues that the precision of each measurement depends on these conditions, and the metadata should allow a reader to judge that precision.
