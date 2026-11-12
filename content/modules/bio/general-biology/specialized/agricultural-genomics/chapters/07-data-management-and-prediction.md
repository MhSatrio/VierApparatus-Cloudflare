---
title: "Data Management and Prediction"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The management of the genotypic, phenotypic and environmental data that agricultural genomics combines, covering the linking of genotypes to field records through unique identifiers and metadata, the handling of missing data and the errors in records, the storage and versioning of the data so that analyses can be repeated, the use of environmental covariates such as weather and soil in prediction models, the validation of prediction models on data from new seasons and sites, and the sharing of data under the standards that allow breeders and researchers to reuse them."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how genotypic, phenotypic and environmental records are linked and state the errors that a poor link introduces."
  - "Explain how environmental covariates are used in a prediction model and state why the model must be validated on new seasons and sites."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Agricultural genomics combines three kinds of data: the genotypes of plants, their phenotypes in the field, and the environmental conditions of each trial. Each must be linked to the others through unique identifiers, and the link is the foundation of every analysis. A mismatch between a genotype and a field record, which may arise from a labelling error, produces a false association that is hard to detect, and the linking procedure must be checked.

Records contain missing values and errors, and the handling of these affects the analysis. Missing phenotypes may reflect a failed plot or a harvest loss, and their absence may be related to the trait, so they cannot always be ignored. The errors should be detected by checks on the range and the consistency of the data, and the handling of missing and erroneous records should be reported.

The data must be stored and versioned so that an analysis can be repeated and its results reproduced. A change to the records after an analysis has been run changes the results, and the version used must be recorded with the analysis. Sandve et al. (2013) recommended that the inputs of an analysis be kept with its outputs, and this is essential when the data are revised.

Environmental covariates, such as rainfall, temperature and soil properties, are used in prediction models to account for the effect of the environment and to predict performance in new environments. The covariates must be measured or estimated for each trial, and their uncertainty must be considered. A model that uses covariates may predict well in environments similar to those it was trained on and poorly in others, and its validation on new seasons and sites is essential. Ioannidis (2005) described how a model validated only on the environments that trained it may overstate its usefulness, and Cumming (2014) argues that the predictions should be reported with their intervals across environments.
