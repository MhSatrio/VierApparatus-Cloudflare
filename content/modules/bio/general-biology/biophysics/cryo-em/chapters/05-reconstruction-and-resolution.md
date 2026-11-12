---
title: "Reconstruction and Resolution"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How a three-dimensional map is reconstructed from aligned particle images, the Fourier-space combination of the images, the Fourier shell correlation used to estimate resolution by splitting the data into two halves and the sources of error that can make a reconstruction appear to have a finer resolution than the data support."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a three-dimensional map is reconstructed from many aligned particle images."
  - "Explain the gold-standard Fourier shell correlation and why the two half-data sets must be independent."
references:
  - "Bai, X.-c., McMullan, G., & Scheres, S. H. W. (2015). How cryo-EM is revolutionizing structural biology. Trends in Biochemical Sciences, 40(1), 49-57. https://doi.org/10.1016/j.tibs.2014.10.005"
  - "Brünger, A. T. (1992). Free R value: A novel statistical quantity for assessing the accuracy of crystal structures. Nature, 355(6359), 472-475. https://doi.org/10.1038/355472a0"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Once the particles are aligned, their images are combined into a three-dimensional map. Each image is a projection of the molecule in a known direction, and its Fourier transform is a slice through the three-dimensional transform of the molecule. The slices from many directions fill the three-dimensional Fourier space, and the inverse transform gives the density. The reconstruction is an inverse problem, and its quality depends on how completely and accurately the slices fill the space. Gaps in the directions of view leave regions of Fourier space unsampled, which blurs or distorts the map.

Resolution is estimated by the Fourier shell correlation. The particles are divided into two independent halves, two reconstructions are made, and their agreement is measured in shells of spatial frequency. The frequency at which the agreement falls below a threshold gives the resolution. The independence of the two halves is essential, because a common error in the alignment or the reference would be shared by both halves and would inflate the apparent agreement. Brünger (1992) established the idea of testing a model against data that were not used to build it, and the half-set test is the cryo-EM form of this principle.

A reconstruction can appear to have finer resolution than the data support. Overfitting, in which the reference or the noise is incorporated into the map, produces features at high frequency that are not in the molecule. The correlation between the reference and the map, if not controlled, can be mistaken for agreement with the data. Ioannidis (2005) described how the choice of processing can produce an apparent resolution that a different processing would not reproduce, and Platt (1964) recommended that the resolution be checked by independent processing of the same data.

The resolution must be stated with the map, and the features that can be interpreted at that resolution must be stated with it. A map at four ångströms shows the main chain of a helix but not the position of individual side chains, and a map at three ångströms supports more detail. The estimate depends on the method of measurement, and the method must be reported.

The reconstruction converts the aligned images into a density, and its resolution is the measure of how much of the molecule the data reveal.
