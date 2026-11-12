---
title: "Why the Command Line"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Why a command-line interface suits biological data and bioinformatics software, the terminal and the shell, the difference between a graphical application and a command that can be repeated and combined, the Unix philosophy of small tools that read and write text and the practical gains in speed, reproducibility and scale that the command line brings."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why a repeatable command is more useful for a biological analysis than a sequence of clicks in a graphical program."
  - "Describe the Unix principle of small programs that read and write text and how it applies to bioinformatics tools."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A graphical application presents a set of options and performs the one that is clicked. The result is convenient for a single task, but the steps are not recorded, they cannot easily be repeated on a hundred samples and they are hard to describe to another person. A command-line tool is different. It is invoked with a line of text that names the input, the output and the parameters, so the line itself is a record of the analysis, and the same line can be run again on another file or placed in a script.

The terminal is the window through which the command line is used, and the shell is the program that reads the commands, runs the programs they name and passes their output along. The shell is a language, with variables, loops and conditionals, and a researcher uses it to combine programs. Most bioinformatics software is distributed as command-line programs for this reason, and the graphical tools in the field are usually front ends to them.

The Unix philosophy, which underlies the command line, is to build programs that do one thing well and that read and write text. A program that counts lines, a program that selects columns and a program that sorts records can be chained together by the shell to answer a question that none of them answers alone. Biological files are mostly text or close to it, which makes this design a good match.

The gains are practical. A command that processes one file can be applied to many, the time to process a large file is often shorter than the time to load it into a program with a graphical interface, and the commands can be run on remote servers where no graphical interface is available. Stein (2010) described how genome analysis moved to such remote and shared resources, and the command line is the standard way to use them.

Sandve et al. (2013) recommended that the commands used in an analysis be recorded, and the command-line habit makes that recording routine.
