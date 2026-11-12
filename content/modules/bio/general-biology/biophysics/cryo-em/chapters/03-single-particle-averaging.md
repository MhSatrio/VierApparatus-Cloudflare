---
title: "Single-Particle Averaging"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The single-particle approach to cryo-EM, in which the images of many copies of the same molecule are aligned to a common reference and averaged to increase the signal, the detection and alignment of particles in noisy micrographs, the cross-correlation methods used to find each particle's orientation and the way averaging builds a map from particles whose signal alone is too weak to see."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how particle images are aligned and averaged to increase the signal of a molecule."
  - "Explain how the noise of individual images is reduced by averaging and what alignment errors do to the result."
references:
  - "Bai, X.-c., McMullan, G., & Scheres, S. H. W. (2015). How cryo-EM is revolutionizing structural biology. Trends in Biochemical Sciences, 40(1), 49-57. https://doi.org/10.1016/j.tibs.2014.10.005"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A single particle image is far too noisy to show the molecule, but many images of the same molecule, each in a random orientation, carry the same structure with independent noise. The single-particle approach finds each particle in the micrograph, determines its orientation by comparing it with projections of a reference, and adds it to an average in that orientation. As the number of particles grows, the noise falls as the square root of the number averaged, and the structure emerges from the background. Bai et al. (2015) described the averaging of particles as the principle that made the method practical.

Particles are detected in the micrograph by template matching or by machine methods that recognise their shape. The detection must find the particles without including the noise, the ice contaminants or the aggregates, and the threshold that separates them is a choice that affects the population averaged. The choice must be stated, and the selection of particles must be reported.

Each particle is aligned to the reference by finding the orientation and the shift that maximise the cross-correlation between the image and the projection of the reference. The alignment is the step that is most sensitive to the reference. A reference that resembles the expected structure can bias the alignment towards its own features, and the reference-bias problem is one of the central concerns of the method.

Averaging improves the signal and reduces the noise. Alignment errors blur the average, and the resolution of the final map depends on the accuracy of the alignments as well as on the number of particles. The method must be checked for reference bias by repeating the alignment from an independent starting model, or by using a reference of a different form.

Ioannidis (2005) described how a result that depends on the choice of reference or of particle selection may be presented as the structure when it reflects those choices, and Platt (1964) recommended a test that could separate the structure from the reference, such as the convergence of independent alignments from different starting points.

Averaging many particles turns a set of noisy images into a structure, and the alignment and the reference determine how faithful that structure is.
