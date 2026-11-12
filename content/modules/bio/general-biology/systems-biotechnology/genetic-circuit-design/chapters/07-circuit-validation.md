---
title: "Circuit Validation"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The validation of a genetic circuit against its specification across all input combinations and across the conditions in which it will be used, the measurement of the truth table with replicate cells and independent experiments, the agreement between the measured and specified outputs as a proportion of correct states and as a measure of the separation between high and low outputs, the test on circuits built in a different laboratory or context, the distinction between a circuit that matches its specification by design and one that matches it on data not used in the design, and the record of failures that informs the next design round."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Measure a circuit's truth table across all input combinations with replicate cells and state the agreement with the specification."
  - "Explain why a circuit must be validated on data not used in its design and state the measure of separation between high and low outputs."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Nielsen, A. A. K., Der, B. S., Shin, J., Vaidyanathan, P., Paralanov, V., Strychalski, E. A., Ross, D., Densmore, D., & Voigt, C. A. (2016). Genetic circuit design automation. Science, 352(6281), aac7341. https://doi.org/10.1126/science.aac7341"
---

Validation tests whether a circuit does what its specification says, across all the input combinations and the conditions in which it will be used. The measured truth table is compared with the specified one, and each combination is classed as correct or incorrect according to whether the output falls on the required side of the threshold. A circuit that is correct for every combination in the specification has passed the basic test, though it may still fail in other conditions.

The measurement must use replicate cells and independent experiments, since the output varies from cell to cell. Each combination should be measured in several cultures on several days, and the proportion of cells in the correct state should be reported. Nielsen et al. (2016) measured automated designs in this way, and the variability between experiments is part of the result.

Two measures of quality are useful. The proportion of correct states summarises agreement with the specification, while the separation between the high and low outputs shows how reliably each state can be told apart. A circuit may reach the correct states with overlapping distributions, which would make it unreliable at the edges of its range even though its averages are correct. Cumming (2014) argues that the separation should be reported with its interval, since the overlap determines how often a cell is misclassified.

Ioannidis (2005) described how a model judged on the data used to design it appears more accurate than it is, and the validation must use circuits and experiments that played no part in the design. Circuits built in another laboratory or another strain should also be tested, since their context differs. Each failure should be recorded and fed back into the library and the design rules, so that the next design uses what the failure has taught.
