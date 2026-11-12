---
title: "Coding and Information in Neurons"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How neurons encode information in their spike trains, through firing rates, precise spike timing and the correlations between neurons, the receptive fields that define what each neuron encodes and the information theory used to measure how much a spike train tells about a stimulus, with the difficulties of estimating information from limited data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe rate and timing codes in spike trains and how receptive fields define what a neuron encodes."
  - "Explain how information about a stimulus is measured from spike trains and the bias that limited data introduce."
references:
  - "Hubel, D. H., & Wiesel, T. N. (1962). Receptive fields, binocular interaction and functional architecture in the cat's visual cortex. The Journal of Physiology, 160(1), 106-154. https://doi.org/10.1113/jphysiol.1962.sp006837"
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A neuron communicates through its spikes, and the question of what the spikes encode has been central to neural biophysics. Hubel and Wiesel (1962) showed that cells in the visual cortex respond to stimuli in their receptive fields, with the response depending on the orientation and the position of the stimulus, and the receptive field defines the variable that the neuron encodes. The firing rate of the neuron, averaged over a time window, is one code, and the cell's preferred stimulus is the value at which the rate is highest.

Rate coding is not the only possibility. The precise timing of spikes, down to the millisecond, can carry information that the average rate does not, and the synchrony of spikes across neurons may encode the binding of features. The distinction between codes is an empirical one, and it is tested by asking whether the timing of spikes, beyond their count, changes the information about the stimulus.

Information theory provides the measure. The information that a spike train carries about a stimulus is the reduction in uncertainty about the stimulus that the spike train produces, and it is computed from the joint distribution of the stimuli and the responses. The calculation requires the probabilities of the responses, which are estimated from the data, and the estimates are biased when the data are limited, since many response patterns are seen only a few times.

The bias of limited data is a serious problem. The information is overestimated when the number of responses is small relative to the number of possible patterns, and corrections are needed to remove the bias. The correction must be validated on simulated data with known information, and the claimed information must be reported with its uncertainty.

Ioannidis (2005) described how a claimed code may be proposed from a few patterns that happen to carry information, and Platt (1964) recommended tests that could discriminate between rate and timing codes, such as the comparison of the information carried by the spike counts with that carried by the spike times.

The spike train is the neuron's message, and the code it uses is revealed by measuring how much its timing and rate tell about the stimulus, with the bias of the estimate controlled.
