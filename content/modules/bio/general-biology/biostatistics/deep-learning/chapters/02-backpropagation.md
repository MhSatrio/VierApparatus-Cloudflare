---
title: "Backpropagation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The training of a neural network by gradient descent, in which the gradient of a loss function with respect to each weight is computed by the chain rule and propagated backwards through the layers, the choice of loss for regression and classification, the learning rate as the step size that trades speed against stability, the mini-batch form of the method, and the reasons that the gradient computation is efficient enough to train networks with millions of parameters."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how backpropagation applies the chain rule to compute the gradient of the loss with respect to each weight."
  - "Describe the learning rate and mini-batch size and state how they trade speed against stability."
references:
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Training a network means finding the weights that minimise a loss function, which measures the discrepancy between the predictions and the observed outcomes. Gradient descent reduces the loss by moving each weight a small step in the direction that decreases it, and the step is proportional to the gradient of the loss with respect to that weight. The difficulty is that a network has many weights and the loss depends on all of them through its layers, so the gradients must be computed efficiently.

Backpropagation computes these gradients by applying the chain rule of calculus from the output layer back to the input. The error at the output is propagated backwards, and each layer uses the error it receives together with its own activations to compute the gradients of its weights and to pass the error to the layer before. The cost of the backward pass is of the same order as the forward pass, which is why the method makes large networks trainable. LeCun et al. (2015) described backpropagation as the central method that made deep learning practical.

The learning rate controls the size of each step. A rate that is too large makes the loss oscillate or diverge, while one that is too small makes training slow and may leave the weights in a poor region. The gradient is usually estimated on a mini-batch of samples rather than the full dataset, which adds noise but makes each step cheap and often improves generalisation. The learning rate, the batch size and the number of passes through the data should be recorded, since they determine the result.

Cumming (2014) argues that the outcome of training should be reported with its variability, and a network trained once may give a different result from another run with a different seed. Sandve et al. (2013) recommended recording the random seeds, the optimiser and its settings, so that a training run can be repeated and its variation across seeds understood.
