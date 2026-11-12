---
title: "What Bioinformatics Is"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The definition of bioinformatics as the application of computation to biological data, the difference between bioinformatics, computational biology and data science, the historical growth of the field with sequencing and structure determination, and the kinds of question the field is used to answer."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define bioinformatics and distinguish it from computational biology and from general data science."
  - "Give examples of biological questions that require computational analysis of large datasets."
references:
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

Bioinformatics applies computational methods to biological data. The definition is broad, and the boundaries with computational biology, which builds models of biological processes, and with data science, which develops general methods for large datasets, are not sharp. In practice, a bioinformatician takes a biological question, identifies the data that can answer it, chooses or writes the algorithms to process those data and interprets the output in biological terms. The discipline is defined by that combination of biology and computation, not by either alone.

The field grew with the amount of biological data. The sequencing of genomes and the determination of protein structures produced far more information than could be read by eye, and the need to store, compare and interpret it created the tools of the field. Stein (2010) noted that the volume of genome data had outgrown the local computing resources of most laboratories, which led to the use of shared and remote computing, a theme returned to in the high-performance computing topic.

Typical questions include the identity of a gene in a newly sequenced genome, the set of genes whose expression changes between two conditions, the three-dimensional structure of a protein from its sequence, and the relationships between species inferred from their sequences. Each question has a set of data, a set of methods and a set of possible errors, and the bioinformatician's task is to match them.

Alberts et al. (2022) describe the molecular biology that gives these data their meaning, and a bioinformatic result is useful only when it can be interpreted in those terms. A list of significant genes is an observation, and it becomes a finding when it is connected to the biology of the cell.

Sandve et al. (2013) argued that computational work must be reproducible, so that a result can be regenerated from the data and the code. This requirement is part of the definition of good bioinformatics, not an optional addition.
