---
title: "Environment Variables, Paths and Packages"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How environment variables hold the settings that programs read, how the search path tells the shell where to find a command, the risks of installing software into the system directories, the use of package managers and isolated environments to install bioinformatics tools with fixed versions and the recording of the installed versions so that an analysis can be repeated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain what the search path is and how a command that is not found on it produces an error."
  - "Create an isolated environment with fixed tool versions and record the versions so that the environment can be recreated."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
---

An environment variable is a named value that the shell and the programs it runs can read. Settings such as the location of a reference database, the number of processors a program may use or the language of the output are commonly passed in this way. The variables that a program sees depend on the shell from which it was started, so a script run from a different terminal can behave differently, and a careful script sets the variables it needs explicitly.

The search path is an environment variable that lists the directories in which the shell looks for a command. When a command is typed, the shell searches each directory in turn for a program of that name. A command that is installed but in a directory not on the path produces a not-found error, and a command with the same name in an earlier directory may run instead of the intended one. Checking which program is run, rather than assuming it, is part of diagnosing these errors.

Installing bioinformatics software into the system directories is a common mistake. Different projects need different versions of the same tool, and a system-wide installation can serve only one of them. Package managers and isolated environments solve the problem by installing each project's tools into a separate location with its own versions, so that the projects do not interfere.

The installed versions must be recorded. An environment file that lists each tool and its version allows the environment to be recreated on another machine, and Sandve et al. (2013) recommended recording the software and its version for every analysis. Taschuk and Wilson (2017) recommended that research software be distributed with its dependencies stated, which is what the environment file does.

Biopython, described by Cock et al. (2009), depends on other packages whose versions must be kept consistent, and isolation of environments is the practical way of doing so.
