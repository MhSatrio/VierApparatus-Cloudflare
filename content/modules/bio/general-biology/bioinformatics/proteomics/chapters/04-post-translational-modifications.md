---
title: "Post-Translational Modifications"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How modified peptides such as those carrying phosphorylation, acetylation or glycosylation are identified by mass spectrometry, the mass shifts that mark each modification, the search with variable modifications and the cost in search space and in false identifications, the localisation of a modification to a particular residue and the reporting of modified sites with their confidence."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a post-translational modification appears in a mass spectrum and how a search is configured to find it."
  - "Explain why adding variable modifications increases both the power and the false identifications of a search and how a modified site is localised."
references:
  - "Aebersold, R., & Mann, M. (2016). Mass-spectrometric exploration of proteome structure and function. Nature, 537(7620), 347-355. https://doi.org/10.1038/nature19949"
  - "Cox, J., & Mann, M. (2008). MaxQuant enables high peptide identification rates, individualized p.p.b.-range mass accuracies and proteome-wide protein quantification. Nature Biotechnology, 26(12), 1367-1372. https://doi.org/10.1038/nbt.1511"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A modification changes the mass of a residue, and the change appears in the spectrum as a shift of the peaks that contain it. Alberts et al. (2022) describe the modifications that regulate protein activity, including phosphorylation and acetylation, and the mass spectrometer is the principal means of finding them on a large scale. A modified peptide is identified only if the search allows the modification, so the set of modifications searched for determines which modified peptides can be found at all.

Variable modifications are searched by allowing each residue of a given type to carry the modification or not. This multiplies the number of candidate peptides, and with it the chance of a false match. Cox and Mann (2008) describe the handling of modifications in a search engine of this kind, and the cost of each added modification is a larger search space and a higher threshold for a credible match. A search for many modifications at once is therefore less sensitive for each.

Localisation is the question of which residue carries the modification. A peptide with two phosphorylatable residues may show a mass shift that does not say which one is phosphorylated, and the spectrum must contain fragments that distinguish the two positions. A site is localised with a confidence measure, and a site whose localisation is ambiguous should be reported as a group of possible residues.

Aebersold and Mann (2016) describe the aim of such analyses, which is to connect modifications to the structure and function of the proteins, and a modification identified without a localisation or a function remains a candidate. The biological claim, that a site regulates a process, requires further evidence beyond the mass spectrum.

The modifications searched, their mass shifts, the localisation confidence and the false discovery rate for modified peptides must be reported with the sites. Sandve et al. (2013) recommended recording the parameters that define what a search can find, and the modifications searched are among the most important of these.
