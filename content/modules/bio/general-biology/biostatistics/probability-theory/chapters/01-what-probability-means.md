---
title: "What Probability Means"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The meaning of probability in biological research, the frequentist interpretation as a long-run proportion and the subjective interpretation as a degree of belief, the axioms that every probability must satisfy, the events and their complements and the reason that a probability is a model of uncertainty rather than a property of the world that can be read directly from the data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Distinguish the frequentist and the subjective meanings of probability and state which one underlies a given biological statement."
  - "Apply the basic rules of probability to the complement and union of two events."
references:
  - "Wasserstein, R. L., & Lazar, N. A. (2016). The ASA statement on p-values: Context, process, and purpose. The American Statistician, 70(2), 129-133. https://doi.org/10.1080/00031305.2016.1154108"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Probability is a number between zero and one that expresses how likely an event is. Two interpretations dominate biological statistics. The frequentist interpretation defines the probability of an event as the proportion of times it would occur in a long run of repeated trials, so the probability that a mouse carries a mutation is the proportion of mice that carry it in an infinitely large population. The subjective interpretation defines it as a degree of belief given the available evidence, and the Bayesian methods of later chapters use it in this sense.

Both interpretations obey the same rules. The probability of any event lies between zero and one, the probability that something in the sample space occurs is one, and the probabilities of mutually exclusive events add. From these rules follow the complement rule, that the probability that an event does not occur is one minus its probability, and the addition rule for the union of two events. A laboratory that finds a gene in ten per cent of its samples and a second gene in twenty per cent can use these rules to compute the probability that a sample carries at least one of the two only if the events are independent or their overlap is known.

The distinction between the two meanings matters for interpreting a statistical statement. A p-value is defined in the frequentist sense, as the probability of data at least this extreme when the null hypothesis is true in repeated sampling. Wasserstein and Lazar (2016) explain that it is not the probability that the null hypothesis is true, which is a subjective quantity that the p-value does not supply.

Probability is a model. A probability assigned to a biological event rests on assumptions about the sampling and the process, and the number is only as good as those assumptions. Sandve et al. (2013) recommended that the assumptions of an analysis be stated, and a probability reported without its model is incomplete.
