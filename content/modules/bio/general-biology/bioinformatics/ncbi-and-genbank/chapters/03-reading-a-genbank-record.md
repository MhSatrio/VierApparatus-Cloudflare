---
title: "Reading a GenBank Record"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How to read a GenBank record in practice, covering the locus line, the definition, the accession and version lines, the features table with its coding sequences and qualifiers, the origin section that holds the sequence and the checks that confirm a record describes the molecule the analysis expects."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Locate the length, molecule type, definition, accession and version of a GenBank record and state what each field means."
  - "Read a coding feature and its qualifiers to find the protein translation and the location of a gene in the record."
references:
  - "Benson, D. A., Cavanaugh, M., Clark, K., Karsch-Mizrachi, I., Lipman, D. J., Ostell, J., & Sayers, E. W. (2012). GenBank. Nucleic Acids Research, 41(D1), D36-D42. https://doi.org/10.1093/nar/gks1195"
  - "Sayers, E. W., Bolton, E. E., Brister, J. R., Canese, K., Chan, J., Comeau, D. C., Connor, R., Funk, K., Kelly, C., Kim, S., Madej, T., Marchler-Bauer, A., Lanczycki, C., Lathrop, S., Lu, Z., Thibaud-Nissen, F., Murphy, T., Phan, L., Skripchenko, Y., . . . Sherry, S. T. (2022). Database resources of the National Center for Biotechnology Information. Nucleic Acids Research, 50(D1), D20-D26. https://doi.org/10.1093/nar/gkab1112"
---

A GenBank record is a text file with a fixed layout. The first line, the locus, gives the record name, the length of the sequence in base pairs, the molecule type, such as mRNA or genomic DNA, and the date of the record. The definition line that follows describes the sequence in words, and the accession line gives the stable identifier. The version line gives the accession together with a version number. Benson et al. (2012) describe the archive that uses this layout, and reading the header before the sequence is the first check of any record.

The features table lists the parts of the sequence that the submitter or an annotation pipeline identified. A coding sequence feature gives the coordinates of the protein-coding region, often as a join of several exons, and its qualifiers include the gene name, the product and the translation. The translation is the protein sequence predicted from the coding region, and it is the link to the protein records of the NCBI collection described by Sayers et al. (2022).

The origin section holds the nucleotide sequence in lower case, grouped in blocks, with the position numbers at the start of each line. Coordinates in the feature table refer to these positions, so a feature can be located in the sequence by counting from the start.

A record should be checked before it is used. The molecule type must match the question: a cDNA record is not a genomic sequence, and a gene predicted from a genome may contain introns that a transcript does not. The organism in the header should be confirmed, and the length should match the expected size of the molecule.

The features also carry errors. A coding sequence may be annotated on the wrong strand, or a translation may end at a premature stop codon because of a sequencing error. These are found by translating the feature and checking the result against the protein it is meant to encode.
