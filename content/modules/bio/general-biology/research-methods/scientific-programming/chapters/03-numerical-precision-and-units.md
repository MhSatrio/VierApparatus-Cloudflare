---
title: "Numerical Precision and Units"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The numerical pitfalls and unit errors that corrupt scientific computation, covering the representation of real numbers in floating-point arithmetic and the consequent rounding errors, the danger of comparing computed values for exact equality and the use of tolerances instead, the loss of precision when subtracting nearly equal numbers and when summing many small values, the overflow and underflow of very large and very small quantities, the explicit declaration of units in variable names or in a units library, the conversion of units before combination, and the checks that detect dimensionally inconsistent expressions."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Replace comparisons for exact equality of computed values with comparisons against a stated tolerance."
  - "Identify a unit inconsistency in a calculation and state the conversion needed to correct it."
references:
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Computers represent real numbers with a finite number of binary digits, so most decimal values are stored with a small error. Arithmetic on these values accumulates the error, and results that are correct in theory may differ slightly in practice. Peng (2011) argued that such differences are a normal part of computation, and a reproducible analysis must be robust to them. A result that changes in its last digit when the order of a sum is changed is not necessarily wrong, but it must not be compared with another value for exact equality.

The safe comparison uses a tolerance: two values are considered equal when their difference is smaller than a stated threshold. The threshold should be chosen for the scale of the quantity and documented. Subtracting two nearly equal numbers loses significant digits, and summing a long list of small numbers can accumulate error, so the order and the method of computation matter. Sandve et al. (2013) recommended that the numerical behaviour of an analysis be checked, not assumed.

Very large and very small quantities can overflow or underflow the range of the numbers the computer stores. Probabilities multiplied across many observations are a common example, and they are better handled on the logarithmic scale. Ioannidis (2005) described how numerical artefacts can produce apparent effects, and the stability of an estimate should be checked by repeating it with a different method or a different scale.

Unit errors are the most common silent mistakes in scientific calculation. A value recorded in millimetres and treated as metres changes the result by a factor of a thousand without any warning. Variable names that state the unit, a units library that refuses to combine incompatible quantities, and checks at the boundaries of each function all reduce this risk. Peng (2011) emphasised that these details are part of the methods, and a report should state the units of every reported quantity.
