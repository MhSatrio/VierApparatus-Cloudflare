---
title: "Programmable Nucleases"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "Programmable nucleases that cut DNA at sites chosen by a guide molecule, the CRISPR-Cas9 system in which a guide RNA pairs with a complementary DNA sequence next to a short protospacer adjacent motif, the discovery by Jinek et al. that the bacterial system could be directed to a chosen site, the dual-RNA form and the single-guide design, the double-strand break that results from the cut, and the other nucleases such as zinc finger and TALE proteins that were used before the system became widespread."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a guide RNA directs a nuclease to a DNA site and state the sequence requirement next to the target."
  - "Explain why a double-strand break is the starting point of an edit and name the other nucleases used before the CRISPR system."
references:
  - "Jinek, M., Chylinski, K., Fonfara, I., Hauer, M., Doudna, J. A., & Charpentier, E. (2012). A Programmable Dual-RNA-Guided DNA Endonuclease in Adaptive Bacterial Immunity. Science, 337(6096), 816-821. https://doi.org/10.1126/science.1225829"
  - "Doudna, J. A., & Charpentier, E. (2014). The new frontier of genome engineering with CRISPR-Cas9. Science, 346(6213), 1258096. https://doi.org/10.1126/science.1258096"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A programmable nuclease is an enzyme that cuts DNA at a site determined by a molecule it carries. In the CRISPR-Cas9 system, the nuclease binds a guide RNA whose sequence pairs with a complementary sequence in the genome. The pairing must be followed by a short motif, the protospacer adjacent motif, for the cut to occur, and the guide's sequence then determines where in the genome the cut lands. Jinek et al. (2012) showed in vitro that the natural system could be programmed in this way, and that a single guide molecule could replace the two RNAs of the bacterial system.

The programmability is what distinguishes the system from earlier nucleases, which had to be engineered for each site. Doudna and Charpentier (2014) described how the simplicity of designing a guide, which requires only a new sequence, made the method available to many laboratories. The guide is designed by choosing a site with the required motif and sufficient uniqueness in the genome.

The nuclease cuts both strands of the DNA, producing a double-strand break. This break is the event that the cell must repair, and the outcome of the repair determines what the edit is. Breaks are repaired by pathways that join the ends with little change, or that use a template to restore the sequence, and the choice between them depends on the cell and the design. The cut alone does not make an edit, and the repair must be examined.

Before the CRISPR system, zinc finger and TALE nucleases were used to make site-specific breaks, and each required the engineering of a protein for every target. Cumming (2014) argues that a comparison of methods should report their efficiencies with intervals, since the advantage of one method depends on the measured rate at which it works. Sandve et al. (2013) recommended recording the guide sequence and the nuclease used, since a different guide can change the outcome completely.
