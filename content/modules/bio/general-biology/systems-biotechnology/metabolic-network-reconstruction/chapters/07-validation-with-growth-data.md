---
title: "Validation with Growth and Essentiality Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The validation of a metabolic reconstruction against experimental data on growth on different carbon sources and on the essentiality of single genes, the agreement measured as the proportion of correctly predicted growth and no-growth outcomes, the sensitivity and specificity of the gene essentiality predictions, the distinction between a model that fits the data it was curated against and one that predicts unseen data, the explanation of discrepancies as gaps, wrong annotations or missing regulation, and the reporting of the validation with its intervals and the data used."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compare the predicted growth on a set of carbon sources with experimental outcomes and summarise the agreement."
  - "Explain why a model must be validated on data not used in its curation and interpret each discrepancy."
references:
  - "Schellenberger, J., Que, R., Fleming, R. M. T., Thiele, I., Orth, J. D., Feist, A. M., Zielinski, D. C., Bordbar, A., Lewis, N. E., Rahmanian, S., Kang, J., Hyduke, D. R., & Palsson, B. Ø. (2011). Quantitative prediction of cellular metabolism with constraint-based models: the COBRA Toolbox v2.0. Nature Protocols, 6(9), 1290-1307. https://doi.org/10.1038/nprot.2011.308"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A reconstruction is validated by comparing its predictions with experiments that were not used to build it. The most common tests are growth on different carbon sources, in which the model predicts whether the organism grows, and single gene deletions, in which the model predicts whether the deleted gene is essential. Schellenberger et al. (2011) described the software that performs these simulations, and the tests are the standard way of establishing the quality of a model.

Agreement is summarised by the proportion of correct predictions, but this summary hides the kinds of error. A model may predict growth where the organism does not grow, which is a false positive, or predict no growth where it does grow, which is a false negative, and the two errors point to different problems. Sensitivity and specificity of the essentiality predictions separate these, and each should be reported with its interval, since the number of genes tested may be small. Cumming (2014) argues that the agreement should be shown with its precision rather than as a single percentage.

A model that agrees with the data used to curate it has not been validated, since the curation may have been adjusted to fit those data. Ioannidis (2005) described how a model adjusted until it matches a dataset does not thereby demonstrate its accuracy, and the validation must use data withheld from curation. The distinction between a fit and a prediction is the central point of this chapter.

A discrepancy is a signal to investigate, and it may have several causes: a gap in the network, a wrong annotation, a missing regulatory constraint or a limitation of the objective. Each discrepancy should be examined and recorded with its explanation and the change it led to. Sandve et al. (2013) recommended recording the data used for validation, the predictions and the discrepancies, so that the reconstruction can be judged and improved over time.
