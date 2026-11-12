---
title: "Project Structure"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The organisation of a scientific programming project so that its data, code, outputs and documentation are separated and its steps are traceable, covering the separation of raw data, processing scripts, analysis functions and generated outputs into distinct directories, the use of a single entry point that runs the pipeline in order, the naming of files so that their purpose and their version are clear, the writing of a README that states the inputs, the outputs and the commands to reproduce them, the keeping of generated outputs out of the source tree so that they can be regenerated, and the use of configuration files that hold parameters separately from code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Organise a research project into separate directories for raw data, code, configuration and outputs."
  - "Write a README that states the inputs, outputs and commands needed to reproduce the analysis."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

The structure of a project determines how easily it can be understood, checked and rerun. A common arrangement separates the raw data, which are never changed, from the processing scripts, the analysis functions, the configuration and the generated outputs. Each lives in its own directory, and the boundaries between them make the flow of the analysis visible. Sandve et al. (2013) recommended this kind of organisation as a basic rule of reproducible computing, since it lets a reader find each component without searching.

A single entry point runs the whole pipeline in the correct order. Someone who wishes to reproduce the results should need only one command, and that command should call each step in sequence. When the steps must be run by hand, the order is easily lost, and results are produced from a mixture of old and new intermediate files. Peng (2011) argued that the path from data to result should be explicit, and an entry point is the simplest way to make it so.

File names should state the purpose of each file and, where relevant, its version or date. A name such as analysis_final_v3_revised.R tells a reader little, whereas a name that describes the analysis it performs is easier to maintain. Munafò et al. (2017) argued that clarity in the materials of a study supports its transparency, and consistent naming is one of the simplest ways to achieve it.

The README is the document a reader sees first, and it should state the inputs the project requires, the outputs it produces and the commands needed to reproduce them. Generated outputs should be kept out of the source tree, so that they can be deleted and regenerated without risk. Parameters that might change, such as thresholds or file paths, should be held in configuration files rather than scattered through the code, so that a change is made in one place and recorded in the history.
