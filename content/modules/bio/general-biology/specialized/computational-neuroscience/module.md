---
title: "Computational Neuroscience"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The use of mathematical and computational models to explain the function of neurons and circuits, covering the biophysical models of the neuron descended from the equations of Hodgkin and Huxley, the network models that simulate the interaction of many neurons, the learning rules that describe how synaptic strengths change, the fitting of model parameters to recorded data and the validation of models on data withheld from fitting, the software and its reproducibility, the analysis of neural data by statistical and information-theoretic methods, and the reporting of models so that their equations, parameters and simulations can be rerun by others."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the Hodgkin-Huxley model of the neuron and state how its equations capture the generation of an action potential."
  - "Explain how a network model is built, fitted and validated, and why validation must use data that were not used in fitting."
references:
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Yuste, R. (2015). From the neuron doctrine to neural networks. Nature Reviews Neuroscience, 16(8), 487-497. https://doi.org/10.1038/nrn3962"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Computational neuroscience uses mathematics and simulation to explain how neurons and circuits produce their behaviour. A model states a hypothesis about the mechanism in precise terms, and the simulation shows what the hypothesis predicts. Hodgkin and Huxley (1952) built the first quantitative model of the action potential from measurements of the squid giant axon, and their equations remain the foundation of the field. Their work showed that a biophysical description of the neuron could reproduce its behaviour in detail.

The topic begins with the biophysical models of single neurons, in which the membrane is described by the currents through its channels and the equations govern how the voltage changes. These models are used to explore how a neuron responds to inputs and how its channels shape its firing. The network models that follow combine many such neurons with connections that carry their signals to one another, and they show how the circuit produces its collective behaviour. Yuste (2015) argued that such models are needed to link the neuron to the function of the brain.

Models have parameters that must be fitted to data, and the fitting is a source of many errors. A model with many parameters can be made to fit almost any data, and its fit then says little about the mechanism. The chapters that follow examine the fitting, the validation on withheld data, the learning rules that change synaptic strength and the analysis of neural data.

Ioannidis (2005) described how the flexibility of a model can produce results that do not hold, and Cumming (2014) argues that the parameters and the predictions should be reported with their intervals. Sandve et al. (2013) and Peng (2011) recommended that the code, the equations and the data be available so that a model can be rerun and checked.
