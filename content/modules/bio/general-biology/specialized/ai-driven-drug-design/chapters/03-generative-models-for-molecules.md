---
title: "Generative Models for Molecules"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Generative models that propose new molecules with desired properties, covering the variational autoencoders and the recurrent networks that learn the grammar of molecular strings, the reinforcement learning that rewards the generation of molecules with a target property, the chemical validity and synthetic accessibility of generated molecules that may not be made in practice, the diversity of the generated set and the risk that generation collapses onto a few scaffolds, the filters that remove unwanted structures, and the experimental synthesis and testing that is the only means of confirming that a generated molecule has the property claimed."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a generative model proposes new molecules and state the property it is rewarded for."
  - "Explain why generated molecules must be checked for synthetic accessibility and novelty and state the experiment that confirms the property."
references:
  - "Stokes, J. M., Yang, K., Swanson, K., Jin, W., Cubillos-Ruiz, A., Donghia, N. M., MacNair, C. R., French, S., Carfrae, L. A., Bloom-Ackermann, Z., Tran, V. M., Chiappino-Pepe, A., Badran, A. H., Andrews, I. W., Chory, E. J., Church, G. M., Brown, E. D., Jaakkola, T. S., Barzilay, R., & Collins, J. J. (2020). A Deep Learning Approach to Antibiotic Discovery. Cell, 180(4), 688-702. https://doi.org/10.1016/j.cell.2020.01.021"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A generative model proposes molecules rather than only scoring them. Some models learn the grammar of molecular strings, so that they can produce new strings that correspond to valid molecules, and others learn a continuous space in which molecules can be sampled and decoded. Stokes et al. (2020) used a generative approach to explore the chemical space around known antibiotics and to propose new candidates, which were then tested in the laboratory.

Generative models can be guided by reinforcement learning, in which molecules that score well on a target property are rewarded, so that the model moves towards them. The reward must be chosen with care, since a model optimised on a predicted property will exploit any error in the prediction, and the molecules that score well may not have the property in reality. The reward function should be validated, and the optimisation should be checked against experiment.

Generated molecules must be chemically valid and must be synthesisable, since a molecule that cannot be made has no practical value. Synthetic accessibility scores estimate how difficult a molecule is to make, but they are approximate, and a molecule that scores well may still be impossible to synthesise in practice. The accessibility of the proposed molecules should be assessed by chemists, and the synthetic route should be considered.

The diversity of the generated set is important, because a model may collapse onto a few scaffolds that score well and generate many variants of them. Ioannidis (2005) described how a model that produces many similar candidates may give an appearance of abundance that is not real, and the diversity and the novelty of the generated set should be reported. Filters remove unwanted structures, such as reactive or toxic groups, and their use must be reported. Cumming (2014) argues that the rate of success of the generated molecules should be given with its interval, and only experimental synthesis and testing can confirm the properties claimed.
