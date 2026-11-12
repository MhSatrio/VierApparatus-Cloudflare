---
title: "Circuit Specification"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The specification of a genetic circuit as a logic function of its inputs and outputs, written as a truth table or a Boolean expression, the definition of what counts as a high and a low signal in terms of measurable quantities, the handling of inputs that act at different strengths or thresholds, the separation of the specification from its implementation so that the same logic can be built with different parts, and the statement of the conditions under which the specification is intended to hold."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a genetic circuit specification as a truth table and define the thresholds that separate high from low output."
  - "Separate a circuit's logic from the parts that implement it and state the conditions under which the specification applies."
references:
  - "Nielsen, A. A. K., Der, B. S., Shin, J., Vaidyanathan, P., Paralanov, V., Strychalski, E. A., Ross, D., Densmore, D., & Voigt, C. A. (2016). Genetic circuit design automation. Science, 352(6281), aac7341. https://doi.org/10.1126/science.aac7341"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
---

A circuit specification states what the circuit must do, independently of how it will be built. The inputs and outputs are named, the logic that links them is written as a truth table or a Boolean expression, and the design is judged against it. Nielsen et al. (2016) used such a specification as the starting point of automated design, in which the tool searches for an implementation that matches the table. A specification that is vague about its logic cannot be checked, however sophisticated the tool that uses it.

The truth table is only meaningful once each state is defined in measurable terms. A signal is high when its output exceeds a threshold, and low when it falls below another, and these thresholds must be chosen with the measurement in mind. A threshold set too close to the background will count noise as signal, and one set too high will count true signal as low. The thresholds should be stated with the measurement that defines them.

Inputs do not always act at the same strength. An inducer may need a higher concentration to switch one gate than another, and a specification that treats all inputs as equal will fail when the implementation does not. The specification should give the input levels that correspond to high and low, so that the implementation can be designed to respond to them. Cumming (2014) argues that the input-output relation should be shown across the range rather than at two points, since the two points hide the transition.

The separation of logic from implementation is the central idea of the design approach. The same truth table can be implemented with different regulators, promoters and organisms, and a specification that stays fixed allows these implementations to be compared. The conditions under which the specification is intended to hold, including the host, the medium and the temperature, should be stated, since they limit the claim. Sandve et al. (2013) recommended recording the specification with the design, so that the logic can be verified after the implementation has changed.
