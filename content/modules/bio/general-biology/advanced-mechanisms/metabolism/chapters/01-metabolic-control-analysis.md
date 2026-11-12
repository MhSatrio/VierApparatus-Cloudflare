---
title: "Metabolic Control Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Advanced Biological Mechanisms"
description: "The framework that quantifies how much each enzyme controls the flux through a pathway, the flux control coefficient and elasticity, and the summation theorems that constrain control."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Define the flux control coefficient and the elasticity of an enzyme."
  - "Explain the summation theorem and what it implies about control in a pathway."
references:
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Lane, N., & Martin, W. (2010). The energetics of genome complexity. Nature, 467(7318), 929-934. https://doi.org/10.1038/nature09486"
---

A metabolic pathway is a chain of enzymes, and the question of which enzyme controls its flux is central to understanding and to engineering it. Metabolic control analysis answers this question quantitatively. It defines the flux control coefficient of an enzyme as the fractional change in pathway flux produced by a small fractional change in the enzyme's activity. The coefficient is a property of the whole system, not of the enzyme alone, because it depends on how the other enzymes respond.

The elasticity of an enzyme describes how its rate responds to a change in a metabolite it binds or in an effector. Elasticities are local properties that can be measured for each enzyme in isolation. Control coefficients are obtained by combining elasticities through the network structure. The two sets of quantities together give a complete description of the control structure of a pathway.

The summation theorem states that the flux control coefficients of all the enzymes in a pathway add up to one. Control is therefore shared, and no single enzyme controls the flux completely in general, although one enzyme may have a much larger share than the others. The connectivity theorem relates the control coefficients to the elasticities, and it implies that enzymes that do not interact with the rest of the network cannot control the flux.

These theorems have practical consequences. A drug that inhibits one enzyme may reduce the flux by an amount that depends on its control coefficient, and the others may compensate. Engineers who seek to increase the yield of a product must identify the enzymes with the greatest control, because overexpressing an enzyme with little control gains little.

Lane and Martin (2010) connected metabolic economy to the energetic constraints of the cell. The distribution of control is one way in which a cell allocates its limited resources among its enzymes, since enzymes that control flux are more costly to produce in relation to their benefit only when their activity is high.

Alberts et al. (2022) describe the regulated enzymes of metabolism and the points of control in major pathways. The coefficients are measured by titrating the activity of an enzyme with an inhibitor or by genetic changes in its expression, and comparing the change in flux with the change in activity.
