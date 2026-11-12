---
title: "Functional Prediction from Sequence and Context"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The prediction of the likely function of an uncharacterised gene from its sequence, its structure and its genomic context, covering the identification of conserved domains and motifs that suggest a biochemical activity, the use of orthology and phylogenetic profiles to infer function from related genes in other organisms, the use of co-expression and genomic neighbourhood to suggest pathway membership, the cautions that homology-based annotation can propagate error through databases, the calibration of predictions against genes of known function, and the framing of each prediction as a testable hypothesis with an estimated probability of being correct."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Combine sequence, structural and co-expression evidence to propose a functional hypothesis for an uncharacterised gene."
  - "Explain how annotation transfer by homology can propagate error and state how predictions should be calibrated."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Prediction begins with the sequence. Conserved domains and motifs indicate a likely biochemical activity, such as a kinase fold or a nucleotide-binding site, and comparison with characterised families narrows the possibilities. Structure adds information that sequence alone may not: a predicted three-dimensional model can reveal a binding pocket or a surface that resembles a known functional site. Jumper et al. (2021) showed that structure prediction now reaches a level of accuracy that makes such inference routine, though a predicted fold does not establish a function.

Orthology and phylogenetic profiles extend the inference across species. A gene whose orthologues are present wherever a particular process occurs, and absent where it does not, suggests a role in that process. Ioannidis (2005) described how the repetition of an inference across a literature can make it appear better established than the evidence behind it, and the same caution applies to annotation that is transferred from one database entry to another without a test.

Co-expression and genomic context suggest pathway membership. Genes that are expressed together, or that lie close together in a genome, often act in the same process. These associations are hypotheses about partnership, and their strength depends on the number and independence of the datasets that support them. Cumming (2014) argues that the strength of such an association should be reported with its uncertainty, since a correlation estimated from few samples carries a wide interval.

Each prediction should be calibrated against genes of known function. A set of characterised genes provides a benchmark that shows how often a given type of evidence has been correct, and the prediction for the new gene can then carry a stated probability. Munafò et al. (2017) argued that the methods used to make a prediction should be reported so that others can judge and reproduce it. The prediction is then framed as a testable hypothesis, to be examined by the experiments described in the following chapters.
