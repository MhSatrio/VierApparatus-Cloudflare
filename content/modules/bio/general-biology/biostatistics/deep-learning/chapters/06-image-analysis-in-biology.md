---
title: "Image Analysis in Biology"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The application of deep learning to biological images such as microscopy of cells, histological sections and medical scans, covering segmentation of cells and nuclei, classification of tissue or morphology, the need for annotated training images and the cost of the expert labelling that produces them, the effects of differences in staining, optics and imaging batch on the performance of a network, and the measures used to compare a predicted segmentation or classification with the expert reference."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the tasks of segmentation and classification in biological imaging and the labelled data each requires."
  - "Explain how differences in staining or imaging batch can reduce a network's performance and state how to test for it."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Biological images from microscopes, histological sections and medical scans are a natural application of convolutional networks. Two tasks dominate. Segmentation assigns each pixel to a structure, such as a cell, a nucleus or a region of tissue, and classification assigns an image or a region to a category, such as a morphology or a diagnosis. LeCun et al. (2015) described how learned features outperformed designed ones on images, and biological imaging has followed this pattern for both tasks.

Training requires labelled images, and the labels are usually drawn by experts, which is slow and costly. A segmentation may require tracing every cell in an image, and disagreement between experts is common, so the reference labels themselves carry uncertainty. The number of experts, the protocol for labelling and the agreement between them should be reported, since a network cannot be more accurate than the reference it learned from.

Variation between images is a serious problem. Differences in staining protocols, microscope settings, scanners and the batch of a reagent change the appearance of the images, and a network trained on one batch may perform poorly on another. The effect can be large and it is often not visible to the eye, so the performance should be tested on images from a different batch or laboratory, and the variation between batches should be measured.

The comparison of a prediction with the reference uses overlap measures for segmentation, such as the Dice coefficient, and accuracy or area under the curve for classification. Cumming (2014) argues that these measures should be reported with their intervals across images or patients, since a mean over a few images may be unrepresentative. Sandve et al. (2013) recommended recording the imaging protocol, the labelling procedure and the preprocessing, so that the network's inputs can be reproduced.
