---
title: "Colour and Accessibility"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biostatistics and Biological Data Science"
description: "The use of colour in scientific figures to encode categories and continuous values, the sequential and diverging palettes that suit ordered quantities, the qualitative palettes for unordered groups, the limit on the number of distinguishable colours, the effect of colour vision deficiency on the reading of red and green contrasts, the requirement that a figure remain interpretable in greyscale, and the choice of redundant encodings such as shape or line style to carry the same information as colour."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Choose a sequential, diverging or qualitative palette according to whether the data are ordered, centred or unordered."
  - "Design a figure whose categories remain distinguishable for readers with colour vision deficiency and in greyscale."
references:
  - "Rougier, N. P., Droettboom, M., & Bourne, P. E. (2014). Ten Simple Rules for Better Figures. PLoS Computational Biology, 10(9), e1003833. https://doi.org/10.1371/journal.pcbi.1003833"
  - "Cleveland, W. S., & McGill, R. (1984). Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods. Journal of the American Statistical Association, 79(387), 531-554. https://doi.org/10.1080/01621459.1984.10478080"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

Colour is useful in a figure because it allows many categories or a continuous value to be shown together, but it is also the channel that readers judge least accurately, as Cleveland and McGill (1984) found for colour saturation. A colour palette therefore has to be chosen for its purpose. The type of the data determines the palette: unordered categories need qualitative colours that are clearly different, ordered values need a sequential palette whose lightness increases with the value, and values with a meaningful centre need a diverging palette.

The number of colours that a reader can distinguish in one figure is limited. Beyond a handful of categories, colours become hard to tell apart and to match with a legend, and the figure should be simplified, split into panels or labelled directly where possible. Rougier et al. (2014) advised labelling the data within the plot rather than relying on a legend, which reduces the effort of matching colour to category.

A substantial fraction of readers have colour vision deficiency, most often a difficulty in distinguishing red from green. A figure whose categories differ only in these colours is unreadable for them, and a palette should be chosen that remains distinct under the common deficiencies. The categories should also differ in lightness, so that they can be told apart when printed in greyscale or viewed on a poor display.

A redundant encoding carries the same information in colour and in another channel such as shape, line style or position. This makes the figure readable whatever the colour vision of the reader and whatever the medium of reproduction. Sandve et al. (2013) recommended that the colours and palettes be recorded in the code that generates the figure, so that the choice can be reproduced and changed without redrawing the figure by hand.
