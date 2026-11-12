---
title: "Validation and Enrichment"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "The validation of virtual screens and computational predictions of activity, covering the enrichment factor that compares the hit rate of a screen at a given fraction of the library with the random hit rate, the receiver operating characteristic curve and its area used to rank the performance of a method, the use of decoy compounds that resemble actives in properties but are inactive, the danger of bias in the decoys and in the actives that make a method look better than it is, the prospective validation in which predictions are made and tested without knowing the results, and the reporting of validation with the enrichment, the decoys and the intervals of each performance measure."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Calculate an enrichment factor from the hit rate of a screen and the random hit rate and state what the value means."
  - "Explain how biased decoys can make a virtual screening method look better than it is and state the prospective test that avoids this."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A virtual screening method must be validated before its predictions are trusted. The standard measure is the enrichment factor, which compares the hit rate among the top-ranked compounds with the hit rate expected from a random selection. An enrichment of ten means that the top compounds are ten times more likely to be active than random compounds. The factor depends on the fraction of the library selected, and it should be reported at the fraction used in practice.

The receiver operating characteristic curve and its area summarise the ability of a method to rank actives above inactives across all thresholds. The area of one means perfect ranking and one half means random ranking, and the curve is useful for comparing methods. The area should be reported with its interval, since it is estimated from a finite set of compounds.

Validation uses known actives and decoys, which are inactive compounds chosen to resemble the actives in their physical properties. The decoys must be chosen carefully, since decoys that differ from the actives in an obvious way are easily separated, and the method then appears to perform well for the wrong reason. Ioannidis (2005) described how a method can appear accurate because of the way the test set was built, and the bias in the decoys must be checked.

The most convincing validation is prospective, in which the method makes predictions for compounds whose activity is not yet known, and the predictions are then tested. A prospective test cannot be shaped by the knowledge of the outcome, and it is therefore the honest measure of performance. Cumming (2014) argues that the enrichment and the area should be reported with their intervals, and the decoys and the test set should be described in full.
