---
title: "AI-Driven Drug Design"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The use of artificial intelligence and deep learning in drug design, covering the prediction of protein structures from sequence that has transformed the availability of targets, the deep learning models that predict the activity and properties of molecules, the generative models that propose new molecules with desired properties, the data quality and bias of the chemical and biological datasets on which models are trained, the validation of predictions on data that the model has not seen, the explainability of models whose decisions are hard to interpret, the benchmarking and data leakage that can make a model appear to perform better than it does, and the reporting of AI-driven drug design so that its claims can be tested experimentally."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how deep learning predicts protein structure from sequence and state why this changes the availability of targets for design."
  - "Explain how data leakage inflates the apparent performance of a molecular model and state the split that prevents it."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Stokes, J. M., Yang, K., Swanson, K., Jin, W., Cubillos-Ruiz, A., Donghia, N. M., MacNair, C. R., French, S., Carfrae, L. A., Bloom-Ackermann, Z., Tran, V. M., Chiappino-Pepe, A., Badran, A. H., Andrews, I. W., Chory, E. J., Church, G. M., Brown, E. D., Jaakkola, T. S., Barzilay, R., & Collins, J. J. (2020). A Deep Learning Approach to Antibiotic Discovery. Cell, 180(4), 688-702. https://doi.org/10.1016/j.cell.2020.01.021"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Artificial intelligence has entered drug design through models that learn from large datasets of molecules, proteins and their activities. Jumper et al. (2021) described a deep learning system that predicts the three-dimensional structure of a protein from its sequence with high accuracy, which makes the structures of many targets available for the first time. Stokes et al. (2020) showed that a neural network trained on the activity of compounds could identify a new antibiotic that acts on a bacterium that the researchers had not previously treated with it, and the approach has grown rapidly since.

The topic begins with the use of deep learning for molecules and proteins, and the ways in which these models represent their inputs. The chapters that follow examine generative models that propose new molecules, the quality and bias of the datasets on which models are trained, the validation of predictions, the explainability of the models, and the benchmarking that can make a model look better than it is. Each of these affects whether an AI-driven claim will hold in the laboratory.

The enthusiasm for AI in drug design must be tempered by the same discipline that applies to any method. Ioannidis (2005) described how a method that is evaluated flexibly and selectively may produce findings that do not replicate, and the rapid adoption of AI makes this risk especially important. Cumming (2014) argues that the performance of a model should be reported with its interval, and the claims must be tested experimentally.

Sandve et al. (2013) and Peng (2011) recommended that the data, the code, the model and the settings be recorded, since AI results are often difficult to reproduce without them.
