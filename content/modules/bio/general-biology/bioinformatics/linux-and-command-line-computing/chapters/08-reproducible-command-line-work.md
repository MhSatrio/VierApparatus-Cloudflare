---
title: "Reproducible Command-Line Work"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How command-line work is made reproducible, including the recording of the commands and their outputs in logs, the use of version control for scripts and configuration files, the separation of raw data, code and results in a directory layout, the checksums that confirm a file has not changed and the project documentation that allows another person to run the analysis from the start."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Create a log of the commands and parameters used for a command-line analysis and explain what each entry must contain."
  - "Use checksums to confirm that a data file is unchanged between two runs of an analysis."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A command-line analysis is reproducible when its commands, inputs, parameters and environment are recorded well enough for another person to run it again and obtain the same results. Peng (2011) argued that this record is the minimum that makes a computational result scientific, and Sandve et al. (2013) set out the practical rules. The record of a command-line analysis is kept in a few forms: the scripts that run it, the log of what was run and the environment in which it ran.

A log records each command, the time it was run, its parameters, the versions of the programs and the outcome. A log written automatically by the script is more reliable than one written from memory, and it is the first thing that a reviewer or a collaborator needs. The log should be kept with the results, not in a separate place that may be lost.

Checksums confirm that a file has not changed. A checksum is a short value computed from the contents of a file, and if the file is altered by even one byte, the checksum changes. Recording the checksums of the raw data at the start of an analysis, and checking them at each run, guards against silent changes to the input that would alter the results.

Version control applies to the scripts and to the configuration files of the analysis. Taschuk and Wilson (2017) recommended it for research software, since each change to a script is then recorded with its reason. A tagged version of the code can be cited with the results it produced.

Alberts et al. (2022) describe the molecular processes that the data record, and a reproducible analysis allows the reader to check whether those processes have been measured correctly. The project directory, with its raw data, scripts, logs and results kept apart, is the structure that makes such checking possible.
