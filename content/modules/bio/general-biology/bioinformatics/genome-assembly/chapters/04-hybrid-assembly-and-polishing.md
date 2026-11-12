---
title: "Hybrid Assembly and Polishing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How long reads and short reads are combined in a hybrid assembly, how a draft assembly from long reads is polished by mapping short reads back onto it and correcting its residual base errors, the risk that polishing introduces errors in repetitive regions and the checks that confirm a polished assembly is more accurate than the draft from which it was made."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how short reads are used to polish a draft assembly built from long reads and why the step improves base accuracy."
  - "Identify the regions where polishing may introduce errors and state how the polished assembly is checked."
references:
  - "Kolmogorov, M., Yuan, J., Lin, Y., & Pevzner, P. A. (2019). Assembly of long, error-prone reads using repeat graphs. Nature Biotechnology, 37(5), 540-546. https://doi.org/10.1038/s41587-019-0072-8"
  - "Bankevich, A., Nurk, S., Antipov, D., Gurevich, A. A., Dvorkin, M., Kulikov, A. S., Lesin, V. M., Nikolenko, S. I., Pham, S., Prjibelski, A. D., Pyshkin, A. V., Sirotkin, A. V., Vyahhi, N., Tesler, G., Alekseyev, M. A., & Pevzner, P. A. (2012). SPAdes: A New Genome Assembly Algorithm and Its Applications to Single-Cell Sequencing. Journal of Computational Biology, 19(5), 455-477. https://doi.org/10.1089/cmb.2012.0021"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

A hybrid assembly uses the strengths of both read types. Long reads supply the contiguity, spanning repeats and producing long contigs, and short reads supply the base-level accuracy that long reads lack. Kolmogorov et al. (2019) describe an assembler for long reads, whose draft is the kind of input that polishing refines, and Bankevich et al. (2012) describe SPAdes, which can be used with short reads for the same purpose. In a hybrid project, the long reads define the structure of the genome and the short reads refine its letters.

Polishing is the step that refines a draft. The short reads are aligned back onto the draft, the bases that disagree with the majority of the aligned reads are identified, and the draft is corrected at those positions. The process can be repeated, and each round removes some of the remaining errors. The result is a sequence that is more accurate than the draft, measured by how many bases disagree with the reads.

Polishing can introduce errors. Where the draft has a repeat collapsed or duplicated, short reads may map to the wrong copy and push the consensus toward a false sequence. The regions of greatest risk are repeats and segmental duplications, where the alignment of short reads is ambiguous, and polishing should be inspected in those regions before the result is accepted.

The checks confirm that the polished assembly is better. The number of disagreements between the reads and the assembly should fall after each round, and the gene content should be examined for frameshifts that a base error would cause. Taschuk and Wilson (2017) recommended that research software be tested against known inputs, and a polishing pipeline can be tested on a region of known sequence.

The sequence of steps, the read types and the number of polishing rounds should all be recorded. A polished assembly without these details cannot be distinguished from a draft in the report.
