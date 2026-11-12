---
title: "Experimental Characterisation of Designs"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The experimental characterisation of generated protein designs for expression, folding, stability and function, covering the expression in a host and the yield that determines whether a design can be studied, the separation of folded from unfolded or aggregated protein by size exclusion or by a thermal stability assay, the structural confirmation of a folded design by crystallography, nuclear magnetic resonance or cryo-electron microscopy against the target, the measurement of stability by denaturation curves with the midpoint and its uncertainty, the functional assay appropriate to the intended activity, the counting of every design made in the denominator of the success rate, and the reporting of each step of the cascade with the number of designs passing it."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe the characterisation cascade from expression to structure to function and state how failures at each stage are counted."
  - "Measure the thermal stability of a design by a denaturation curve and report the midpoint with its uncertainty."
references:
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

The characterisation of a design proceeds as a cascade, in which each stage removes designs that fail and the next stage is applied to those that remain. Expression comes first, since a design that cannot be produced in a host cannot be studied. Folding is then tested by separating the folded protein from the unfolded or aggregated material, and structure is confirmed against the target. Function is tested last, using the assay appropriate to the intended activity. Munafò et al. (2017) argued that the cascade should be reported in full, including the designs that failed at each stage.

Expression yield determines whether the design can be studied at all, and the yield should be measured and reported. A design that expresses poorly may still fold, but the lack of material limits every later measurement. Folded and unfolded protein are separated by size exclusion chromatography or by a thermal stability assay, and the proportion that folds is an estimate with its interval, since the number of designs and replicates determines the precision. Cumming (2014) argues that such proportions should be reported with their uncertainty.

A folded design should be confirmed against the target structure by crystallography, nuclear magnetic resonance or cryo-electron microscopy. Structural confirmation is the strongest evidence that the design adopted the target, and the agreement with the target should be quantified with the same measure used in the computational filter. Ioannidis (2005) described how a prediction that is not compared with an independent measurement can remain untested, and the structure provides that comparison.

Stability is measured by denaturation curves, in which the protein is unfolded by heat or by a chemical denaturant. The midpoint of the transition expresses the stability, and it should be reported with its uncertainty. The functional assay must be appropriate to the intended activity, and the design must be compared with a reference under the same conditions. Peng (2011) argued that the procedures must be described so that they can be repeated, and every design made should be counted in the denominator of the success rate.
