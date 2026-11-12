---
title: "Sensors and Control"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The sensors that measure the state of a bioreactor, including the probes for temperature, pH, dissolved oxygen and off-gas analysis, the off-line measurements of biomass and product that calibrate the online signals, the control loops that adjust temperature, pH, agitation, aeration and feed to hold setpoints, the tuning of proportional, integral and derivative terms, the response times and drift of sensors that limit what a control can achieve, and the recording of the sensor data and the setpoints so that a run can be audited and its control assessed."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the sensors and control loops that maintain the conditions of a bioreactor and state the setpoint of each."
  - "Explain how the response time and the drift of a sensor limit the performance of a control loop and how calibration corrects for drift."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A bioreactor is controlled through its sensors. Probes measure the temperature, the pH and the dissolved oxygen, and the analysis of the off-gas shows the oxygen consumed and the carbon dioxide produced, which together indicate the metabolic activity of the culture. The control loops use these signals to adjust the heating or cooling, the addition of acid or base, the agitation and the aeration, so that each variable stays at its setpoint. Sandve et al. (2013) recommended recording these signals, since the performance of a run depends on how well the conditions were held.

Online signals must be calibrated against off-line measurements of biomass and product, since an electrode or an off-gas analyser measures a proxy of the quantity of interest. The calibration relates the signal to the cell density or the product concentration, and it should be repeated over the course of the run, since sensors drift. A calibration that is not checked may lead the control to act on a signal that no longer represents the culture.

Each control loop has a setpoint and a response, and the controller adjusts its output in proportion to the error, to the integral of the error and to the rate of change of the error. These proportional, integral and derivative terms must be tuned for each loop, since a loop that is tuned too aggressively oscillates, and one that is tuned too gently fails to hold the setpoint. The tuning depends on the response of the vessel, and a vessel changed in scale needs retuning.

Sensor response time and drift limit what a control can achieve. A probe that responds slowly will show a delayed signal, and the controller will act late, while a drifting probe will hold the culture at the wrong condition. Peng (2011) argued that a result is reproducible only with the means of producing it, and the calibration and the setpoints of each run should be recorded. Cumming (2014) argues that the controlled variables should be reported with their variability over the run, not only their setpoints.
