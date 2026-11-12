---
title: "Reporting Deep Learning"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "What a report of a deep learning study must contain for its performance and any interpretation to be judged and reproduced, including the data source, labelling and splits, the architecture with its layers and settings, the training procedure with its optimiser, learning rate, regularisation and stopping rule, the random seeds and the variation across runs, the external validation and the performance with intervals, and the deposition of the code, the weights and the data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the architecture, training and data details that a deep learning report must give for its results to be reproduced."
  - "Report a network's performance across training runs and on external data, with intervals, rather than as a single best value."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A deep learning report must describe the network and its training with enough detail for another group to rebuild it, since many small choices change the result. Peng (2011) argued that computational results are reproducible only when the means of producing them are available, and for a network these means include the architecture, the code, the weights and the exact data used. A description that names the architecture without its layer sizes and settings cannot be repeated.

The training procedure should be reported in full. The optimiser, the learning rate and its schedule, the batch size, the regularisation, the stopping rule and the number of epochs should all be stated, together with the random seeds that set the initial weights and the order of the data. Ioannidis (2005) described how the number of configurations tried before the best is reported inflates the result, and the number of runs and configurations explored should be given.

Performance should be reported across several training runs and with intervals. A network trained once may reach a result by chance, and the variation between seeds can be as large as the difference between methods. Cumming (2014) argues that the estimates should be reported with their precision, so the mean and spread across runs, and the performance on held-out and external data, should appear in the report rather than a single best value.

The trained weights, the code and the data should be deposited with identifiers, and the data should be described with their source, labelling and splits. Sandve et al. (2013) recommended keeping the inputs, the steps and the outputs together, so that the network can be retrained, its predictions checked and its claims tested on new data by others.
