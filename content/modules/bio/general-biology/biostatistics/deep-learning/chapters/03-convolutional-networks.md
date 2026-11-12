---
title: "Convolutional Networks"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Convolutional neural networks that apply the same small filter across all positions of an image or grid, the weight sharing that gives translation equivariance and reduces the number of parameters, the pooling layers that summarise local regions, the feature maps that the filters learn from data, the application to microscopy, spatial transcriptomics and other gridded biological data, and the reasons that a convolution encodes the assumption that local patterns matter regardless of their position."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a convolutional layer and explain how weight sharing reduces the number of parameters."
  - "Explain why a convolution encodes an assumption about the data and state when that assumption fails in biology."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A convolutional layer applies a small filter, a set of weights over a local patch, at every position of an image or a grid. The filter slides across the input and produces a feature map that records where its pattern occurs. Because the same filter is used at every position, the layer has far fewer parameters than a fully connected one, and it can detect a pattern wherever it appears. LeCun et al. (2015) described this weight sharing as the feature that made convolutional networks effective for images.

The filters are learned from data, so the network discovers the local patterns that are useful for its task rather than relying on designed features. Early layers tend to learn edges and textures, and deeper layers combine them into larger structures. Several filters are applied in each layer, giving a stack of feature maps, and the number and size of the filters are design choices that should be reported with the network.

Pooling layers summarise each small region of a feature map, commonly by taking its maximum or its average. Pooling reduces the spatial resolution and makes the representation more tolerant of small shifts. In biology this is useful for microscopy and for gridded data such as spatial transcriptomics, where the position of a pattern matters less than its presence, but it can also discard the fine positional information that a task needs.

A convolution encodes the assumption that local patterns carry the information and that their meaning does not depend on where they occur. This is often true of an image of cells, but it fails for a sequence where the order and the distance between elements matter. Ioannidis (2005) warned that a model whose assumptions are not tested can produce findings that do not hold, and the appropriateness of the architecture to the biology should be examined. Sandve et al. (2013) recommended recording the filter sizes, the pooling and the preprocessing, so that the features can be interpreted and repeated.
