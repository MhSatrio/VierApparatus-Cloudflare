---
title: "Reporting Computational Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "What a report of a computational neuroscience model must contain for its equations, parameters and claims to be reproduced and tested, including the scope of the model and the biological question it addresses, the equations and their units, the parameter values with their sources and uncertainties, the data used for fitting and the data used for validation, the simulator, its version and the numerical settings, the random seeds and the number of runs, the comparison with alternative models, and the public deposition of the code and the model in a standard format."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the equations, parameters, data, software and seeds that a computational neuroscience report must give."
  - "Report a model's fit and its validation separately, with the parameter uncertainties and the comparison with alternatives."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A computational neuroscience model is a set of claims about how the nervous system works, and its report must allow those claims to be reproduced and tested. The scope of the model and the biological question it addresses should be stated first, since a model is useful only for the questions it was built for. Peng (2011) argued that a computational result is reproducible only with the means of producing it, and for a model those means are its equations, its parameters and its code.

The equations should be given with their units, and the parameters should be listed with their values, their sources and their uncertainties. A parameter taken from an experiment should be traced to the experiment, and a parameter fitted from data should state the data and the method. Hodgkin and Huxley (1952) reported their parameters with the experimental measurements from which they were derived, which is the standard that a model report should meet.

The fitting data and the validation data must be reported separately, and the criteria of the validation must be stated. Ioannidis (2005) described how a model judged on the data that built it overstates its accuracy, and the comparison with alternative models should use the same data and a criterion that accounts for complexity. Cumming (2014) argues that the agreement should be reported with its interval.

The simulator, its version, the numerical settings and the random seeds must be recorded, and the code and the model should be deposited in a standard format. Sandve et al. (2013) recommended keeping the inputs, steps and outputs of an analysis together, so that the model can be rerun and its predictions tested by others.
