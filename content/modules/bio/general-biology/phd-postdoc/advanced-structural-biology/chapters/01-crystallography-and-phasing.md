---
title: "Crystallography and the Phase Problem"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "X-ray crystallography as a method for determining macromolecular structure, covering the growth of crystals that diffract to a useful resolution, the measurement of diffraction intensities whose phases are lost, the phase problem and its solution by molecular replacement, by experimental phasing with heavy atoms or anomalous scatterers, and by density modification, the construction and refinement of the atomic model against the data, the R-factor and the free R-factor that test whether the model overfits the data, the resolution at which the structure is interpretable, and the reporting of the data statistics and the refinement statistics with their uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why the phase of each diffraction measurement is lost and how it is recovered by molecular replacement or experimental phasing."
  - "Interpret the R-factor and the free R-factor and state why a model can overfit the data."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

X-ray crystallography measures the intensities of X-rays scattered by an ordered crystal, but it does not measure their phases. The phases are needed to compute the electron density, and their loss is the phase problem that defines the method. Each solution introduces information from outside the measurement. Ioannidis (2005) described how an assumption that is not tested can lead to a wrong conclusion, and the solution of the phase problem must be checked against the data it produces.

Molecular replacement uses a related structure as a search model, placing it in the crystal so that its calculated diffraction matches the measurements. Its success depends on the similarity of the model to the target, and a poor model can produce a plausible but incorrect solution. Experimental phasing introduces heavy atoms or anomalous scatterers whose signal allows the phases to be determined. Density modification then improves the phases using constraints such as the expected solvent content. Cumming (2014) argues that the quality of each phase estimate should be reported, since it determines how much the density can be trusted.

The atomic model is built into the density and refined against the data. Refinement adjusts the positions of the atoms to improve the agreement with the measurements, and it can improve agreement by fitting noise as well as signal. The R-factor measures this agreement, but it can be lowered by overfitting. The free R-factor, computed on a set of reflections withheld from refinement, provides a check, since a model that overfits will show a free R-factor that does not improve as the R-factor does.

The resolution at which the structure is interpretable must be reported, and the data statistics, the refinement statistics and the validation results should be given together. Peng (2011) argued that the reproducibility of a structure depends on the availability of its data, and the structure factors and the model should be deposited with their identifiers. Munafò et al. (2017) argued that the statistics should be reported in full, so that a reader can judge the reliability of the model without repeating the refinement.
