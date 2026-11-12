---
title: "BLAST Programs for Nucleotides and Proteins"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The BLAST programs that search nucleotide and protein databases with nucleotide and protein queries, including blastn, blastp, blastx and tblastn, how each combination of query and database is translated into a search, how the frame translation of blastx and tblastn is handled and how the choice of program follows from the question and the sequence type of the data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose the BLAST program that matches the type of the query and the type of the database."
  - "Explain how blastx and tblastn translate a sequence in all six reading frames before comparing it."
references:
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Altschul, S. (1997). Gapped BLAST and PSI-BLAST: a new generation of protein database search programs. Nucleic Acids Research, 25(17), 3389-3402. https://doi.org/10.1093/nar/25.17.3389"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The BLAST family is named by the type of query and the type of database. A blastn search compares a nucleotide query with a nucleotide database, blastp compares a protein query with a protein database, and the two mixed forms translate one side into protein. Altschul et al. (1990) described the method for the comparison of sequences, and the programs apply it to the alphabet of their inputs. Choosing the wrong program is an error that gives results without any warning, so the choice is made from the data before the search.

The translated programs use the genetic code. In blastx, a nucleotide query is translated in all six reading frames and each translation is searched against a protein database. This is useful for a coding sequence whose protein has no close nucleotide relative, since the amino acid sequence is conserved over longer evolutionary distances than the nucleotide sequence. In tblastn, a protein query is searched against the six-frame translations of a nucleotide database, which finds protein-coding regions in a genome or in unannotated sequence.

Altschul (1997) described the gapped form of BLAST, which joins several high-scoring segments into a single alignment with gaps, and the programs use this form in their output. The output of a translated search reports the reading frame of each hit, and a hit in an unexpected frame may be a frameshift or an artefact of a sequencing error.

The program is chosen from the question. A nucleotide query against nucleotide data is the natural choice when the sequences are close relatives. A protein-level search is more sensitive for distant relatives. A translated search is needed when one side of the comparison is available only as nucleotides or only as protein.

Sandve et al. (2013) recommended that the program and its version be recorded with the search. A result from blastx and one from blastn are different experiments, and the record should name the program used.
