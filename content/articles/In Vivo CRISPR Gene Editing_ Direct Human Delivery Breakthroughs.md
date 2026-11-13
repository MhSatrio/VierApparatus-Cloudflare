---
title: "In Vivo CRISPR Gene Editing: Direct Human Delivery Breakthroughs"
slug: in-vivo-crispr-gene-editing-breakthroughs
excerpt: "A comprehensive overview of direct human delivery breakthroughs in in vivo CRISPR gene editing, including non-viral LNP systems, VLPs, base and prime editing, clinical target organs, and key technical considerations."
coverImage: "/images/CRISPR.avif"
coverImageAlt: "Microscopic illustration of gene editing delivery vectors and lipid nanoparticles"
date: 2026-03-15
updated: 2026-11-12
author: Kevin Chrissetiadi
category: "Molecular Biology"
tags:
  - CRISPR
  - gene editing
  - in vivo delivery
  - lipid nanoparticles
  - biotechnology
seoTitle: "In Vivo CRISPR Gene Editing: Breakthroughs & Delivery Systems"
seoDescription: "In vivo CRISPR editing without ex vivo cell manufacturing: lipid nanoparticles, virus-like particles, base and prime editing, and the key clinical evidence."
status: published
productSlug: "cell-culture-plate"
relatedProductSlugs:
  - "co2-incubator-80l-160l"
  - "automatic-cell-culture-system"
---

Traditional CRISPR treatments relied on *ex vivo* editing. Doctors harvested a patient's cells, edited them in a laboratory, and returned them after harsh conditioning. **In vivo CRISPR gene editing** instead delivers the editing machinery into the body, usually intravenously or by local injection, so the cells are edited where they are. That removes the cell harvest and the conditioning step, which is the main attraction of the approach.

> **A note on the state of the field.** The mechanisms and targets below come from research and early clinical studies. Delivery efficiency, target-organ reach and regulatory status differ between candidates and between countries. Check the primary trial publications for exact parameters before relying on any figure.

## Key Delivery Breakthroughs

- **Non-viral delivery.** Lipid nanoparticles (LNPs) carry CRISPR components as mRNA or as preassembled protein–RNA complexes. The cargo is expressed only briefly, which lowers the chance of long-lasting off-target edits.
- **Organ targeting.** Changing the composition of an LNP can redirect it to organs other than the liver. The SORT approach adds a tuning component to the particle so that it accumulates in a chosen tissue (Cheng et al., 2020).
- **Virus-like particles (VLPs).** Engineered particles can package Cas ribonucleoproteins without viral genomes. Most of this work is still preclinical.
- **Base and prime editors.** These enzymes change single bases, or write short edits, without making a double-stranded DNA break (Gaudelli et al., 2017; Anzalone et al., 2019).

## Primary In Vivo Vector Systems

### 1. Lipid nanoparticles

Adeno-associated viruses (AAVs) were the first choice for many gene therapies, but LNPs have become the main vehicle for in vivo editing of the liver. Ionizable lipids let an LNP carry its cargo through the bloodstream and release it inside cells. Delivering Cas9 as mRNA plus guide RNA, or as a ribonucleoprotein complex, keeps the editing window short.

The clearest human evidence so far comes from a trial in patients with hereditary transthyretin (ATTR) amyloidosis. A single intravenous infusion of an LNP-delivered Cas9 system lowered serum transthyretin in the treated patients (Gillmore et al., 2021). The study was small and early-stage, but it is the first report of this design in patients.

### 2. Engineered virus-like particles and extracellular vesicles

Proteo-lipid particles, sometimes called nanoblades, package Cas ribonucleoproteins directly and carry no viral genome. Surface ligands or antibody fragments can direct them toward particular cell types. Proposals to generate CAR-T cells directly inside the body use this approach, but these studies are preclinical.

### 3. Base and prime editing

Standard Cas9 cuts both DNA strands, and the repair of those cuts can produce large deletions, rearrangements or unwanted insertions. Base editors change one base into another, for example C to T or A to G, without a double-stranded break (Gaudelli et al., 2017). Prime editors write short defined edits using an RNA template, also without a double-stranded break (Anzalone et al., 2019).

Base editing has also been tested on cholesterol-related genes. A study in non-human primates reports sequential in vivo base editing of *PCSK9* and *ANGPTL3* (Bellinger et al., 2022). Animal work of this kind comes before any human trial, and it does not by itself show clinical benefit.

## Clinical Applications and Target Organs

The table shows the delivery systems most often matched to each target organ. Clinical status varies: the liver is the furthest along, and the other rows are mostly preclinical or early research.

| Target organ / system | Common delivery system | Examples of targets in research or early clinical work |
| :--- | :--- | :--- |
| **Liver** | Systemic LNPs | Transthyretin amyloidosis (ATTR), hereditary angioedema, cholesterol-related genes such as *PCSK9* |
| **Central nervous system** | AAV capsids, intrathecal delivery | Research programs in neurological disease; no approved in vivo CRISPR therapy yet |
| **Eye** | Subretinal or intravitreal AAV | Leber congenital amaurosis type 10 (LCA10) |
| **Immune system** | Targeted LNPs and VLPs | Direct generation of CAR-T cells inside the body (preclinical) |

## Core Technical and Safety Considerations

Before evaluating an in vivo editing protocol, consider the following:

1. **Off-target activity and mosaicism.** Confirm off-target profiles with an unbiased method (for example GUIDE-seq or CIRCLE-seq), and measure editing across the whole target tissue, not only in a sample.
2. **Immunity to Cas proteins.** Bacterial Cas enzymes such as *S. pyogenes* Cas9 can trigger pre-existing or treatment-induced immune responses, which may prevent repeat dosing.
3. **Cargo size and vector capacity.** Prime editors are large, which drives interest in more compact Cas variants.
4. **Particle size and distribution.** LNP and VLP size, surface charge and composition decide where particles go. Measure them for each batch.
5. **Manufacturing and regulatory documentation.** Lipid raw materials, mRNA and guide RNA need quality control and documentation that match the intended use.

## How to Prepare an Evaluation Request

When requesting a technical quote or assessment for in vivo CRISPR reagents or vectors, state:

- the target gene, the target cell type and the delivery route (for example intravenous or local injection);
- the packaging format (mRNA with guide RNA, or preassembled ribonucleoprotein);
- the vector type (custom LNP, AAV capsid variant or VLP);
- the analytical validation required (deep sequencing, biodistribution panels);
- the stage of work (exploratory research or IND-enabling studies).

## Summary and Outlook

In vivo CRISPR gene editing changes the economics and logistics of genetic medicine by replacing cell manufacturing with a single delivery step. Non-viral carriers, organ-targeted particles and base and prime editors have each reached the research or early clinical stage. The clinical evidence is still limited to small studies, and long-term safety is not yet established. The next few years of trial results will show how far the approach can extend beyond the liver.

## References

1. Anzalone, A. V., Randolph, P. B., Davis, J. R., Sousa, A. A., Koblan, L. W., Levy, J. M., Chen, P. J., Wilson, C., Newby, G. A., Raguram, A., & Liu, D. R. (2019). Search-and-replace genome editing without double-strand breaks or donor DNA. *Nature*, 576(7785), 149–157. https://doi.org/10.1038/s41586-019-1711-4
2. Bellinger, A., Rhode, E., & Kathiresan, S. (2022). Sequential in vivo CRISPR base editing of the PCSK9 and ANGPTL3 genes in non-human primates. *Journal of the American College of Cardiology*, 79(9), 953. https://doi.org/10.1016/s0735-1097(22)01944-1
3. Cheng, Q., Wei, T., Farbiak, L., Johnson, L. T., Dilliard, S. A., & Siegwart, D. J. (2020). Selective organ targeting (SORT) nanoparticles for tissue-specific mRNA delivery and CRISPR–Cas gene editing. *Nature Nanotechnology*, 15(4), 313–320. https://doi.org/10.1038/s41565-020-0669-6
4. Gaudelli, N. M., Komor, A. C., Rees, H. A., Packer, M. S., Badran, A. H., Bryson, D. I., & Liu, D. R. (2017). Programmable base editing of A•T to G•C in genomic DNA without DNA cleavage. *Nature*, 551(7681), 464–471. https://doi.org/10.1038/nature24644
5. Gillmore, J. D., Gane, E., Taubel, J., Kao, J., Fontana, M., Maitland, M. L., Seitzer, J., O’Connell, D., Walsh, K. R., Wood, K., Phillips, J., Xu, Y., Amaral, A., Boyd, A. P., Cehelsky, J. E., McKee, M. D., Schiermeier, A., Harari, O., Murphy, A., ... Lebwohl, D. (2021). CRISPR-Cas9 In Vivo Gene Editing for Transthyretin Amyloidosis. *New England Journal of Medicine*, 385(6), 493–502. https://doi.org/10.1056/nejmoa2107454
