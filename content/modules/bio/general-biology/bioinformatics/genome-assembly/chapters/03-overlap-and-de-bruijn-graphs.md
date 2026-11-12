---
title: "Overlap and de Bruijn Graphs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The two graph representations behind genome assembly, the overlap graph in which reads are nodes joined by their overlaps and the de Bruijn graph in which short words of fixed length are joined by their shared ends, how each represents the sequence and its repeats, the choice of word length in a de Bruijn assembly and the reasons the de Bruijn approach suits high-coverage short reads."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe an overlap graph and a de Bruijn graph and state what a node and an edge represent in each."
  - "Explain how the choice of word length in a de Bruijn graph affects its ability to resolve repeats."
references:
  - "Bankevich, A., Nurk, S., Antipov, D., Gurevich, A. A., Dvorkin, M., Kulikov, A. S., Lesin, V. M., Nikolenko, S. I., Pham, S., Prjibelski, A. D., Pyshkin, A. V., Sirotkin, A. V., Vyahhi, N., Tesler, G., Alekseyev, M. A., & Pevzner, P. A. (2012). SPAdes: A New Genome Assembly Algorithm and Its Applications to Single-Cell Sequencing. Journal of Computational Biology, 19(5), 455-477. https://doi.org/10.1089/cmb.2012.0021"
  - "Koren, S., Walenz, B. P., Berlin, K., Miller, J. R., Bergman, N. H., & Phillippy, A. M. (2017). Canu: scalable and accurate long-read assembly via adaptive k-mer weighting and repeat separation. Genome Research, 27(5), 722-736. https://doi.org/10.1101/gr.215087.116"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An assembly can be expressed as a graph, in which the sequence is recorded as a set of paths. The overlap graph has one node for each read and an edge between two reads that overlap. A contig is a path through the graph that visits each read once, and the assembly problem becomes the search for such paths. Koren et al. (2017) use overlap-based methods for long reads, in which the overlaps are the central data.

The de Bruijn graph takes a different approach. Each read is broken into overlapping words of a fixed length k, called k-mers, and each k-mer becomes an edge joining the two (k-1)-mers at its ends. Bankevich et al. (2012) describe SPAdes, an assembler built on this representation, which handles the very large numbers of short reads produced by modern machines. The graph is much smaller than an overlap graph for high-coverage data, because identical words from many reads collapse onto one edge.

The word length k is the main parameter of a de Bruijn assembly. A longer word is more specific, so it distinguishes repeats that are similar but not identical, but it is also more easily broken by sequencing errors and by low coverage. A shorter word is more tolerant of errors but more often confuses repeats. Assemblers typically try several word lengths and combine the results, and the choice should be reported.

The graph shows where the assembly is ambiguous. A node with more than one way in or out marks a point where the sequence branches, which is usually a repeat or an error. The assembler resolves some branches using the read evidence and leaves others as breaks in the contigs.

Sandve et al. (2013) recommended that the parameters of an analysis be recorded, and the word length or the range of word lengths tried is one of the most important of these for an assembly.
