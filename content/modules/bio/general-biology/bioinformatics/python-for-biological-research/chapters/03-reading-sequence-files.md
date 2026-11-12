---
title: "Reading and Writing Sequence Files"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How to read FASTA and FASTQ files with Biopython, how the sequence records and their annotations are represented in memory, how to filter records by length or quality and write the results to a new file, and the common errors that occur when a file is malformed or when its quality encoding is misread."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a Python script that reads a FASTA file, filters its records by length and writes the retained records to a new file."
  - "Identify the causes of a malformed-file error and check a file before running an analysis on it."
references:
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

Reading a file is the first step of most analyses, and it is where many errors begin. The Biopython module SeqIO reads a FASTA or FASTQ file as a sequence of records, and each record holds an identifier, a description, the sequence and, for FASTQ, the quality score of each base. Cock et al. (2009) describe these record objects. A loop over the records reads one at a time, so the file need not fit in memory, and each record can be filtered and written out as the loop proceeds.

A simple script filters a FASTA file by length. It opens the input and an output file, iterates over the records, keeps those whose sequence length lies within a range and writes the kept records with the same parser. The parser ensures that the output is correctly formatted, which a hand-written writer might not achieve. The script is short, but it contains the three steps of most sequence processing: read, decide and write.

Errors occur at each step. A file with a missing header line or with spaces inside the sequence may be read incorrectly, and the parser raises an exception that points to the offending line. A FASTQ file whose quality encoding differs from the one the program expects gives quality values that are shifted, and the analysis proceeds without any warning. The defence is to check the first records of each file by eye and to test the code on a small file whose content is known.

Taschuk and Wilson (2017) recommended that research software be tested on small inputs with known outputs, and a small test file of this kind makes a useful first check. The test file should be kept under version control, so that a future change to the script can be checked against the same expected result.

Writing the output with the library, rather than by string concatenation, keeps the file correctly formatted and makes the output reusable by other tools.
