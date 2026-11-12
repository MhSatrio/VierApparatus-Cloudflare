---
title: "Shell Scripts and Loops"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a shell script collects a sequence of commands into a file that can be run again, how loops apply the same command to every sample in a directory, how variables and arguments make a script reusable, how a script checks its inputs and stops on error and why a script that processes many samples must record which samples succeeded."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a shell script that applies the same analysis command to every sample in a directory and writes one output file per sample."
  - "Include checks that stop a script when an input is missing or a command fails, so that partial results are not mistaken for complete ones."
references:
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Li, H., & Durbin, R. (2009). Fast and accurate short read alignment with Burrows-Wheeler transform. Bioinformatics, 25(14), 1754-1760. https://doi.org/10.1093/bioinformatics/btp324"
---

A shell script is a text file that contains commands, which the shell runs in order. Once a sequence of commands has been written as a script, the analysis can be repeated exactly by running the file again. A loop repeats a command for each item in a list, so that a single command written for one sample can be applied to a hundred samples. For example, an alignment program run over every read file in a directory produces one alignment per sample, and the loop records the mapping from input to output in its own code.

Variables and arguments make the script reusable. A script that takes the name of the reference genome and the directory of samples as arguments can be used for another project without editing. Li and Durbin (2009) described an alignment method whose parameters, such as the reference and the number of threads, are typically passed in this way, which lets one script serve many datasets.

A robust script checks its inputs before it begins. It should stop if a required file is missing, and it should stop if any command returns an error, since a silent failure in the middle of a loop leaves partial results that look complete. The option that makes the shell exit on the first error is the simplest safeguard, and a check that the number of output files matches the number of inputs is a second one.

Taschuk and Wilson (2017) recommended handling errors explicitly in research software, because a program that fails quietly produces results that cannot be trusted. Sandve et al. (2013) recommended that the outputs of every step be checked, and a script that refuses to continue after an error enforces that check.

The script should write a log of the samples it processed, the parameters used and the time of each run. A log is the record that shows which samples were analysed with which settings, and it is the first thing a reviewer will ask for.
