# Plan: ten further Biology specializations

Status: PLAN ONLY. Nothing in this file has been written as lesson content yet.

## Assumptions

- "200 files" per specialization means 200 files in total. A topic is 9 files (one `module.md` and eight chapters), so one specialization is about 22 topics (22 x 9 = 198, plus a little for the index).
- The ten specializations are taken from the existing `BIOLOGY_SPECIALIZATIONS` list in `src/lib/modules/curriculum.ts`. Each already exists as a specialization with placeholder levels ("in preparation"), so no new subject is needed.
- Each specialization has five academic levels, with four to five topics per level. The levels are proposals and can be changed.
- The same per-topic rules apply as for General Biology: eight chapters of at least 200 words each, APA 7 references with Crossref-checked DOIs, no em dashes, no "not only ... but", no images.

## Ten specializations and proposed topics

Each specialization needs its own curriculum definition in `curriculum.ts` (levels and disciplines) before its batches start. That is a small code change, the same kind made for General Biology.

### 1. Molecular Biology (`molecular-biology`)
- Nucleic acids and gene expression: DNA structure and replication; transcription; RNA processing; translation; gene regulation in bacteria and eukaryotes.
- DNA repair and recombination: mismatch and excision repair; double-strand break repair; homologous recombination; transposition.
- Protein biogenesis: ribosome structure; protein targeting; chaperones; ubiquitin and proteasome.
- Signal transduction: receptor tyrosine kinases; G-protein pathways; second messengers; scaffolds and feedback.
- Molecular methods: cloning; reporter assays; ChIP and CRISPR screens; molecular interaction measurement.

### 2. Cell Biology (`cell-biology`)
- Membranes and transport: lipid bilayers; transporters; channels; endocytosis; exocytosis.
- Organelles: endoplasmic reticulum; Golgi; mitochondria and peroxisomes; lysosomes; nucleus.
- Cytoskeleton and motility: actin; microtubules; intermediate filaments; molecular motors; cell migration.
- Cell cycle and division: cyclins and kinases; checkpoints; mitosis; cytokinesis; meiosis.
- Cell death and fate: apoptosis; necroptosis; autophagy; senescence; cell imaging methods.

### 3. Genetics and Genomics (`genetics-and-genomics`)
- Classical genetics: Mendelian inheritance; linkage and mapping; sex-linked traits; pedigree analysis.
- Molecular genetics: mutation types; mutagenesis; complementation; model organisms.
- Population genetics: allele frequencies; drift; selection; linkage disequilibrium; inbreeding.
- Quantitative genetics: heritability; QTL mapping; genome-wide association studies; polygenic scores.
- Genomics: genome structure; comparative genomics; epigenetic inheritance; human genetic disease.

### 4. Biochemistry (`biochemistry`)
- Enzyme kinetics and mechanism: Michaelis-Menten kinetics; inhibition; catalytic strategies; allosteric regulation.
- Carbohydrate metabolism: glycolysis; gluconeogenesis; glycogen; pentose phosphate pathway.
- Lipid metabolism: fatty acid synthesis and oxidation; membrane lipids; ketone bodies; cholesterol.
- Bioenergetics: the electron transport chain; ATP synthase; photosynthetic electron flow; redox balance.
- Amino acid and nucleotide metabolism: nitrogen handling; urea cycle; purine and pyrimidine synthesis; one-carbon metabolism.

### 5. Microbiology (`microbiology`)
- Microbial diversity: bacteria; archaea; fungi; protists; classification and culture-independent methods.
- Microbial physiology: growth; nutrition; metabolism; stress responses; biofilms.
- Microbial genetics: plasmids; horizontal gene transfer; phage; regulation in bacteria.
- Virology: virus structure; replication strategies; host range; virus evolution.
- Microbial ecology and pathogenesis: the microbiome; infection; antimicrobial resistance; host defence.

### 6. Human Anatomy and Physiology (`human-anatomy-and-physiology`)
- Organization of the body: tissues; homeostasis; feedback; anatomical terms and planes.
- Musculoskeletal system: bone remodelling; skeletal muscle contraction; joints; exercise physiology.
- Cardiovascular and respiratory systems: the heart cycle; blood pressure; gas exchange; control of breathing.
- Renal and digestive systems: nephron function; fluid balance; digestion and absorption; liver functions.
- Endocrine and reproductive systems: hormone signalling; the hypothalamus-pituitary axis; reproductive cycles.

### 7. Immunology (`immunology`)
- Innate immunity: pattern recognition; complement; inflammation; natural killer cells; interferons.
- Antigen recognition: MHC; antigen processing and presentation; B-cell receptors; T-cell receptors.
- Adaptive responses: T-cell activation; B-cell activation; antibody classes and affinity maturation; memory.
- Immune regulation: tolerance; regulatory T cells; autoimmunity; allergy.
- Applied immunology: vaccines; immunodiagnostics; immunotherapy; transplantation.

### 8. Neuroscience (`neuroscience`)
- Neurons and synapses: membrane potential; synaptic transmission; neurotransmitters; plasticity.
- Sensory systems: vision; hearing; touch and pain; olfaction and taste.
- Motor and integrative systems: spinal circuits; the cerebellum; the basal ganglia; decision making.
- Learning, memory and cognition: memory systems; attention; reward learning; sleep.
- Development and disease: neural development; neurodegeneration; psychiatric disorders; neuroimaging methods.

### 9. Ecology and Environmental Biology (`ecology-and-environmental-biology`)
- Population ecology: growth models; density dependence; life tables; metapopulations.
- Community ecology: competition; predation; food webs; succession; biodiversity patterns.
- Ecosystem ecology: energy flow; nutrient cycles; primary production; decomposition.
- Global change: climate change responses; invasive species; land use; pollution.
- Conservation and field methods: sampling design; monitoring; protected areas; restoration.

### 10. Evolutionary Biology (`evolutionary-biology`)
- Origin of life: prebiotic chemistry; the RNA world; early cells; the last universal common ancestor.
- Mechanisms of evolution: mutation; selection; drift; gene flow; adaptation.
- Speciation: reproductive isolation; hybrid zones; adaptive radiation; the genetics of speciation.
- Phylogenetics: tree inference; molecular clocks; comparative methods; phylogenomics.
- Macroevolution and human evolution: the fossil record; extinction; evolution of development; human origins.

## Time estimate

Units: a topic is 9 files; a batch is 7 topics (63 files). Each batch is one work session covering the writing, the Crossref check of new DOIs, the validator run and the fixes.

| Work | Topics | Files | Batches (of 7) |
|---|---|---|---|
| General Biology, batches 16–33 | 126 | 1,134 | 18 |
| Ten specializations, about 22 topics each | about 220 | about 1,980 | about 32 |
| Total | about 346 | about 3,114 | about 50 |

Measured rate (from `content/modules/bio/.timing-log.txt`): General Biology batches 21–33 each took about 8–10 minutes of wall-clock time from the first file to a clean validator run, fixes included. Batches 29–33 took 8.5–9.8 minutes each. This is drafting and validation only. It does not include expert review, the Crossref check of new DOIs beyond the registered list, or an editorial pass on what each cited paper says. The figures below assume about 1 hour per batch, which is a deliberately cautious drafting allowance. Expert review is the real limit (see the scenarios that follow the table).

If a batch takes **about 1 hour** of working time, including review:
- Total: about 50 hours of working time.
- One 8-hour workday per week: about 6–7 weeks. The schedule would be 50 batches over about 7 workdays, which is about 7 weeks at one workday per week.

If a batch takes **about 2 hours** (more review, more DOI checks):
- Total: about 100 hours, or about 13 workdays, which is about 13 weeks at one workday per week.

These numbers are an estimate, not a measurement. Expert review of the text is the real limit, and it is not included above.

## Risks

- **Overlap with General Biology.** Several specializations (Cell Biology, Molecular Biology, Immunology, Neuroscience, Evolutionary Biology) cover ground that General Biology's core and advanced levels already treat. Each specialization should go deeper and aim at the research level, not repeat the introductory level. Overlap should be checked topic by topic before writing.
- **Reference quality.** The validator confirms that a DOI resolves and that its metadata matches the citation. It does not confirm that a paper supports the sentence citing it. Earlier batches used some generic attributions that the papers do not make. That needs an editorial pass before publication, and it applies more strongly to ten new specializations.
- **Review bottleneck.** The number of topics is not the limit. Expert review of each specialization is.

## Order of work

1. Finish General Biology (batches 16–33).
2. For each specialization, add its curriculum definition in `curriculum.ts`, then write its topics in batches of seven, validating each batch.
3. Start with the specializations that most overlap with the curriculum already in place (Molecular Biology, Cell Biology, Genetics and Genomics) so the reference set can be reused.
