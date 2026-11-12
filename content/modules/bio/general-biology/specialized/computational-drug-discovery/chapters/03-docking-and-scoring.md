---
title: "Docking and Scoring"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The docking of ligands into protein binding sites and the scoring functions that estimate the strength of binding, covering the search algorithms that sample the orientations and conformations of a ligand within the site, the physical and empirical scoring terms for hydrogen bonds, electrostatics, van der Waals contacts and desolvation, the limitations of scoring functions in ranking ligands of different size and chemistry, the treatment of protein flexibility and of water molecules in the binding site, the correlation between docking scores and measured binding affinities that is often weak, and the use of consensus scoring to reduce the errors of any single function."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the search and scoring steps of molecular docking and state the terms that a scoring function combines."
  - "Explain why docking scores correlate weakly with measured affinities and state how consensus scoring reduces the error."
references:
  - "Shoichet, B. K. (2004). Virtual screening of chemical libraries. Nature, 432(7019), 862-865. https://doi.org/10.1038/nature03197"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Docking places a ligand into the binding site of a protein and estimates how strongly it binds. The docking program searches the possible positions and conformations of the ligand, and a scoring function evaluates each one. The score combines terms for hydrogen bonds, electrostatic interactions, van der Waals contacts and the cost of removing water from the surfaces that meet. Shoichet (2004) described docking as the workhorse of structure-based screening, and its usefulness depends on the scoring.

Scoring functions are approximations. Their terms are simplified, their parameters are fitted to experimental data, and they cannot capture every physical effect. They tend to favour large ligands, because more contacts give a better score, and they may not compare ligands of different chemistry fairly. The bias must be recognised when the scores are used to rank compounds.

The protein is treated as rigid in most docking, although the binding site may change shape, and the water molecules in the site can be displaced or retained when a ligand binds. These simplifications affect the poses and the scores, and some docking programs allow flexibility in selected side chains. The treatment chosen should be stated, since it changes the result.

The correlation between docking scores and measured binding affinities is often weak, and the ranking of compounds by score may not reflect their true potency. Consensus scoring, which combines the ranks from several functions, reduces the error of any single function, and it is often more reliable than the best single score. Cumming (2014) argues that the correlation should be reported with its interval, and Ioannidis (2005) described how a score that appears to predict activity in a few compounds may fail across a larger set.
