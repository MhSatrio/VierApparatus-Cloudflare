---
title: "Deep Learning for Molecules"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Deep learning models that take molecules as input and predict their properties, covering the representation of molecules as graphs, strings or fingerprints that a neural network can process, the graph neural networks that aggregate information from the atoms and bonds of a molecule, the message passing that propagates information through the molecular graph, the training of such networks on measured properties such as solubility, toxicity and activity, the amount of data needed and the risk that models trained on limited data memorise rather than generalise, and the use of pretrained representations learned from large unlabelled libraries."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a graph neural network represents a molecule and predicts a property from its atoms and bonds."
  - "Explain why a model trained on limited data may memorise its training set and state how this is detected."
references:
  - "Stokes, J. M., Yang, K., Swanson, K., Jin, W., Cubillos-Ruiz, A., Donghia, N. M., MacNair, C. R., French, S., Carfrae, L. A., Bloom-Ackermann, Z., Tran, V. M., Chiappino-Pepe, A., Badran, A. H., Andrews, I. W., Chory, E. J., Church, G. M., Brown, E. D., Jaakkola, T. S., Barzilay, R., & Collins, J. J. (2020). A Deep Learning Approach to Antibiotic Discovery. Cell, 180(4), 688-702. https://doi.org/10.1016/j.cell.2020.01.021"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A molecule can be represented in several ways that a neural network can process. A graph represents the atoms as nodes and the bonds as edges, and a graph neural network learns a representation of each atom from its neighbours, then combines the atoms into a representation of the whole molecule. Stokes et al. (2020) used a network of this kind to predict the antibacterial activity of compounds, and the representation allowed the network to learn from the structure of each molecule rather than from a fixed list of features.

The network learns by message passing, in which each atom receives information from its neighbours in several rounds, so that each atom's representation comes to reflect its surroundings up to a given distance. The number of rounds determines how far the information travels through the molecule, and the choice is a design decision that affects the model's ability to represent long-range features.

Training requires a set of molecules with measured properties, such as solubility, toxicity or activity against a target. The amount of data needed depends on the complexity of the property and the variety of the chemistry, and a model trained on a few hundred compounds may learn the features of those compounds without generalising. The size and the diversity of the training set must be reported.

A model with many parameters can memorise its training set, so that it performs well on the compounds it has seen and poorly on new ones. The risk is detected by holding out compounds that are structurally distinct from the training set, and by comparing performance on the training and held-out data. Ioannidis (2005) described how a model judged on its training data overstates its accuracy, and Cumming (2014) argues that the performance should be reported on held-out data with its interval. Pretrained representations, learned from large unlabelled libraries, can reduce the need for labelled data, and their use should be stated.
