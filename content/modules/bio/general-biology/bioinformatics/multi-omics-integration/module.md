---
title: "Multi-Omics Integration"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The integration of data from several molecular layers, such as the genome, transcriptome, proteome and metabolome, to describe a biological system more completely than any single layer, covering the reasons for integration and its limits, the matching of samples across layers, the early, intermediate and late strategies for combining data, the dimension reduction and the factor models that find shared structure, the handling of platform differences and the interpretation and reporting of integrated results."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why integrating several molecular layers can reveal relationships that a single layer hides and state the main difficulties of doing so."
  - "Compare early, intermediate and late integration strategies and state when each is appropriate."
references:
  - "Hasin, Y., Seldin, M., & Lusis, A. (2017). Multi-omics approaches to disease. Genome Biology, 18(1), 83. https://doi.org/10.1186/s13059-017-1215-1"
  - "Ritchie, M. D., Holzinger, E. R., Li, R., Pendergrass, S. A., & Kim, D. (2015). Methods of integrating data to uncover genotype-phenotype interactions. Nature Reviews Genetics, 16(2), 85-97. https://doi.org/10.1038/nrg3868"
  - "Aebersold, R., & Mann, M. (2016). Mass-spectrometric exploration of proteome structure and function. Nature, 537(7620), 347-355. https://doi.org/10.1038/nature19949"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A biological system is described at several levels at once. The genome holds the potential, the transcriptome shows which genes are active, the proteome shows the proteins that carry out their functions and the metabolome shows the chemistry that results. Each layer is measured by its own technology, with its own biases and noise. Multi-omics integration combines these layers so that a relationship visible across several of them is more secure than one seen in a single layer, and Hasin et al. (2017) review the approaches that have been used for disease, where the layers often disagree.

The topic follows the stages of an integrated study. It begins with the reasons for integration and the difficulty of matching samples across layers, since a sample measured for its transcripts may not be the same material measured for its proteins. The strategies for combining the data, from early concatenation to late combination of separate results, follow. The dimension reduction and factor methods that find structure shared across layers come next, with the reviews of Ritchie et al. (2015) describing the spectrum of methods.

Integration multiplies the opportunities for error. Each layer adds its own noise, the platforms differ in scale and coverage, and the number of possible relationships among thousands of features in several layers is enormous. Ioannidis (2005) described how such multiplicity produces findings that do not hold, and the discipline of integration is to fix the analysis before the data are combined and to test the results against independent data.
