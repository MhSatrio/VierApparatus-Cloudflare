---
title: "Genome Assembly"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a genome sequence is reconstructed from the short and long reads of a sequencing run, covering the overlap and de Bruijn graph approaches to assembly, the value of long reads for resolving repeats, hybrid and polished assemblies, scaffolding into chromosome-scale sequences, the metrics used to judge an assembly and the reporting that lets another group judge and rebuild it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how an assembler reconstructs a genome from overlapping reads and why repeats are the main difficulty."
  - "Judge an assembly by its contiguity, completeness and contamination and report the settings that produced it."
references:
  - "Koren, S., Walenz, B. P., Berlin, K., Miller, J. R., Bergman, N. H., & Phillippy, A. M. (2017). Canu: scalable and accurate long-read assembly via adaptive k-mer weighting and repeat separation. Genome Research, 27(5), 722-736. https://doi.org/10.1101/gr.215087.116"
  - "Kolmogorov, M., Yuan, J., Lin, Y., & Pevzner, P. A. (2019). Assembly of long, error-prone reads using repeat graphs. Nature Biotechnology, 37(5), 540-546. https://doi.org/10.1038/s41587-019-0072-8"
  - "Bankevich, A., Nurk, S., Antipov, D., Gurevich, A. A., Dvorkin, M., Kulikov, A. S., Lesin, V. M., Nikolenko, S. I., Pham, S., Prjibelski, A. D., Pyshkin, A. V., Sirotkin, A. V., Vyahhi, N., Tesler, G., Alekseyev, M. A., & Pevzner, P. A. (2012). SPAdes: A New Genome Assembly Algorithm and Its Applications to Single-Cell Sequencing. Journal of Computational Biology, 19(5), 455-477. https://doi.org/10.1089/cmb.2012.0021"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

A sequencing machine returns millions of short fragments, called reads, and none of them is a chromosome. Genome assembly is the computational task of reconstructing the original sequence from these reads by finding where they overlap. The task is hard because genomes contain repeats, stretches of sequence that occur more than once, and a read that falls inside a repeat cannot be placed uniquely from its own sequence. The assembly is therefore a model of the genome that is strongest where the reads are unambiguous and weakest in the repeats.

The topic describes the two main families of method, overlap-based assembly for long reads and de Bruijn graph assembly for short reads. It shows how long reads resolve repeats that short reads cannot, how hybrid approaches combine the two, and how the result is scaffolded into chromosome-scale sequences. The metrics that describe an assembly, and the errors they can hide, are treated in their own chapter, and the final chapter sets out what a report must contain.

Assembly is an example of a method whose output depends strongly on its settings and on the data. Two assemblies of the same reads can differ, so the reporting of each assembly is as important as the assembly itself.
