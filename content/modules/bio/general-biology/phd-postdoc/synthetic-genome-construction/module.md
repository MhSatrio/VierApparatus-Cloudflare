---
title: "Synthetic Genome Construction"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The design, assembly and testing of synthetic genomes and large synthetic DNA constructs at doctoral and postdoctoral level, covering the design of a genome as a set of modules with defined boundaries and the removal of sequences that interfere with assembly, the chemical synthesis and the hierarchical assembly of long DNA from shorter verified fragments, the verification of each assembled fragment by sequencing and the correction of errors, the transplantation or booting of a synthetic chromosome into a host cell, the testing of the function of the synthetic genome against the native one, the biosafety and containment considerations for organisms with engineered genomes, and the reporting of the design, the assembly steps and the verification with its uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Plan the hierarchical assembly of a long synthetic DNA construct and state the verification needed at each level."
  - "Test the function of a synthetic genome against a native reference and report the comparison with its uncertainty."
references:
  - "Cong, L., Ran, F. A., Cox, D., Lin, S., Barretto, R., Habib, N., Hsu, P. D., Wu, X., Jiang, W., Marraffini, L. A., & Zhang, F. (2013). Multiplex genome engineering using CRISPR/Cas systems. Science, 339(6121), 819-823. https://doi.org/10.1126/science.1231143"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A synthetic genome is a genome whose sequence has been designed and built from chemically synthesised DNA rather than copied from a natural template. Building one tests whether the design rules that govern a genome are understood well enough to write one from scratch. Cong et al. (2013) showed that large numbers of changes could be made in a genome, and the synthetic approach extends the same logic to the construction of whole chromosomes.

The design divides the genome into modules with defined boundaries, and sequences that interfere with assembly, such as repeats or restriction sites, are removed or recoded. Each module is designed so that it can be built, verified and replaced independently. Ioannidis (2005) described how a model that has not been tested against the system it describes can fail in surprising ways, and the design must be tested in stages.

Long DNA is assembled hierarchically, with short fragments joined into larger ones and these into the full construct. Each fragment is verified by sequencing before it is used, and errors are corrected by re-synthesis or by targeted repair. The verification at each level is necessary, since an error that is not found early propagates into every later construct. Cumming (2014) argues that the frequency of errors should be reported with its interval, since the number of fragments checked determines how well the error rate is known.

The assembled chromosome is introduced into a host cell, and its function is tested against the native genome in a comparable background. The comparison should measure growth and the phenotypes under study with estimates and intervals, and any difference must be attributed to the synthetic sequence rather than to the process of construction. Munafò et al. (2017) argued that the design and verification should be reported in full, so that the construct can be repeated and its claims tested by others. Peng (2011) argued that the design files and the sequence data should be deposited, since a synthetic genome is defined by its sequence and must be available to be checked.
