---
title: "Deep Learning"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Neural networks with many layers of learned transformations for biological data, covering the layers and activation functions of a feedforward network, backpropagation as the gradient method that trains the weights, convolutional networks for images and spatial data, recurrent and attention-based models for sequences, training with regularisation and early stopping, the use of deep learning in image analysis of tissues and cells, the difficulty of interpreting and validating these models, and the reporting needed for their results to be reproduced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a feedforward neural network and explain how backpropagation trains its weights."
  - "State the validation and reporting that a deep learning result needs before its performance can be trusted."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

Deep learning uses neural networks with many layers, each of which transforms its input into a new representation that the next layer can use. The representations are learned from data rather than designed by hand, and this has made it possible to work directly with images, sequences and high-dimensional measurements. LeCun et al. (2015) described how the layered representations allow the network to build features from simple to complex, and the same principle underlies the models used in biology.

The topic begins with the basic network, a set of layers of weighted sums passed through non-linear activation functions. The network is trained by adjusting its weights to reduce a loss that measures the error of its predictions, and the training uses the gradient of the loss with respect to each weight. Backpropagation computes these gradients efficiently by passing the error backwards through the layers, and it is the method that makes training large networks feasible.

The later chapters consider the architectures used for specific data. Convolutional networks share weights across the positions of an image or a spatial grid, which suits microscopy and other spatial data. Recurrent and attention-based models handle sequences, such as DNA and protein sequences, where the context of each element matters. Each architecture encodes an assumption about the structure of the data, and the choice should follow the structure of the biology.

Deep networks have many parameters and can fit training data very closely, so their validation is essential. Ioannidis (2005) described how flexible analysis and selective reporting produce findings that do not hold, and a network trained and tested on a single dataset is open to the same flaw. Peng (2011) argued that such results must be reproducible from the code and the data, and Cumming (2014) argues that their performance should be reported with its precision. Sandve et al. (2013) recommended recording the architecture, the training procedure and the data so that the results can be repeated.
