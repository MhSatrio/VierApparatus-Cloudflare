---
title: "Image Analysis and Quantification"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How microscopy images are processed and measured, the settings that must be fixed across a dataset, the segmentation of structures, the blinded and automated counting methods and the reporting needed for an image-based result to be reproducible."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a workflow for quantifying images that keeps processing identical across samples."
  - "Explain how bias enters image analysis and how blinding and automation reduce it."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A microscopy image becomes a measurement only after it is processed and analysed, and each step can change the result. Background subtraction, contrast adjustment, deconvolution and thresholding are all useful, but each can alter the intensity and the shape of structures. The same processing must be applied to every image in a comparison, and the parameters must be recorded. An image that is adjusted differently for each sample cannot be compared with another, however good it looks.

Segmentation identifies the structures to be measured. Thresholding separates bright objects from the background, and the choice of threshold determines the size and number of objects counted. Automated segmentation is consistent but may fail on unusual specimens, and manual segmentation is flexible but subject to the bias of the person doing it. The method should be validated by comparing its output with manual measurement on a subset.

Bias enters image analysis in several ways. The analyst who knows the treatment may choose a threshold that favours the expected result, or may exclude cells that do not fit the expectation. Blinding the analyst to the treatment, and fixing the analysis before the images are examined, remove most of this bias. Platt (1964) recommended designs that test alternatives decisively, and blinded analysis is the image analogue of that principle.

Ioannidis (2005) described the consequences of flexible analysis, in which the method is adjusted until a result appears. The analysis plan should be written before the images are measured, and any change should be reported with its reason.

The reporting of image analysis must include the software and its version, the processing steps, the segmentation parameters, the number of cells or fields analysed and the statistical method. With these, another group can repeat the analysis on the same images. Alberts et al. (2022) describe the cellular structures that such analyses quantify. Images themselves should be archived with their metadata, so that the analysis can be checked later.
