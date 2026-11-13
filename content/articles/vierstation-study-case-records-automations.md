---
title: "Study Case: Keeping a Research Project in Order With Records, Relationships and Automations"
slug: vierstation-study-case-records-automations
excerpt: "A step-by-step study case for organizing a research project in VierStation: records in tables, relationships between them, and automations that stay off until you have checked them."
coverImage: "https://images.vierapparatus.com/articles/2026/11/i_cov-records-table.webp"
coverImageAlt: "VierStation Proteins table with eight example enzyme records and their columns."
date: 2026-11-12
author: "Muhammad Satrio"
category: "Research Techniques"
tags:
  - VierStation
  - research data management
  - automation
  - laboratory records
  - research software
seoTitle: "VierStation Study Case: Records, Relationships and Automations"
seoDescription: "How to organize a research project in VierStation with linked records, a relationships view and automations that stay off until reviewed."
status: published
---

A research project quickly outgrows a spreadsheet. Proteins, chemicals, reactions and literature each have their own fields, and the links between them are where most mistakes happen. This study case walks through how VierStation organizes a project: records in tables, relationships between records, and automations that act on changes, with the safety settings that keep them under your control.

VierStation runs on your own computer and needs no account. Its example project, **My first project**, is a good place to practise. The example records are illustrative and are labeled as such.

## Step 1: Work in tables

Every kind of research item has its own table. The sidebar lists the tables with their record counts. Open **Proteins** to see the eight example enzyme records in the **All records** view.

![VierStation Proteins table with eight example enzyme records and their columns.](https://images.vierapparatus.com/articles/2026/11/i_cov-records-table.webp "The Proteins table in the All records view. Each row is one record, each column one field.")

Each table can be filtered, sorted, grouped and searched without changing the data. The Fields button shows or hides columns, so the same records can be read as a short list or as a detailed sheet. A **View** can be saved with its filters and column choices, so you can return to the same arrangement later.

The Proteins table also offers Workflow board, Gallery and Relationships tabs. These show the same records in other forms, which is useful when you want to see the progress of a project or the links between items rather than their fields.

## Step 2: Add records with their sources

To add a record, use **Add record** in the table header, or **Import CSV** to bring in a list. Fill in the name and the fields that matter for your project, and note the source of each fact: a database accession, a publication or your own measurement. VierStation keeps the source with the record, so a later reader can tell whether a value was measured or copied.

Records can also be fetched from scientific databases. Those requests wait in the job queue while the computer is offline, and they run when the connection returns. When something fails, VierStation records the failure and offers a review task rather than dropping it silently.

## Step 3: Link records with relationships

A table tells you what a record is. Relationships tell you how records are connected. Open a record's relationship section, or the **Relationships** tab, and add a link to another record. Each relationship has a type, such as "Catalysed by" or "Inhibits", and an evidence class that says how the link was established.

Relationships live in their own table, so deleting one never deletes the records it connects. Two records can be linked several times with different meanings or evidence. The same network can then be read in the Explorer, which the glycolysis study case covers.

## Step 4: Set up automations, but keep them off

Automations let VierStation act when something happens. Each one has a trigger, optional conditions and one or more actions. The **Automations** page lists them with their triggers, for example "New protein → Search AlphaFold" or "New chemical → Retrieve PubChem metadata".

![VierStation Automations page listing the rules that run when a record changes. All rules are switched off by default.](https://images.vierapparatus.com/articles/2026/11/i_ogB1cvPk5bQ88Bfq.webp "The Automations page. Every rule starts switched off, and each one shows its trigger and its action.")

The example rules on this page are switched off, so nothing runs until you turn one on. Before you switch one on, open it and check three things:

1. **The trigger.** Make sure it fires on the records you intend, not on every change.
2. **The conditions.** A condition such as "if an accession exists" prevents a lookup for a record that has no identifier to search by.
3. **The action.** Some actions contact external databases, and some send notifications.

Use **Run now** to test a rule on the records you choose before you let it run on its own. The **History** button shows each run, so you can see what changed and when.

VierStation also protects against runaway chains. Automations never re-trigger themselves, and a chain of changes stops after three steps. Notifications appear inside the application and, if you allow it, in the browser. No e-mail is sent.

## Step 5: Review what changed

The notification centre and the activity log record what automations and people have done. Use them at the end of each working session, especially after a batch import or after an automation has run for the first time. A short review at this point catches a wrong trigger before it affects many records.

## Practical notes

- Lookups in external databases, such as NCBI, UniProt, AlphaFold or PubChem, need an internet connection. Offline, they wait.
- The example records are not curated data. Replace them with your own records before you rely on any result.
- Keep one project per study. The whole-workspace export in the settings moves the database, files, images and structures to another installation as a single file.

## Summary

Organising a project in VierStation means three habits: put each kind of item in its own table with its source, link related items with typed and evidenced relationships, and switch on automations only after you have tested them. The Automations page is safe to explore, because the example rules run only after you switch them on.

## References

1. Varadi, M., Anyango, S., Deshpande, M., Nair, S., Natassia, C., Yordanova, G., Yuan, D., Stroe, O., Wood, G., Laydon, A., Žídek, A., Green, T., Tunyasuvunakool, K., Petersen, S., Jumper, J., Clancy, E., Green, R., Vora, A., Lutfi, M., ... Velankar, S. (2021). AlphaFold Protein Structure Database: massively expanding the structural coverage of protein-sequence space with high-accuracy models. *Nucleic Acids Research*, 50(D1), D439–D444. https://doi.org/10.1093/nar/gkab1061
2. Rego, N., & Koes, D. (2014). 3Dmol.js: molecular visualization with WebGL. *Bioinformatics*, 31(8), 1322–1324. https://doi.org/10.1093/bioinformatics/btu829
3. The UniProt Consortium, Bateman, A., Martin, M.-J., Orchard, S., Magrane, M., Ahmad, S., Alpi, E., Bowler-Barnett, E. H., Britto, R., Bye-A-Jee, H., Cukura, A., Denny, P., Dogan, T., Ebenezer, T., Fan, J., Garmiri, P., da Costa Gonzales, L. J., Hatton-Ellis, E., Hussein, A., ... Zhang, J. (2022). UniProt: the Universal Protein Knowledgebase in 2023. *Nucleic Acids Research*, 51(D1), D523–D531. https://doi.org/10.1093/nar/gkac1052
