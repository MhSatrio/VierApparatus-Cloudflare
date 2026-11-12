---
title: "Tissue Mechanics and Growth"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The simulation of tissue mechanics and growth in which the forces between cells and the deformation of the tissue determine its form, covering the representation of cells as deformable objects or as vertices of a network, the force balance that determines the equilibrium shape of the tissue, the growth laws that add material in response to stress or signalling, the coupling of mechanics with the signalling that regulates division and differentiation, the sensitivity of the tissue shape to the material parameters and the growth rate, the comparison of simulated shapes with imaged tissues using quantitative shape descriptors with their uncertainty, and the reporting of the mechanical model, its parameters and the comparison with measured tissue."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Represent a tissue mechanically and state the force balance that determines its equilibrium shape."
  - "Compare a simulated tissue shape with an imaged tissue using a quantitative shape descriptor with its uncertainty."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A tissue takes its shape from the forces its cells exert on one another and from the growth that adds material. Mechanical models represent cells as deformable objects or as the vertices of a network, and the equilibrium shape of the tissue is the state in which the forces balance. Growth laws describe how material is added in response to stress or to signalling, and the combination of mechanics and growth produces the form that develops. Ioannidis (2005) described how a model that reproduces a shape may do so for the wrong reasons, and the mechanical and growth assumptions must be tested separately.

Coupling mechanics to signalling is central, because division and differentiation respond to the mechanical environment, and the mechanical state responds to the cells that divide. The feedback must be represented explicitly, and its effect on the stability of the simulated tissue should be examined. Cumming (2014) argues that the variability of the tissue shape across replicate simulations should be reported with its interval, since a single shape can be misleading when the system is noisy.

The shape of the simulated tissue depends on the material parameters and on the growth rate, and the sensitivity of the shape to these parameters should be tested. A shape that is reproduced only at one combination of parameters is weak evidence for the mechanism. Munafò et al. (2017) argued that the parameters and their ranges should be reported, so that the robustness of the result can be judged.

The comparison with imaged tissue uses quantitative shape descriptors, such as the aspect ratio of cells, the orientation of the tissue axis or the distribution of cell areas. Each descriptor should be reported with its uncertainty derived from the imaging and from biological variation. Peng (2011) argued that the mechanical model, its parameters and the comparison with the measured tissue must all be reproducible, and the deposition of the model and the images supports this.
