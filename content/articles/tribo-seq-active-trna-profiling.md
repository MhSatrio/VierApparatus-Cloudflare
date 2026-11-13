---
title: "tRIBO-seq: Reading the Active tRNA Pool During Cellular Stress"
slug: tribo-seq-active-trna-profiling
excerpt: "A Nature Methods paper from November 2026 describes tRIBO-seq, a nanopore method that captures tRNAs bound to actively translating ribosomes, revealing how stress changes tRNA abundance, modification and fragmentation."
coverImage: "https://images.vierapparatus.com/articles/2026/11/i_KfO3va1Op5gZgsiW.webp"
coverImageAlt: "Diagram of the ribosome showing its large and small subunits and the sites where tRNA and mRNA are read during translation."
coverImageSource: "Image: LadyofHats, CC0, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Ribosome_structure_including_subunits_and_binding_sites.png)"
date: 2026-11-12
author: "Muhammad Satrio"
category: "Research Techniques"
tags:
  - tRNA
  - translation
  - nanopore sequencing
  - ribosome profiling
  - RNA modifications
seoTitle: "tRIBO-seq: Active tRNA Profiling Under Stress"
seoDescription: "tRIBO-seq captures tRNAs from translating ribosomes with nanopore sequencing, showing how viral infection, starvation and arsenite change the active tRNA pool."
status: published
---

Transfer RNAs carry amino acids to the ribosome, where the genetic message is turned into protein. Their role in controlling translation is still poorly understood, partly because it has been difficult to measure which tRNAs are working at a given moment, and which of their chemical modifications are present. A November 2026 *Nature Methods* paper introduces a method that focuses on exactly those tRNAs (Monti et al., 2026).

## What tRIBO-seq measures

The method, called tRIBO-seq, is a nanopore-based approach. It selectively captures native tRNAs bound to ribosomes that are actively translating, rather than sampling every tRNA in the cell. The authors describe it as simple and robust. Because nanopore sequencing reads native molecules, one experiment can give tRNA abundance, chemical modification and fragmentation at once (Monti et al., 2026).

Capturing only the tRNAs on active ribosomes is the key idea. A total tRNA measurement includes many molecules that are not being used at that moment, so changes in the working pool can be hidden. Focusing on ribosome-bound tRNAs makes the active pool visible.

## Why tRNA measurements are hard

tRNAs are short, heavily modified molecules, and many of their chemical marks block the enzymes used in standard RNA sequencing. Those marks matter because they change how a tRNA pairs with codons and how efficiently it is used. Methods that read native RNA directly, as nanopore sequencing does, can keep many of those modifications in the signal, which is part of why the authors can measure modification and abundance in one run.

Ribosome-based methods add a second layer. Reading only the tRNAs bound to ribosomes, as tRIBO-seq does, separates the pool that is working from the reserve that is waiting. That distinction is important because a cell can keep a large reserve of tRNAs while changing which ones are used during a response.

## What stress changes

The authors then applied the method under several kinds of stress. The results differ by stress type. Viral infection and leucine deprivation change the abundance of ribosome-bound tRNAs. Methionine starvation causes a large loss of methyl-based tRNA modifications. Arsenite exposure leaves tRNA abundances and modification patterns unchanged but causes fragmentation in selected subsets of the ribosome-bound tRNAs (Monti et al., 2026).

The most useful finding for other researchers is that the total tRNA pool and the active tRNA pool often do not change in the same way. The authors report that ribosome-bound tRNAs, but often not total tRNAs, are significantly altered by stress (Monti et al., 2026).

## What to check before adopting it

Any new sequencing method needs careful controls. Readers should check the capture efficiency for their own cell types, the way modifications are called from nanopore signals, and whether fragmentation signals reflect biology or sample handling. The authors present their approach as reproducible, and independent labs will need to repeat it with their own stresses and tissues before the stress-specific patterns can be generalized.

## Where this fits in a research workflow

A lab that already runs ribosome profiling or standard RNA sequencing can add tRIBO-seq as a targeted follow-up. It answers questions those methods leave open: whether the tRNA supply limits translation under a given stress, and whether a modification enzyme is the step that changes. Each experiment still needs matched controls, so the stress conditions, the time points and the untreated samples should be designed together before sequencing.

## Why it matters

Translation is a major point of control in cells, and tRNAs sit at its centre. A method that reads the working tRNA pool, with its modifications, gives researchers a way to test whether changes in translation under stress come from altered tRNA supply. For a research lab, tRIBO-seq is a way to ask a sharper question: not which tRNAs exist, but which ones are being used.

## References

1. Monti, M., Yilmaz, H., Del Piano, A., Arnoldi, M., Bonomo, I., Llovera, L., Sarabando, J., Ribeiro, D., Soares, A. R., Clamer, M., & Novoa, E. M. (2026). Selective profiling of translationally active tRNAs and their dynamics under stress. Nature Methods. https://doi.org/10.1038/s41592-026-03277-6
