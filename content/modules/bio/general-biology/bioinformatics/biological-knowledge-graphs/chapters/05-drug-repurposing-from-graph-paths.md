---
title: "Drug Repurposing from Graph Paths"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a knowledge graph is used to suggest existing drugs as candidates for diseases they were not approved to treat, following the approach of Himmelstein et al., including the representation of known treatments and their mechanisms, the prediction of a candidate from the paths connecting a drug to a disease, the evaluation of the predictions against drugs whose indications are known, and the gap between a graph-based prediction and a clinical effect that requires trials."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a graph-based repurposing prediction is generated from paths and how it is evaluated against known indications."
  - "Explain why a prediction of repurposing from a graph is a candidate for clinical study and not evidence of efficacy."
references:
  - "Himmelstein, D. S., Lizee, A., Hessler, C., Brueggeman, L., Chen, S. L., Hadley, D., Green, A., Khankhanian, P., & Baranzini, S. E. (2017). Systematic integration of biomedical knowledge prioritizes drugs for repurposing. eLife, 6, e26726. https://doi.org/10.7554/eLife.26726"
  - "Friesner, R. A., Banks, J. L., Murphy, R. B., Halgren, T. A., Klicic, J. J., Mainz, D. T., Repasky, M. P., Knoll, E. H., Shelley, M., Perry, J. K., Shaw, D. E., Francis, P., & Shenkin, P. S. (2004). Glide: A New Approach for Rapid, Accurate Docking and Scoring. 1. Method and Assessment of Docking Accuracy. Journal of Medicinal Chemistry, 47(7), 1739-1749. https://doi.org/10.1021/jm0306430"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Repurposing searches for a new use of an approved drug. The attraction is that a drug with known safety in people can reach clinical study faster than a new compound. Himmelstein et al. (2017) used a knowledge graph to generate such predictions: each known drug-disease treatment in the graph was held out, and the graph was asked to rank the other candidate drugs for that disease by the paths connecting them. The known treatments then served as a test of whether the paths recover the answers.

The evaluation is the key step. A prediction method is judged by whether it recovers the drugs that are already known to treat a disease when those treatments are hidden from it. A method that ranks the known treatments near the top is more credible than one that does not, and the ranking of the known treatments gives a measure of performance. The evaluation must hold out the known treatments before the ranking is made, since a method that has seen the answer is not tested.

A graph-based prediction is a candidate for study, not evidence of effect. A drug may be linked to a disease through paths that do not describe a mechanism that treats it, and the link may reflect the attention the drug has received. Platt (1964) recommended a test that can exclude the alternatives, and a candidate must be tested in a model of the disease and then in patients, since the graph cannot determine the effect of a drug in a body.

Ioannidis (2005) described how a result selected from many candidates can overstate its reliability, and a repurposing search that examines many drugs and diseases must report how many predictions were made and how many were confirmed. The rate of confirmation is the honest measure of the method.

Friesner et al. (2004) described docking as one of the means of assessing candidate binding, and a graph prediction can be combined with structural evidence, though each source of evidence must be stated and tested separately.

Sandve et al. (2013) recommended recording the held-out data, the ranking and the evaluation, since the value of a repurposing method depends on each.
