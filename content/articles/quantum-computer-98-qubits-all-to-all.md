---
title: "A 98-Qubit Trapped-Ion Computer That Connects Every Pair of Qubits"
slug: quantum-computer-98-qubits-all-to-all
excerpt: "A Nature paper from June 2026 reports Helios, a 98-qubit trapped-ion processor with all-to-all connectivity and very low gate error rates. Here is what the result shows and what it does not."
coverImage: "https://images.vierapparatus.com/articles/2026/11/i_x69wR0l2fQZIGhyd.webp"
coverImageAlt: "Planar ion trap chip of the kind used to hold trapped ions as qubits in a quantum computer."
coverImageSource: "Image: NIST, public domain, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Planar_Ion_Trap_(5941086002).jpg)"
date: 2026-11-12
author: "Muhammad Satrio"
category: "Scientific Commentary"
tags:
  - quantum computing
  - trapped ions
  - qubits
  - quantum error rates
  - physics
seoTitle: "98-Qubit Trapped-Ion Quantum Computer: What It Shows"
seoDescription: "Helios, a 98-qubit trapped-ion processor reported in Nature, links every pair of qubits and reaches very low gate error rates. What the result shows and its limits."
status: published
---

Quantum computers need two things at once: many qubits, and operations that rarely go wrong. For years, trapped-ion machines have led on accuracy, but scaling them up while keeping that accuracy has been hard. A June 2026 *Nature* paper reports a machine that addresses both problems at a larger size than before (Ransford et al., 2026).

## What the machine is

The processor is called Helios. It has 98 qubits, each made from a single barium ion held in electric fields on a chip. The ions are moved between zones where gates are applied. The authors describe a rotatable ion storage ring that connects two operation regions through a junction, which allows any ion to be brought next to any other. The paper calls this all-to-all connectivity (Ransford et al., 2026).

Connectivity matters because many quantum algorithms need qubits that are not neighbors. If a machine can only act on nearby qubits, every long-range operation has to be built from many steps, and each step adds error.

## The error numbers

The authors report average infidelities of 2.5 × 10⁻⁵ for single-qubit gates, 7.9 × 10⁻⁴ for two-qubit gates, and 3.3 × 10⁻⁴ for state preparation and measurement. They also say these figures are not fundamentally limited and could probably be improved (Ransford et al., 2026).

These are component-level figures averaged across the machine's zones. The authors argue that they predict performance at the level of whole circuits, including random circuit sampling, which is hard to simulate with classical computers.

## What it does not show

A benchmark that classical computers struggle to simulate is a milestone, not proof of a useful machine. The result says that the hardware is accurate and connected at this scale. It does not show that Helios can run a practical algorithm, such as chemistry or cryptography calculations, with a useful advantage over classical methods.

Scaling is also not finished. Each ion must be cooled, moved and read out without disturbing the others, and the time and error cost of those steps grows with machine size. The next question is whether error correction can be layered on top of this hardware, which requires many more physical qubits for each logical qubit.

## Putting the error rates in context

Errors compound. If every two-qubit gate succeeds with probability 0.9992, a circuit of 100 such gates succeeds about 92% of the time, and a circuit of 1,000 such gates succeeds less than half the time. This is an illustrative calculation that uses the paper's reported two-qubit infidelity, not a result from the paper, but it shows why a small improvement in error rate matters so much as circuits grow. The long-term answer is quantum error correction, which spreads each logical qubit across many physical ones, and it only works when the physical operations are good enough to begin with.

## Other platforms

Trapped ions are one of several approaches. Superconducting circuits and arrays of neutral atoms have also grown to large sizes, and each platform trades speed, connectivity and error rates differently. Comparing machines is only meaningful when the benchmark is the same, which is why the authors report component error rates alongside the circuit-level test, so that readers can see where the performance comes from.

## Why it matters

The paper is a clear step in a race between quantum technologies: superconducting circuits, neutral atoms and trapped ions each have their own strengths. Trapped ions compete on accuracy and connectivity, and this work shows that both can be kept at a 98-qubit scale. For readers, the useful lesson is to look for three things in any quantum claim: the number of qubits, the error rates of the operations, and whether the benchmark is useful or only hard.

## References

1. Ransford, A., Allman, M. S., Arkinstall, J., Campora, J. P., Cooper, S. F., Delaney, R. D., Dreiling, J. M., Estey, B., Figgatt, C., Hall, A., Husain, A. A., Isanaka, A., Kennedy, C. J., Kotibhaskar, N., Madjarov, I. S., Mayer, K., Milne, A. R., Park, A. J., Reed, A. P., ... Bohnet, J. G. (2026). A 98-qubit trapped-ion quantum computer with all-to-all connectivity. Nature, 655(8121), 81–86. https://doi.org/10.1038/s41586-026-10676-4
