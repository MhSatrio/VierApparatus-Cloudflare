---
title: "Mass Spectrometry"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How a mass spectrometer ionises molecules, separates them by their mass to charge ratio and detects them, and how tandem mass spectrometry identifies peptides and metabolites from their fragments."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the three stages of a mass spectrometer: ionisation, mass analysis and detection."
  - "Explain how tandem mass spectrometry is used to identify a peptide from its fragments."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Lewis, G. N. (1916). The atom and the molecule. Journal of the American Chemical Society, 38(4), 762-785. https://doi.org/10.1021/ja02261a002"
---

A mass spectrometer measures the mass of molecules. It works in three stages. The sample is ionised, so that molecules acquire a charge, usually by electrospray for large biomolecules or by electron impact for small ones. The ions are then separated by their mass to charge ratio, using electric or magnetic fields, or the time they take to travel a fixed distance. Finally, the ions are detected and their abundance recorded. Lewis (1916) described the molecule as the unit of chemical identity, and the mass spectrometer measures that identity in a direct way.

Tandem mass spectrometry adds a second stage of separation. A selected ion is broken into fragments by collision with a gas, and the masses of the fragments are measured. For a peptide, the fragments are formed by breaking the peptide bonds, and their masses reveal the sequence of amino acids. The fragmentation pattern identifies the peptide, and the set of peptides identified from a sample identifies the proteins present.

The identification depends on matching the observed fragment masses with the predicted masses of peptides in a database. The match is probabilistic, and the scoring method must control for the number of candidates tested, since a large database produces chance matches. The false discovery rate of the identifications must be estimated, typically by searching against a decoy database.

Quantification is possible by label-free methods that compare the signal of a peptide between samples, or by isotopic labels that are added to one sample and compared with another. The accuracy depends on the reproducibility of the ionisation, and internal standards are needed.

Ioannidis (2005) described the problem of multiple comparisons, which applies strongly to large proteomic and metabolomic datasets. The false discovery rate and the validation of key findings are essential safeguards.

Alberts et al. (2022) describe the proteins and metabolites whose identification is the goal. Mass spectrometry is practised with calibration, controls and documented methods, and the results are reported with the scoring criteria used.
