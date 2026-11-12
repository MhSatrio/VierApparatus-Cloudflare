---
title: "The Logic of a Test"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The logical structure of a hypothesis test, in which the null hypothesis is assumed for the sake of argument, the test statistic is computed from the data, its distribution under the null is used to judge how surprising the data are and a decision is made by a rule fixed before the data are examined, with the reasons the test cannot establish that the null is true and the role of the test in a process of falsification."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the steps of a hypothesis test from the stated hypotheses to the decision and state what each step contributes."
  - "Explain why failing to reject a null hypothesis is not evidence that the null is true."
references:
  - "Neyman, J., & Pearson, E. S. (1933). On the problem of the most efficient tests of statistical hypotheses. Philosophical Transactions of the Royal Society of London. Series A, Containing Papers of a Mathematical or Physical Character, 231(694-706), 289-337. https://doi.org/10.1098/rsta.1933.0009"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A hypothesis test begins by assuming the null hypothesis, a statement such as that a treatment has no effect on growth, and asks what the data would look like if that assumption were true. A test statistic is computed from the data, and its distribution under the null is used to judge how unusual the observed value is. If the value is very unusual, the data are taken as evidence against the null, and the null is rejected according to a decision rule set before the data were seen.

The argument is indirect. It does not show that the null is false, and it does not show that the null is true when it is not rejected. Failing to reject a null hypothesis means only that the data do not contain enough evidence against it, which may be because the effect is absent, or because the study was too small to detect it. Neyman and Pearson (1933) defined the alternative and the error rates explicitly so that the two kinds of decision could be weighed.

Platt (1964) recommended a form of reasoning in which a hypothesis is tested against its alternatives and the experiment is designed to exclude them. A hypothesis test is a limited version of that idea: it excludes one explanation, the null, under a model. The test is most informative when the alternative is also specified and the experiment can tell the two apart.

The decision rule must be fixed in advance. A threshold chosen after seeing the data, or a test chosen because it gives the desired answer, invalidates the error rates the test claims to control. Wasserstein and Lazar (2016) stress that a p-value is not a substitute for judgement about the study, and the logic must be applied to a pre-specified question.

Sandve et al. (2013) recommended recording the null and alternative hypotheses, the test and the decision rule, so that the test can be assessed against the question it was built to answer.
