---
title: "Limits and Validation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The limits of protein structure prediction and the means of validating a predicted model, including the cases in which prediction fails, such as proteins with few homologues, novel folds, large conformational change and membrane proteins, the comparison of predictions with experimental structures as they become available, the blind assessments that test prediction methods on structures not yet public and the reporting of a prediction's accuracy in terms of the regions that are reliable."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Name the classes of protein for which structure prediction is least reliable and state why each is difficult."
  - "Describe how a predicted model is validated against experimental structures and what a blind assessment tests."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Baek, M., DiMaio, F., Anishchenko, I., Dauparas, J., Ovchinnikov, S., Lee, G. R., Wang, J., Cong, Q., Kinch, L. N., Schaeffer, R. D., Millán, C., Park, H., Adams, C., Glassman, C. R., DeGiovanni, A., Pereira, J. H., Rodrigues, A. V., van Dijk, A. A., Ebrecht, A. C., . . . Baker, D. (2021). Accurate prediction of protein structures and interactions using a three-track neural network. Science, 373(6557), 871-876. https://doi.org/10.1126/science.abj8754"
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Prediction has limits, and a reader must know them to use it well. The methods are strongest for proteins that have many related sequences in the archive and that fold into compact domains like those in the training data. They are weaker for proteins with few homologues, since the evolutionary signal is then thin, and for novel folds unlike any in the archive. Jumper et al. (2021) report that accuracy depends on the depth of the alignment and on the family, and the limits follow from that dependence.

Several classes of protein are hard to predict. Proteins with large conformational changes are represented by one state, and proteins that are membrane-bound lie in an environment that the training structures represent poorly. Disordered regions have no single structure to predict. Each class must be identified before a prediction is used, and the prediction should be read in the light of the class to which the protein belongs.

Validation compares predictions with experimental structures. As structures are determined after a prediction is made, the comparison shows how accurate the prediction was, and it is the strongest test of the method. Berman (2000) describes the archive that holds these experimental structures, and the comparison is only as good as the structures used.

Blind assessments test methods on structures that were unknown to the developers at the time of prediction. Such an assessment is more informative than a test on structures used in training, since the methods cannot have learned the answers. The results show how accurate a method is across many proteins and how its accuracy varies with the difficulty of the target.

Baek et al. (2021) show that the accuracy of a predictor can be estimated for many targets, and a report of a prediction should give the accuracy of the method on comparable proteins as well as the confidence of the model. Ioannidis (2005) described how a result that is reported without its uncertainty can overstate its reliability, and the accuracy of a method is the uncertainty that a prediction carries.

Sandve et al. (2013) recommended recording the validation performed, and the comparison with experiment and the class of the protein are part of the record that makes a prediction interpretable.
