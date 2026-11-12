---
title: "Whole-Cell Modeling"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The construction of models that represent the full set of molecular processes of a cell and simulate it through its life cycle, covering the assembly of a knowledge base from the genome, the transcriptome, the proteome and the metabolome into a set of interacting submodels for metabolism, transcription, translation, replication and cell division, the parameterisation of each submodel from measurements with their uncertainty, the integration of the submodels on a shared timescale, the validation of predicted growth, gene expression and division against independent data, the sensitivity analysis that identifies the parameters that determine each behaviour, the identification of gaps in the knowledge base where the model cannot make a prediction, and the reporting of the model, its parameters, its validation and its known gaps."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a whole-cell model integrates submodels and state the validation each prediction requires."
  - "Identify the gaps in a whole-cell knowledge base and state how they limit the predictions."
references:
  - "Karr, J. R., Sanghvi, J. C., Macklin, D. N., Gutschow, M. V., Jacobs, J. M., Bolival, B., Assad-Garcia, N., Glass, J. I., & Covert, M. W. (2012). A whole-cell computational model predicts phenotype from genotype. Cell, 150(2), 389-401. https://doi.org/10.1016/j.cell.2012.05.044"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A whole-cell model attempts to represent every process of a cell in a single simulation, so that a genotype can be connected to a phenotype through the molecular mechanisms in between. Karr et al. (2012) built such a model for a small bacterium, integrating submodels of metabolism, transcription, translation and division, and used it to predict growth and gene expression. The ambition is large, and the value of the approach depends on how honestly its predictions are validated and how clearly its gaps are stated.

The model is assembled from a knowledge base that draws on the genome, the transcriptome, the proteome and the metabolome, and the knowledge base is incomplete for every organism. Each submodel is parameterised from measurements, and each parameter carries an uncertainty that propagates into the predictions of the whole. Cumming (2014) argues that the uncertainty of each parameter should be reported with its interval, since the combined uncertainty of many parameters can be large even when each is modest.

The submodels are integrated on a shared timescale, and their interactions determine the behaviour of the whole cell. Predictions of growth, gene expression and division must be validated against independent data that were not used in parameterisation. Ioannidis (2005) described how a model that is fitted to the data it is tested on will appear to predict them, and the separation of parameterisation from validation is essential.

Sensitivity analysis identifies the parameters that determine each behaviour, and the gaps identify the processes for which the knowledge base is missing or uncertain. Both are part of an honest account of the model. Munafò et al. (2017) argued that a model of this scale should be deposited with its code, its parameters and its validation, so that the community can test and extend it. The following chapters examine the knowledge base, the submodels, the integration, the validation and the reporting.
