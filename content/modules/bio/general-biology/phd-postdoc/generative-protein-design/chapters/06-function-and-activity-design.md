---
title: "Designing for Function and Activity"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The design of proteins with a specified function or activity, such as binding a target or catalysing a reaction, covering the specification of the functional site as a set of residues and geometric constraints, the placement of the functional site on a scaffold that supports it, the iterative cycles of design, testing and redesign in which experimental results inform the next round, the directed evolution that complements computational design by screening large libraries, the measurement of activity with kinetic parameters and binding affinity with intervals, the distinction between a designed binder that binds the target and one that binds it with the intended specificity, and the reporting of the functional site, the scaffold and each round of the cycle."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a functional site as residues and geometric constraints and place it on a scaffold that supports it."
  - "Measure binding affinity and specificity of a designed binder and state why affinity alone does not establish the intended function."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Designing a stable fold is a different task from designing a protein that does something. A functional protein must place a site, such as a binding pocket or a catalytic centre, in a precise geometry, and it must hold that geometry in a scaffold that is stable and expressible. The specification of the site as a set of residues and geometric constraints is the starting point, and the scaffold is then designed around it. Jumper et al. (2021) showed that predicted structures can be evaluated for their geometry, which makes it possible to check whether a designed site is correctly placed.

Design for function is usually iterative. A first round of designs is tested, the results inform the next round of design, and the cycle continues until the activity is adequate. Ioannidis (2005) described how a method that is repeatedly adjusted until it succeeds may appear more effective than it is, and each round must be reported, including the failed rounds, so that the cumulative effort is visible.

Directed evolution complements computational design by screening large libraries of variants for the desired activity. The screen can find improvements that the design did not anticipate, and it provides a source of experimental data that can train the next design. Cumming (2014) argues that the distribution of activities across the library should be reported with its interval, since a single best variant is an extreme value that overstates the typical outcome.

Activity is measured with kinetic parameters for catalysis and with binding affinity for binders, each reported with its uncertainty. A binder that binds the target strongly is not necessarily specific, and the intended specificity must be tested against related targets. Munafò et al. (2017) argued that the functional claim should be supported by the measurements that establish it, and affinity alone does not establish the designed function.

The report should describe the functional site, the scaffold and each round of the cycle, so that the path from the first design to the final protein can be followed. Peng (2011) argued that the record of how a result was reached is part of its reproducibility, and the iterative nature of design makes that record essential.
