---
title: "Gene Models and Transcript Choice"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How a gene model describes a gene's transcripts and exons, why one gene has several transcripts, how a canonical or representative transcript is chosen by the annotation, the consequences of choosing a transcript that is not the one expressed in a tissue and how a transcript choice is recorded so that a result can be interpreted and repeated."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how one gene can have several transcripts and what distinguishes them."
  - "Choose a transcript for an analysis, justify the choice and record its identifier and release."
references:
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A gene model describes the transcripts of a gene and the exons that each contains. Many genes produce several transcripts by alternative splicing, in which the same gene uses different exons or different start and end points. Alberts et al. (2022) describe how the processing of a primary transcript varies, and the gene model records the variants that the annotation has found. Cunningham et al. (2022) describe how Ensembl assigns these transcripts to each gene in its release, with their own identifiers.

A genome browser or a database usually marks one transcript as the canonical or representative transcript of the gene. This transcript is a convention chosen by the annotation, often the longest or the best supported by evidence, and it is a sensible default for a question about the gene in general. It is not necessarily the transcript expressed in a given tissue or condition, and a conclusion that depends on the transcript should say which one was used.

The choice matters for the result. An analysis of the protein-coding region of a gene will give different results for two transcripts whose coding exons differ, and a variant may fall in an exon of one transcript and in an intron of another. A variant described as affecting a gene may affect only some of its transcripts, so the transcript choice must be stated with each such conclusion.

A transcript is chosen by its identifier and its release. The identifier is stable across releases where the model is unchanged, but its exons can change, so the release must be recorded with the identifier. The chosen transcript should also be checked against the evidence track in the browser, as described in the navigation chapter.

Sandve et al. (2013) recommended recording the exact inputs of an analysis, and the transcript identifier with its release is one of those inputs. A transcript chosen without its release cannot be relied on to give the same exons on another day.
