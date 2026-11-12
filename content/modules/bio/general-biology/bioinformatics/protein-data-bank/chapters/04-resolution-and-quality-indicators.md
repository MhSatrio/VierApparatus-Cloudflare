---
title: "Resolution and Quality Indicators"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the resolution, the R-factors and the validation summaries of a PDB entry show how far the atomic model is supported by the experimental data, the meaning of the free R value and why a single indicator is never enough to judge a structure, together with the quality measures that apply to NMR and electron microscopy entries."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Read the resolution and the R-factors of an X-ray entry and state what each tells a reader about the model."
  - "Explain why the free R value is used alongside the working R value and why a low working R value alone is not evidence of a correct model."
references:
  - "Brünger, A. T. (1992). Free R value: A novel statistical quantity for assessing the accuracy of crystal structures. Nature, 355(6359), 472-475. https://doi.org/10.1038/355472a0"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

The resolution of an X-ray structure is the smallest spacing of the diffraction data from which the model was built, measured in angstroms. A smaller number means finer detail, and a model at high resolution can show individual side chains and bound waters, while one at low resolution shows the backbone at best. Berman (2000) describes the archive that records the resolution with each entry, and the figure is the first indicator a reader should check.

The R-factor measures how well the model reproduces the observed diffraction. The working R value is calculated from the data used to refine the model, and a model refined to reduce it can fit the noise as well as the signal. Brünger (1992) introduced the free R value, which is calculated from a set of reflections withheld from refinement, and which therefore tests the model against data it did not see. A large gap between the working and the free R value is a sign of overfitting.

No single indicator is enough. A low working R value may coexist with a poor model if the model has been fitted too closely, and a high resolution does not guarantee that every region is well determined. Validation summaries combine the indicators with geometric checks on bond lengths, angles and the conformation of each residue, and a reader should look at all of them before judging a region.

The same reasoning applies to other methods. A structure from nuclear magnetic resonance is judged by the agreement of its ensemble with the experimental restraints, and an electron microscopy structure by the resolution of its map and the fit of the model to it. The method determines which indicators apply, and a comparison between entries should use the same kind of measure.

Platt (1964) recommended that a test be designed so that it can exclude a competing explanation. A model judged by its free R value, not by its working R value, is a test of that kind, since the free data can show that the model is wrong.
