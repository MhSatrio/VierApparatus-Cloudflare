---
title: "BCR-MERFISH: Mapping Plasma Cell Clones Inside Intact Tissue"
slug: bcr-merfish-plasma-cell-clonality
excerpt: "A Nature Methods paper from November 2026 introduces BCR-MERFISH, which reads antibody gene usage and cell-type transcriptomes in the same tissue section, showing how plasma cell clones are arranged in the mouse gut."
coverImage: "https://images.vierapparatus.com/articles/2026/11/i_seCYCH-R9FE6kfRa.webp"
coverImageAlt: "Fluorescence in situ hybridization image, where fluorescent probes mark RNA or DNA inside cells."
coverImageSource: "Image: MrMatze, CC BY-SA 3.0, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:FISH_(Fluorescent_In_Situ_Hybridization).jpg)"
date: 2026-11-12
author: "Muhammad Satrio"
category: "Research Techniques"
tags:
  - spatial transcriptomics
  - MERFISH
  - plasma cells
  - B cell receptor
  - single-cell methods
seoTitle: "BCR-MERFISH: Plasma Cell Clonality in Intact Tissue"
seoDescription: "How BCR-MERFISH combines B cell receptor gene usage with single-cell transcriptomics in tissue sections, and what the mouse gut results show about plasma cell clones."
status: published
---

Plasma cells make antibodies, and each one carries a particular version of the antibody gene. Two plasma cells of the same type can therefore produce different antibodies, and that variety is part of how the immune system responds to many threats. Measuring it inside tissue has been hard, because the methods that show what cell types are present usually lose the information about which antibody gene each cell uses (Yang et al., 2026).

A November 2026 *Nature Methods* paper introduces a method that keeps both pieces of information in the same tissue section (Yang et al., 2026).

## How the method works

The method is called B cell receptor multiplexed error-robust fluorescence in situ hybridization, or BCR-MERFISH. It measures the variable gene segments that make up each antibody, read as the V gene used by a plasma cell, and combines them with a transcriptome profile of the same cell. Because both are measured in place, the method can show where each clone sits in the tissue, not only how many clones there are (Yang et al., 2026).

In standard MERFISH, each target gene receives a binary barcode, and fluorescent probes are read over several rounds of imaging so that each cell's pattern of signals identifies the genes it expresses. Fluorescence in situ hybridization uses labeled probes that bind to target RNA, and the "multiplexed, error-robust" design of MERFISH encodes many targets so they can be distinguished in a single experiment. Applying that encoding to antibody gene segments is what makes the clonality measurement possible.

## What the authors tested

The authors first checked whether the method identifies V gene usage accurately, in cell culture and in mice with restricted or native plasma cell diversity. Accurate readout under both conditions is the basic test for a new measurement (Yang et al., 2026).

They then used the method to look at the mouse gut. The results describe changes in plasma cell abundance, clonal diversity and public clonotype usage that depend on the microbiota. They also show that plasma cell clones are distributed unevenly along the ileum, which is a spatial finding that bulk sequencing could not have revealed (Yang et al., 2026).

## Why clone-level spatial data matters

A tissue can contain many plasma cells that look the same under a microscope but belong to different clones, meaning they descend from different precursor cells and produce different antibodies. Knowing where each clone sits tells researchers whether a response is spread widely through a tissue or concentrated in one area. Bulk sequencing averages these clones together, which is why it cannot show the uneven distribution along the ileum that the authors report.

## Limits and practical points

Any method built on probes has to be checked for specificity, and the authors' validation in culture and in two mouse conditions is the core of that check. Readers adopting similar methods should expect a trade-off between the number of genes measured and the imaging time, and should validate V gene calls against an independent measurement in their own system.

The method is demonstrated in mice. Whether the same spatial patterns hold in human tissue, where sampling and background are more variable, is a separate question for future work.

## Why it matters

Spatial methods are changing immunology by showing where cells are, not only what they are. BCR-MERFISH adds the antibody clone as a spatial variable, which connects cell identity, clonal history and tissue position in one measurement. For researchers, the method is a template for measuring other receptor repertoires in place.

## References

1. Yang, E., Aceves-Salvador, J., Castrillon, C., Herrmann, U. S., Akama-Garren, E. H., Carroll, M. C., & Moffitt, J. R. (2026). In situ profiling of plasma cell clonality with image-based single-cell transcriptomics. Nature Methods. https://doi.org/10.1038/s41592-026-03296-3
