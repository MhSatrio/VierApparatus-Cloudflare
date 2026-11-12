---
title: "Gap Penalties and Affine Gaps"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How gaps are scored in sequence alignment, the linear gap penalty and its limits, the affine gap model that charges a larger penalty for opening a gap than for extending it, the biological reasons for preferring one long gap to several short ones, the choice of penalty values and their effect on the alignment, with the checks that show an alignment is not an artefact of the penalty."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why an affine gap penalty is usually preferred to a linear penalty and how it is applied to a run of gaps."
  - "Test whether an alignment depends on the chosen gap penalties and report the result."
references:
  - "Needleman, S. B., & Wunsch, C. D. (1970). A general method applicable to the search for similarities in the amino acid sequence of two proteins. Journal of Molecular Biology, 48(3), 443-453. https://doi.org/10.1016/0022-2836(70)90057-4"
  - "Smith, T., & Waterman, M. (1981). Identification of common molecular subsequences. Journal of Molecular Biology, 147(1), 195-197. https://doi.org/10.1016/0022-2836(81)90087-5"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A gap represents a stretch of residues present in one sequence and absent from the other, usually because of an insertion or a deletion. The simplest scheme charges a fixed penalty for each gap residue, which is called a linear penalty. Needleman and Wunsch (1970) used a scheme of this kind in their global method, and the method reports the best alignment under whatever penalties are supplied. A linear penalty is easy to compute, but it treats one long gap and several short gaps of the same total length as equally costly.

Biologically, a single insertion of many residues is a more plausible event than many separate insertions of one or two residues. The affine gap model reflects this by charging a larger penalty to open a gap and a smaller one to extend it. A run of gap residues then costs the opening penalty once and the extension penalty for each further residue, so a long gap is favoured over several short ones. The model is applied in the same dynamic programming framework, with an extra table for the gap states.

The values of the penalties determine the alignment. A penalty that is too high suppresses real gaps and forces residues into mismatches, and a penalty that is too low admits gaps that do not reflect real events. There is no universal value, and it depends on the sequences and the level of divergence. Smith and Waterman (1981) described the local method, which is sensitive to the same penalties, so the choice applies to both.

The test of a penalty choice is to vary it. An alignment that changes completely under small changes of the penalties is unreliable in the regions that change. An alignment that remains stable across a sensible range is more credible. The range tested and the stability observed should be reported with the result.

Sandve et al. (2013) recommended that the parameters of an analysis be stated and that its sensitivity to them be examined, and the gap penalties are among the parameters that most often affect an alignment.
