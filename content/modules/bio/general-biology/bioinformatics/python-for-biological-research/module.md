---
title: "Python for Biological Research"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Programming in Python for biological data, covering the core data types, reading and writing sequence files with Biopython, numerical work with NumPy and SciPy, writing functions and scripts that can be rerun, testing and version control, handling data too large for memory and reporting analyses so that they can be reproduced."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write Python code that reads a sequence file, filters or transforms its records and writes the results."
  - "Structure an analysis as tested, versioned functions and scripts that another person can rerun."
references:
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
  - "Virtanen, P., Gommers, R., Oliphant, T. E., Haberland, M., Reddy, T., Cournapeau, D., Burovski, E., Peterson, P., Weckesser, W., Bright, J., van der Walt, S. J., Brett, M., Wilson, J., Millman, K. J., Mayorov, N., Nelson, A. R. J., Jones, E., Kern, R., Larson, E., . . . Vázquez-Baeza, Y. (2020). SciPy 1.0: fundamental algorithms for scientific computing in Python. Nature Methods, 17(3), 261-272. https://doi.org/10.1038/s41592-019-0686-2"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Python is the most widely used language for biological data analysis, because it is readable, has a large library of scientific packages and can be used for small scripts and for large pipelines alike. This topic teaches the language in the form that biological work needs. It begins with the data types that hold sequences, annotations and measurements, and then moves to the libraries that read biological file formats and perform numerical work on the results.

The chapters build a working habit as well as a set of skills. Biopython provides the readers and the sequence objects that the bioinformatics topics rely on, and NumPy and SciPy provide the arrays and statistical routines for quantitative analysis. Code is organised into functions and scripts, tested, placed under version control and run from the command line, so that an analysis can be repeated.

The topic also addresses the scale of biological data. A sequencing run can contain millions of records, and a program that loads everything into memory will fail on a laptop. Iterators and streaming methods allow the same analysis to be performed on data of any size.

The final chapter covers reporting. Cock et al. (2009) described the Biopython package, and the practices that make a Python analysis trustworthy are those that Taschuk and Wilson (2017) and Sandve et al. (2013) describe for research software in general.
