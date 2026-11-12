---
title: "Perception and Encoding"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "How the visual system decodes the encodings of a figure, the ranking of position on a common scale, length, angle, area, volume and colour saturation by the accuracy with which people judge them, the consequences of this ranking for the choice of encoding in biological figures, the role of the common baseline in comparing bars and points, and the reasons that a figure should place the most important comparison on the channel that is read most precisely."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Rank the common visual encodings by the accuracy of human judgement and apply the ranking to a biological comparison."
  - "Explain why a shared baseline matters when comparing bars or points and state which encoding to use for the main comparison."
references:
  - "Cleveland, W. S., & McGill, R. (1984). Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods. Journal of the American Statistical Association, 79(387), 531-554. https://doi.org/10.1080/01621459.1984.10478080"
  - "Rougier, N. P., Droettboom, M., & Bourne, P. E. (2014). Ten Simple Rules for Better Figures. PLoS Computational Biology, 10(9), e1003833. https://doi.org/10.1371/journal.pcbi.1003833"
---

Every figure encodes numbers in visual properties, and the reader decodes them with more or less accuracy depending on the property. Cleveland and McGill (1984) examined how well people judge quantities encoded in position along a common scale, in position along non-aligned scales, in length, in angle, in area, in volume and in colour saturation. Their experiments showed a consistent ranking, with position on a common scale judged most accurately and colour saturation judged least accurately.

The ranking has direct consequences for biological figures. A comparison of the expression of a gene across groups is read most accurately as a set of points on a common axis, and it is read less accurately as the areas of bars or the shade of a colour. A figure that encodes its main comparison in area or in colour asks the reader to perform the hardest judgement on the most important quantity, which is a common source of misreading.

A shared baseline is essential. Bars are judged by their length from a common zero, and a bar chart with a baseline that does not start at zero distorts the comparison of ratios, which is why many guidelines require zero for bars. Points do not require a zero baseline, because their comparison is one of position, and a dot plot with a suitable range shows the differences clearly. Rougier et al. (2014) advised that the axis should be chosen to show the comparison, and that the choice should be stated.

The principle is to place the main comparison on the channel that is read most precisely and to use the other channels for secondary information. Rougier et al. (2014) gave rules that follow from this, and Cleveland and McGill (1984) provided the empirical basis. A reader can check the claim of a figure only if its encoding allows accurate reading, and the choices should be made with that check in mind.
