---
title: "Network Perturbation Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Models of how a disease network responds to perturbation and how those models are used to predict therapeutic effects, covering the representation of the network as a dynamical system whose steady state reflects the disease, the simulation of the effect of inhibiting or activating a node and the change in the steady state, the calibration of the network to patient data so that the model reproduces the observed disease state, the prediction of the combinations of perturbations that would restore a healthy state, the sensitivity of predicted effects to the network structure and to the parameters, the validation of predicted effects against experiments and clinical outcomes, and the reporting of the network, the calibration, the predictions and their uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Simulate the effect of perturbing a node in a disease network and state the sensitivity of the predicted steady state to the network structure."
  - "Validate a predicted therapeutic effect against an experiment and report the agreement with its interval."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A network perturbation model represents the disease as a state of a dynamical system whose nodes are molecules and whose edges are regulatory or physical interactions. The steady state that the system settles into is taken to represent the disease, and a therapy is modelled as a perturbation that changes the steady state. The approach allows predictions of therapeutic effect without a complete understanding of each interaction, but its predictions depend heavily on the structure of the network and on parameters that are seldom measured. Ioannidis (2005) described how a model that reproduces an observed state can still predict wrongly under intervention, and the predictions must be tested.

The network is calibrated to patient data so that the model reproduces the observed disease state. A calibration that matches the disease state is a necessary condition, not a sufficient one, since many different networks and parameter sets can reproduce the same state. Cumming (2014) argues that the uncertainty of the calibrated parameters should be reported with its interval, and the predictions should be shown to vary across the plausible calibrations.

Combinations of perturbations that would restore a healthy state are predicted by searching the space of interventions, and the search itself can be made to find spurious solutions. The predicted combinations should be ranked by the robustness of their effect across the plausible calibrations, rather than by the single best calibration. The sensitivity of the prediction to the network structure should be tested by removing or adding edges and observing the change.

Predicted effects must be validated against experiments and clinical outcomes. A predicted effect that is not confirmed in an experiment is a failed prediction, and it should be reported as such. Munafò et al. (2017) argued that the failed predictions must appear with the successful ones, so that the model's performance is judged honestly.

The network, the calibration, the predictions and their uncertainty should be reported together, and the code and data deposited. Peng (2011) argued that the means to reproduce such a model must be available, and the report should state the conditions, including the disease subtype and the patient population, to which the predictions apply.
