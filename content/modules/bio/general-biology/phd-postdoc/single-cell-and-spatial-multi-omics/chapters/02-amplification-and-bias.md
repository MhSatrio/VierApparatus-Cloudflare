---
title: "Amplification and Technical Bias"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The amplification of the minute quantities of RNA or DNA from a single cell and the technical biases that amplification introduces, covering reverse transcription efficiency that varies between transcripts, the amplification bias that favours some sequences over others, the unique molecular identifiers that allow the number of original molecules to be counted and PCR duplicates to be removed, the dropout of transcripts that are present but not detected, the effect of sequencing depth on the detection of low-abundance genes, the calibration of these biases with spike-in standards, and the reporting of the detected transcripts and their counts with the uncertainty that amplification imposes."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how unique molecular identifiers allow the original number of molecules to be estimated from amplified reads."
  - "Describe the sources of dropout and state how spike-in standards help to calibrate the technical bias."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A single cell contains only picograms of RNA, and the molecules must be copied many times before they can be sequenced. Amplification therefore introduces bias, because the copying is not uniform: some transcripts are converted to DNA more efficiently than others, and some are amplified more strongly. Ioannidis (2005) described how systematic bias in measurement can produce consistent but false results, and amplification bias is one of the most important sources in single-cell work.

Unique molecular identifiers are short barcodes attached to each original molecule before amplification. Reads that share an identifier and a sequence are counted as one original molecule, which removes the duplicates introduced by PCR and gives a more accurate count. The method depends on the identifiers being unique and on the sequencing depth being sufficient to observe most of them. Peng (2011) argued that the method by which a count is produced determines what the count means, and the identifiers are part of that method.

Dropout occurs when a transcript is present in the cell but is not detected. It arises from inefficient conversion of the molecule, from stochastic sampling of a few molecules and from low sequencing depth. Dropout produces zeros that are indistinguishable, at first sight, from true absence, and the statistical model must account for them. Cumming (2014) argues that the estimate of a low-abundance gene's expression is very uncertain, and the interval should be reported when such genes are discussed.

Spike-in standards are known quantities of exogenous RNA added to each sample, and they measure the efficiency of the process in each sample. They allow the technical bias to be calibrated, and they reveal differences in efficiency between runs. The reporting of the detected transcripts should include the counts, the depth and the calibration, so that a reader can judge the uncertainty imposed by amplification.
