---
title: "Reaction-Diffusion and Pattern"
subject: "Biology"
specialization: "General Biology"
academic_level: "Specialized and Emerging Biological Sciences"
description: "Reaction-diffusion models in which chemicals react with one another while diffusing through space, the Turing instability in which a stable uniform state is destabilised by diffusion to produce spatial patterns of spots and stripes, the role of the difference in diffusion rates between an activator and an inhibitor, the application of these models to the patterns of animal coats, the spacing of digits and the segmentation of embryos, the sensitivity of the pattern to the parameters that set its wavelength, and the difficulty of identifying the chemicals and parameters that generate a pattern observed in nature."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Describe a reaction-diffusion system and explain how diffusion can destabilise a uniform state to produce a pattern."
  - "State the condition on the diffusion rates that produces a Turing pattern and the difficulty of identifying the chemicals in a biological pattern."
references:
  - "Hodgkin, A. L., & Huxley, A. F. (1952). A quantitative description of membrane current and its application to conduction and excitation in nerve. The Journal of Physiology, 117(4), 500-544. https://doi.org/10.1113/jphysiol.1952.sp004764"
  - "Cumming, G. (2014). The new statistics. Psychological Science, 25(1), 7-29. https://doi.org/10.1177/0956797613504966"
  - "Peng, R. D. (2011). Reproducible Research in Computational Science. Science, 334(6060), 1226-1227. https://doi.org/10.1126/science.1213847"
---

Reaction-diffusion models describe chemicals that react with one another and spread through space. Each chemical changes in time through its reactions and its diffusion, and the equations couple the reactions at each point to the flux of material between points. Hodgkin and Huxley (1952) used a related framework to describe the spread of an impulse along a nerve, and reaction-diffusion has since become a general tool for describing how spatial patterns form in tissues.

Alan Turing showed that a system of this kind can produce spatial patterns from a uniform state. A stable uniform state can be destabilised by diffusion when one chemical, the inhibitor, diffuses faster than the other, the activator, which promotes its own production. The result is a pattern of spots or stripes with a wavelength set by the rates of reaction and diffusion. This mechanism, the Turing instability, has been proposed for the patterns of animal coats and for the spacing of digits in the limb.

The wavelength of the pattern depends on the parameters, and small changes can alter the pattern substantially. The model can therefore produce many patterns, and the match between a model and a natural pattern is easy to achieve with enough adjustable parameters. Cumming (2014) argues that the wavelength and the parameters should be reported with their intervals, since the pattern in a tissue is measured with error.

Identifying the chemicals and the parameters that generate a biological pattern is difficult. Many candidate molecules have been proposed, but the direct measurement of the diffusion and the reaction rates in a living tissue is hard. The inference of the mechanism from the pattern alone is ambiguous, since different mechanisms can produce similar patterns. Peng (2011) argued that a model must be reproducible from its equations and parameters, and the identification of the molecules should be tested experimentally before the model is accepted.
