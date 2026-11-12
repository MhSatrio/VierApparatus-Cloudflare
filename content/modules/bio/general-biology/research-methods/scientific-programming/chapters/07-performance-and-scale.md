---
title: "Performance and Scale"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The management of computational performance and scale in scientific analyses, covering the profiling of code to find the parts that consume most time or memory before any optimisation is attempted, the choice of algorithms whose cost grows acceptably with the size of the data, the processing of data in chunks that do not require the whole dataset in memory, the parallelisation of independent tasks across processors, the verification that an optimised version gives the same result as the original, and the recording of the hardware and the timings so that the performance claims of the analysis can be checked."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Profile an analysis to locate its most expensive steps before attempting any optimisation."
  - "Verify that an optimised implementation gives the same result as the original within a stated tolerance."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Scientific analyses grow with the data, and a script that runs in seconds on a pilot dataset may take days on the full one. Performance work should begin with measurement. Profiling identifies the few steps that consume most of the time or memory, and effort spent on other steps is usually wasted. Peng (2011) argued that the analysis must remain reproducible as it is made faster, so optimisation is a change to the code that must be checked like any other.

The algorithm chosen often matters more than its implementation. A method whose cost grows with the square of the number of observations becomes impractical at large scale, while an alternative whose cost grows linearly remains feasible. Sandve et al. (2013) recommended that the scaling of a method be considered when it is chosen, since a method that works on a small dataset may silently become infeasible when the data grow.

Large datasets may not fit in memory, and they can be processed in chunks, with partial results combined at the end. This approach requires that the combination be exact, so that the chunked result equals the result that would have been obtained from the whole dataset. Independent tasks, such as the analysis of each subject, can be run in parallel across processors, and the results must again be identical to the serial version.

An optimised implementation must be verified against the original on the same inputs. Differences in order of summation or in the choice of library can change results slightly, so the comparison should be made within a stated tolerance. Ioannidis (2005) described how errors introduced in analysis may go unnoticed, and the verification of an optimisation is a safeguard against that error. The hardware and the timings should be recorded, so that any performance claim in the report can be checked.
