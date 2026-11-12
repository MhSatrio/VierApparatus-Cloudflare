---
title: "Analysing Trajectories"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How the trajectory of a molecular dynamics simulation is analysed for structure and flexibility, including the root-mean-square deviation from a reference structure, the root-mean-square fluctuation of each residue, the radius of gyration, the hydrogen bonds and contacts that persist through the simulation, the alignment of frames before measurement and the pitfall of reporting averages without the spread or the correlation that gives them meaning."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Compute the root-mean-square deviation and fluctuation of a trajectory after aligning its frames and state what each measures."
  - "Identify the hydrogen bonds or contacts that persist through a simulation and report their occupancy with its uncertainty."
references:
  - "Abraham, M. J., Murtola, T., Schulz, R., Páll, S., Smith, J. C., Hess, B., & Lindahl, E. (2015). GROMACS: High performance molecular simulations through multi-level parallelism from laptops to supercomputers. SoftwareX, 1-2, 19-25. https://doi.org/10.1016/j.softx.2015.06.001"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Hess, B., Kutzner, C., van der Spoel, D., & Lindahl, E. (2008). GROMACS 4: Algorithms for Highly Efficient, Load-Balanced, and Scalable Molecular Simulation. Journal of Chemical Theory and Computation, 4(3), 435-447. https://doi.org/10.1021/ct700301q"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
---

A trajectory is a large set of configurations, and the analysis reduces it to measures that a reader can interpret. The first step is to remove the overall motion of the system, by aligning each frame on a reference so that rotation and translation do not register as change. Without this alignment, a measure of flexibility would count the tumbling of the whole protein as internal motion, and the alignment is the precondition of every measure that follows.

The root-mean-square deviation from a reference structure measures how far the structure has moved from its starting point, and it is the usual measure of whether a simulation has settled. A deviation that rises and then levels off indicates that the protein has reached a stable region, while a deviation that keeps rising indicates that it is still changing. The root-mean-square fluctuation of each residue measures its flexibility over the trajectory, and it shows which parts of a protein are rigid and which are mobile. Abraham et al. (2015) describe the analysis tools of GROMACS that compute these measures.

The radius of gyration describes the compactness of the molecule, and its change over time reveals folding, unfolding and changes in the arrangement of domains. Hydrogen bonds and contacts that persist through the simulation indicate stable interactions, and the fraction of time for which each is present, its occupancy, measures how strong it is. Alberts et al. (2022) describe the hydrogen bonds that stabilise protein structure, and the occupancy of these bonds is a measure of how firmly the structure holds.

The averages must be reported with their spread. A mean over a trajectory that drifts or that contains two states is misleading, since the mean may describe neither state, and the distribution or the standard error is needed to show what the average means. The statistical uncertainty of a simulated average depends on the correlation of its frames, not on their number.

Hess et al. (2008) describe the algorithms of the simulation, and Sandve et al. (2013) recommended recording the analysis steps, including the reference structure, the alignment and the atoms used for each measure.
