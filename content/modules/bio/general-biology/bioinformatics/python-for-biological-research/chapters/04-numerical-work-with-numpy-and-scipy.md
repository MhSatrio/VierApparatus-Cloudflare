---
title: "Numerical Work with NumPy and SciPy"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How NumPy arrays store and operate on biological measurements without explicit loops, how SciPy provides statistical tests and optimisation routines, how a matrix of expression values is normalised and summarised and the statistical cautions needed when many tests are performed on the same data."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Store a matrix of expression values as a NumPy array and compute per-gene and per-sample summaries without writing explicit loops."
  - "Apply a statistical test from SciPy to each gene and explain why the resulting p-values must be corrected for multiple testing."
references:
  - "Virtanen, P., Gommers, R., Oliphant, T. E., Haberland, M., Reddy, T., Cournapeau, D., Burovski, E., Peterson, P., Weckesser, W., Bright, J., van der Walt, S. J., Brett, M., Wilson, J., Millman, K. J., Mayorov, N., Nelson, A. R. J., Jones, E., Kern, R., Larson, E., . . . Vázquez-Baeza, Y. (2020). SciPy 1.0: fundamental algorithms for scientific computing in Python. Nature Methods, 17(3), 261-272. https://doi.org/10.1038/s41592-019-0686-2"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Love, M. I., Huber, W., & Anders, S. (2014). Moderated estimation of fold change and dispersion for RNA-seq data with DESeq2. Genome Biology, 15(12), 550. https://doi.org/10.1186/s13059-014-0550-8"
---

An expression matrix, with one row per gene and one column per sample, is a natural array. NumPy stores such a matrix in contiguous memory and performs arithmetic on the whole array at once, so that taking the logarithm of every value or dividing each column by its total is a single operation. Explicit loops in Python are slow for large arrays, and the vectorised form is both faster and closer to the mathematical description of the operation. Virtanen et al. (2020) describe the array and numerical libraries that the scientific Python ecosystem builds upon.

Summaries are computed along the axes of the array. The mean of each gene across samples, the library size of each sample and the variance of each row are each a single call with an axis argument. Care is needed with missing values, which must be marked explicitly, because a missing value propagated through a sum gives a missing result without warning.

SciPy provides the statistical tests used to compare groups. A t-test on each gene compares the mean expression in two conditions, and a Wilcoxon test makes fewer assumptions about the distribution. Each test returns a p-value, and the set of p-values is the raw result of the comparison. Count data have distributions that differ from those assumed by a simple t-test, which is why specialised methods such as those of Love et al. (2014) model the counts directly.

Testing thousands of genes produces thousands of p-values, and a threshold of 0.05 applied to each of them will call many genes significant by chance. Ioannidis (2005) described how flexible and repeated testing inflates the rate of false findings, and a correction such as the false discovery rate procedure must be applied across the whole set.

The code and the correction should be written in the same script, so that the number of tests is recorded with the result and the correction is applied to every test that was performed.
