---
title: "Graphics Processors and Accelerated Analysis"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How graphics processing units accelerate biological computation through thousands of simple parallel cores, which tasks suit them, such as molecular dynamics, deep learning on images and sequences and some alignment kernels, the programming and data-transfer costs they add, and how the performance of an accelerated program is measured against a fair baseline."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Explain why graphics processing units suit some bioinformatic and simulation tasks and not others."
  - "Describe how an accelerated program should be benchmarked against a fair baseline before a speed-up is reported."
references:
  - "Phillips, J. C., Hardy, D. J., Maia, J. D. C., Stone, J. E., Ribeiro, J. V., Bernardi, R. C., Buch, R., Fiorin, G., Hénin, J., Jiang, W., McGreevy, R., Melo, M. C. R., Radak, B. K., Skeel, R. D., Singharoy, A., Wang, Y., Roux, B., Aksimentiev, A., Luthey-Schulten, Z., . . . Tajkhorshid, E. (2020). Scalable molecular dynamics on CPU and GPU architectures with NAMD. The Journal of Chemical Physics, 153(4), 044130. https://doi.org/10.1063/5.0014475"
  - "Jumper, J., Evans, R., Pritzel, A., Green, T., Figurnov, M., Ronneberger, O., Tunyasuvunakool, K., Bates, R., Žídek, A., Potapenko, A., Bridgland, A., Meyer, C., Kohl, S. A. A., Ballard, A. J., Cowie, A., Romera-Paredes, B., Nikolov, S., Jain, R., Adler, J., . . . Hassabis, D. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596(7873), 583-589. https://doi.org/10.1038/s41586-021-03819-2"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

A graphics processing unit contains thousands of simple cores that perform the same operation on many data items at once. This design suits computations that are regular and data-parallel, in which the same arithmetic is applied to a large array of values. Phillips et al. (2020) describe how the NAMD molecular dynamics program uses both processors and graphics units, since the force calculations for many atoms are of this regular kind.

Deep learning models for biology exploit the same architecture. Jumper et al. (2021) described AlphaFold, whose neural network for protein structure prediction is trained and run on accelerators, and the matrix operations of the network are well matched to the hardware. Models that analyse images from microscopes or sequences from sequencing runs follow the same pattern, although the gain depends on the size of the model and the batch of data.

Not every task benefits. Algorithms with irregular memory access, many branches or small amounts of arithmetic per data item may run no faster on a graphics unit than on a processor, and some may be slower once the transfer of data is counted. The data must be moved to the accelerator and the results moved back, and for a short computation this transfer can dominate the time.

Programming an accelerator requires specialised code, which adds to the cost of development and to the risk of errors. Taschuk and Wilson (2017) recommended that research software be tested against a reference implementation, and an accelerated version should produce the same results as the original on the same inputs before it is used.

Performance must be reported honestly. A speed-up is meaningful only when the baseline is a well-written program run on the same data, and a comparison with a deliberately slow baseline overstates the gain. The time, the hardware and the software versions should be stated with the result.
