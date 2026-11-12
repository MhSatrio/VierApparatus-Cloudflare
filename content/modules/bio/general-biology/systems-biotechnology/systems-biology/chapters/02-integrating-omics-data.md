---
title: "Integrating Omics Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The integration of measurements of genes, transcripts, proteins and metabolites into a common picture of a biological system, the different time scales, noise levels and coverage of each omics layer, the alignment of measurements from the same samples and conditions, the use of prior knowledge of pathways to link layers, the risk that integration of noisy data produces apparent consistency that is not biological, and the reporting of how each layer was normalised and matched."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the omics layers that a systems study can measure and the differences in their noise, coverage and time scale."
  - "State how measurements from different layers are aligned and what can go wrong when they are integrated without care."
references:
  - "Kitano, H. (2002). Systems Biology: A Brief Overview. Science, 295(5560), 1662-1664. https://doi.org/10.1126/science.1069492"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A systems study measures the components of a biological system at several levels, including the genome, the transcriptome, the proteome and the metabolome. Each layer gives a partial view, and the value of systems biology lies in combining them. The layers differ in their time scales, since transcripts change within minutes while proteins and metabolites respond more slowly, and in their coverage, since a transcriptome may detect many more molecules than a proteome. These differences must be understood before any integration is attempted.

The layers also differ in noise. Measurements of low-abundance molecules are less reliable, and the technical variation of each platform can exceed the biological variation between conditions. Kitano (2002) emphasised the need for quantitative data to model a system, and the noise of each layer determines how much weight it can carry. An integration that treats a noisy measurement as equal to a precise one will be dominated by the noise.

Measurements must be aligned by sample and by condition before they are combined. Samples taken at different times, from different tissues or under different preparations cannot be matched, and an apparent agreement between layers may arise from a shared artefact rather than from biology. Prior knowledge of pathways can link a transcript to the protein and the metabolites it affects, but the links are only as reliable as the knowledge, and a link that is assumed rather than measured should be marked as such.

Ioannidis (2005) described how the flexibility of integration can produce results that do not hold, since many ways of combining the layers may be tried until one gives the desired agreement. Peng (2011) argued that such a result must be reproducible, and Sandve et al. (2013) recommended recording the normalisation of each layer and the matching of samples, so that a reader can judge whether the integration reflects biology.
