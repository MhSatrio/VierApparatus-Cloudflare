---
title: "Integration and Time Steps"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "The numerical integration of the equations of motion in molecular dynamics, the time step that must be small enough to follow the fastest vibrations of the bonds, the constraints that allow larger steps, the conservation of energy as a test of the integration and the trade-off between the time step and the length of the simulation that can be run."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why the time step of a simulation must be small compared with the fastest vibrations of the molecule."
  - "Use the conservation of energy to check that the integration is accurate enough for the simulation."
references:
  - "Karplus, M., & McCammon, J. A. (1983). Dynamics of proteins: Elements and function. Annual Review of Biochemistry, 52(1), 263-300. https://doi.org/10.1146/annurev.bi.52.070183.001403"
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
  - "Platt, J. R. (1964). Strong inference. Science, 146(3642), 347-353. https://doi.org/10.1126/science.146.3642.347"
---

The equations of motion are integrated numerically by advancing the positions and velocities in steps of a fixed duration. The step must be small enough that the forces change little during it, and this is set by the fastest motion in the system. The bonds that involve hydrogen atoms vibrate on the timescale of about ten femtoseconds, and a step of about two femtoseconds is needed to follow them accurately. A longer step would make the integration unstable, and the energy of the system would drift or diverge.

Constraints allow a longer step. The bonds to hydrogen can be held at a fixed length by an algorithm that removes their vibration, and the step can then be extended to about four femtoseconds without loss of accuracy in the motions of interest. The constraint changes the dynamics of the removed vibrations, and the effect on the quantities studied must be checked. Karplus and McCammon (1983) discussed the trade-offs in the integration of protein dynamics, and the choice of method is a judgement about which motions matter.

The accuracy of the integration is tested by energy conservation. In the absence of an external driving or a thermostat, the total energy of an isolated system should be conserved, and a drift in the energy indicates that the step is too large or the algorithm is inaccurate. Thermostats and barostats change the energy deliberately, and the test must use the appropriate quantity for the ensemble being simulated.

The time step limits the length of the simulation that can be run in a given computing time. The number of steps needed to reach a biological timescale is very large, and a longer step would allow more time to be simulated, at the cost of accuracy. The balance is set by the question. A simulation of a fast process may require the short step, while a slow conformational change may be studied with the constraints and the longer step.

Ioannidis (2005) described how a simulation whose energy drifts may be reported without the check, and Platt (1964) recommended a test of the integration by comparing the results at two time steps, which shows whether the answer depends on the step.

The time step is a numerical choice with physical consequences, and its adequacy is tested by the conservation of energy and by the independence of the result from the step.
