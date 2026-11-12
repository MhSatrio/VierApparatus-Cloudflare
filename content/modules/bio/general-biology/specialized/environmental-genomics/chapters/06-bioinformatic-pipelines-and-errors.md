---
title: "Bioinformatic Pipelines and Errors"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The bioinformatic pipelines that turn raw environmental sequencing reads into species lists, abundance tables and functional profiles, covering the quality filtering and trimming of reads, the removal of chimeric sequences formed during amplification, the clustering and denoising of sequences, the taxonomic assignment against reference databases, the propagation of errors through successive steps, the sensitivity of the results to the parameters of each step, the version control and benchmarking of pipelines on mock communities of known composition, and the reporting of pipelines so that their output can be reproduced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the sequence of steps in an environmental sequencing pipeline and state the error that each step can introduce."
  - "Explain how a mock community of known composition is used to benchmark a pipeline and state what its results show."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A survey of environmental sequences passes through a pipeline with many steps, and each step can change the result. Reads are quality-filtered and trimmed, chimeric sequences formed during amplification are removed, and sequences are clustered or denoised into units that stand for taxa. Each unit is then assigned to a taxon with a reference database, and the output is a table of species and abundances. The errors introduced at each stage accumulate, and the final table may differ substantially from the community that was sampled.

Chimeric sequences are artefacts formed when a partial amplification product anneals to a different template during the polymerase chain reaction, and they can be mistaken for new species. Their removal is essential, but an overly aggressive removal may also remove real sequences that resemble chimeras. The threshold used must be reported, since it affects the number of units.

The sensitivity of the results to the parameters of each step must be examined. A change in the quality threshold, the clustering distance or the confidence threshold for assignment can change the species list, and a conclusion that depends on one setting is fragile. The sensitivity should be shown across a reasonable range of settings, and the chosen settings should be justified before the data are analysed.

A mock community of known composition, made by mixing DNA from species in known proportions, is used to benchmark a pipeline. The pipeline should recover the species in the mock and their approximate proportions, and the errors it makes reveal its biases. Ioannidis (2005) described how a pipeline that is judged only on real data cannot be checked, and mock communities provide the known truth that real samples lack. Cumming (2014) argues that the accuracy on the mock community should be reported with its interval, and Sandve et al. (2013) recommended recording the software version and the parameters of every pipeline run.
