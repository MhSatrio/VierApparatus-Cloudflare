---
title: "Neural Network Layers"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The structure of a feedforward neural network as a sequence of layers, each computing weighted sums of its inputs plus a bias and passing them through a non-linear activation function, the role of the activation functions such as the sigmoid, the hyperbolic tangent and the rectified linear unit in allowing the network to represent complex relations, the universal approximation property that guarantees representational power but not learnability, and the choice of width and depth as settings that trade fit against overfitting."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the computation performed by one layer of a feedforward network and the role of its activation function."
  - "Explain why non-linear activations are needed and state how width and depth change the fit and the risk of overfitting."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A feedforward neural network is a sequence of layers. Each layer receives a vector of inputs, computes a weighted sum of them for each of its units, adds a bias, and passes the result through an activation function. The output of one layer is the input of the next, and the final layer produces the prediction. The weights and biases are the parameters that training adjusts, and a layer with many units has many parameters even when its structure is simple.

The activation function introduces the non-linearity that gives the network its power. Without it, a stack of layers would reduce to a single linear map, which could not represent the curved relations found in biology. The sigmoid and the hyperbolic tangent squash their inputs into a bounded range, while the rectified linear unit passes positive inputs unchanged and sets negative inputs to zero. The rectified unit is widely used because it avoids the vanishing gradients that affect the bounded functions in deep stacks.

The universal approximation property states that a network with one hidden layer of sufficient width can approximate any continuous function on a bounded domain. This guarantees representational power but says nothing about whether the weights can be found from data, or how many units are needed. LeCun et al. (2015) emphasised that the practical success of deep networks depends on training methods and on architectures that match the structure of the data, not on the approximation result alone.

Width and depth are the main architectural choices. Wider and deeper networks can fit more complex functions, but they also have more parameters and a greater risk of fitting noise. The choice should be made with validation data, and the settings should be reported. Sandve et al. (2013) recommended recording the architecture with its layer sizes and activation functions, since a network cannot be reproduced from a description of its purpose alone.
