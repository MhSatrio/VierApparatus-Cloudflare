/**
 * The starting structure of the learning platform: the nine subjects and, for Biology, the full 12-level curriculum.
 *
 * This is STRUCTURE ONLY: titles that organise the curriculum, grouped under discipline headings. There is no lesson text, no
 * facts and no references here. Every module begins as "coming soon" and becomes readable only when someone writes it and the
 * owner publishes it. Chapters and subchapters are added later, per module, through the Planner.
 *
 * The seed (store/modules.ts, ensureCurriculum) is idempotent: running it again only adds what is missing and never changes
 * what has since been edited.
 */

export type SubjectSeed = { slug: string; name: string; tagline: string; description: string };

export const SUBJECTS: SubjectSeed[] = [
  { slug: "bio", name: "Biology", tagline: "Life from molecules to ecosystems", description: "A progressive course in the biological sciences, from the first principles of life through experimental methods, medicine, quantitative biology and doctoral research." },
  { slug: "chem", name: "Chemistry", tagline: "The matter that life and technology are built on", description: "Chemistry from the basics to specialised research topics, organised by academic level." },
  { slug: "phys", name: "Physics", tagline: "The laws behind motion, energy and matter", description: "Physics from foundations to research level, organised by academic level." },
  { slug: "math", name: "Mathematics", tagline: "The language of quantitative science", description: "Mathematics for scientists, from foundations to research-level methods." },
  { slug: "cs", name: "Computer Science", tagline: "Computing for scientific work", description: "Computer science from the basics to advanced and research-level topics." },
  { slug: "stats", name: "Statistics", tagline: "Reasoning from data", description: "Statistics from first principles to advanced modelling and research practice." },
];

export type SpecializationSeed = { slug: string; name: string; description: string };

/** Subjects other than Biology start with one specialization, "General <subject>", which holds their academic levels. */
export const generalSpecialization = (subjectName: string): SpecializationSeed => ({
  slug: `general-${subjectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`,
  name: `General ${subjectName}`,
  description: `The core of ${subjectName}, organised by academic level.`,
});

/**
 * The specializations of Biology, in the order they are listed. Only General Biology (the original 12-level curriculum below) has
 * modules so far. The others are structure: a name, a one-sentence description of the field, and the academic levels, so that
 * modules can be planned and written for them. The list is editable in /admin (Curriculum).
 */
export const BIOLOGY_SPECIALIZATIONS: SpecializationSeed[] = [
  { slug: "general-biology", name: "General Biology", description: "The shared foundation of the biological sciences: the nature of life, cells, genes, organisms, evolution and ecology, with methods and research practice." },
  { slug: "molecular-biology", name: "Molecular Biology", description: "How genes, RNA and proteins work and interact inside cells." },
  { slug: "cell-biology", name: "Cell Biology", description: "The structure, function and behaviour of cells and their components." },
  { slug: "genetics-and-genomics", name: "Genetics and Genomics", description: "Heredity, variation and the study of whole genomes." },
  { slug: "biochemistry", name: "Biochemistry", description: "The chemical processes and molecules of living organisms." },
  { slug: "microbiology", name: "Microbiology", description: "Bacteria, archaea, viruses, fungi and other microorganisms." },
  { slug: "botany-and-plant-biology", name: "Botany and Plant Biology", description: "The biology of plants: structure, physiology, diversity and evolution." },
  { slug: "zoology-and-animal-biology", name: "Zoology and Animal Biology", description: "The biology of animals: structure, behaviour, diversity and evolution." },
  { slug: "human-anatomy-and-physiology", name: "Human Anatomy and Physiology", description: "The structure of the human body and how its systems function." },
  { slug: "developmental-biology", name: "Developmental Biology", description: "How organisms grow and develop from a single cell." },
  { slug: "evolutionary-biology", name: "Evolutionary Biology", description: "The processes that shape the diversity of life over time." },
  { slug: "ecology-and-environmental-biology", name: "Ecology and Environmental Biology", description: "How organisms interact with each other and with their environment." },
  { slug: "biomedical-sciences", name: "Biomedical Sciences", description: "Biology applied to health and disease." },
  { slug: "medical-biology", name: "Medical Biology", description: "The biological basis of human disease and its diagnosis and treatment." },
  { slug: "immunology", name: "Immunology", description: "The immune system and its role in health and disease." },
  { slug: "neuroscience", name: "Neuroscience", description: "The nervous system: from neurons and circuits to behaviour and cognition." },
  { slug: "bioinformatics", name: "Bioinformatics", description: "Where biological data meets computation." },
  { slug: "computational-biology", name: "Computational Biology", description: "Modelling and simulating living systems." },
  { slug: "biophysics", name: "Biophysics", description: "The physical principles behind biological structure and function." },
  { slug: "biostatistics", name: "Biostatistics", description: "Statistical methods for biological and medical data." },
  { slug: "systems-biology", name: "Systems Biology", description: "Understanding living systems as interacting networks." },
  { slug: "synthetic-biology", name: "Synthetic Biology", description: "Designing and building new biological parts, devices and systems." },
  { slug: "biotechnology", name: "Biotechnology", description: "Using biological systems and organisms to make products and solve problems." },
  { slug: "structural-biology", name: "Structural Biology", description: "The three-dimensional structure of biological molecules and how it determines function." },
  { slug: "molecular-medicine", name: "Molecular Medicine", description: "The molecular mechanisms of disease and the therapies built on them." },
  { slug: "cancer-biology", name: "Cancer Biology", description: "The biology of cancer: how it starts, grows and spreads." },
  { slug: "pharmacology", name: "Pharmacology", description: "How drugs act on the body and how the body handles drugs." },
  { slug: "toxicology", name: "Toxicology", description: "The harmful effects of chemicals and other agents on living organisms." },
  { slug: "marine-biology", name: "Marine Biology", description: "Life in the oceans and other saltwater environments." },
  { slug: "agricultural-biology", name: "Agricultural Biology", description: "The biology of crops, livestock and agricultural systems." },
  { slug: "plant-biotechnology", name: "Plant Biotechnology", description: "Using biological methods to study and improve plants." },
  { slug: "conservation-biology", name: "Conservation Biology", description: "The science of protecting species, habitats and biodiversity." },
  { slug: "astrobiology", name: "Astrobiology", description: "The origin, evolution and possible distribution of life in the universe." },
  { slug: "mathematical-biology", name: "Mathematical Biology", description: "Mathematical models of biological processes." },
  { slug: "other-emerging-biological-disciplines", name: "Other Emerging Biological Disciplines", description: "Newer and cross-disciplinary fields of biology that do not yet have a section of their own." },
];

/** The ladder used by every subject that has no curriculum of its own yet. These are the PRD's illustrative levels. */
export function genericLevels(subjectName: string): { slug: string; name: string; description: string }[] {
  return [
    { slug: "foundations", name: "Foundations (Absolute Beginner)", description: `Start from scratch: the ideas and vocabulary every learner of ${subjectName} needs first.` },
    { slug: "basic", name: `Basic ${subjectName}`, description: `The core concepts of ${subjectName}.` },
    { slug: "intermediate", name: `Intermediate ${subjectName}`, description: `Deeper study and wider connections within ${subjectName}.` },
    { slug: "advanced", name: `Advanced ${subjectName}`, description: `Advanced mechanisms, methods and problems in ${subjectName}.` },
    { slug: "specialization", name: "Specialized Sciences", description: `Specialised areas that build on ${subjectName}.` },
    { slug: "research", name: `Research-Level ${subjectName}`, description: `Current research questions and methods in ${subjectName}.` },
    { slug: "phd", name: "PhD and Postdoctoral Research", description: "Independent research at doctoral and postdoctoral level." },
  ];
}

export type CurriculumLevel = { slug: string; name: string; description: string; disciplines: { name: string; modules: string[] }[] };

export const BIOLOGY_LEVELS: CurriculumLevel[] = [
  {
    slug: "foundations",
    name: "Foundations of Biology",
    description: "Start here: what biology is, the chemistry it rests on, the cell, and the ideas of evolution and ecology.",
    disciplines: [
      { name: "The nature of biology", modules: ["Introduction to Biology", "Characteristics of Life", "Scientific Method", "Biological Organization"] },
      { name: "Chemistry for biology", modules: ["Chemistry for Biology", "Water, Acids, Bases and pH", "Biological Macromolecules", "Organic Chemistry Fundamentals"] },
      { name: "Cells and microscopy", modules: ["Introduction to Cells", "Prokaryotic and Eukaryotic Cells", "Microscopy"] },
      { name: "Life on Earth", modules: ["Biological Classification", "Evolution Fundamentals", "Ecology Fundamentals"] },
    ],
  },
  {
    slug: "core",
    name: "Core Biological Sciences",
    description: "The main branches of biology, studied one by one: cells, molecules, genes, organisms, the human body and ecosystems.",
    disciplines: [
      { name: "Cells and molecules", modules: ["Cell Biology", "Molecular Biology", "Genetics", "Biochemistry"] },
      { name: "Organisms", modules: ["Microbiology", "Botany", "Zoology", "Taxonomy and Systematics"] },
      { name: "Human biology", modules: ["Human Anatomy", "Human Physiology", "Histology", "Immunology Fundamentals"] },
      { name: "Development, evolution and ecology", modules: ["Developmental Biology", "Evolutionary Biology", "Ecology"] },
    ],
  },
  {
    slug: "advanced-mechanisms",
    name: "Advanced Biological Mechanisms",
    description: "How cells control genes, build and run proteins, make energy, and communicate; and how those mechanisms fail in disease.",
    disciplines: [
      { name: "Cell and gene regulation", modules: ["Advanced Cell Signaling", "Gene Expression and Regulation", "Epigenetics", "Chromosome Biology", "DNA Replication and Repair", "RNA Biology"] },
      { name: "Proteins and metabolism", modules: ["Protein Structure and Function", "Enzymology", "Metabolism", "Cellular Bioenergetics", "Mitochondrial Biology"] },
      { name: "Cell architecture and communication", modules: ["Cytoskeleton", "Cellular Communication", "Stem Cell Biology"] },
      { name: "Physiology and disease mechanisms", modules: ["Cancer Biology", "Neurobiology", "Endocrinology", "Host-Pathogen Interactions"] },
    ],
  },
  {
    slug: "experimental",
    name: "Experimental and Applied Biology",
    description: "How biological questions are tested in the laboratory: design, instruments and the standard methods.",
    disciplines: [
      { name: "Experimental foundations", modules: ["Experimental Design", "Laboratory Instrumentation", "Biosafety and Research Ethics"] },
      { name: "Imaging, spectroscopy and separation", modules: ["Microscopy Techniques", "Spectrophotometry", "Chromatography", "Electrophoresis"] },
      { name: "Nucleic acid and protein methods", modules: ["PCR and qPCR", "DNA and RNA Extraction", "Protein Purification", "Western Blotting", "ELISA"] },
      { name: "Cell and tissue methods", modules: ["Cell Culture", "Microbial Cultivation", "Flow Cytometry", "Immunohistochemistry"] },
      { name: "Genomic technologies", modules: ["Next-Generation Sequencing", "CRISPR and Genome Editing"] },
    ],
  },
  {
    slug: "biomedical",
    name: "Biomedical Sciences",
    description: "Biology applied to human health: disease mechanisms, infection, therapeutics, diagnostics and translation.",
    disciplines: [
      { name: "Molecular and cellular medicine", modules: ["Medical Biochemistry", "Human Pathology", "Molecular Pathology", "Hematology", "Oncology", "Cardiovascular Biology", "Neuroscience"] },
      { name: "Infectious disease", modules: ["Clinical Microbiology", "Medical Immunology", "Medical Virology", "Medical Parasitology"] },
      { name: "Therapeutics", modules: ["Pharmacology", "Toxicology", "Pharmacogenomics"] },
      { name: "Diagnostics and translation", modules: ["Molecular Diagnostics", "Regenerative Medicine", "Translational Medicine", "Precision Medicine"] },
    ],
  },
  {
    slug: "biophysics",
    name: "Biophysics and Quantitative Biology",
    description: "The physical and mathematical side of life: energy, molecules in motion, structure determination and quantitative models.",
    disciplines: [
      { name: "Mathematical and physical foundations", modules: ["Mathematical Foundations", "Thermodynamics of Living Systems", "Statistical Mechanics", "Stochastic Processes"] },
      { name: "Molecular biophysics", modules: ["Molecular Biophysics", "Protein Folding and Dynamics", "Membrane Biophysics", "Single-Molecule Biophysics", "Molecular Dynamics"] },
      { name: "Structural methods", modules: ["Structural Biology", "X-ray Crystallography", "Cryo-EM", "NMR"] },
      { name: "Systems and physiological biophysics", modules: ["Biomechanics", "Electrophysiology", "Neural Biophysics", "Quantitative Systems Biology"] },
    ],
  },
  {
    slug: "bioinformatics",
    name: "Bioinformatics and Computational Biology",
    description: "Working with biological data by computer: programming, databases, sequence and genome analysis, the omics and structural methods.",
    disciplines: [
      { name: "Computing foundations", modules: ["Introduction to Bioinformatics", "Python for Biological Research", "R for Biological Research", "Linux and Command-Line Computing", "High-Performance Computing"] },
      { name: "Biological databases", modules: ["Biological Databases", "NCBI and GenBank", "Ensembl and UCSC Genome Browser", "UniProt", "Protein Data Bank"] },
      { name: "Sequence analysis", modules: ["Sequence Alignment", "BLAST and FASTA", "Phylogenetic Analysis"] },
      { name: "Genomics", modules: ["Genome Assembly", "Genome Annotation", "Comparative Genomics", "Metagenomics"] },
      { name: "Transcriptomics and other omics", modules: ["Transcriptomics", "RNA-seq Analysis", "Single-Cell RNA-seq", "Proteomics", "Metabolomics"] },
      { name: "Structural and network bioinformatics", modules: ["Structural Bioinformatics", "Protein Structure Prediction", "Molecular Docking", "Molecular Dynamics Simulation", "Network Biology", "Biological Knowledge Graphs", "Multi-Omics Integration"] },
    ],
  },
  {
    slug: "biostatistics",
    name: "Biostatistics and Biological Data Science",
    description: "Statistics and data science for biological and medical data, from probability to machine learning and causal inference.",
    disciplines: [
      { name: "Probability and description", modules: ["Probability Theory", "Descriptive Statistics"] },
      { name: "Inference and testing", modules: ["Inferential Statistics", "Hypothesis Testing", "Parametric and Nonparametric Tests", "ANOVA"] },
      { name: "Statistical modelling", modules: ["Regression Analysis", "Generalized Linear Models", "Multivariate Statistics", "Mixed-Effects Models", "Bayesian Statistics"] },
      { name: "Applied biostatistics", modules: ["Survival Analysis", "Experimental Design and Power Analysis", "Epidemiological Statistics", "Statistical Genetics", "Spatial Statistics"] },
      { name: "Data science", modules: ["Machine Learning", "Deep Learning", "Causal Inference", "Scientific Data Visualization"] },
    ],
  },
  {
    slug: "systems-biotechnology",
    name: "Systems Biology and Biotechnology",
    description: "Understanding living systems as networks, and engineering them: synthetic biology, bioprocessing and applied biotechnology.",
    disciplines: [
      { name: "Systems biology", modules: ["Systems Biology", "Biological Networks", "Metabolic Network Reconstruction", "Flux Balance Analysis", "Dynamic Systems Modeling"] },
      { name: "Synthetic biology and engineering", modules: ["Synthetic Biology", "Genetic Circuit Design", "Genome Engineering", "Metabolic Engineering", "Enzyme Engineering", "Protein Engineering"] },
      { name: "Bioprocess and industry", modules: ["Industrial Biotechnology", "Bioprocess Engineering", "Fermentation Technology", "Bioreactor Design"] },
      { name: "Tissues and materials", modules: ["Tissue Engineering", "Biomaterials", "Nanobiotechnology"] },
      { name: "Sector biotechnology", modules: ["Agricultural Biotechnology", "Environmental Biotechnology", "Marine Biotechnology"] },
    ],
  },
  {
    slug: "specialized",
    name: "Specialized and Emerging Biological Sciences",
    description: "Specialised and newer fields that build on the core: neuroscience, ecology and genomics, plant science, drug discovery and more.",
    disciplines: [
      { name: "Neuroscience and development", modules: ["Neuroscience", "Computational Neuroscience", "Evolutionary Developmental Biology", "Chronobiology"] },
      { name: "Life in the universe and theory", modules: ["Astrobiology", "Origins of Life", "Quantum Biology", "Mathematical Biology", "Planetary Health"] },
      { name: "Environmental and population sciences", modules: ["Ecotoxicology", "Environmental Genomics", "Conservation Genomics", "Population Genomics", "Molecular Ecology", "Microbiome Science"] },
      { name: "Plant and agricultural sciences", modules: ["Plant-Microbe Interactions", "Phytopathology", "Plant Physiology", "Agricultural Genomics"] },
      { name: "Applied specialties", modules: ["Veterinary Biomedical Sciences", "Forensic Biology", "Computational Drug Discovery", "AI-Driven Drug Design"] },
    ],
  },
  {
    slug: "research-methods",
    name: "Advanced Research Methodology",
    description: "How research is planned, carried out, validated, reported and reviewed, and how to do it responsibly.",
    disciplines: [
      { name: "Planning research", modules: ["Research Question Development", "Critical Literature Review", "Systematic Reviews", "Meta-Analysis", "Research Proposal Development"] },
      { name: "Conducting research", modules: ["Advanced Experimental Design", "Method Validation", "Reproducibility", "Scientific Programming", "Research Data Management"] },
      { name: "Sharing research", modules: ["Open Science", "Grant Writing", "Scientific Manuscript Preparation", "Peer Review"] },
      { name: "Responsible research", modules: ["Research Integrity", "Research Ethics", "Research Translation"] },
    ],
  },
  {
    slug: "phd-postdoc",
    name: "PhD and Postdoctoral Research",
    description: "Doctoral and postdoctoral level: current literature, methodological limits, competing interpretations and open research questions.",
    disciplines: [
      { name: "Molecular discovery", modules: ["Advanced Molecular Mechanism Discovery", "Novel Gene Function Characterization", "Advanced Genome Engineering", "Synthetic Genome Construction"] },
      { name: "Omics and structure", modules: ["Single-Cell and Spatial Multi-Omics", "Advanced Structural Biology"] },
      { name: "AI and modelling", modules: ["Predictive Biological Modeling", "AI in Molecular Biology", "Foundation Models for Biological Sequences", "Protein Language Models", "Generative Protein Design", "Whole-Cell Modeling", "Multiscale Biological Simulation", "Advanced Evolutionary Modeling"] },
      { name: "Medicine and translation", modules: ["Computational Drug Discovery", "Advanced Systems Medicine", "Population-Scale Genomics", "Precision Medicine", "Advanced Translational Research"] },
      { name: "Independent research", modules: ["Independent Research Development", "Doctoral Dissertation Research", "Original Scientific Contributions"] },
    ],
  },
];
