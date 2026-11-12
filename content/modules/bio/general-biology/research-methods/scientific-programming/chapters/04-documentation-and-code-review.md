---
title: "Documentation and Code Review"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The documentation of scientific code and the review of code by a second person, covering the documentation of the purpose of each function, its inputs, outputs, units and assumptions, the recording of the reasons for non-obvious choices in comments and in the project log, the use of code review to find errors that the author cannot see, the checklist used in review that asks whether the code matches the method described in the report, whether the tests cover the cases that matter and whether the parameters are justified, the use of pull requests or equivalent records of each review, and the treatment of code review as an integral part of the scientific process rather than a formality."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Document a scientific function with its inputs, outputs, units and assumptions so that another analyst can use it correctly."
  - "Conduct a code review against the method described in a report and state the errors it is designed to catch."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Documentation makes the intention of code explicit, and it is most valuable to the person who must use the code without having written it. For a scientific function, the documentation should state what the function computes, what each input means and in which units, what it returns and what assumptions it makes. Sandve et al. (2013) recommended documentation of this kind as part of reproducible research, since an undocumented assumption can silently invalidate a result.

Comments should record the reasons for choices that are not obvious from the code. A line that uses a particular tolerance, a particular estimator or a particular exclusion rule needs a note explaining why, because the reason is the part that is lost over time. A project log that records decisions with their dates complements the comments, and it allows the history of the analysis to be reconstructed. Munafò et al. (2017) argued that the reasons for analytic decisions are as important to transparency as the decisions themselves.

Code review is the examination of code by a second person before it is accepted into the analysis. Reviewers find errors that the author, who knows what the code is meant to do, tends to overlook. The review should ask whether the code matches the method described in the report, whether the tests cover the cases that matter and whether each parameter is justified. Peng (2011) argued that such checks are needed because a computational error can be as damaging as an experimental one.

Records of reviews, such as the comments on a proposed change and the decision that followed, provide a trace of how the analysis was checked. Code review should be treated as an integral part of the scientific process rather than a formality, and it is most effective when the reviewer has time to examine the logic and is not merely asked to approve the formatting. Sandve et al. (2013) noted that such a practice improves both the quality of the code and the confidence that others can place in it.
