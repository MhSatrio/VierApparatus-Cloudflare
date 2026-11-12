---
title: "Protein Language Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "Protein language models that treat amino acid sequences as text learned by large neural networks, covering the tokenisation of residues, the training of the model on the sequences of many proteins, the emergence of representations that encode secondary structure, contacts and function without explicit supervision, the use of the model's likelihood to score variants and to estimate the naturalness of a designed sequence, the fine-tuning of the model for specific properties such as stability, solubility or binding, the evaluation on families and folds held out from training, and the reporting of the model, its training data and its evaluation with intervals."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a protein language model learns contacts and structure from sequence and state what evidence supports each claim."
  - "Evaluate a protein language model on held-out families and report its performance with intervals."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. Nature, 521(7553), 436-444. https://doi.org/10.1038/nature14539"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

A protein language model treats an amino acid sequence as a text written in a twenty-letter alphabet, and it learns the statistics of that text across the sequences of many proteins. The approach draws on the representation learning that LeCun et al. (2015) described, applied to sequences whose grammar is set by evolution and folding rather than by human language. Jumper et al. (2021) showed that the evolutionary record contains the information needed to predict structure, and protein language models learn much of the same information from sequence alone.

Remarkably, representations learned without explicit supervision can encode secondary structure, residue contacts and aspects of function. The presence of this information is an empirical finding that must be tested, since a model can encode a property through a correlation that does not reflect the mechanism. Ioannidis (2005) described how a striking pattern can be produced by an analysis that has not been checked against an independent standard, and the encoding of structure should be tested on proteins held out from training.

The model's likelihood can score the effect of a variant, since a mutation that makes a sequence much less likely under the model may be damaging to the protein. The likelihood can also estimate how natural a designed sequence appears, though naturalness is not the same as function. The score is a prediction, and its accuracy should be reported with its interval on a set of variants with measured effects. Cumming (2014) argues that the relation between score and measurement should be quantified, since the strength of the association determines how far the score can be trusted.

Fine-tuning adapts the model to a specific property such as stability, solubility or binding, and it requires labelled data for that property. The evaluation must use families and folds held out from training, so that the model is not recognising relatives of its training proteins. Munafò et al. (2017) argued that the model, its training data and its evaluation should be reported in full, so that the claims can be checked and the model can be compared with others on the same terms.
