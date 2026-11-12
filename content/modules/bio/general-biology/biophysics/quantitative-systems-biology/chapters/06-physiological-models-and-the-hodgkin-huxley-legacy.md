---
title: "Physiological Models and the Hodgkin-Huxley Legacy"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How quantitative models of physiological systems link the molecular properties of cells to the function of tissues and organs, the way the Hodgkin and Huxley model of the nerve impulse set a pattern for later models of heart, muscle and metabolism, and how multi-scale models connect processes that act over very different times and sizes."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how the Hodgkin and Huxley model of the action potential was built from measured membrane currents."
  - "Explain how a multi-scale physiological model links molecular processes to the function of an organ."
references:
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
---

Hodgkin and Huxley (1952) built a model of the nerve impulse from measurements of the currents that flow through the membrane of the squid giant axon. They measured the sodium and potassium currents under controlled voltages, described each with variables that change over time, and combined the descriptions into a set of equations that reproduced the shape, the threshold and the propagation of the action potential. The model is a physiological model in the full sense, since its equations describe measured molecular processes and predict the behaviour of the whole cell.

The model set a pattern. Its parameters were tied to measurements that could be repeated, its structure followed the physical processes it described, and its predictions were tested against further experiments. Later models of the heart, of skeletal muscle and of metabolic regulation have followed the same approach, in which the equations of individual processes are assembled into a model of the organ.

Physiological systems operate over a wide range of times and sizes. Channel opening takes microseconds, the action potential a millisecond, the beating of a heart about a second and the regulation of blood pressure minutes or hours. Multi-scale models link these levels by passing outputs from one scale to the next, for example by using the channel behaviour from a molecular model as an input to a cell model, and the cell model's behaviour as an input to a tissue model.

Kitano (2002) emphasised that such linking is what gives systems models their value, since the behaviour of the organ cannot be read from the behaviour of a single channel. The linking also creates a risk: an error at a lower level propagates upward, and a model that fits at the organ level may hide compensating errors below it.

The practical discipline is to test each level separately where possible, and to check the whole model against the measured behaviour of the organ.
