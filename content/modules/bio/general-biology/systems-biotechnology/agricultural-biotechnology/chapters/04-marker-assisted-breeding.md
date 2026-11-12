---
title: "Marker-Assisted Breeding"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Marker-assisted breeding in which genetic markers linked to a trait are used to select plants that carry the desired allele at an early stage, without waiting for the trait to be expressed, covering the linkage between a marker and a gene and the recombination that can break it, the genome-wide selection that predicts the performance of plants from many markers, the population sizes and training sets that prediction requires, the accuracy of prediction that falls in populations unlike the training set, and the statistical treatment of marker effects with their intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a marker linked to a trait is used to select plants and state how recombination can break the link."
  - "Describe genome-wide prediction and explain why its accuracy falls when it is applied to a population unlike the training set."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Marker-assisted breeding uses genetic markers to select plants that carry a desired allele without waiting for the trait to appear. A marker is a DNA sequence whose inheritance is linked to a gene controlling the trait, so that a plant with the marker is likely to carry the gene. Selecting on the marker allows breeders to discard unwanted plants at the seedling stage, which saves the years that a trait might take to express, and it works for traits that are hard or expensive to measure.

The link between marker and gene is broken by recombination in meiosis, and the closer the marker lies to the gene, the less often the link breaks. A marker that is far from the gene may select the wrong allele in a proportion of plants, and the proportion depends on the distance between them. The map distance between marker and gene should be reported, since it determines the reliability of the selection.

Genome-wide selection extends the idea by using many markers across the genome to predict the performance of each plant. The prediction is made by a model trained on plants whose performance and genotype are both known, and it can select plants for traits controlled by many genes. Its accuracy depends on the size and the diversity of the training set, and a model trained on a small population gives an unreliable prediction.

The accuracy of prediction falls when the model is applied to a population unlike the one on which it was trained, because the linkage patterns and the allele frequencies differ. Ioannidis (2005) described how a model that is judged on its training data overstates its accuracy, and the prediction must be validated on an independent population. Cumming (2014) argues that the accuracy should be reported with its interval, and Sandve et al. (2013) recommended recording the training population, the markers and the model used.
