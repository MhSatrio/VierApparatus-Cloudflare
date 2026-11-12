---
title: "Identifying Peptides by Database Search"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the mass spectra of peptides are matched to peptide sequences from a protein database, the theoretical spectrum predicted for each candidate peptide, the scoring of each match, the role of the mass tolerance and the enzyme in restricting the candidates and the way the best match for each spectrum is selected and reported."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe how a measured spectrum is compared with the theoretical spectra of candidate peptides from a protein database."
  - "Explain how the mass tolerance and the choice of enzyme restrict the candidate peptides and what each restriction risks missing."
references:
  - "Cox, J., & Mann, M. (2008). MaxQuant enables high peptide identification rates, individualized p.p.b.-range mass accuracies and proteome-wide protein quantification. Nature Biotechnology, 26(12), 1367-1372. https://doi.org/10.1038/nbt.1511"
  - "Aebersold, R., & Mann, M. (2016). Mass-spectrometric exploration of proteome structure and function. Nature, 537(7620), 347-355. https://doi.org/10.1038/nature19949"
  - "Altschul, S. F., Gish, W., Miller, W., Myers, E. W., & Lipman, D. J. (1990). Basic local alignment search tool. Journal of Molecular Biology, 215(3), 403-410. https://doi.org/10.1016/S0022-2836(05)80360-2"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A mass spectrum records the masses of the fragments produced when a peptide is broken along its backbone. The fragments follow a regular pattern determined by the peptide's sequence, and a search predicts this pattern for each candidate peptide from a protein database and compares it with the measured spectrum. Cox and Mann (2008) describe a search engine of this kind, in which each candidate is scored by how well its predicted fragments match the peaks observed, and the best-scoring candidate is the proposed identity of the spectrum.

The candidates are restricted before the comparison. The precursor mass of the peptide must fall within a tolerance of the measured mass, and the enzyme used to cut the proteins determines which peptides can be produced. A tolerance that is too narrow may miss the true peptide if the mass was measured imprecisely, and one that is too wide admits many false candidates. The enzyme restriction removes peptides that the digest could not produce, but a missed cleavage or a non-specific cut will then be missed by the search.

Scoring is a similarity measure between two patterns of peaks. As in sequence search, the score must be interpreted against the score expected by chance, and the comparison with a database of decoy sequences provides this. The method and its scoring function are the core of the identification, and different engines give different results for the same spectra.

Each spectrum is assigned to its best candidate, but the best candidate may be wrong. A poor spectrum, a peptide absent from the database or a modification not in the search may all produce a confident-looking but incorrect match. The control of these errors is the subject of the next chapter.

The search settings, including the database, the enzyme, the tolerances and the modifications allowed, must be recorded with the identifications. Sandve et al. (2013) recommended that the parameters of an analysis be stated, and these are the parameters that define what a search can find.
