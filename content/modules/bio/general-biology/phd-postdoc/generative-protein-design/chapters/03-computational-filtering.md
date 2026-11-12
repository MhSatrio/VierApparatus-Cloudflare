---
title: "Computational Filtering of Designs"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The computational filtering of generated protein designs before experimental testing, covering the prediction of the structure of each design and its agreement with the target backbone measured by root mean squared deviation, the confidence of the structure prediction as a filter and its limits for novel sequences, the computed energies and the stability scores that estimate whether a design is likely to fold, the use of multiple independent filters so that no single score determines the outcome, the choice of thresholds fixed before the designs are examined, the calibration of the filters against designs whose outcome is known, and the reporting of each filter, its threshold and the fraction of designs that passed."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Predict the structure of each design and measure its agreement with the target backbone with a stated threshold."
  - "Calibrate a computational filter against designs whose experimental outcome is known and report the fraction that passed."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Computational filters reduce the number of designs that must be made and tested, and they make the experimental work affordable. Each design is folded by a structure prediction model, and the predicted structure is compared with the target backbone by the root mean squared deviation of the positions. A design whose predicted structure departs from the target is unlikely to fold into it, and the deviation is a natural filter. Jumper et al. (2021) showed that structure prediction can be accurate for natural proteins, but its accuracy for novel sequences is less certain, and the filter must be understood in that light.

The confidence that the structure prediction model reports for each design is also a filter, since a low confidence suggests that the model does not expect the sequence to fold. The confidence is a prediction about the model's own uncertainty, and its reliability for designed sequences, which lie outside the natural distribution, must be tested. Ioannidis (2005) described how a score that is confident on familiar cases may be unreliable on unfamiliar ones, and the calibration of confidence must be checked.

Computed energies and stability scores estimate whether a design is likely to fold stably. Each of these is an approximation, and agreement among independent filters gives more confidence than any single score. The use of several filters ensures that no one score determines which designs proceed, and the thresholds should be fixed before the designs are examined. Cumming (2014) argues that the fraction of designs that passes each filter should be reported with its interval.

Filters must be calibrated against designs whose experimental outcome is known. A filter that passes many designs that fail experimentally has low specificity, and one that rejects designs that succeed has low sensitivity. The calibration reveals which filter is informative, and it should be reported. Munafò et al. (2017) argued that every filter, its threshold and the fraction passing should be reported, including the filters that were found to be uninformative.
