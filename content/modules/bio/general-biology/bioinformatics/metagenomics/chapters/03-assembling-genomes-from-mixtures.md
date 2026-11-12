---
title: "Assembling Genomes from Mixtures"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How genomes are reconstructed from the mixed reads of a metagenome, through the assembly of the whole community or of the reads grouped by their composition and coverage, the binning of contigs into putative genomes, the assessment of completeness and contamination of each bin and the reasons a genome recovered from a mixture is always an approximation of the organism it represents."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how contigs from a metagenome are grouped into bins that approximate individual genomes."
  - "State the completeness and contamination of a bin and explain why each must be reported with any genome recovered from a mixture."
references:
  - "Quince, C., Walker, A. W., Simpson, J. T., Loman, N. J., & Segata, N. (2017). Shotgun metagenomics, from sampling to analysis. Nature Biotechnology, 35(9), 833-844. https://doi.org/10.1038/nbt.3935"
  - "Bankevich, A., Nurk, S., Antipov, D., Gurevich, A. A., Dvorkin, M., Kulikov, A. S., Lesin, V. M., Nikolenko, S. I., Pham, S., Prjibelski, A. D., Pyshkin, A. V., Sirotkin, A. V., Vyahhi, N., Tesler, G., Alekseyev, M. A., & Pevzner, P. A. (2012). SPAdes: A New Genome Assembly Algorithm and Its Applications to Single-Cell Sequencing. Journal of Computational Biology, 19(5), 455-477. https://doi.org/10.1089/cmb.2012.0021"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Assembling a metagenome is harder than assembling a genome, because the reads come from many organisms at different abundances, and the assembler must separate them. The assembly is usually performed on the whole sample, or on subsets of reads, and the contigs that result mix the sequences of many species. Bankevich et al. (2012) describe SPAdes, which was developed for single cells and can be applied to the small-genome mixtures in which the same problem appears. Quince et al. (2017) set out the stages in which such an assembly is embedded.

The contigs are then grouped into bins, each intended to contain the contigs of one genome. Contigs are grouped by their composition, such as the frequency of short sequence words, and by their coverage, since the contigs of one organism tend to share an abundance across the samples. The grouping is an inference, and a bin that contains the contigs of one organism is the goal, not a guarantee.

Each bin must be assessed. Its completeness is estimated from the set of genes that a single genome of its group is expected to contain, and its contamination from the presence of genes that should occur only once but occur more than once, or from the presence of genes that belong to other groups. A bin with high completeness and low contamination is a good approximation of a genome. A bin with low completeness is a fragment, and a bin with high contamination is a mixture of two or more organisms.

The genome recovered from a mixture is therefore an approximation, and the approximation has a quality that must be stated. A reader who sees a genome from a metagenome should be told its completeness, its contamination and the method used to bin it, since these determine how far the genome can be trusted.

Sandve et al. (2013) recommended that the steps of an analysis be recorded, and the binning method, its parameters and the quality measures of each bin are the record that makes a recovered genome interpretable.
