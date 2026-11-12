---
title: "FAIR Principles and Using Databases Well"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "The FAIR principles of findability, accessibility, interoperability and reusability for scientific data, how they apply to biological databases and to the datasets that analyses produce, a practical checklist for using databases well in an analysis and the way that FAIR data make results verifiable and reusable by others."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain each of the four FAIR principles and give an example of a biological dataset that meets each one."
  - "Apply a checklist for using a biological database in an analysis, covering its version, identifiers, licence and provenance."
references:
  - "Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., Appleton, G., Axton, M., Baak, A., Blomberg, N., Boiten, J.-W., da Silva Santos, L. B., Bourne, P. E., Bouwman, J., Brookes, A. J., Clark, T., Crosas, M., Dillo, I., Dumon, O., Edmunds, S., Evelo, C. T., Finkers, R., . . . Mons, B. (2016). The FAIR Guiding Principles for scientific data management and stewardship. Scientific Data, 3(1), 160018. https://doi.org/10.1038/sdata.2016.18"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Cunningham, F., Allen, J. E., Allen, J., Alvarez-Jarreta, J., Amode, M. R., Armean, I. M., Austine-Orimoloye, O., Azov, A. G., Barnes, I., Bennett, R., Berry, A., Bhai, J., Bignell, A., Billis, K., Boddu, S., Brooks, L., Charkhchi, M., Cummins, C., Da Rin Fioretto, L., . . . Flicek, P. (2022). Ensembl 2022. Nucleic Acids Research, 50(D1), D988-D995. https://doi.org/10.1093/nar/gkab1049"
---

The FAIR principles, set out by Wilkinson et al. (2016), describe what makes scientific data useful to people and to machines. Data should be findable, with persistent identifiers and rich descriptions. They should be accessible, retrievable by their identifiers through a standard protocol and with clear conditions. They should be interoperable, using shared formats and vocabularies so that they can be combined with other data. And they should be reusable, with their provenance, licence and detail sufficient for another group to use them in a new way.

Biological databases are built largely on these principles. Records carry stable identifiers, they are described with standard fields, they can be retrieved programmatically and their contents are documented. Ensembl, described by Cunningham et al. (2022), illustrates the approach, since its gene identifiers, release versions and standard formats allow the data to be used by many tools. The datasets that an analysis produces should meet the same standard if they are to be useful to others.

A practical checklist helps when a database is used in an analysis. The version of the database and its release must be recorded, and the identifiers used must be checked against that version. The licence and any access conditions should be noted, and the provenance and evidence of the records used should be considered. The date of retrieval and the query that produced the data complete the record.

Peng (2011) argued that the value of data depends on whether others can use them, and the FAIR principles are the means by which that use is made possible. Sandve et al. (2013) recommended that the sources of an analysis be documented, which is the same requirement in practical form.

Following the principles makes a result verifiable. A dataset that is findable, accessible and well described can be checked, and a result that rests on such data can be repeated by those who did not produce it.
