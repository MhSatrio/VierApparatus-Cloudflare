---
title: "Factorial and Nested Designs"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How to study two or more factors in one experiment with a factorial design, how interactions are detected and how nested designs separate sources of variation such as animals within litters or cells within cultures."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Design a factorial experiment and interpret its main effects and interaction."
  - "Recognise when observations are nested and account for the nesting in the design and analysis."
references:
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

Many biological questions involve more than one factor. A drug may act differently in males and females, or a gene may matter only in certain conditions. A factorial design tests all combinations of the factors in one experiment. For two factors with two levels each, the design has four groups, and it estimates the main effect of each factor and the interaction, which measures whether the effect of one factor depends on the level of the other.

The interaction is often the most informative result, because it shows that a factor works only under some conditions. An experiment that varied one factor at a time could miss the interaction entirely, and a factorial design reveals it directly. Platt (1964) emphasised that experiments should test the alternatives that matter, and a factorial design often covers the alternatives more efficiently than a sequence of single-factor experiments.

Nested designs arise when observations are grouped at different levels. Cells are grouped within cultures, cultures within experiments, animals within litters. Treating the cells as independent when they share a culture overstates the number of independent observations and inflates the apparent significance. The analysis must recognise each level of grouping, so that the variation among cultures is compared with the variation among cells within cultures.

Ioannidis (2005) described the consequences of treating non-independent observations as independent, which is a common source of false positives. A design that is nested but analysed as if it were not produces results that appear more reliable than they are.

Alberts et al. (2022) describe the biological sources of variation, such as differences between litters and cultures, that nested designs must account for. The planning of a factorial or nested design should include a power calculation for the interaction, which is usually larger than the main effect and requires more samples.
