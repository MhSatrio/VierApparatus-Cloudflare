---
title: "Benchmark Design and Leakage"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The design of benchmark datasets for computational drug discovery and the avoidance of leakage that would inflate the performance of methods, covering the construction of benchmark sets from measured affinities and the consideration of the bias introduced by the source of the measurements, the split by scaffold or by target so that the test set contains chemistry or targets absent from training, the removal of molecules that are duplicates or near-duplicates across the split, the leakage through a receptor structure that was used both to dock and to define the benchmark, the use of decoys that are property-matched to actives so that a method cannot succeed by detecting trivial differences, and the reporting of the benchmark, its split, its decoys and the performance with intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Construct a benchmark whose test set contains scaffolds or targets absent from training and remove near-duplicates across the split."
  - "Use property-matched decoys and explain why unmatched decoys allow a method to succeed by trivial differences."
references:
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A benchmark is a dataset on which methods are compared, and its design determines whether the comparison means anything. A benchmark whose test molecules are close analogues of the training molecules rewards methods that recognise chemical series rather than those that generalise. The split must therefore place whole scaffolds or whole targets in the test set, and the removal of near-duplicates across the split prevents leakage through closely related molecules. Munafò et al. (2017) argued that the evaluation must match the claim being made, and a claim of general prediction requires a test on chemistry the method has not seen.

Decoys are molecules that are presumed inactive and are used to test whether a method can separate them from actives. Decoys that differ from actives in simple properties, such as molecular weight or charge, allow a method to succeed by detecting those differences rather than the binding. Property-matched decoys remove this shortcut, and the matching criteria must be stated. Ioannidis (2005) described how an apparent success can arise from a feature of the test set rather than the ability of the method, and property matching guards against this.

Leakage can also occur through the receptor structure. If a structure that was used to define the benchmark, for example the crystal structure of a complex that defines the binding site, was also used to dock the test ligands, the method has access to information it would not have in a prospective setting. The source of each structure should be recorded and its role in the benchmark stated. Peng (2011) argued that the procedure for constructing the benchmark must be documented so that the leakage can be checked.

Benchmarks are often built from measured affinities that come from different sources and assays, and the bias of the source affects the comparison. Cumming (2014) argues that the variation of the measurements across sources should be reported with its interval, since a method may appear to perform differently on sources that differ in their error. The benchmark, its split, its decoys and the performance with intervals should all be reported together.
