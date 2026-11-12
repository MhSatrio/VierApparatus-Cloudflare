---
title: "Scientific Programming"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The practice of writing software for scientific analysis that is correct, readable and maintainable, covering the structuring of a project into modules with clear inputs and outputs, the writing of tests that check functions against known answers, the handling of numerical precision and the pitfalls of floating-point arithmetic, the documentation of code so that its assumptions and units are explicit, the use of code review and continuous integration to catch errors early, the choice of languages and libraries suited to the analysis, and the recognition that code in research is an output that must be checked as carefully as the data it produces."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Structure an analysis project with modules that have explicit inputs, outputs and tests against known answers."
  - "Identify the numerical and unit errors that commonly corrupt scientific code and state how to detect them."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Scientific software is a research output in its own right, and its errors can change conclusions as surely as errors in the data. Peng (2011) argued that code used in published analyses should be held to the standard of the analysis it supports, since a bug in a single function can propagate into every figure. The practice of scientific programming therefore combines the habits of software engineering with an understanding of the statistical and numerical questions that the code must answer.

A well-structured project divides the analysis into modules, each with clear inputs, outputs and a single purpose. Such a structure makes the code easier to read, to test and to change, and it reveals the dependencies between steps. Sandve et al. (2013) recommended that the structure be documented so that another person can follow the path from raw data to result without reading every line.

Tests check that functions produce known answers for known inputs. A test might compare a statistical routine against a value computed by hand, or check that a function rejects an input of the wrong units. Tests catch errors when code changes, and they document the expected behaviour. Ioannidis (2005) described how undetected errors in analysis contribute to unreliable findings, and tests are a practical defence against them.

Floating-point arithmetic introduces rounding errors, and comparisons of computed values for exact equality are often wrong. Units are a common source of silent error, since a value in millimetres treated as metres changes the result by a factor of a thousand. The code should make units explicit and check them where they are combined. Peng (2011) emphasised that these details belong to the methods of a study, and they should be documented in the code and in the report.
