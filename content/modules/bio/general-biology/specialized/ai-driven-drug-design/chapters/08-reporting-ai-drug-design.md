---
title: "Reporting AI-Driven Drug Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "What a report of AI-driven drug design must contain for its predictions and its candidates to be tested and reproduced, including the data sources and their curation, the splits used for training and testing with their scaffolds and dates, the model architecture and the training settings and random seeds, the baselines against which the model was compared, the validation with its calibration and its metrics with intervals, the candidates proposed and their experimental results including the failures, the explanations offered and the experiments that tested them, and the deposition of the data, the model and the code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the data, split, model, baseline, validation and experimental details that an AI drug design report must give for its claims to be tested."
  - "Report the candidates from a model with all the experimental results, including the failures, and state the performance against the baselines."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

An AI drug design report must allow its claims to be tested, which means that the data, the model and the experiments must be fully described. The data sources and their curation should be given, along with the splits used for training and testing, including the scaffolds and the dates, since the split determines the honesty of the test. Peng (2011) argued that a result is reproducible only with the means of producing it, and for an AI model those means include the data, the architecture, the settings and the seeds.

The baselines against which the model was compared must be reported, since a model that does not beat a simple baseline has little value. The validation should give the calibration and the metrics with their intervals, and the difference from the baselines should be shown. Cumming (2014) argues that differences should be reported with their intervals, and Ioannidis (2005) described how a comparison that omits the simple baselines can overstate a model's value.

The candidates proposed by the model should be reported with their experimental results, including the failures. A report that shows only the successful candidates gives a misleading impression of the model's accuracy, and the hit rate of the model must be given with its denominator. Explanations offered for the predictions should be reported with the experiments that tested them, and the reader should be able to see which claims are established and which are hypotheses.

The data, the model and the code should be deposited with identifiers, so that others can reproduce the training and the predictions. Sandve et al. (2013) recommended keeping the inputs, steps and outputs of an analysis together, and Jumper et al. (2021) showed the value of making a system and its predictions openly available for others to examine.
