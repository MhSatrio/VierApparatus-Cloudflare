---
title: "Reporting Neural Models"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "What a neural model study must report for its results to be reproduced and judged, including the neuron model and its parameters, the network architecture and connectivity, the training or fitting procedure, the data against which the model is compared, the statistics of the comparison and the availability of the code and the simulations."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "List the information a neural model report must contain for another group to reproduce the model and its comparison with data."
  - "Judge a neural model by its biological grounding, its comparison with data and the reproducibility of its results."
references:
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Hopfield, J. J. (1982). Neural networks and physical systems with emergent collective computational abilities. Proceedings of the National Academy of Sciences of the United States of America, 79(8), 2554-2558. https://doi.org/10.1073/pnas.79.8.2554"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
---

A neural model can be reproduced only if its equations, parameters and simulation are reported, and many published models have been difficult to reproduce for want of these details. The neuron model is named with its equations and its parameter values, along with the source of each value, whether fitted to data, taken from the literature or chosen for convenience. The network is described by its architecture, the number of neurons of each type, the connectivity and the distributions of the synaptic weights, since these determine the dynamics.

The procedure by which the model was constructed or trained must be stated. A model fitted to data reports the fitting method, the objective function and the data used, and a model whose parameters were tuned to reproduce a result reports the tuning, since tuning can make a model appear to explain data it was adjusted to fit. Ioannidis (2005) described how such flexibility can produce models that reproduce the results they were built on and fail on new data, and the report must make the tuning visible.

The comparison with data must be specified. The data used for the comparison, the statistics applied, the criteria for agreement and the test data withheld from the construction are all required, and a model compared only with the data used to build it has not been tested. Platt (1964) recommended stating the predictions in a form that could be refuted, and a report of predictions tested on new data meets that standard.

The biological grounding of the model is stated. The equations that are taken from measured biophysics are identified, and the parts that are chosen for convenience or for computational reasons are marked as such, so that a reader can see which features of the model are supposed to correspond to the biology. Hodgkin and Huxley (1952) based their equations on measured currents, and a model that claims biological grounding should show comparable links.

The simulation code and the parameter files are made available. The network of Hopfield (1982) was described in a form that could be analysed mathematically, and the availability of the code and the simulations allows the behaviour of a model to be examined and reproduced by others. Alberts et al. (2022) describe the biology that the models aim to represent, and the report should state where the model and the biology diverge.

A neural model is a claim about how neurons compute, and its report is complete when another group can rebuild the model and test its predictions on the same data.
