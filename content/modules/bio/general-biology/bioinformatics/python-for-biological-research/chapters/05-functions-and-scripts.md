---
title: "Functions and Scripts"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How to organise biological analysis code into functions with clear inputs and outputs, how to combine functions into a script that runs from the command line with parameters given as arguments, how to avoid global state and hard-coded paths, and how the structure of the code makes each step easier to test and to change."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a function with clear inputs and outputs that performs one step of a biological analysis and can be called from other code."
  - "Turn an analysis into a script that takes its input files and parameters from the command line rather than from hard-coded values."
references:
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
---

A function packages one step of an analysis under a name, with the data it needs passed in as arguments and the result returned as a value. A function that filters records by length takes the records and the limits as inputs and returns the retained records, and it does nothing else. Such a function can be tested with a small input, reused in another analysis and read by someone who does not know the rest of the code. Taschuk and Wilson (2017) recommended this separation of concerns as a basic practice for research software, because it localises errors.

Global variables and hard-coded values are the main cause of code that cannot be reused. A script that reads a file called data.fasta from a fixed directory, with a threshold typed into the middle of a loop, works only for its original author on the original data. The same analysis written with the file name and the threshold as parameters can be run on any dataset, and the parameters are recorded in the command that produced the result.

A script is a file that combines the functions in the right order and handles the command line. Python's argument parser reads the input files and the parameters from the command line, calls the functions and writes the output. The script should print the parameters it used and the number of records it processed, so that the log of each run records what was done.

Cock et al. (2009) show the same pattern in the Biopython modules, whose functions take sequence objects as inputs and return new objects, so that composed operations are easy to build.

Sandve et al. (2013) recommended that every parameter that affects a result be recorded with the output. A script whose parameters are arguments meets this requirement by construction, since the command line itself is a record of the analysis.
