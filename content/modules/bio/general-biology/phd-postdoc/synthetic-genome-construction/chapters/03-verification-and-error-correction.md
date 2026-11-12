---
title: "Verification and Error Correction"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The verification of synthetic DNA at every level of assembly and the correction of the errors that synthesis and assembly introduce, covering the sequencing strategies that cover each fragment at sufficient depth to detect single-base errors, the distinction between errors in the synthesised oligonucleotides and errors introduced during assembly or cloning, the rates of error in synthesis that determine how many fragments must be checked, the correction of errors by targeted re-synthesis or by mismatch repair of specific positions, the use of a reference sequence to define the intended product, and the reporting of the error rate and the residual errors with their uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a sequencing strategy that detects single-base errors across a synthetic fragment and state its coverage requirement."
  - "Estimate the residual error rate of a verified construct and report it with its interval."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Synthesised DNA contains errors, and the errors accumulate further during assembly and cloning. A construct that is intended to be exact must therefore be verified at the level of the single base, and the verification must cover every part of the sequence. Peng (2011) argued that a result is reliable only when the data that support it are checked, and the verification of a synthetic genome is the check on which its claim rests.

Sequencing must cover each fragment at sufficient depth to detect single-base errors. The depth required depends on the error rate that is acceptable and on the number of molecules sequenced, since a low-frequency error can be missed in a shallow read. The coverage should be stated, and the regions that could not be read should be identified. Cumming (2014) argues that the uncertainty of an error rate depends on the number of bases examined, and a claim of accuracy should carry the interval that the coverage supports.

The sources of error must be distinguished. Errors in the synthesised oligonucleotides differ from errors introduced during assembly or cloning, and each requires a different remedy. An error that is present in the synthetic input will be copied into every construct built from it, while an error introduced during cloning may appear in only some clones. Ioannidis (2005) described how errors of different origin can be confused when they are not separated, and the separation is necessary for correction.

Errors are corrected by targeted re-synthesis of the affected fragment or by the repair of specific positions through mismatch-directed methods. The corrected fragment must then be verified again, since a correction can introduce a new error. The intended product is defined by a reference sequence, and the final construct is compared with it at every position. The residual error rate should be reported with its interval, since a construct with a few unresolved errors is a different object from one with none.
