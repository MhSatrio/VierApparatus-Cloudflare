---
title: "Reporting Python Analyses"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a Python analysis is reported so that its results can be reproduced, including the environment file that fixes package versions, the use of notebooks and their limits for reproducible work, the logging of parameters and data versions and the structure of a project directory that keeps raw data, code and results separate."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the files and records that allow another person to recreate the environment and rerun a Python analysis."
  - "Explain the advantages and limits of notebooks for reproducible biological analysis and how to use them with care."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Virtanen, P., Gommers, R., Oliphant, T. E., Haberland, M., Reddy, T., Cournapeau, D., Burovski, E., Peterson, P., Weckesser, W., Bright, J., van der Walt, S. J., Brett, M., Wilson, J., Millman, K. J., Mayorov, N., Nelson, A. R. J., Jones, E., Kern, R., Larson, E., . . . Vázquez-Baeza, Y. (2020). SciPy 1.0: fundamental algorithms for scientific computing in Python. Nature Methods, 17(3), 261-272. https://doi.org/10.1038/s41592-019-0686-2"
---

A Python analysis is reproducible when another person can recreate its environment, run its code on the same data and obtain the same results. Peng (2011) argued that this standard is essential for computational science, and Sandve et al. (2013) listed the practical steps. The first is a record of the environment, which is a file that names every package and its version. SciPy, described by Virtanen et al. (2020), changes between releases, so the file must be exact about versions.

Notebooks combine code, output and explanation in one document, and they are popular for exploratory analysis because each cell can be run and inspected in turn. Their weakness is that cells can be run out of order, so that the saved output no longer matches the code, and hidden state from earlier cells can affect later results. A notebook intended for reproducible work should be run from top to bottom before it is shared, and the analysis that matters should be moved into tested scripts.

Logging makes a run inspectable. The script should record its parameters, the names and checksums of its input files, the version of the code and the number of records processed. A log of this kind lets a later reader confirm that the run used the expected data and settings.

A project directory with a clear layout helps. Raw data are kept separate from processed data and results, the code lives in its own folder, and the scripts that produce each figure are named so that the mapping from result to code is obvious. Taschuk and Wilson (2017) recommended this structure for research software, since it reduces the time needed to find the code that produced a result.

Reporting completes the cycle. The methods section of a paper or the readme of a repository should name the environment file, the commit that produced the results, the commands that were run and the location of the data, so that the analysis can be repeated.
