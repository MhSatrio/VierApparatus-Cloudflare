---
title: "Base and Prime Editing"
subject: "Biology"
specialization: "General Biology"
academic_level: "Experimental and Applied Biology"
description: "Editing approaches that change single bases without making a double-strand break, including base editors that convert one base into another and prime editors that write a defined edit from an extended guide, and the reasons these approaches reduce some unwanted outcomes."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain how a base editor converts one base to another without a double-strand break."
  - "Compare base editing and prime editing with Cas9 nuclease editing for the types of change they can make."
references:
  - "Jinek, M., Chylinski, K., Fonfara, I., Hauer, M., Doudna, J. A., & Charpentier, E. (2012). A programmable dual-RNA-guided DNA endonuclease in adaptive bacterial immunity. Science, 337(6096), 816-821. https://doi.org/10.1126/science.1225829"
  - "Cong, L., Ran, F. A., Cox, D., Lin, S., Barretto, R., Habib, N., Hsu, P. D., Wu, X., Jiang, W., Marraffini, L. A., & Zhang, F. (2013). Multiplex genome engineering using CRISPR/Cas systems. Science, 339(6121), 819-823. https://doi.org/10.1126/science.1231143"
  - "Anfinsen, C. B. (1973). Principles that govern the folding of protein chains. Science, 181(4096), 223-230. https://doi.org/10.1126/science.181.4096.223"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A double-strand break is the source of most of the unwanted outcomes of nuclease editing, because the repair is imprecise and can produce insertions, deletions and large rearrangements. Base editors avoid the break. They fuse a catalytically impaired Cas protein, which can still bind the guide and open the DNA locally, to an enzyme that chemically converts one base into another. The conversion of cytosine to thymine, or of adenine to guanine, can therefore be made at a defined position without cutting both strands. The enzyme is directed by the same guide logic that Jinek et al. (2012) described for the nuclease.

Prime editing goes further. The guide carries an extension that encodes the desired edit, and a fused reverse transcriptase copies this sequence into the target site. The new strand is then incorporated by the cell's repair system, which can write insertions, deletions and substitutions of defined length. The approach can make changes that a base editor cannot, although its efficiency varies with the edit and the cell.

The fused enzymes are large, and their size affects their delivery into cells and tissues. Anfinsen (1973) showed that the folding of a protein is sensitive to its composition, and the fusion must preserve the folding of both partners, so that the Cas protein still binds the guide and the catalytic domain still acts. A fusion that misfolds may be inactive or may act at unintended sites.

Cong et al. (2013) showed that multiple guides can be used together, and the same logic has since been extended to base and prime editors. Each additional edit adds to the number of outcomes that must be checked.

Ioannidis (2005) described how a method that appears more precise than its predecessors can still produce errors that have not been measured, and the bystander edits, which are changes to neighbouring bases in the window of the editor, must be examined. Alberts et al. (2022) describe the base chemistry on which these conversions depend.
