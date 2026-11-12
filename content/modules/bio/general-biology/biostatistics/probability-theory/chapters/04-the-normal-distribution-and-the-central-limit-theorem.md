---
title: "The Normal Distribution and the Central Limit Theorem"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The normal distribution as the model of many continuous biological measurements, its mean and standard deviation, the standard normal and the use of z-scores, the central limit theorem that makes averages of many independent measurements approximately normal whatever their individual distribution, the conditions for the theorem to apply and the reasons a normal model may still fail for skewed or bounded biological variables."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Standardise a measurement with a z-score and use the standard normal distribution to find a probability."
  - "Explain why the average of many independent measurements is approximately normal and state when this approximation can fail."
references:
  - "Student. (1908). The probable error of a mean. Biometrika, 6(1), 1-25. https://doi.org/10.2307/2331554"
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Bland, J. M., & Altman, D. G. (1986). Statistical methods for assessing agreement between two methods of clinical measurement. The Lancet, 327(8476), 307-310. https://doi.org/10.1016/S0140-6736(86)90837-8"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The normal distribution is the bell-shaped model that describes many continuous measurements: the height of plants of one variety, the concentration of a hormone in a population of healthy individuals and the errors of repeated laboratory measurements. It is defined by two parameters, the mean, which locates its centre, and the standard deviation, which measures its spread. About two thirds of its values lie within one standard deviation of the mean and about ninety-five per cent within two.

The standard normal distribution has mean zero and standard deviation one. Any normal variable can be converted to it by subtracting the mean and dividing by the standard deviation, and the result is the z-score. The z-score tells how many standard deviations a value lies from the mean, and the probability of a range of values is read from the standard normal table or computed from it. Student (1908) worked out the distribution of the mean of a small sample from normal data, and the t distribution that bears his pseudonym is the form in which this result is used today.

The central limit theorem explains why the normal distribution is so widely used. The average of many independent measurements is approximately normal, even when the measurements themselves are not, provided their variance is finite. A mean of thirty independent measurements of a skewed quantity is usually close to normal, which justifies the use of methods based on the normal distribution for means.

The approximation can fail. A small sample from a strongly skewed distribution is not well described by the normal, and a bounded variable such as a percentage can be poorly modelled by a normal that extends beyond its limits. Bland and Altman (1986) showed that the agreement between two methods of measurement is assessed through the differences between them, and a difference that is not normal requires a different treatment.

Wasserstein and Lazar (2016) note that a p-value based on the normal approximation is only as accurate as the approximation, and Sandve et al. (2013) recommended recording the distributional assumptions of an analysis, including the checks made to support them.
