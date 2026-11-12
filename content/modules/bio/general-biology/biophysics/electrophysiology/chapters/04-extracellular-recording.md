---
title: "Extracellular Recording"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "Extracellular recording of the electrical activity of populations of cells, including field potentials that sum the currents of many cells, the spikes of individual neurons recorded by extracellular electrodes and the spike sorting that assigns each spike to its source, with the relation of extracellular signals to the membrane currents that produce them."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how field potentials and extracellular spikes arise from the currents of many cells and of single cells."
  - "Explain how spike sorting assigns extracellular spikes to individual neurons and what errors it can make."
references:
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Hubel, D. H., & Wiesel, T. N. (1962). Receptive fields, binocular interaction and functional architecture in the cat's visual cortex. The Journal of Physiology, 160(1), 106-154. https://doi.org/10.1113/jphysiol.1962.sp006837"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

An electrode placed outside a cell records the currents that flow in the extracellular medium as a consequence of the cell's activity. A single spike produces a small, brief voltage change at the electrode, and the field potential of a population is the sum of the currents of many cells, changing slowly. Hubel and Wiesel (1962) recorded the spikes of single neurons in the visual cortex with extracellular electrodes, and their receptive fields were mapped from these recordings, which are the basis of much of systems neuroscience.

A field potential reflects the synaptic currents of the neurons in a region more than their spikes, since the synaptic currents are large and sustained. The field therefore indicates the input to a region, and its interpretation depends on the geometry of the neurons and the source of the currents. The analysis of the field across depth reveals the layers in which the currents flow, through the current source density, which is derived from the second spatial derivative of the potential.

Extracellular spikes from single neurons are recorded by electrodes that are small enough to be close to a cell. A spike is detected as a deflection of the signal, and its waveform depends on the distance between the electrode and the cell. Several neurons can be near one electrode, and their spikes must be separated by their waveforms, which is the task of spike sorting.

Spike sorting clusters the detected waveforms by their shape and amplitude, assigning each cluster to a neuron. The method can err in two ways: it can merge the spikes of two neurons with similar waveforms, or it can split the spikes of one neuron into two clusters. Ioannidis (2005) described how the clusters may be accepted as neurons without the test that their spikes are distinct, and Platt (1964) recommended checks such as the refractory period violations in each cluster, which reveal a mixture of neurons.

Extracellular recording measures the population and the single cell through their external currents, and the interpretation of these signals requires the sorting and the geometry that connect them to the source.
