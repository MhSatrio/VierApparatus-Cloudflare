---
title: "Integrating Datasets"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "Why datasets from different experiments, donors or batches must be integrated before their cell types are compared, the batch effects that make cells from the same type look different across experiments, the anchor-based integration described by Stuart et al. and the risk that integration over-corrects and merges biologically different cells, together with the checks that confirm an integration has removed technical variation without removing biology."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why cells of the same type can separate by batch and why integration is needed before comparing datasets."
  - "Check an integration for over-correction that merges distinct cell types and for under-correction that leaves batch structure in place."
references:
  - "Stuart, T., Butler, A., Hoffman, P., Hafemeister, C., Papalexi, E., Mauck, W. M., Hao, Y., Stoeckius, M., Smibert, P., & Satija, R. (2019). Comprehensive Integration of Single-Cell Data. Cell, 177(7), 1888-1902. https://doi.org/10.1016/j.cell.2019.05.031"
  - "Wolf, F. A., Angerer, P., & Theis, F. J. (2018). SCANPY: large-scale single-cell gene expression data analysis. Genome Biology, 19(1), 15. https://doi.org/10.1186/s13059-017-1382-0"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

Single-cell experiments are rarely done once. A study may use several donors, several days of processing or several laboratories, and the cells of one type from different experiments may differ in their profiles for technical reasons. The batch can be strong enough that the cells cluster by experiment rather than by type, and such a clustering is useless for the biology. Integration aims to remove the technical differences while keeping the biological ones, so that a cell type can be recognised across the experiments.

Stuart et al. (2019) describe an approach based on anchors, pairs of cells from different datasets that are mutual nearest neighbours and therefore likely to be of the same type. The anchors define a correction that aligns the datasets, and the aligned data can be clustered together. The method is one of several, and the principle, that corresponding cells are matched across batches, is common to them.

Integration can over-correct. A method that aligns the datasets too strongly can merge two cell types that differ in biology, so that a real distinction disappears. The check is to see whether the known cell types remain separate after integration, and whether the merged clusters contain markers that distinguish the types before correction. Over-correction is a more serious error than under-correction, since it destroys the signal the analysis seeks.

Under-correction leaves the batch structure in place. The clusters then reflect the experiments, and the cell types are split across them. The check is to see whether the clusters are mixed across batches, with each cell type represented in each dataset.

Wolf et al. (2018) describe the software in which such integration and checks are implemented, and Taschuk and Wilson (2017) recommended that the software be tested. Wilkinson et al. (2016) set out the FAIR principles, and integrated datasets should be deposited with their origin recorded, since the integration depends on the datasets combined.
