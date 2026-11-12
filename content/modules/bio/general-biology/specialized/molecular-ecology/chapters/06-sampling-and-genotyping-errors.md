---
title: "Sampling and Genotyping Errors"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The sampling and genotyping errors that limit molecular ecology inferences, covering the contamination of samples by DNA from other individuals or species, the allelic dropout in which a true allele fails to amplify and makes a heterozygote look like a homozygote, the false alleles produced by stutter and by errors in amplification, the low DNA quantity of non-invasive samples that increases these errors, the replicate genotyping used to estimate the error rate, and the way that uncorrected errors bias estimates of relatedness, population size and gene flow."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe allelic dropout and false alleles and state how each makes a genotype wrong."
  - "Explain how replicate genotyping estimates the error rate and how an uncorrected error rate biases an estimate of population size."
references:
  - "Taberlet, P., Coissac, E., Pompanon, F., Brochmann, C., & Willerslev, E. (2012). Towards next-generation biodiversity assessment using DNA metabarcoding. Molecular Ecology, 21(8), 2045-2050. https://doi.org/10.1111/j.1365-294X.2012.05470.x"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Molecular ecology depends on accurate genotypes, and the samples collected in the field are often of poor quality. Non-invasive samples such as faeces, hair and feathers contain little DNA, and the DNA that is present is often degraded. These conditions produce errors that can distort every inference that follows, and the errors must be understood and measured before the genotypes are used.

Contamination introduces DNA from another individual or species into a sample, which can create a genotype that belongs to neither the target nor its mate. Contamination is a particular problem when samples are handled together or when the DNA of a predator or a companion is present. Controls and careful handling reduce it, but they cannot always eliminate it.

Allelic dropout occurs when one of the two alleles of a heterozygote fails to amplify, so that the heterozygote appears to be a homozygote. False alleles arise from amplification errors and from stutter, in which the polymerase slips on repeated sequences and produces products of the wrong length. Both errors are more frequent in low-quality samples, and both make the genotype of an individual incorrect.

The error rate can be estimated by genotyping the same samples several times and comparing the results. The replicates reveal the proportion of loci and samples that disagree, and this proportion is the basis for the correction of the analysis. Ioannidis (2005) described how an error rate that is not measured may remain hidden, and the replicates should be part of the design.

Uncorrected errors bias the estimates of relatedness, population size and gene flow. Dropout makes individuals appear less similar than they are, which can inflate the estimated population size, and a false match can make two individuals appear identical and reduce the estimate. Cumming (2014) argues that the estimate of population size should be reported with its interval after the error correction, and Sandve et al. (2013) recommended recording the genotyping procedure and the replicate results.
