---
title: "Study Case: Mapping Glycolysis in VierStation's Explorer"
slug: vierstation-study-case-map-glycolysis
excerpt: "A step-by-step study case showing how to map a metabolic pathway in VierStation: enzymes, chemicals and reactions as linked records, filtered by evidence, and read in the network and pathway views."
coverImage: "https://images.vierapparatus.com/articles/2026/11/i_cov-glycolysis-map.webp"
coverImageAlt: "VierStation Explorer network view of the example glycolysis network: enzymes, chemicals and reactions drawn as shapes, with a legend for entity types and evidence."
date: 2026-11-12
author: "Muhammad Satrio"
category: "Research Techniques"
tags:
  - VierStation
  - metabolic pathways
  - glycolysis
  - relationship mapping
  - research software
seoTitle: "VierStation Study Case: Mapping Glycolysis in the Explorer"
seoDescription: "Learn how to map glycolysis in VierStation: linked enzyme, chemical and reaction records, evidence filters, the network and pathway views, and how to add a relationship."
status: published
---

Metabolic pathways are easy to draw badly. A diagram shows the steps, but it rarely shows where each fact came from, whether an enzyme has been measured or only predicted, or whether the order of the steps is known or assumed. This study case shows how VierStation keeps those details attached to each link, using glycolysis as the example.

VierStation is a local research workspace. It runs on your own computer, without an account, and stores its records in a local database. The example used here is a glycolysis-style network that ships with the software. It is illustrative data, not a curated database, and its records are labeled "(example)" where they could be mistaken for references.

## Step 1: Load the example network

Start VierStation and open the example loader described in its documentation. The loader adds 42 records, 8 reactions and 2 pathways to your current project. Running it again does not duplicate anything, because records are matched by name.

The records are spread across the research tables. Enzymes such as hexokinase, glyceraldehyde-3-phosphate dehydrogenase and phosphofructokinase are in the Proteins table. Glucose, ATP, NAD⁺ and the other small molecules are in Chemicals. Reactions and pathways have their own tables, so each one can be edited, filtered and exported on its own.

## Step 2: Open the Explorer

Choose **Explorer** in the sidebar. The network view draws every record as a node and every stored relationship as a line. The node shape shows the entity type. The line style and label show the evidence behind each relationship.

![VierStation Explorer network view of the example glycolysis network, with the legend for entity types and evidence.](https://images.vierapparatus.com/articles/2026/11/i_cov-glycolysis-map.webp "The Explorer network view. The legend on the lower left explains the shapes and line styles.")

The legend is always visible, and it is the key to reading the map. Solid lines mean experimentally verified or database-annotated relationships. Dashed lines mean computationally predicted ones, and dotted lines mean unverified. The shape and a marker letter identify the entity type, so the map still reads correctly without color.

## Step 3: Filter by what you need to know

The filter panel on the left narrows the map. Three filters are the most useful for a pathway study:

- **Entity type**, to show only enzymes, or only chemicals and reactions.
- **Relationship type**, for example only "Catalysed by" or "Substrate of".
- **Evidence**, to show only what has been experimentally verified, or to see everything with its status.

A common first question is "which steps rest on predicted rather than measured evidence?" Set the evidence filter to computationally predicted, and only those links remain.

## Step 4: Read the pathway, not just the network

The network shows relationships, but a pathway also has an order. Switch to the **Pathway** view. When no pathway is selected, the view asks you to choose one. Once a pathway is displayed, the view groups its reactions in one outlined container and lays them out along the order that the pathway record defines.

The order matters for interpretation, and VierStation is careful about it. A pathway whose order has not been recorded is shown as an unordered set, labeled "Order unknown / uncertain". The software never infers order from shared chemicals or tags. A pathway's order can come only from a curated source or from you.

The Pathways table shows the same records as a list, with their evidence and source fields. This is useful for checking which pathway records carry an external source and which were entered by hand.

![VierStation Pathways table listing the two example pathways with their evidence, source and status fields.](https://images.vierapparatus.com/articles/2026/11/i_LUE3WWjnEoRUOmu3.webp "The Pathways table. Each row carries its evidence and source fields.")

## Step 5: Check the evidence of one link

Click any node or line to open the **Inspector** beside the map. It shows the record's source (entered by you, taken from an external database, or generated by VierStation), its key fields, the evidence behind each relationship, its pathways, and its provenance history. A database annotation is never shown as experimental verification, so the Inspector is the place to check what a link actually rests on.

## Step 6: Add a relationship of your own

To record a new fact, open a record and choose **Add relation**. The form asks for the target record, the relationship type, the evidence class and a citation. You can add several relationships in one go and save them together. A record can be found or created on the spot, so the name "glucose" is never entered twice.

Relationships are stored in their own table, so deleting one never deletes the records it connects. The same pair of records can carry several relationships with different meanings or evidence, and an exact duplicate is refused with a message.

## Practical notes

- Everything shown in the Explorer is stored locally. External databases such as UniProt, PubChem and ChEMBL are contacted only when you ask for new data, and while you are offline those requests wait in the job queue.
- Cached answers from the last successful lookup remain available when you are offline, and VierStation says so when it shows one.
- Use the Explorer's export options to keep a copy of the network as a file, or to save a view with its filters and layout so that you can reopen it later.

## Summary

Mapping a pathway in VierStation means linking records, not drawing lines. Each link keeps its evidence and source, the filters let you ask what is verified, and the pathway view shows order only where order is recorded. The example network is a safe place to try these steps before you enter your own data.

## References

1. Kim, S., Chen, J., Cheng, T., Gindulyte, A., He, J., He, S., Li, Q., Shoemaker, B. A., Thiessen, P. A., Yu, B., Zaslavsky, L., Zhang, J., & Bolton, E. E. (2022). PubChem 2023 update. *Nucleic Acids Research*, 51(D1), D1373–D1380. https://doi.org/10.1093/nar/gkac956
2. Zdrazil, B., Felix, E., Hunter, F., Manners, E. J., Blackshaw, J., Corbett, S., de Veij, M., Ioannidis, H., Lopez, D. M., Mosquera, J. F., Magarinos, M. P., Bosc, N., Arcila, R., Kizilören, T., Gaulton, A., Bento, A. P., Adasme, M. F., Monecke, P., Landrum, G. A., & Leach, A. R. (2023). The ChEMBL Database in 2023: a drug discovery platform spanning multiple bioactivity data types and time periods. *Nucleic Acids Research*, 52(D1), D1180–D1192. https://doi.org/10.1093/nar/gkad1004
3. The UniProt Consortium, Bateman, A., Martin, M.-J., Orchard, S., Magrane, M., Ahmad, S., Alpi, E., Bowler-Barnett, E. H., Britto, R., Bye-A-Jee, H., Cukura, A., Denny, P., Dogan, T., Ebenezer, T., Fan, J., Garmiri, P., da Costa Gonzales, L. J., Hatton-Ellis, E., Hussein, A., ... Zhang, J. (2022). UniProt: the Universal Protein Knowledgebase in 2023. *Nucleic Acids Research*, 51(D1), D523–D531. https://doi.org/10.1093/nar/gkac1052
