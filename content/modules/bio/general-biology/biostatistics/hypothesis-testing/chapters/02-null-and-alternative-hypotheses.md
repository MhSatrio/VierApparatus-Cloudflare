---
title: "Null and Alternative Hypotheses"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the null and alternative hypotheses of a biological study are formulated, the difference between a point null and an interval null, the one-sided and two-sided alternatives and how the choice between them must be made before the data are examined, the translation of a biological question into a statistical hypothesis about a parameter and the risk of stating the hypotheses after the result is known."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Translate a biological question into a null and an alternative hypothesis about a named parameter."
  - "Choose a one-sided or two-sided alternative before the data are examined and justify the choice."
references:
  - "Neyman, J., & Pearson, E. S. (1933). On the problem of the most efficient tests of statistical hypotheses. Philosophical Transactions of the Royal Society of London. Series A, Containing Papers of a Mathematical or Physical Character, 231(694-706), 289-337. https://doi.org/10.1098/rsta.1933.0009"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A hypothesis is stated about a parameter of a model, not about the biology directly. The biological question, such as whether a gene affects the size of an organ, must be translated into a statement about a quantity: the difference in mean organ size between genotypes is zero or it is not. The null hypothesis is the statement of no difference, and it is the one the test assumes. The alternative is the statement that the study is designed to detect, and the translation from question to parameter is the first step of any test.

The alternative may be one-sided or two-sided. A two-sided alternative asks whether the parameter differs from the null in either direction, and a one-sided alternative asks only about one direction. A one-sided test has more power in its chosen direction but cannot detect an effect in the other, and it is appropriate only when an effect in the other direction is of no interest. Neyman and Pearson (1933) defined the alternative as part of the test, which is why its choice must be fixed in advance.

Choosing the direction after seeing the data is a serious error. A one-sided test chosen because the effect went the expected way halves the p-value and makes a weak result look significant, and Ioannidis (2005) described how such flexibility in analysis produces findings that do not replicate. The choice should be recorded in the protocol before the data are collected or examined.

A point null, which states that the parameter is exactly zero, is rarely true in biology, where almost every treatment or genotype has some effect. A test of the point null with a large sample will almost always reject, even for an effect too small to matter. Wasserstein and Lazar (2016) make this point, and an interval null, which states that the effect lies within a range of no practical importance, is often a better question.

Sandve et al. (2013) recommended recording the hypotheses before the analysis, and the parameter, the null, the alternative and the direction are the statements that every test depends on.
