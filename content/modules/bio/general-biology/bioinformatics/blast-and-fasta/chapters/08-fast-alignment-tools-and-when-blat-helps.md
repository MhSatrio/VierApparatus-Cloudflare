---
title: "Fast Alignment Tools and When BLAT Helps"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The faster alignment tools used for large comparisons, including BLAT for finding near-identical matches such as the placement of a transcript or a read on a genome, the profile hidden Markov model methods of HMMER for finding family members, the speed gains of accelerated profile searches and the choice of tool by the question, the divergence of the sequences and the size of the database."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a fast alignment tool for placing near-identical sequences on a genome and explain why it is faster than BLAST for that task."
  - "Explain how a profile hidden Markov model search differs from a pairwise search and when it is the appropriate tool."
references:
  - "Kent, W. J. (2002). BLAT: The BLAST-like alignment tool. Genome Research, 12(4), 656-664. https://doi.org/10.1101/gr.229202"
  - "Eddy, S. R. (2011). Accelerated Profile HMM Searches. PLoS Computational Biology, 7(10), e1002195. https://doi.org/10.1371/journal.pcbi.1002195"
  - "Eddy, S. R. (1998). Profile hidden Markov models. Bioinformatics, 14(9), 755-763. https://doi.org/10.1093/bioinformatics/14.9.755"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

BLAST is designed to find local similarities among sequences that may be only moderately related. Many tasks need a narrower tool, and a faster one that gives up some sensitivity in exchange for speed. Kent (2002) described BLAT, a tool built for finding near-identical matches of a sequence within a genome, such as the placement of a transcript or a set of reads on a chromosome. Its speed comes from indexing the genome in advance, and it suits the task for which it was designed.

The choice follows from the task. For placing a sequence that is almost identical to a region of a known genome, a tool like BLAT is faster and adequate. For finding the distant members of a family, a search that can see weak similarity is needed, and BLAST or the profile methods are more suitable. The divergence of the sequences and the size of the database decide between them, and the choice should be stated.

Profile hidden Markov models are a different approach. Eddy (1998) described them as statistical models of a sequence family, built from an alignment of its members, which assign probabilities to the residues at each position and to the insertions and deletions between them. A profile search scores a database against the model rather than against a single query sequence, and this makes it sensitive to the family as a whole. Eddy (2011) described accelerated methods for these searches, which keep the sensitivity while reducing the time.

A fast tool must be checked. A tool built for near-identical matches will miss a distant relative, and a result that is clean for such a tool may be incomplete for the question. The reader should know what the tool can find and should not treat its silence as evidence of absence.

Sandve et al. (2013) recommended that the tools of an analysis and their versions be recorded, and a fast tool used in place of a sensitive one is a change in the method that the record must reveal.
