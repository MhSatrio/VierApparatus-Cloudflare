---
title: "AI-Designed Minimal Nucleases Match Natural Enzymes in Bacterial, Plant and Human Cells"
slug: ai-designed-minimal-nucleases
excerpt: "A July 2026 Science paper describes SynTnpBs, minimal RNA-guided nucleases designed with a structure-guided AI model and evolutionary constraints. Several retained or exceeded the natural TnpB enzyme in bacterial, plant and human cells."
date: 2026-07-16
coverImage: "https://images.vierapparatus.com/articles/2026/11/i_CcJoXeVjUDRcefz7.webp"
coverImageAlt: "Crystal structure of the Cas12a RNA-guided nuclease bound to its guide RNA and target DNA (PDB 5B43), a relative of the TnpB family."
coverImageSource: "Image: Cas12a crystal structure, PDB 5B43 (Yamano et al.), CC0, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Acidaminococcus_sp._Cas12a_PDB_5B43.png)"
author: "Muhammad Satrio"
category: "Biotechnology"
tags:
  - genome editing
  - protein design
  - TnpB
  - nucleases
  - artificial intelligence
seoTitle: "AI-Designed Genome-Editing Nucleases: SynTnpBs in Cells"
seoDescription: "How AI-designed TnpB variants, the SynTnpBs, retain or exceed natural activity in bacterial, plant and human cells, and what the cryo-EM structures reveal."
status: published
---

Genome-editing tools are built from proteins that evolution has shaped over millions of years. Designing new ones from scratch is hard, because a useful enzyme must fold correctly, bind both a guide RNA and a DNA target, and cut in the right place. A July 2026 paper in *Science* shows that an AI-based design strategy can produce working genome-editing enzymes that differ strongly from their natural relatives (Skopintsev et al., 2026).

## The Starting Point: TnpB

The enzymes in question belong to the TnpB family. TnpB is an RNA-guided DNA nuclease associated with transposon-encoded proteins. It was shown in 2021 to be programmable, meaning that its target can be chosen by changing the guide RNA (Karvelis et al., 2021). Its small size makes it an attractive starting point for designing editing tools.

## Designing Variants Beyond Evolution

The Science team combined two ingredients. The first is a structure-guided inverse-folding model, an AI system that proposes amino acid sequences likely to fold into a given three-dimensional structure. The second is a set of constraints derived from evolutionary data on the protein family. The constraints keep the designs within sequence patterns that real TnpB proteins use, so the generated variants stay plausible (Skopintsev et al., 2026).

The authors call the resulting proteins SynTnpBs. They are divergent: many differ from every natural TnpB in their sequence, which is what the design strategy was meant to achieve (Skopintsev et al., 2026).

## Screening in Three Kinds of Cells

Designing a sequence is not enough. The team screened large numbers of the AI-generated variants for activity. Among them, several editors retained or exceeded the activity of the natural enzyme. The authors report this in bacterial cells, in plant cells and in human cells, which is the most important part of the result, because it shows that the designs work outside the bacteria in which they were first tested (Skopintsev et al., 2026).

The screen is also a reminder that design alone is not enough: the working editors had to be found by testing the generated variants.

## What the Structures Reveal

To understand why some designs work, the authors used cryo-electron microscopy to determine the structure of the most divergent variant. The structure shows stabilizing contacts at the interface between the RNA guide and the DNA target, and those contacts are maintained across several conformations of the protein. The authors present the structure as a demonstration of the design potential of the approach (Skopintsev et al., 2026).

The structural result is a route to better designs. If the features that stabilize the RNA–DNA interface are understood, future designs can aim for them directly rather than relying on screening alone.

## What the Result Does Not Show

Activity in cells is an important milestone, but it is not the whole story for a genome editor. Editing efficiency, specificity across the genome, delivery into particular tissues, and immune and safety profiles each need their own evidence. The paper establishes that the designed enzymes are active in several cell types. Judging whether they are suitable for therapy or agriculture requires further studies of exactly those properties.

## Why It Matters

Natural diversity has supplied most of the genome-editing toolkit so far. The authors argue that RNA-guided nucleases whose properties are not limited by evolution could expand what programmable genome editing can do (Skopintsev et al., 2026). The broader point is that protein design has reached the stage where it can generate large, working families of enzymes, rather than small tweaks of existing ones.

For researchers, the result is a new source of candidate editors and a method for making them. For readers, it is a concrete example of how machine learning and structural biology are being combined to design tools for biology.

## References

1. Karvelis, T., Druteika, G., Bigelyte, G., Budre, K., Zedaveinyte, R., Silanskas, A., Kazlauskas, D., Venclovas, Č., & Siksnys, V. (2021). Transposon-associated TnpB is a programmable RNA-guided DNA endonuclease. *Nature*, 599(7886), 692–696. https://doi.org/10.1038/s41586-021-04058-1
2. Skopintsev, P., Esain-Garcia, I., DeTurk, E. C., Yoon, P. H., Zhou, Z., Weiss, T., Kamalu, M., Chamraj, A., Loi, K. J., Langeberg, C. J., Boger, R. S., Nisonoff, H., Karp, H. M., Chen, L.-X., Shi, H., Vohra, K., Banfield, J. F., Cate, J. H. D., Jacobsen, S. E., & Doudna, J. A. (2026). Structure and evolution-guided design of minimal RNA-guided nucleases. *Science*, 393(6808), 313–318. https://doi.org/10.1126/science.aed6123
