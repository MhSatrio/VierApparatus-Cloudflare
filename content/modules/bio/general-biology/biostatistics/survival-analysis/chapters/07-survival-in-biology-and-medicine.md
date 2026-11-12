---
title: "Survival in Biology and Medicine"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "Applications of survival analysis in biology and medicine, including the comparison of treatments in clinical trials, the prognosis of patients by prognostic factors, the study of lifespan in model organisms under genetic or dietary interventions, the time to germination or to failure in ecology and agriculture and the use of survival methods for any outcome measured as a time, together with the reporting that each application requires and the limits that censoring and assumptions place on each claim."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe three applications of survival analysis in biology and medicine and the question each answers."
  - "Judge whether a survival result supports the claim made in a given application, given its censoring and assumptions."
references:
  - "Kaplan, E. L., & Meier, P. (1958). Nonparametric estimation from incomplete observations. Journal of the American Statistical Association, 53(282), 457-481. https://doi.org/10.1080/01621459.1958.10501452"
  - "Cox, D. R. (1972). Regression models and life-tables. Journal of the Royal Statistical Society Series B: Statistical Methodology, 34(2), 187-202. https://doi.org/10.1111/j.2517-6161.1972.tb00899.x"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Survival methods are applied wherever the outcome is a time. In clinical research they compare treatments and estimate prognosis, and in biology they measure the lifespan of organisms under genetic or dietary interventions. In ecology and agriculture they describe the time to germination, to failure or to death of a plant or animal. The same methods serve each, and the same care is needed in the interpretation of their results.

Each application asks a question with its own demands. A comparison of treatments asks whether one group survives longer, and the answer requires a design in which the groups are comparable and the censoring is independent. A prognostic model asks how well the predictors separate patients who will have the event early from those who will have it late, and this requires validation in patients not used to fit the model. Ioannidis (2005) described how a result that is selected from many factors may not replicate, and a prognostic factor found among many candidates is exposed to this failure.

The lifespan of model organisms is a common application, and it illustrates the importance of censoring. Animals that are still alive when the experiment ends contribute censored times, and a mean lifespan computed from the deaths alone is biased. Alberts et al. (2022) describe the biology of ageing and the processes that determine lifespan, and the survival analysis describes the pattern while the mechanism requires experiment.

The applications share the requirement that the time, the event and the censoring be defined precisely, and that the assumptions be checked. The report should state these definitions and the checks, so that a reader can judge whether the survival result answers the question it claims to answer.
