---
title: "Data Types and Containers"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The Python data types used in biological analysis, including strings for sequences, integers and floats for counts and measurements, lists for ordered records, tuples for fixed groups, dictionaries for mapping identifiers to values and sets for membership tests, with examples of how each represents sequences, gene names and expression values."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose an appropriate Python container, a list, tuple, dictionary or set, for a given biological data structure and justify the choice."
  - "Represent a set of gene identifiers and their expression values in a dictionary and extract a subset from it."
references:
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A DNA sequence is most simply stored as a Python string, since a string is an ordered sequence of characters. The four bases A, C, G and T are letters, and string operations can count them, find substrings and reverse a sequence. A string is immutable, so changing a base means creating a new string, and this is a reason to use a sequence object from a library when many edits are needed. Alberts et al. (2022) describe the chemistry of the bases, and the string is the computer's representation of that chemistry.

Numerical values such as read counts, expression levels and p-values are stored as integers and floats. Integers represent counts exactly, while floats represent measurements with a finite precision. A float is not exact, so comparisons of two floats for equality can fail where the values are mathematically equal, and a comparison with a tolerance is the safer choice.

A list holds an ordered collection of items that can be changed. It is the natural container for the records of a file, since the order of the records is often important. A tuple holds an ordered collection that cannot be changed, which suits a fixed group such as a chromosome name with its length.

A dictionary maps keys to values, and it is the most useful container for biological identifiers. A dictionary from gene identifiers to expression values gives the value for a gene in a single lookup, and it can be used to join two datasets by their shared keys. Biopython uses the same pattern for the annotations of its sequence records.

A set holds unique items and tests membership quickly. It is useful for the overlap between two lists of genes, which is the set intersection, and for removing duplicates. Choosing the right container makes the code shorter, faster and easier to check.
