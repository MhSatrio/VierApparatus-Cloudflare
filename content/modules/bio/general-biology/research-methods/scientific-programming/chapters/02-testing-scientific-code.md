---
title: "Testing Scientific Code"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Research Methodology"
description: "The testing of scientific code to establish that its functions produce correct results, covering unit tests that compare a function with a known answer computed by hand or by an independent method, tests of edge cases such as empty inputs, single values and extreme magnitudes, property-based tests that check invariants such as the conservation of totals or the monotonicity of a relation, regression tests that record a known output and flag any change, the use of simulated data with a known parameter to test whether an estimator recovers that parameter, and the reporting of test coverage and of the tests that pass and fail."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a unit test that compares a statistical function with a known answer computed independently."
  - "Use simulated data with a known parameter to test whether an estimation routine recovers that parameter."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A test is a statement of what a function should do, written in a form that can be run automatically. The most basic test compares the output of a function with a value known in advance, such as the mean of a small set of numbers computed by hand. When the function is changed, the test is run again, and any change in its behaviour is detected. Peng (2011) argued that such tests are part of the evidence that a computational result is correct, and they should be treated as part of the methods.

Edge cases are where most errors occur. An empty input, a single observation, a constant vector or a value at the limit of a numerical range can cause a function to fail or to return a plausible but wrong value. Tests should cover these cases explicitly. Ioannidis (2005) described how errors in analysis that go unnoticed contribute to unreliable findings, and edge-case tests are inexpensive protection against them.

Property-based tests check invariants that must hold for any input, such as the conservation of a total when data are redistributed or the fact that a variance is never negative. They are powerful because they check many inputs, not one. Regression tests record an output that is known to be correct and flag any later change to it, which protects the analysis against unintended effects of refactoring.

Simulated data with a known parameter provide a strong test of an estimator. A dataset is generated from a model with a chosen parameter, the estimator is applied, and the estimate should recover the parameter within its expected error. Cumming (2014) argues that the interval of the estimate should contain the true value at the stated rate, and a simulation can check this property directly.
