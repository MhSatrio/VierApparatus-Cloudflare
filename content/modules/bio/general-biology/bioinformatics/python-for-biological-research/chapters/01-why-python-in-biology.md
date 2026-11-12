---
title: "Why Python in Biology"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Why Python has become the common language of biological data analysis, the balance between readability and speed in a scientific language, the role of the interpreter, the packages that extend it to sequences and statistics and how a Python environment is set up so that the same code runs on different machines."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why Python is widely used for biological data analysis and what its main trade-offs are."
  - "Set up a Python environment with the packages needed for sequence analysis and record its contents."
references:
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Virtanen, P., Gommers, R., Oliphant, T. E., Haberland, M., Reddy, T., Cournapeau, D., Burovski, E., Peterson, P., Weckesser, W., Bright, J., van der Walt, S. J., Brett, M., Wilson, J., Millman, K. J., Mayorov, N., Nelson, A. R. J., Jones, E., Kern, R., Larson, E., . . . Vázquez-Baeza, Y. (2020). SciPy 1.0: fundamental algorithms for scientific computing in Python. Nature Methods, 17(3), 261-272. https://doi.org/10.1038/s41592-019-0686-2"
---

Python is an interpreted language, which means that a program runs line by line under the control of an interpreter. This makes it slower than compiled languages for tight numerical loops, but it allows a scientist to explore data interactively, to change a step and see the result at once and to combine many libraries in one program. For most biological analyses the cost of the computation is small compared with the time needed to design and check the analysis, so the trade-off favours readability.

The language owes its place in biology to its libraries. Cock et al. (2009) described Biopython, a collection of modules that read and write the standard sequence and annotation formats, that represent sequences with their annotations and that provide interfaces to biological databases and to alignment programs. Using these modules, a researcher avoids writing a parser for each format, and the parsers are tested by many users.

Numerical work uses the NumPy array, which stores large collections of numbers efficiently and performs operations on them without explicit loops, and the SciPy library, which provides statistical tests, optimisation and signal processing. Virtanen et al. (2020) described SciPy 1.0 and the algorithms it contains, and these are the routines that most quantitative biological analyses call.

Setting up an environment is the first practical step. Each analysis depends on specific versions of its packages, and a mismatch between versions can change results or stop code from running. Environments should be created for each project, with their package versions recorded in a file that can be used to recreate them on another machine.

Sandve et al. (2013) recommended that the software environment be recorded as part of an analysis, and an environment file is the simplest means of doing so.
