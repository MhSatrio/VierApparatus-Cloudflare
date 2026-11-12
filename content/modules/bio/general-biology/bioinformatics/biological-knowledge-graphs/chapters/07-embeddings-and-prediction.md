---
title: "Embeddings and Prediction"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the nodes of a knowledge graph are represented by vectors that capture their neighbourhood, the use of such embeddings to predict missing edges between entities, the hold-out evaluation that tests a predictor on edges removed from the graph, the risk that a predictor learns the bias of the data rather than the biology and the reasons a predicted edge is a hypothesis that must be checked against evidence the graph does not contain."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how an embedding places nodes in a space so that nodes with similar neighbourhoods lie close together."
  - "Evaluate a link predictor by holding out edges and state why a good hold-out score does not prove the prediction is biologically correct."
references:
  - "Himmelstein, D. S., Lizee, A., Hessler, C., Brueggeman, L., Chen, S. L., Hadley, D., Green, A., Khankhanian, P., & Baranzini, S. E. (2017). Systematic integration of biomedical knowledge prioritizes drugs for repurposing. eLife, 6, e26726. https://doi.org/10.7554/eLife.26726"
  - "Barabási, A.-L., & Oltvai, Z. N. (2004). Network biology: understanding the cell's functional organization. Nature Reviews Genetics, 5(2), 101-113. https://doi.org/10.1038/nrg1272"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

An embedding represents each node of a graph as a vector of numbers so that nodes with similar connections are placed close together. The vectors are learned from the structure of the graph, and they can be compared by simple arithmetic. Two drugs that act on similar proteins and treat similar diseases will have similar embeddings, and the embedding can be used to predict a relation that is missing from the graph between a drug and a disease. The method generalises the path-based ideas of the earlier chapter to a continuous representation.

The predictor is evaluated by hold-out. A portion of the known edges is removed from the graph before training, the predictor is trained on the rest, and it is asked to score the removed edges against random pairs that are not in the graph. A predictor that ranks the held-out edges above the random pairs has learned something about the structure. The evaluation must hold out edges so that the test is of prediction, not of memory of the training data.

The hold-out score has limits. A graph is biased toward well-studied entities, and a predictor trained on it may learn that well-studied drugs are linked to many diseases, which is an artefact of study and not of biology. Barabási and Oltvai (2004) described the hubs of biological networks, and a predictor that rewards hubs will perform well on the held-out edges for reasons unrelated to mechanism. Ioannidis (2005) described how selection and bias produce findings that look stronger than they are, and the same happens when a predictor is trained on a biased graph.

Himmelstein et al. (2017) used the structure of their graph to rank candidates, and the prediction was tested against known indications. A predicted edge is therefore a hypothesis within the graph, and it must be checked against evidence that the graph does not contain, such as a clinical study or a laboratory experiment.

Sandve et al. (2013) recommended recording the hold-out design, the training data and the evaluation metric, since the apparent performance of a predictor depends on each.
