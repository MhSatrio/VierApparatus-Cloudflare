---
title: "Interpreting Protein Representations"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The interpretation of the internal representations of protein language models and the limits of such interpretation, covering the probing of representations for properties such as secondary structure, disorder, transmembrane segments and binding sites with linear classifiers and the control that a probe trained on random labels should fail, the identification of attention heads and neurons that respond to particular residue types or structural features, the danger of reading a single neuron as a biological feature, the comparison of representations across layers to see how information develops with depth, the distinction between information that is decodable from the representation and information that the model uses for its predictions, and the reporting of the probes, the controls and the uncertainty of each finding."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Probe a protein representation for a structural property and compare the probe with a control trained on random labels."
  - "Distinguish information that is decodable from a representation from information the model uses in its predictions."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Probing asks whether a property can be read from a representation, and it is one of the principal ways of investigating what a protein language model has learned. A linear classifier trained on the representation to predict secondary structure, disorder, transmembrane segments or binding sites reveals whether the information is present. Jumper et al. (2021) showed that structural information can be recovered from evolutionary sequence statistics, and probes test whether such information is encoded in the representations of language models.

A probe must be accompanied by a control. A probe trained on random labels should perform at chance, and if it does not, the probe is learning something about the representation's geometry rather than the property. Ioannidis (2005) described how an analysis can produce an apparently meaningful result from structure in the data alone, and the control is the safeguard against this. Cumming (2014) argues that the performance of the probe should be reported with its interval relative to the control.

Individual attention heads and neurons are sometimes described as detecting particular residues or structural features. Such descriptions are tempting, but a single unit rarely corresponds to a single biological feature, and the claim must be tested by ablating the unit and measuring the effect. Munafò et al. (2017) argued that the claims about what a model has learned should be supported by such interventions, rather than by visual inspection of activations.

Representations change with depth in the network, and the layer at which a property becomes decodable shows how information develops. The comparison across layers should be reported, with the probe performance at each layer and its interval. Peng (2011) argued that the procedure for extracting representations must be described, since the layer chosen and the pooling used can change the apparent information content.

A distinction is necessary between information that is decodable from a representation and information that the model uses for its predictions. A property may be present in the representation without being used, and a property used by the model may be absent from the representation. The report should state which of these the analysis addresses.
