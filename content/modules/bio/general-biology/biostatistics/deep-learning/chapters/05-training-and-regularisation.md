---
title: "Training and Regularisation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The practical control of overfitting in deep networks, including weight decay as a penalty on the size of the weights, dropout as the random removal of units during training, data augmentation that creates new training examples by transformations that preserve the label, early stopping at the point of best validation performance, and batch normalisation of the activations, together with the reasons that each technique must be tuned on validation data and reported with its settings."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe weight decay, dropout, data augmentation and early stopping and state the overfitting each one addresses."
  - "Use a validation set to choose the strength of a regularisation technique and report the settings used."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A deep network has so many parameters that it can memorise its training data, and regularisation is the set of techniques that prevent this. Weight decay adds a penalty on the size of the weights, which shrinks them towards zero in the same way that a penalty shrinks the coefficients of a regression. It is simple to apply, and it encourages smoother functions that generalise better.

Dropout randomly sets a fraction of the units to zero at each training step, so that the network cannot rely on any single unit and must learn redundant representations. At prediction time all units are used, with their outputs scaled to match. LeCun et al. (2015) described dropout and related methods as effective ways of reducing the variance of large networks, and the fraction dropped is a setting that must be tuned.

Data augmentation creates new training examples by transformations that keep the label unchanged, such as rotations or flips of an image, or small perturbations of a measurement. It increases the effective size of the training set and teaches the network the invariances that the biology permits. The transformations must be chosen with the biology in mind, since a rotation that changes the meaning of a sample will mislead the network, and the augmentation applied should be recorded.

Early stopping ends training when the performance on a validation set stops improving, and it uses the validation set to choose the number of training steps. Ioannidis (2005) described how repeated choice among settings inflates the apparent performance, and the final test set must remain untouched by these decisions. Sandve et al. (2013) recommended recording the penalty, the dropout rate, the augmentation and the stopping rule, since each changes the result and none of them can be recovered from the trained model alone.
