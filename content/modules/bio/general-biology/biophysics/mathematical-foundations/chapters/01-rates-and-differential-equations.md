---
title: "Rates and Differential Equations"
subject: "Biology"
specialization: "General Biology"
academic_level: "Biophysics and Quantitative Biology"
description: "How biological change is written as a rate, how a first-order rate law gives an exponential decay, how the differential equation for a system is set up from the processes that add and remove a quantity and how such equations are solved or approximated numerically."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Write the rate of change of a biological quantity from the processes that produce and remove it."
  - "Solve a first-order rate equation and interpret the half-life or time constant it gives."
references:
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Alberts, B., Heald, R., Johnson, A., Morgan, D., Raff, M., Roberts, K., & Walter, P. (2022). Molecular biology of the cell (7th ed.). W. W. Norton & Company."
  - "Ioannidis, J. P. A. (2005). Why most published research findings are false. PLoS Medicine, 2(8), e124. https://doi.org/10.1371/journal.pmed.0020124"
---

A biological quantity changes because processes add it and remove it. A protein is made at a rate set by its synthesis and destroyed at a rate set by its degradation, and the balance of the two determines its concentration. Written mathematically, the rate of change of the concentration is the difference between the rates of production and removal, and this is a differential equation. Alberts et al. (2022) describe the synthesis and turnover of cellular proteins, and the equation expresses that turnover in a form that can be analysed.

The simplest case is a first-order removal, in which the rate of loss is proportional to the amount present. The solution is an exponential decay, whose rate is set by a single constant, and the half-life is the time for the quantity to fall to half its value. The equation predicts that the decay is the same fraction in each equal interval of time, which is a testable prediction and a useful one for estimating the stability of a molecule from measurements at several times.

Hodgkin and Huxley (1952) wrote the membrane potential as a differential equation in which the currents of several ions add up to determine the rate of change of the voltage. Their model combined several such equations, each with its own time constant, and it reproduced the form of the action potential. The approach illustrates how a set of processes, each simple on its own, produces a complex behaviour when combined.

Most biological equations cannot be solved in closed form and are integrated numerically, by stepping the quantity forward in small time intervals. The step size must be small enough for the solution to converge, and the choice is checked by reducing it and observing whether the result changes. The numerical method is a tool, and its output must be checked against the behaviour the equation is meant to describe.

Ioannidis (2005) described how a model that fits the data may be accepted without showing that its parameters are identifiable or that it predicts new data, and the fitting of a rate equation should be followed by a test of its prediction under a different condition.

Writing change as a rate makes the processes explicit, and the rate equation is the statement of a hypothesis about those processes.
