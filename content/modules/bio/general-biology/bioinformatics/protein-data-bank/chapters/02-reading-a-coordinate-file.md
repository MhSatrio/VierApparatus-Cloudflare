---
title: "Reading a Coordinate File"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the coordinate records of a PDB or mmCIF file are read, including the ATOM and HETATM records, the atom names, the residue numbers and insertion codes, the occupancy and B-factor columns, the chain identifiers and the way a script can parse these fields without losing their meaning."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Read the ATOM and HETATM records of a coordinate file and identify the residue, the chain and the atom for a given line."
  - "Explain what the occupancy and the B-factor columns record and how they should be interpreted."
references:
  - "Berman, H. M. (2000). The Protein Data Bank. Nucleic Acids Research, 28(1), 235-242. https://doi.org/10.1093/nar/28.1.235"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
---

A coordinate file lists the atoms of the structure, one per line for the classic PDB format. The ATOM records describe the atoms of the standard polymer residues, and the HETATM records describe the ligands, waters and other non-standard components. Each line gives the atom name, the residue name, the chain identifier, the residue number, the three coordinates and two numbers: the occupancy and the temperature factor, sometimes called the B-factor. Berman (2000) describes the archive that holds these files and their format.

The fields must be read by their columns, not by splitting on spaces. An atom name may contain a space, a residue number may be followed by an insertion code and a chain identifier may be blank. A parser that splits on whitespace will misread these lines, and the errors are often invisible until a coordinate is compared with the expected atom. A library such as Biopython, described by Cock et al. (2009), reads the fields by their positions and keeps the structure as a set of chains, residues and atoms.

The occupancy records the fraction of the molecules in which an atom occupies the position given. An occupancy below one indicates that the atom is present in only part of the sample, and an alternate location indicator may show two or more positions for the same atom. The B-factor describes the spread of the atom's position, which reflects both its motion and the disorder in the crystal. A high B-factor is a sign of flexibility or of poor determination, and it should not be read as a measure of the atom's importance.

Scripts that read these files should record their assumptions. Sandve et al. (2013) recommended that the processing of data be explicit, and a parser that drops alternate locations, or that keeps only the first model of an NMR ensemble, changes the data. Such choices should be written in the code and in the methods.
