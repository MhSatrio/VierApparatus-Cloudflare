---
title: "Network Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Network models that simulate the interaction of many neurons, including the balanced excitatory and inhibitory networks that produce irregular firing similar to that of the cortex, the attractor networks that hold a memory as a stable pattern of activity, the oscillatory networks that generate rhythms through the interplay of excitation and inhibition, the choice of connectivity that determines the dynamics, the scaling of networks to many neurons, and the reasons that a network that reproduces one feature of recorded activity may fail to reproduce others."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a balanced excitatory and inhibitory network and state why such networks produce irregular firing."
  - "Explain how an attractor network can hold a memory and state the features of recorded activity that a model must reproduce to be credible."
references:
  - "Yuste, R. (2015). From the neuron doctrine to neural networks. Nature Reviews Neuroscience, 16(8), 487-497. https://doi.org/10.1038/nrn3962"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A network model connects many simulated neurons, each with its own dynamics, and it shows how their interactions produce the activity of a circuit. Yuste (2015) argued that such models are needed to understand how the brain computes, since the function of a circuit cannot be read from the properties of its neurons alone. The network is defined by its connectivity, which says which neurons are connected and how strongly, and by the dynamics of each neuron.

A common model is the balanced network, in which excitatory and inhibitory inputs to each neuron are large and nearly cancel, leaving a small net input that drives irregular firing. This matches the irregular activity recorded in many cortical areas, and it arises without any special tuning of the connections. The balance is sensitive to the strengths of the connections, and the regime should be checked when the model is changed.

Attractor networks hold a memory as a stable pattern of activity that persists after the stimulus is removed. Recurrent connections sustain the pattern, and a partial cue can drive the network back to the full pattern. Such models are used to describe working memory and associative memory, and their capacity depends on the number of patterns they can store without interference.

Oscillatory networks generate rhythms through the interplay of excitatory and inhibitory populations, and their frequency depends on the delays and the strengths of the connections. A network model should reproduce the features of the recorded activity that it claims to explain, and a model that matches one feature while failing on others provides weaker support than one that matches several. Cumming (2014) argues that the agreement between model and data should be reported with its interval, rather than as a qualitative similarity.
