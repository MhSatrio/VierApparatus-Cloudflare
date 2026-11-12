---
title: "Linux and Command-Line Computing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Working in a Unix-like command line for biological data, covering the file system and permissions, the text-processing tools that filter and transform large files, pipes and redirection, shell scripts that repeat steps over many samples, environment variables and package management, and the remote access and process monitoring needed to run analyses on servers and clusters."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Use the command line to find, inspect, filter and transform biological files without opening them in a graphical program."
  - "Write a shell script that repeats an analysis over a set of samples and records what it did."
references:
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
---

Most bioinformatics software is run from a command line, and the large files of biological data are handled far more easily there than in a graphical application. The command line is a language for combining small, specialised programs, each of which does one job and reads and writes plain text. A researcher who can use it can filter a file with millions of lines, count the records that match a condition or run an alignment over a hundred samples, without writing a new program for each step.

The topic begins with the file system, the permissions that control who can read and change a file, and the basic commands for moving through directories and listing their contents. It then covers the text-processing tools that select lines, extract columns and transform fields, and the pipes that connect them. Shell scripts repeat a sequence of commands over many inputs, and the environment variables and package managers set up the software on which the commands rely.

The last chapters address the setting in which large analyses are run. Analyses are often performed on remote servers and clusters, which requires secure remote login, the monitoring of running processes and the recording of what was run. Stein (2010) described how genome analysis moved to shared and remote computing, and the command line is the usual interface to those resources.

Taschuk and Wilson (2017) recommended that research software be written so that it can be run by others, and the command-line habits in this topic are the first step in that direction. Sandve et al. (2013) recommended that every command that produces a result be recorded, and a script or a logged command history serves that purpose.
