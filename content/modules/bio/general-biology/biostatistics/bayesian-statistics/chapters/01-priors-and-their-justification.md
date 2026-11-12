---
title: "Priors and Their Justification"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The prior distribution of a Bayesian model and how it is chosen, including informative priors drawn from earlier biological knowledge, weakly informative priors that constrain implausible values without fixing the answer, the vague or flat priors whose consequences for small samples must be considered, the elicitation of priors from experts and the reporting of the prior so that a reader can see its influence on the conclusion."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a prior for a biological parameter from earlier knowledge and state the reason for its form."
  - "Explain how a prior influences the posterior and why this influence is largest when the data are few."
references:
  - "Gelman, A., & Shalizi, C. R. (2013). Philosophy and the practice of Bayesian statistics. British Journal of Mathematical and Statistical Psychology, 66(1), 8-38. https://doi.org/10.1111/j.2044-8317.2011.02037.x"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

The prior is the part of a Bayesian model that is stated before the data are seen, and it is the most contested part of the approach. An informative prior encodes earlier knowledge, such as the expected size of an effect from previous experiments, and a weakly informative prior constrains the parameter to plausible values without strongly favouring any one of them. A vague prior, spread so widely that it is nearly flat, is sometimes used to let the data speak, but it is not neutral: a flat prior on a parameter that can be large gives weight to implausible values, and it can make the posterior unstable in small samples.

Gelman and Shalizi (2013) argue that priors should be chosen as part of the model, with their consequences examined, and that a prior that makes the data irrelevant is a sign of a poor model. The choice should draw on biological knowledge, such as the range of values a rate or a concentration can take, and the reasons for the choice should be written with the model.

The influence of the prior is greatest when the data are few. With a large sample the likelihood dominates and the posterior is little changed by the prior, but with a small sample the prior can determine the conclusion. Ioannidis (2005) described how the prior probability of a relationship shapes how far a finding can be believed, and the reader must see how much of the posterior comes from the prior and how much from the data.

Priors may be elicited from experts, who state their beliefs about a quantity, and the elicited distribution is then used as the prior. The procedure must be recorded, since the elicited prior depends on the experts and on how the question was put to them.

Sandve et al. (2013) recommended recording the priors and the reasons for them, and a sensitivity analysis that shows how the conclusion changes with the prior is the form of this record that a reader needs.
