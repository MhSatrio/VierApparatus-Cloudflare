---
title: "Data Quality, Curation and Provenance"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The sources of error in biological database records, including submission errors, automatic annotation based on similarity, propagated mistakes and out-of-date evidence, the processes of expert curation and their cost, the concept of provenance that records where each piece of information came from and how the reader can assess the reliability of a record from its evidence codes and its history."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Identify three sources of error in biological database records and explain how each can propagate into later analyses."
  - "Use the provenance and evidence information of a database record to judge how far a claim in it can be relied upon."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "The UniProt Consortium. (2023). UniProt: the Universal Protein Knowledgebase in 2023. Nucleic Acids Research, 51(D1), D523-D531. https://doi.org/10.1093/nar/gkac1052"
  - "Benson, D. A., Cavanaugh, M., Clark, K., Karsch-Mizrachi, I., Lipman, D. J., Ostell, J., & Sayers, E. W. (2012). GenBank. Nucleic Acids Research, 41(D1), D36-D42. https://doi.org/10.1093/nar/gks1195"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A database record is only as reliable as the process that produced it. Errors enter at submission, when a sequence is wrongly labelled or a gene is misidentified, and they enter at annotation, when a function is inferred from similarity to a sequence whose function was itself inferred. Errors of this kind can propagate: an annotation copied from one record to many others carries its mistake into every analysis that uses them, and the spread is hard to trace.

Expert curation is the remedy, and the UniProt Consortium (2023) describes how the reviewed section of its knowledgebase is curated by experts who check claims against the published literature. Curation is slow and costly, so the unreviewed section is far larger. The distinction between the two sections is therefore a statement about the process by which each record was made, and it should inform how far each claim is trusted.

Provenance is the record of where information came from. For a database record, it includes the source of the sequence, the evidence on which each annotation rests and the history of changes to the record. Benson et al. (2012) describe the submission process of the sequence archive, and the record's history is the basis for tracing a claim back to its source.

Evidence codes are the means by which many resources state the basis of an annotation, such as experimental evidence, inference from sequence similarity or author statement. The code tells the reader how the claim was reached, and an annotation resting only on sequence similarity is a hypothesis to be tested rather than a finding.

Ioannidis (2005) described how bias and the selection of results can make a published claim unreliable, and the same forces act on database annotations, which are repeated across many records. The reader should ask where each claim came from, what evidence supports it and whether that evidence was tested.

Sandve et al. (2013) recommended recording the provenance of each data source used in an analysis, and the evidence codes and version of each record are the parts of that provenance that matter most.
