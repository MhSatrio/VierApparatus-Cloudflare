---
title: "Guide RNA Design and Specificity"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How a guide RNA is chosen for a target site, the requirement for an adjacent protospacer motif, the role of the seed region in specificity and how the number of predicted off-target sites is used to rank guides before they are used."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Select a target site with a suitable protospacer adjacent motif and a guide sequence of defined length."
  - "Rank guides by predicted off-target sites and explain how the seed region affects specificity."
references:
  - "Mali, P., Yang, L., Esvelt, K. M., Aach, J., Guell, M., DiCarlo, J. E., Norville, J. E., & Church, G. M. (2013). RNA-guided human genome engineering via Cas9. Science, 339(6121), 823-826. https://doi.org/10.1126/science.1232033"
  - "Jinek, M., Chylinski, K., Fonfara, I., Hauer, M., Doudna, J. A., & Charpentier, E. (2012). A programmable dual-RNA-guided DNA endonuclease in adaptive bacterial immunity. Science, 337(6096), 816-821. https://doi.org/10.1126/science.1225829"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

The guide is the part of the system that the experimenter chooses, and its design sets both where the cut falls and how often the enzyme cuts elsewhere. The target must be followed by the protospacer adjacent motif, a short sequence that the Cas protein requires before it will bind and cut. Jinek et al. (2012) identified this requirement, and it limits the sites that can be targeted with a given enzyme. The guide sequence is then placed immediately upstream of the motif, typically a stretch of about twenty nucleotides that matches the target.

Mali et al. (2013) demonstrated editing of human genes with guides of this kind. The efficiency of a guide varies between loci, and a guide that works well at one locus may work poorly at another, so the efficiency must be tested for each target.

Specificity depends on the seed region, the part of the guide closest to the motif. Mismatches in the seed are poorly tolerated, while mismatches at the far end are often tolerated, which means that a guide can cut sites that resemble the target in the seed. Predicted off-target sites are listed by searching the genome for near matches, and guides are ranked by the number and the similarity of these sites. The ranking is a prediction and not a measurement, and the sites it lists must be tested.

Platt (1964) argued that a claim is strongest when it is tested against an alternative, and the choice between guides is a comparison of two or more candidate explanations for the outcome. Ioannidis (2005) described how a prediction that is not tested can be taken as a result, and the predicted off-target list should be treated as a set of hypotheses to be checked.

The guide design is recorded with the target sequence, the motif, the score and the predicted sites, so that the choice can be reviewed.
