---
title: "Embeddings and Their Interpretation"
subject: "Biology"
specialization: "General Biology"
academic_level: "PhD and Postdoctoral Research"
description: "The interpretation of the embeddings produced by a biological sequence model and the limits of that interpretation, covering the visualisation of embeddings by dimensionality reduction and the distortion that projection introduces, the clustering of embeddings and its sensitivity to the method, the probing of specific properties by linear directions in the embedding space and the test that a direction corresponds to the property, the attribution of embedding dimensions to residues and the danger of reading a residue-level signal as a mechanism, the comparison of embeddings across models that may be incommensurable, and the reporting of the interpretation with its method and its uncertainty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Test whether a direction in an embedding space corresponds to a biological property and state the control that makes the test informative."
  - "Explain why a projection of embeddings to two dimensions can distort the relations among sequences."
references:
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Munafò, M. R., Nosek, B. A., Bishop, D. V. M., Button, K. S., Chambers, C. D., Percie du Sert, N., Simonsohn, U., Wagenmakers, E.-J., Ware, J. J., & Ioannidis, J. P. A. (2017). A manifesto for reproducible science. Nature Human Behaviour, 1(1), 0021. https://doi.org/10.1038/s41562-016-0021"
---

Embeddings are the vectors that a model assigns to sequences or residues, and they are often inspected to see what the model has learned. Visualisation by dimensionality reduction places them in two or three dimensions, but projection distorts the distances among them, and an apparent cluster in a plot may not exist in the original space. Jumper et al. (2021) showed that the internal representations of a protein model can carry structural information, but the way that information is read out must be justified rather than assumed from a picture.

Clustering the embeddings produces groups whose composition depends on the method and its parameters. The clusters should be tested for stability, as with any clustering, and their biological meaning must be established by independent evidence. Ioannidis (2005) described how a pattern that appears under one analysis can be an artefact of the analysis, and the stability of clusters should be reported.

A property may correspond to a direction in embedding space, and a linear probe can find one. The test that the direction corresponds to the property requires a control: the same probe trained on a shuffled or random label should perform poorly, otherwise the probe is learning the structure of the embedding rather than the property. Cumming (2014) argues that the performance of the probe should be reported with its interval against this control.

Attribution of an embedding dimension to individual residues can suggest which parts of a sequence drive a representation. Such a signal is a property of the model, and it is not a mechanism of the protein. Munafò et al. (2017) argued that claims about what a model has learned should be stated as claims about the model, and the reader should not mistake them for claims about the biology. Embeddings from different models may not be directly comparable, and the comparison must account for this.
