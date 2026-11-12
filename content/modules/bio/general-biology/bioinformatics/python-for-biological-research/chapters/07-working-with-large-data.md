---
title: "Working with Large Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How to process biological files that are too large to load into memory, the use of iterators and generators to stream records one at a time, the choice between in-memory and on-disk structures, the use of indexes to reach a record without reading the whole file and the trade-offs between speed, memory and the complexity of the code."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a generator processes a large file one record at a time and why this keeps memory use small."
  - "Choose between streaming the records of a file and building an index that allows random access, for a given task."
references:
  - "Cock, P. J. A., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., Friedberg, I., Hamelryck, T., Kauff, F., Wilczynski, B., & de Hoon, M. J. L. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423. https://doi.org/10.1093/bioinformatics/btp163"
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Li, H., & Durbin, R. (2009). Fast and accurate short read alignment with Burrows-Wheeler transform. Bioinformatics, 25(14), 1754-1760. https://doi.org/10.1093/bioinformatics/btp324"
---

A sequencing run may produce a file of many gigabytes, and a program that reads the whole file into a list will exhaust the memory of an ordinary computer before it finishes. The solution is streaming. A generator yields one record at a time, and the program processes the record and discards it before reading the next, so that memory use depends on the size of one record and not on the size of the file. Cock et al. (2009) describe the record iterators in Biopython, which support this style.

Streaming is efficient for tasks that look at each record once, such as filtering, counting or converting formats. Some tasks need to find a particular record or to compare records that are far apart in the file. For these, an index maps each identifier to the byte position of its record, so that the record can be read directly without scanning the file. The index itself is a file that must be built once and kept consistent with the data.

Stein (2010) described how the growth of genome data pushed the field toward distributed storage and computing, since no single machine could hold all the data that a project generated. The same pressure applies on a smaller scale when a single file exceeds the memory of a laptop.

The choice between structures depends on the task and on the data. An in-memory dictionary is fast for lookups but limited by memory, an on-disk index is slower but scales to any size, and a database is more flexible but adds a dependency. The programmer must estimate the size of the data and the frequency of each operation before choosing.

Li and Durbin (2009) built their alignment method around a compressed index of the reference genome, which lets millions of reads be aligned against it without holding the full index in a naive form, and the same principle of indexing for speed underlies most large-scale analysis.
