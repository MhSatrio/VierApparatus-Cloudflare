---
title: "Pipes, Redirection and Text Processing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How standard input, standard output and standard error are redirected to files and joined by pipes, the text-processing tools that select lines by pattern, extract and cut columns, sort and count records and the practical use of these tools on tab-separated biological files, such as counting the reads that match a feature or extracting the sequence identifiers from an annotation."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Build a pipeline of text-processing commands that selects and counts records in a tab-separated biological file."
  - "Explain how redirection and pipes connect the output of one program to the input of another."
references:
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Each command-line program has three default streams: standard input, from which it reads, standard output, to which it writes its results, and standard error, to which it writes messages. Redirection sends a stream to a file, and a pipe connects the standard output of one program to the standard input of the next. A pipeline of several programs can therefore process a file in a single line, with each program doing one step and no intermediate file being needed unless the analyst wants one.

Several small tools cover most of the text processing that biological files require. A tool that selects lines matching a pattern, a tool that cuts out chosen columns, a tool that sorts records and a tool that counts identical lines can be combined to answer many questions. Counting the features in an annotation that have a given type, for example, requires selecting the lines of that type, cutting the column that holds the type and counting the result.

Tab-separated files are the most common format for such work, and each field is separated by a tab character. The column tools must be told the separator, and a file that uses spaces in one place and tabs in another will give wrong results without an error message. Checking the first few lines of a file and the number of fields in each line is the simplest defence.

Taschuk and Wilson (2017) recommended that research software be tested on inputs whose answers are known, and a pipeline can be tested in the same way on a small file. A pipeline that gives the expected count on the test file is more likely to give the correct count on the full data.

Sandve et al. (2013) recommended recording the commands used to produce each result, and a pipeline written in a script is such a record. The Python library Biopython, described by Cock et al. (2009), implements the same steps in code.
