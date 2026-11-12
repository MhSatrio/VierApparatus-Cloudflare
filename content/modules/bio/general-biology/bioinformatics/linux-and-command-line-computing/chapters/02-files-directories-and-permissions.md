---
title: "Files, Directories and Permissions"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a Unix-like file system is organised into a tree of directories, the paths that locate a file, the commands that list, copy, move and remove files, the permission bits that control reading, writing and execution by the owner, the group and others, and the care needed when deleting or overwriting the raw data of an analysis."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Navigate a directory tree and locate a file using an absolute or a relative path."
  - "Read the permission bits of a file and explain who may read, write and execute it."
references:
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A Unix-like system organises its files in a single tree of directories, with the root directory at the top and each directory containing files and further directories. A path names a file by listing the directories that lead to it. An absolute path begins at the root, and a relative path begins at the current working directory. Confusion between the two is a common source of errors, since a script that uses a relative path works only when it is run from the expected directory, and the cure is to build paths explicitly from a known base.

The basic commands list the contents of a directory, show the current location, create directories, copy, move and remove files. The removal command deletes a file without asking for confirmation and without a recycle bin, so a mistaken removal of raw data is permanent. A rule that is worth following is to keep the raw data read-only, so that accidental writes fail, and to make all derived files in a separate directory that can be regenerated.

Every file has permission bits that control who may read it, who may write to it and who may execute it. The bits are set for the owner, the group and everyone else. A raw data file that is read-only for everyone protects it from change by a script, and a script that must be run needs the execute bit. Reading the permission bits in a listing is the first step in diagnosing a file that cannot be opened or a program that will not run.

Taschuk and Wilson (2017) recommended protecting the data on which a result depends, and read-only permissions on the raw data are a simple implementation of that advice. Sandve et al. (2013) recommended keeping the raw data unchanged, so that every result can be regenerated from them.

The principle is that a result should never depend on a file that was altered in place. A derived file is written anew from the raw data each time the analysis runs, so that its provenance is never in doubt.
