---
title: "Backbone Specification and Fold Targets"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The specification of target backbones for protein design and the choice of folds that are designable, covering the representation of a target as a set of backbone coordinates or of secondary structure elements and their connections, the sampling of backbones that satisfy geometric constraints, the consideration of which folds have been shown to be designable with a high success rate and which are difficult to realise, the avoidance of backbones that are energetically implausible or that cannot be packed, the use of structure prediction to check that a designed sequence adopts the target backbone, and the reporting of the target backbones, their sampling and the criteria by which designability was judged."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Specify a target backbone by its secondary structure elements and their connections and check its packability."
  - "Judge whether a fold is designable and state the evidence on which the judgement rests."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A design begins with a target, and the target is a backbone, a description of the chain's path through space. The backbone is usually specified by its secondary structure elements, helices and strands, and by the loops that connect them. Not every arrangement of elements can be realised by a sequence, because some backbones leave gaps that cannot be packed or require strains that no sequence can satisfy. Jumper et al. (2021) showed that structure prediction can check whether a sequence adopts a target, and the same check can reveal whether a backbone is designable at all.

The sampling of backbones must satisfy geometric constraints, and the sampled set should cover the range of folds the design aims to reach. A narrow sample tests only a few folds, and a broad one includes many that are implausible. The report should state the sampling method and the constraints applied. Cumming (2014) argues that the variation across the sampled backbones should be described, since the success of a method may differ widely between folds.

Some folds have been designed successfully with high rates, while others are difficult to realise. The judgement of designability should rest on evidence from previous designs, and the source of that evidence must be cited. Ioannidis (2005) described how a claim that a fold is easy to design may rest on a small number of successes, and the evidence should be assessed for its breadth.

Backbones that are energetically implausible or that cannot be packed must be excluded before design. The check should be quantitative, using a measure of packing or strain, and the threshold should be stated. Munafò et al. (2017) argued that the criteria by which designability was judged should be reported, so that another group can apply them to the same targets and compare its results.
