---
title: "Compartments and Transport"
subject: "Biology"
specialization: "General Biology"
academic_level: "Systems Biology and Biotechnology"
description: "The representation of the compartments of a cell, such as the cytosol, mitochondria and the extracellular space, in a metabolic reconstruction, the transport reactions that move metabolites between compartments and across the membrane, the separate identifiers needed for the same metabolite in each compartment, the energetic constraints on transport that are often the source of unrealistic energy-producing cycles, and the specification of the uptake reactions that define the nutrients available to the modelled organism."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Represent a metabolite in several compartments and write the transport reaction that moves it between them."
  - "Identify an energy-producing cycle created by transport reactions and explain how it is prevented."
references:
  - "Thiele, I., & Palsson, B. Ø. (2010). A protocol for generating a high-quality genome-scale metabolic reconstruction. Nature Protocols, 5(1), 93-121. https://doi.org/10.1038/nprot.2009.203"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A eukaryotic cell is divided into compartments, and its metabolism is distributed among them. The cytosol, the mitochondria, the endoplasmic reticulum and the extracellular space each contain different metabolites and enzymes. A metabolic reconstruction must represent these compartments, so that each metabolite has a separate entry for each compartment in which it occurs, and each reaction states the compartment in which it takes place. Thiele and Palsson (2010) recommended this explicit representation so that the model can capture the spatial organisation of metabolism.

Transport reactions move metabolites between compartments and across the cell membrane. They are necessary for the network to function, since a metabolite made in one compartment may be needed in another, and the uptake of nutrients from the medium is itself a transport reaction. Each transport reaction must be written with its stoichiometry and its direction, and the proteins that carry it should be recorded when they are known.

Transport reactions can create unrealistic cycles. A reaction set that moves a proton across a membrane and back without any net consumption can produce energy from nothing, and the model will then predict growth that is not possible. Such energy-generating cycles are a common error in reconstructions, and they are detected by searching for flux distributions that produce energy without any input. Cumming (2014) argues that the constraints added to prevent such cycles should be reported, since they change the set of feasible behaviours.

The uptake reactions define the nutrients available to the modelled organism, and the predictions depend on them. A model grown on an assumed medium predicts the growth of the organism on that medium and no other, and the medium must be stated with the model. Sandve et al. (2013) recommended recording the medium and the exchange bounds, since a prediction without its medium cannot be compared with an experiment.
