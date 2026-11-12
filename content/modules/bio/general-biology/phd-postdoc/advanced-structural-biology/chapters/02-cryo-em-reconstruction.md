---
title: "Cryo-EM Single-Particle Reconstruction"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The determination of macromolecular structure by cryo-electron microscopy of single particles, covering the vitrification of the sample in a thin layer of ice, the collection of many images of individual particles in different orientations, the alignment and classification of particles to separate distinct conformations, the three-dimensional reconstruction from the aligned images, the estimation of resolution from the Fourier shell correlation between two independent halves of the data, the local resolution that varies across a structure, the risk of over-refinement and of reference bias when a model is used to align the particles, and the reporting of the number of particles, the processing steps and the resolution criteria."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Estimate the resolution of a single-particle reconstruction from the Fourier shell correlation between independent halves of the data."
  - "Identify reference bias in a reconstruction and state the test that detects it."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Cryo-electron microscopy freezes molecules in a thin layer of vitreous ice, and images of many individual particles, each in a different orientation, are combined into a three-dimensional reconstruction. The method does not require crystals, which makes it suited to large and flexible assemblies. The quality of a reconstruction depends on the number of particles, the accuracy of their alignment and the degree to which the particles represent a single conformation.

Alignment and classification separate the particles into groups that share a conformation. Each group is reconstructed separately, and the number of groups must be justified, since a classification can split a single conformation into artificial classes or merge distinct ones. Ioannidis (2005) described how a method that finds structure in noise can produce convincing results, and the classification must be tested for stability.

The resolution is estimated by the Fourier shell correlation between two reconstructions made from independent halves of the data. The resolution at which the correlation falls below a threshold is reported as the resolution of the map. Cumming (2014) argues that the uncertainty of such an estimate should be considered, since it depends on the number of particles and on the threshold chosen, and the choice must be stated.

Reference bias arises when a model used to align the particles imposes its own features on the reconstruction. A reconstruction that depends strongly on the reference may show features that come from the reference rather than from the molecule. The test is to repeat the reconstruction from a different or a featureless reference and to see whether the features persist. Peng (2011) argued that the processing steps must be reported so that such tests can be repeated, and the number of particles, the processing and the resolution criteria should all be deposited with the map.
