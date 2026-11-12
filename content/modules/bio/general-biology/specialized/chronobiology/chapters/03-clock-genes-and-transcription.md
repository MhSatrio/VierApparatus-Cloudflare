---
title: "Clock Genes and Transcription"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The clock genes and the genome-wide transcriptional rhythms they drive, covering the core clock genes and their products, the output genes that the clock regulates in each tissue, the rhythmic transcription of a large fraction of the genome in some tissues and its variation between tissues, the chromatin changes that accompany the rhythm, the measurement of rhythmic genes from time series of expression data and the statistical methods that detect a rhythm with a period near one day, and the caution needed when a rhythm is inferred from a few time points."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Name the core clock genes and state how the clock controls the rhythmic expression of output genes in a tissue."
  - "Describe a method for detecting rhythmic genes in a time series and state how many time points are needed to detect a rhythm with a period near a day."
references:
  - "Takahashi, J. S. (2017). Transcriptional architecture of the mammalian circadian clock. Nature Reviews Genetics, 18(3), 164-179. https://doi.org/10.1038/nrg.2016.150"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The clock drives the rhythmic expression of many genes, both within the clock itself and in the output pathways that carry its signal to the rest of the cell. Takahashi (2017) described how the clock transcription factors bind to thousands of sites in the genome, and in some tissues a large fraction of the transcripts show a daily rhythm. The rhythms differ between tissues, so that the same clock produces different output programmes in the liver, the heart and the brain.

The rhythmic transcription is accompanied by changes in the structure of the chromatin, which opens and closes as the clock proceeds. These changes make the timing of gene expression depend on the state of the chromatin as well as on the transcription factors, and they help to explain why the same gene can show different rhythms in different tissues. The regulation is therefore a combination of the clock and the local chromatin.

Rhythmic genes are detected from time series of expression data, in which samples are taken at several times across a day. Statistical methods fit a sinusoid with a period near twenty-four hours to each gene and test whether the fit is better than a constant. The number of time points and the length of the series determine the power to detect a rhythm, and a series with few points may miss a true rhythm or find one by chance.

A rhythm inferred from a few time points is uncertain, and the detected rhythms depend on the statistical threshold used. Ioannidis (2005) described how a large number of tests can produce many significant results by chance, and the multiple testing across genes must be corrected. Cumming (2014) argues that the amplitude and the phase of each rhythm should be reported with their intervals, and Sandve et al. (2013) recommended recording the sampling times, the normalisation and the detection method.
