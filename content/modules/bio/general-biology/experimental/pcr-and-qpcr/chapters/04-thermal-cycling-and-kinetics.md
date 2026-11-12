---
title: "Thermal Cycling and Amplification Kinetics"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "How a thermal cycler programs denaturation, annealing and extension, how cycle number and extension time shape the product and how the kinetics of amplification move from exponential growth to plateau."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write a thermal cycling programme with denaturation, annealing and extension steps suited to the amplicon length."
  - "Explain how amplification efficiency determines the product yield at each cycle."
references:
  - "Mullis, K. B., & Faloona, F. A. (1987). Specific synthesis of DNA in vitro via a polymerase-catalyzed chain reaction. Methods in Enzymology, 155, 335-350. https://doi.org/10.1016/0076-6879(87)55023-6"
  - "Saiki, R. K., Gelfand, D. H., Stoffel, S., Scharf, S. J., Higuchi, R., Horn, G. T., Mullis, K. B., & Erlich, H. A. (1988). Primer-directed enzymatic amplification of DNA with a thermostable DNA polymerase. Science, 239(4839), 487-491. https://doi.org/10.1126/science.2448875"
  - "Bustin, S. A. (2000). Absolute quantification of mRNA using real-time reverse transcription polymerase chain reaction assays. Journal of Molecular Endocrinology, 25(2), 169-193. https://doi.org/10.1677/jme.0.0250169"
---

A thermal cycler moves the reaction through a programme of temperatures, and the programme determines how efficiently each cycle copies the target. The denaturation step separates the strands, typically at about ninety-five degrees Celsius for a short time. The annealing step lets the primers bind, at the temperature chosen for the primer pair. The extension step is run at the optimum temperature of the polymerase, about seventy-two degrees Celsius, and its duration depends on the length of the amplicon, since the enzyme copies a fixed number of bases per second.

Mullis and Faloona (1987) described the cycle as three temperatures, and Saiki et al. (1988) showed that the cycle could be repeated automatically with a thermostable enzyme. The number of cycles is commonly between twenty-five and forty. A small number gives too little product for detection, and a large number leads to a plateau in which the product is no longer proportional to the starting template.

The kinetics follow a predictable pattern. In the exponential phase, the product increases by a factor close to two each cycle if the efficiency is high. As primers, nucleotides and enzyme are consumed, and as product accumulates and reanneals, the rate falls and the reaction enters the plateau. The phase in which the reaction is still exponential is the only one that carries quantitative information.

Efficiency is therefore the central parameter. A reaction of ninety per cent efficiency produces a different yield from one of one hundred per cent, and the difference compounds over many cycles. Bustin (2000) emphasised that efficiency must be measured for each assay rather than assumed.

The programme should be recorded in full, including the ramp rates, the times and the number of cycles, because the same reaction run on a different instrument can give a different product.
