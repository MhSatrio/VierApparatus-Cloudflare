---
title: "Remote Computing with SSH"
subject: "Biology"
specialization: "General Biology"
academic_level: "Bioinformatics and Computational Biology"
description: "How secure shell connects a local terminal to a remote server or cluster, the use of key-based authentication instead of passwords, how files are transferred between a local machine and a remote one, the risk of running long analyses in an interactive session that can be lost and the use of terminal multiplexers to keep work running after a disconnection."
author: "VierApparatus"
status: draft
content_status: drafting
learning_objectives:
  - "Connect to a remote server with secure shell using key-based authentication and transfer a file between the local machine and the server."
  - "Explain why a long analysis should run in a session that survives a disconnection and how this is achieved."
references:
  - "Stein, L. D. (2010). The case for cloud computing in genome informatics. Genome Biology, 11(5), 207. https://doi.org/10.1186/gb-2010-11-5-207"
  - "Sandve, G. K., Nekrutenko, A., Taylor, J., & Hovig, E. (2013). Ten Simple Rules for Reproducible Computational Research. PLoS Computational Biology, 9(10), e1003285. https://doi.org/10.1371/journal.pcbi.1003285"
  - "Taschuk, M., & Wilson, G. (2017). Ten simple rules for making research software more robust. PLOS Computational Biology, 13(4), e1005412. https://doi.org/10.1371/journal.pcbi.1005412"
---

Large biological analyses are usually run on servers or clusters, which are reached over a network. Secure shell is the protocol that connects a local terminal to a remote machine, encrypting the connection so that the commands and the passwords are not visible to others on the network. Stein (2010) described how genome analysis came to depend on such remote resources, and the ability to work on them is now a basic skill of the field.

Key-based authentication replaces a password with a pair of keys, a private key kept on the local machine and a public key placed on the server. The server checks that the client holds the matching private key, and no password crosses the network. The private key must be protected, since anyone who holds it can log in as the user, and it should never be copied into a script or a shared repository.

Files are moved between the local machine and the server with secure copy or with a transfer tool that uses the same protocol. Large datasets are often better transferred in a compressed form and checked afterwards with a checksum, which confirms that the copy is identical to the original.

An interactive session ends when the connection is lost, and any analysis running in it may stop. A terminal multiplexer creates a session on the server that persists after the local connection closes, so that a long analysis continues and can be reattached later. The practice avoids losing hours of computation to a broken network connection.

Sandve et al. (2013) recommended that the environment in which an analysis runs be recorded, and a remote session should be treated the same way, with its commands and outputs logged. Taschuk and Wilson (2017) noted that software run on shared machines must be installed and documented so that others can use it, and a clear record of what was run on the server supports that.
