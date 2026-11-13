---
title: "Study Case: Cleaning a DNA Read in VierStation's Sequence Lab"
slug: vierstation-study-case-clean-dna-read
excerpt: "A step-by-step study case for the Sequence Lab: import a sequence, keep the raw read unchanged, clean it in versions with a change log, and see which cleaning steps need quality scores."
coverImage: "https://images.vierapparatus.com/articles/2026/11/i_cov-clean-dna-read.webp"
coverImageAlt: "VierStation Sequence Lab overview of a demo DNA read imported from FASTA, showing its length, its versions and the list of steps."
date: 2026-11-12
author: "Muhammad Satrio"
category: "Research Techniques"
tags:
  - VierStation
  - DNA sequencing
  - sequence cleaning
  - FASTA
  - research software
seoTitle: "VierStation Study Case: Cleaning a DNA Read in the Sequence Lab"
seoDescription: "How to import a DNA read into VierStation, keep the raw data unchanged, trim ambiguous ends in versions, and read the change log."
status: published
---

Before a DNA sequence can be compared with anything, it has to be checked and cleaned. Ambiguous bases at the ends, unreliable stretches and wrong orientation can all distort an alignment or an identification. The Sequence Lab in VierStation takes a sequence through the steps in order, and it keeps the original read unchanged while every cleaning step creates a new, recorded version. This study case walks through that process.

The read used here is a **synthetic demonstration sequence**. It was typed for this tutorial and does not come from any organism. Its ends contain N characters, which stand for unknown bases, so there is something to clean.

## Step 1: Import the read

Open the **Sequence Lab** from the sidebar and choose **Import sequence**. VierStation accepts pasted sequences, FASTA and FASTQ text, and Sanger chromatogram files in the .ab1 format. Paste the FASTA text, give the read a sample ID, and choose **Import**.

Quality information depends on the file type. FASTA and pasted sequences carry no quality scores, and VierStation says so rather than inventing them. AB1 and FASTQ files do carry scores, which unlocks the quality-based tools described in Step 3.

![VierStation Sequence Lab overview of a demo DNA read imported from FASTA, showing its length, its versions and the list of steps.](https://images.vierapparatus.com/articles/2026/11/i_cov-clean-dna-read.webp "The demo read after import. The overview shows its length, its single version, and the steps that can be run next.")

After import the lab shows an overview: the raw length, the working length, the number of versions, and a table of steps. The steps are grouped in four stages. **Prepare** covers the raw sequence, quality inspection and cleaning. **Find relatives** covers NCBI matches, related species and outgroups. **Analyse** covers alignment and the phylogenetic tree. **Conclude** covers the final identification, the workflow history and exports. The steps can be used in any order, and repeating one creates a new result while keeping the old one.

## Step 2: Keep the raw read safe

The raw sequence is stored as imported and is locked. Cleaning never edits it. Every cleaning tool creates a new version of the working sequence, and each version appears in the version list with its length and the step that made it. Any earlier version can be restored with **Revert to this**.

This matters for later reporting. If someone asks which bases were removed and why, the answer is in the change log, and the original data is still there to compare against.

## Step 3: Clean the sequence

Open **Cleaning** in the Prepare stage. The page lists the cleaning tools, each with a short explanation. For a FASTA read, the useful ones include:

- **Trim ambiguous ends**, which removes unknown bases from one or both ends.
- **Trim by region**, which keeps or removes a stretch between two positions.
- **Remove bases**, for example a primer or adaptor sequence that should not be part of the result.
- **Edit one base**, which changes a single position and records the change.
- **Reverse-complement**, which turns a read around when it was sequenced in the wrong orientation.
- **Mark uncertain region**, which flags a stretch without removing it.

Some tools need quality scores, and the page marks them clearly. **Trim low-quality ends** and **Replace low-quality bases with N** both need AB1 or FASTQ input, because a FASTA file has no quality values to work from.

For the demo read, the first cleaning step is to trim the ambiguous ends. Choose **Apply** in that section.

![VierStation Sequence Lab after trimming ambiguous ends: the read changed from 239 to 231 base pairs and version 2 is listed with its change log.](https://images.vierapparatus.com/articles/2026/11/i_ZEtnE7R6jb3Xvowh.webp "After trimming the ambiguous ends the working read is 231 base pairs, saved as version 2, with the raw read still listed as version 1.")

The result shows the working read as 231 base pairs, against 239 in the raw read, so 8 base pairs were removed. The versions list now has two entries, and the change log names the step. Raw and cleaned sequences are shown side by side, so you can see exactly which bases changed.

## Step 4: Read the change log before you go on

The change log is the record of what was done. Read it before moving to the next stage, and before you export the sequence. An entry that removes more bases than you expected is a signal to check the raw read again, rather than to accept the cleaned version.

If a cleaning step was wrong, use **Revert to this** on the earlier version and try again. The discarded attempt does not replace the raw data.

## Step 5: Find relatives, then align

The next stages compare the cleaned sequence with others. **NCBI matches** searches a public sequence database for similar sequences, which needs an internet connection. The request waits in the job queue while you are offline and runs when you reconnect. The matches are then grouped into **Related species** and **Outgroups**, which are the sequences used to root a tree.

The **Alignment** and **Phylogenetic tree** steps arrange the sequences for comparison. The alignment step works on the sequences in the lab, so you can run it offline once the sequences are in place. The tree shows how the sequences relate, and it should be read together with the alignment it came from.

The method behind these searches is the BLAST family of local alignment tools (Altschul et al., 1990).

## Step 6: Conclude and export

The **Final identification** step is where you record your conclusion. Use the **Workflow history** to see every step that was run, in order, and **Exports** to save the results as files.

## Practical notes

- A cleaned read is a new entry with its own history. The raw read is never overwritten.
- Quality-based trimming is only as good as the quality scores in the input file. Use AB1 or FASTQ files when you have them.
- The demonstration read is synthetic. Use your own sequences for any real identification.

## Summary

The Sequence Lab keeps three things apart: the raw data, the cleaned versions, and the record of what was done to get from one to the other. A read is imported, checked, cleaned in recorded versions, compared with relatives, and concluded with its history attached. The demonstration above shows the cleaning step, the part where mistakes are most easily hidden, done with the change log in view.

## References

1. Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. *Journal of Molecular Biology*, 215(3), 403–410. https://doi.org/10.1016/s0022-2836(05)80360-2
