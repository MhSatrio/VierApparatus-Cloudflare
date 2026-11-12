---
title: "Variation Tracks and Population Data"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How genetic variants are displayed in genome browsers, the meaning of variant identifiers and alleles, the difference between a variant reported in a single study and one observed in a population, how frequencies are read from population tracks and the cautions needed before a variant is called disease-causing on the basis of a browser display."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Read a variant track and identify the position, the alleles and the identifier of a variant."
  - "Explain why a population frequency shown in a browser is not by itself evidence that a variant causes disease."
references:
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
---

Variant tracks show the positions at which the genome differs from the reference sequence. Each variant has a position, the reference allele and the alternative allele, and an identifier that refers to its record in a variation resource. Cunningham et al. (2022) describe the variation data that Ensembl integrates into its release, with the sources from which each variant comes. A variant shown in the browser is a record with a source, and its appearance on the screen does not by itself say how well it is supported.

Population tracks give the frequency of an allele across sampled individuals. The frequency depends on the populations sampled, and a variant common in one population may be rare in another. A frequency is a property of the sample, and the sample must be described before the frequency is compared with another. The sampling design determines how far a frequency can be generalised.

A common or rare variant is not automatically harmful or benign. A variant that is absent from population databases may be a real rare variant or a sequencing artefact, and a variant that is frequent may still affect a disease in a subset of people. Ioannidis (2005) described how selective reporting and flexible analysis make a published association less reliable than it appears, and an apparent link between a variant and a condition found in a browser deserves the same caution as a result in a paper.

The link from a variant to a claim about disease requires evidence beyond the browser. It requires a study design that tests the association, and a classification of the variant made by a process that is described. A browser display is a starting point for that work.

Wilkinson et al. (2016) recommended that data be described with their provenance and their conditions of reuse, and the source and the population of each variant are part of that description. A variant used in an analysis should be recorded with its identifier, its source and the population in which its frequency was measured.
