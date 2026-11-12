---
title: "File Formats"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The common file formats of bioinformatics, namely FASTA for sequences, FASTQ for reads with quality scores, the SAM and BAM formats for alignments, VCF for variants and GFF for annotations, their structure, how they are read and written, and the errors that arise when a format is misunderstood or when its fields are mis-specified."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the structure of the FASTA, FASTQ and SAM formats and what each field records."
  - "Explain why a mismatch between the expected and actual format of a file leads to errors that may not be obvious."
references:
  - "Li, H., & Durbin, R. (2009). Fast and accurate short read alignment with Burrows-Wheeler transform. Bioinformatics, 25(14), 1754-1760. https://doi.org/10.1093/bioinformatics/btp324"
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Biological data are stored in files whose formats are agreed conventions, and a bioinformatic analysis depends on reading those conventions correctly. The FASTA format stores a sequence as a header line beginning with a greater-than sign, followed by the sequence itself, usually wrapped at a fixed width. It carries no quality information, and it is the common format for reference genomes and for protein sequences. Cock et al. (2009) describe the Biopython library, which reads and writes FASTA and the other formats discussed here.

The FASTQ format stores sequencing reads together with a quality score for each base. Each record has four lines: an identifier, the sequence, a separator and a string of quality characters encoded as numbers. The encoding of the quality score differs between sequencing generations, and reading a file with the wrong offset gives quality values that are systematically wrong.

The SAM format records the alignment of each read to a reference. Each line gives the read name, the position and strand of the alignment, a CIGAR string that describes matches, insertions and deletions, the mapping quality and the sequence and its qualities. The BAM format is the compressed binary version, and most tools read BAM directly. Li and Durbin (2009) introduced the alignment method whose output is commonly written in this format.

The VCF format records genetic variants, and the GFF format records genome annotations. Both require careful reading, because the fields are defined precisely and small deviations change the meaning of the data.

Sandve et al. (2013) recommended that each file be checked against its format specification and that the software versions be recorded, so that a format misreading does not pass unnoticed into the results.
