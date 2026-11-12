---
title: "Hypothesis Testing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The logic and practice of testing a biological hypothesis against data, covering the null and alternative hypotheses, the p-value and what it does and does not mean, the Neyman and Pearson framework of error rates and power, the one-sample and two-sample t tests, the correction of many tests for multiplicity with the false discovery rate and the misuse of tests through selective reporting, with the reporting that allows a test to be judged."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "State a null and an alternative hypothesis for a biological question and choose a test that matches the design."
  - "Explain what a p-value means, what it does not mean and how the error rates of a test are controlled."
references:
  - "Neyman, J., & Pearson, E. S. (1933). On the problem of the most efficient tests of statistical hypotheses. Philosophical Transactions of the Royal Society of London. Series A, Containing Papers of a Mathematical or Physical Character, 231(694-706), 289-337. https://doi.org/10.1098/rsta.1933.0009"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Benjamini, Y., & Hochberg, Y. (1995). Controlling the false discovery rate: A practical and powerful approach to multiple testing. Journal of the Royal Statistical Society: Series B (Methodological), 57(1), 289-300. https://doi.org/10.1111/j.2517-6161.1995.tb02031.x"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A hypothesis test asks whether the data are compatible with a stated null hypothesis, usually a statement of no effect, or whether they favour an alternative. The test does not prove either. It computes how surprising the data would be if the null were true, and it reaches a decision according to a rule fixed in advance. The framework was set out by Neyman and Pearson (1933), who showed how to choose a test that controls the rate of false rejections while keeping the rate of missed effects as low as possible.

The topic covers the logic of the test and its main forms. The null and alternative must be stated before the data are examined, and the test must match the design. The p-value is the probability of data at least as extreme as those observed if the null were true, and Wasserstein and Lazar (2016) explain at length how it is misread. The t tests of Student (1908) compare means, and the correction for many tests, by Benjamini and Hochberg (1995), controls the false discovery rate when thousands are performed.

A test is a decision procedure, and its use carries responsibilities. Ioannidis (2005) described how selective reporting and flexible analysis can make many tests produce findings that do not hold, and the discipline of the topic is to fix the test in advance and to report every test performed.
