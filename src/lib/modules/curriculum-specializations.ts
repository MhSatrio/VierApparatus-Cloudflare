/**
 * Curriculum of six Biology specializations: Molecular Biology, Cell Biology, Genetics and Genomics, Biochemistry, Microbiology and Neuroscience.
 *
 * Each has the seven academic levels of the standard ladder (genericLevels), and each level has four disciplines of seven
 * modules, so 196 modules per specialization. This is STRUCTURE ONLY: titles grouped under discipline headings. Lesson text is
 * written per module in content/modules/bio/<specialization>/<level>/<module>/ and checked by scripts/validate-bio-content.ts.
 *
 * The order of each list is the order of the levels: foundations, basic, intermediate, advanced, specialization, research, phd.
 */
import { genericLevels, type CurriculumLevel } from "./curriculum";

type Discipline = { name: string; modules: string[] };

const DATA: Record<string, Discipline[][]> = {
  "molecular-biology": [
    [
      { name: "The molecules of heredity", modules: ["DNA Structure", "RNA Structure and Types", "Nucleotides and Base Pairing", "The Central Dogma", "Chromosomes and DNA Packaging", "Genes and Genomes", "Mutations and Their Effects"] },
      { name: "Proteins and their building blocks", modules: ["Amino Acids", "Peptide Bonds", "Protein Shape Basics", "Enzymes as Molecular Catalysts", "Proteins as Molecular Machines", "Protein Folding Basics", "Protein Diversity from One Gene"] },
      { name: "Molecules inside the cell", modules: ["Macromolecules in Cells", "Membranes and Molecular Transport", "The Cytoplasm and Organelles", "Cell Signals Overview", "Energy and Molecular Work", "Water and Molecular Interactions", "Molecular Biology Vocabulary"] },
      { name: "Core processes overview", modules: ["DNA Replication Overview", "Transcription Overview", "Translation Overview", "Gene Regulation Overview", "Reading a DNA Sequence", "Model Organisms in Molecular Biology", "Bioinformatics Basics"] },
    ],
    [
      { name: "Nucleic acids and genes", modules: ["DNA Replication Mechanisms", "Okazaki Fragments and the Lagging Strand", "Transcription Initiation and Elongation", "Transcription Termination", "RNA Processing Basics", "Translation Initiation", "The Genetic Code and Codons"] },
      { name: "Protein synthesis and folding", modules: ["Ribosome Structure", "tRNA Charging", "Peptide Bond Formation", "Molecular Chaperones", "Protein Targeting Basics", "Ubiquitin Tags", "Proteasome Basics"] },
      { name: "Signaling molecules", modules: ["G Protein Signaling Basics", "Receptor Tyrosine Kinases", "Second Messengers", "Kinase Cascades", "Protein Phosphatases", "Signal Termination", "Scaffold Proteins"] },
      { name: "Laboratory molecular techniques", modules: ["Polymerase Chain Reaction", "Gel Electrophoresis of DNA", "Restriction Enzymes and Cloning", "DNA Sequencing Basics", "Blotting Methods", "Protein Expression in Bacteria", "Reporter Genes"] },
    ],
    [
      { name: "Control of gene expression", modules: ["Transcription Factors", "Enhancers and Silencers", "Promoter Architecture", "Bacterial Operons", "Riboswitches", "Alternative Splicing", "RNA Interference"] },
      { name: "DNA repair and recombination", modules: ["Mismatch Repair", "Base Excision Repair", "Nucleotide Excision Repair", "Double-Strand Break Repair", "Homologous Recombination", "Non-Homologous End Joining", "Transposable Elements"] },
      { name: "Protein biogenesis and quality control", modules: ["Signal Recognition Particle", "Protein Translocation", "Chaperone Networks", "Ubiquitin Ligases", "Autophagy Overview", "Protein Aggregation", "Cotranslational Folding"] },
      { name: "Signal transduction networks", modules: ["MAPK Pathways", "PI3K and AKT Signaling", "Wnt Signaling", "Notch Signaling", "Hedgehog Signaling", "NF-kB Signaling", "Feedback Control in Pathways"] },
    ],
    [
      { name: "Chromatin and epigenetic regulation", modules: ["Histone Modifications", "Chromatin Remodeling Complexes", "DNA Methylation Mechanisms", "Polycomb Silencing", "Heterochromatin Formation", "Noncoding RNA in Chromatin", "Epigenetic Inheritance"] },
      { name: "Transcription machinery in depth", modules: ["Transcription in Bacteria", "RNA Polymerase II Structure", "Mediator and Transcription Activation", "The Core Promoter", "Promoter-Proximal Pausing", "The RNA Polymerase II CTD Code", "Rho-Dependent Termination"] },
      { name: "RNA biology", modules: ["Splicing Mechanism", "Spliceosome Assembly", "mRNA Export", "Nonsense-Mediated Decay", "microRNA Biogenesis", "Long Noncoding RNA", "RNA Modifications"] },
      { name: "Proteins in depth", modules: ["Protein Folding Energy Landscapes", "Membrane Protein Insertion", "Enzyme Allostery", "Protein-Protein Interaction Networks", "Post-Translational Modifications", "Phase Separation in Cells", "Intrinsically Disordered Proteins"] },
    ],
    [
      { name: "Model systems", modules: ["Escherichia coli Genetics", "Yeast Molecular Genetics", "Drosophila Molecular Biology", "Zebrafish Molecular Biology", "Mouse Molecular Genetics", "Arabidopsis Molecular Biology", "Xenopus Oocyte Methods"] },
      { name: "Molecular disease mechanisms", modules: ["Oncogene Activation", "Tumor Suppressor Pathways", "Viral Hijacking of Host Machinery", "Prion Protein Misfolding", "Repeat Expansion Disorders", "Splicing Defects in Disease", "Mitochondrial DNA Mutations"] },
      { name: "Genome engineering", modules: ["CRISPR-Cas9 Mechanism", "Base Editing", "Prime Editing", "Transgenic Animal Methods", "Synthetic Gene Circuits", "Site-Specific Recombinases", "Genome-Wide Screens"] },
      { name: "Molecular imaging", modules: ["Fluorescent Protein Reporters", "FRET Methods", "Single-Molecule Tracking", "Super-Resolution Microscopy", "Live-Cell Imaging of Transcription", "Proximity Labeling", "Optogenetic Control"] },
    ],
    [
      { name: "Single-cell and spatial methods", modules: ["Single-Cell RNA Sequencing", "Spatial Transcriptomics", "Single-Molecule FISH", "Mass Cytometry", "Single-Cell ATAC-seq", "Lineage Tracing", "Imaging Mass Spectrometry"] },
      { name: "Structural molecular biology", modules: ["Cryo-EM of Macromolecular Complexes", "X-ray Structures of Complexes", "NMR Dynamics", "Integrative Structural Modeling", "Hydrogen-Deuterium Exchange", "Crosslinking Mass Spectrometry", "Interpreting AlphaFold Models"] },
      { name: "Genome-scale molecular networks", modules: ["Protein Interaction Maps", "Chromatin Conformation Capture", "Enhancer-Promoter Networks", "Gene Regulatory Network Inference", "Transcription Factor Atlases", "Ribosome Profiling", "Nascent RNA Sequencing"] },
      { name: "Frontiers in molecular biology", modules: ["Biomolecular Condensates", "RNA Modification Biology", "Ancient DNA Methods", "Synthetic Cells", "Computational Protein Design", "Mitochondrial Transcription", "Cell-Free Expression Systems"] },
    ],
    [
      { name: "Research design", modules: ["Testable Molecular Hypotheses", "Controls and Replication", "Statistics for Molecular Data", "Data Management and FAIR Principles", "Reproducibility in Molecular Biology", "Writing a Molecular Biology Paper", "Peer Review in Practice"] },
      { name: "Frontier mechanisms", modules: ["Non-Canonical DNA Structures", "Transcription-Replication Conflicts", "Ribosome Stalling and Rescue", "Translation Control Under Stress", "Chromatin Memory in Development", "Enzymes with Multiple Functions", "Evolution of Molecular Machines"] },
      { name: "Translational molecular biology", modules: ["Molecular Diagnostics Principles", "Biomarker Discovery", "Drug Target Validation", "Nucleic Acid Therapeutics", "Gene Therapy Vectors", "Antisense Oligonucleotides", "Protein Therapeutics"] },
      { name: "Ethics and the future of the field", modules: ["Ethics of Genome Editing", "Dual-Use Research Concerns", "Biosafety in Molecular Laboratories", "Open Science and Data Sharing", "Research Funding Priorities", "Careers in Molecular Biology", "Communicating Molecular Science"] },
    ],
  ],
  "cell-biology": [
    [
      { name: "Cell basics", modules: ["What Is a Cell", "Cell Theory", "Prokaryotic Cells", "Eukaryotic Cells", "Cell Size and Scale", "Cell Membranes Overview", "Cell Types in Animals and Plants"] },
      { name: "Organelles overview", modules: ["The Nucleus", "The Endoplasmic Reticulum", "The Golgi Apparatus", "Mitochondria", "Chloroplasts", "Lysosomes", "Peroxisomes"] },
      { name: "Cell structure and movement", modules: ["Cytoskeleton Overview", "Actin Filaments", "Microtubules", "Intermediate Filaments", "Cilia and Flagella", "Cell Adhesion", "Extracellular Matrix"] },
      { name: "Cells in practice", modules: ["Microscopy of Cells", "Cell Culture Basics", "Staining Cells", "Overview of Cell Division", "Overview of Cell Death", "Cells and Energy", "Cell Communication Overview"] },
    ],
    [
      { name: "Membranes and transport", modules: ["The Phospholipid Bilayer", "Membrane Proteins", "Diffusion and Osmosis", "Channels and Carriers", "Active Transport and Pumps", "Endocytosis", "Exocytosis"] },
      { name: "Organelle function", modules: ["The Nuclear Pore Complex", "Rough and Smooth ER", "Protein Glycosylation", "Golgi Sorting", "Mitochondrial Structure", "Photosynthesis in Chloroplasts", "Lysosomal Digestion"] },
      { name: "Cytoskeleton and motor proteins", modules: ["Actin Polymerization", "Myosin Motors", "Microtubule Dynamics", "Kinesin and Dynein", "Cell Polarity", "Cell Migration Basics", "Mechanical Forces in Cells"] },
      { name: "The cell cycle", modules: ["Interphase", "Mitosis Phases", "Cytokinesis", "Cyclins and CDKs", "Cell Cycle Checkpoints", "Meiosis Overview", "Chromosome Segregation"] },
    ],
    [
      { name: "Membrane trafficking", modules: ["COPII Vesicles", "COPI Vesicles", "Clathrin-Mediated Endocytosis", "SNARE Proteins", "Rab GTPases", "Endosome Maturation", "Autophagosome Formation"] },
      { name: "Organelle biogenesis", modules: ["ER Stress Response", "Mitochondrial Protein Import", "Peroxisome Biogenesis", "Lipid Droplets", "Membrane Contact Sites", "Organelle Inheritance", "Plastid Development"] },
      { name: "Cell mechanics", modules: ["Focal Adhesions", "Integrin Signaling", "Cell Shape Control", "Cortical Tension", "Nuclear Mechanics", "Mechanosensing", "Tissue Mechanics Basics"] },
      { name: "Cell signaling", modules: ["Receptor Signaling Basics", "GPCR Pathways in Cells", "Calcium Signaling", "cAMP Signaling", "Hormone Receptor Pathways", "Growth Factor Pathways", "Integration of Cell Signals"] },
    ],
    [
      { name: "Cell cycle control", modules: ["CDK Activity Oscillators", "The APC/C Ligase", "The Spindle Assembly Checkpoint", "DNA Damage Checkpoints", "Cyclin Degradation", "Quiescence", "Cell Cycle Transcription"] },
      { name: "Cell death and survival", modules: ["Caspase Activation", "Intrinsic Apoptosis", "Extrinsic Apoptosis", "Necroptosis", "Pyroptosis", "Ferroptosis", "Anoikis"] },
      { name: "Cytoskeleton in depth", modules: ["Arp2/3 Complex", "Formins", "Septins", "Microtubule Nucleation", "Centrosome Biology", "Motor Coordination", "Cytoskeletal Crosstalk"] },
      { name: "Organelle dynamics", modules: ["Mitochondrial Fission and Fusion", "Mitophagy", "ER-Mitochondria Contacts", "Golgi Dynamics", "Lysosome Repair", "Peroxisome Import", "ESCRT and Endosomal Sorting"] },
    ],
    [
      { name: "Cell imaging methods", modules: ["Confocal Microscopy", "Live-Cell Imaging", "Electron Microscopy of Cells", "Super-Resolution Microscopy", "Correlative Light and Electron Microscopy", "Expansion Microscopy", "Image Analysis for Cell Biology"] },
      { name: "Cells in tissues", modules: ["Epithelial Polarity", "Cell-Cell Junctions", "Stem Cell Niches", "Tissue Homeostasis", "Cell Competition", "Cell Extrusion", "Morphogenesis by Cells"] },
      { name: "Cells and disease", modules: ["Cancer Cell Biology", "Neurodegeneration at the Cell Level", "Ciliopathies", "Lysosomal Storage Disorders", "Mitochondrial Disease", "Pathogens and Host Cells", "Cellular Aging"] },
      { name: "Engineered cells", modules: ["Minimal Cell Models", "Synthetic Organelles", "Optogenetic Control of Cells", "Cell-Free Systems", "Engineered Signaling", "Organoids", "Cell Reprogramming"] },
    ],
    [
      { name: "Organelle proteomics", modules: ["Organelle Proteomics", "Proximity Labeling in Cells", "Interactome Mapping", "Membrane Lipidomics", "Single-Organelle Analysis", "Cell Atlas Projects", "Protein Localization Screens"] },
      { name: "Condensates and phase separation", modules: ["Stress Granules", "P-Bodies", "Nucleolar Structure", "Condensate Material Properties", "Condensates in Signaling", "Membraneless Organelles", "Modeling Biomolecular Condensates"] },
      { name: "Physics of the cell", modules: ["Membrane Curvature Mechanics", "Cytoplasm Rheology", "Molecular Crowding", "Cell Volume Regulation", "Active Matter in Cells", "Mechanotransduction Models", "Biophysics of Cell Shape"] },
      { name: "Frontier cell biology", modules: ["Cell Size Control", "Asymmetric Cell Division", "Cell Fate Decisions", "Organelle Evolution", "Endosymbiosis", "Stress Memory in Cells", "Single-Cell Heterogeneity"] },
    ],
    [
      { name: "Research design in cell biology", modules: ["Hypotheses in Cell Biology", "Controls for Imaging", "Quantification and Statistics", "Reproducibility of Cell Experiments", "Cell Line Authentication", "Ethics of Cell Research", "Writing and Reviewing Cell Papers"] },
      { name: "Frontier mechanisms", modules: ["Non-Canonical Autophagy", "Membrane Repair", "Cell Fusion Events", "Organelle Crosstalk", "Dormant Cells", "Cell Aging Mechanisms", "Cell Fate Plasticity"] },
      { name: "Translational cell biology", modules: ["Cell-Based Drug Screens", "Cell Therapy Biology", "Organoid Models of Disease", "Cellular Biomarkers", "Cell Culture Standards", "Regenerative Cell Products", "Gene Therapy Cell Targets"] },
      { name: "The future of cell biology", modules: ["Synthetic Life Ethics", "Open Cell Atlases", "Artificial Intelligence in Cell Imaging", "Careers in Cell Biology", "Teaching Cell Biology", "Public Engagement in Cell Biology", "Long-Term Research Priorities"] },
    ],
  ],
  "genetics-and-genomics": [
    [
      { name: "Heredity basics", modules: ["Genes and Alleles", "Dominant and Recessive Traits", "Mendel's Laws", "Punnett Squares", "Chromosomes and Genes", "Sex Chromosomes", "Inheritance Patterns Overview"] },
      { name: "DNA and genomes", modules: ["DNA as Genetic Material", "Structure of a Gene", "Genome Size and Content", "Chromosome Number", "Mitosis and Meiosis for Genetics", "Recombination Overview", "Mutation Overview"] },
      { name: "Variation in populations", modules: ["Types of Mutation", "Genetic Variation in Populations", "Natural Selection and Genes", "Gene Flow", "Genetic Drift Basics", "Human Genetic Variation", "Variation in Crops and Animals"] },
      { name: "Genetic methods", modules: ["Pedigree Charts", "Karyotypes", "Genetic Testing Basics", "Sequencing Overview", "Model Organisms in Genetics", "Genetic Crosses in the Lab", "Reading Genetic Data"] },
    ],
    [
      { name: "Classical genetics", modules: ["Linkage and Crossing Over", "Gene Mapping", "Epistasis", "Penetrance and Expressivity", "Sex-Linked Inheritance", "Maternal Effects", "Gene Interactions"] },
      { name: "Molecular genetics", modules: ["Gene Expression Basics", "Regulatory Sequences", "Mutagenesis Basics", "Complementation Tests", "Gene Knockouts", "Transposons", "Reporter Gene Assays"] },
      { name: "Population genetics basics", modules: ["Allele Frequencies", "Hardy-Weinberg Equilibrium", "Selection Coefficients", "Inbreeding", "Effective Population Size", "Migration and Gene Flow", "Measuring Genetic Diversity"] },
      { name: "Human genetics", modules: ["Single-Gene Disorders", "Chromosomal Disorders", "Genetic Counseling", "Carrier Testing", "Newborn Screening", "Pharmacogenetics Basics", "Genetic Ancestry"] },
    ],
    [
      { name: "Gene mapping methods", modules: ["Recombination Frequency", "Linkage Analysis", "Genetic Maps", "Physical Mapping", "Positional Cloning", "Association Mapping Basics", "Genetic Marker Systems"] },
      { name: "Gene regulation genetics", modules: ["Cis-Regulatory Elements", "Trans-Acting Factors", "Genomic Imprinting", "X Chromosome Inactivation", "Epigenetic Silencing", "Dosage Compensation", "Position Effects"] },
      { name: "Quantitative traits", modules: ["Continuous Traits", "Heritability Estimation", "Twin Studies", "Additive and Dominance Effects", "Environmental Variance", "Gene-Environment Interaction", "Trait Correlations"] },
      { name: "Genomics fundamentals", modules: ["Genome Assembly Basics", "Gene Annotation", "Comparative Genomes", "Genome Browsers", "Repetitive DNA", "Gene Families", "Pseudogenes"] },
    ],
    [
      { name: "Population genetics in depth", modules: ["The Wright-Fisher Model", "Coalescent Theory", "Linkage Disequilibrium", "Fixation Probability", "Balancing Selection", "Selective Sweeps", "Inferring Demographic History"] },
      { name: "Quantitative genetics in depth", modules: ["The Animal Model", "Genetic Correlation", "QTL Mapping", "Genomic Selection", "Polygenic Risk Scores", "Partitioning Heritability", "Genetic Architecture"] },
      { name: "Mutation and variation", modules: ["Mutation Rates", "Mutation Spectra", "Replication Errors and Mutation", "Transposable Element Insertions", "Structural Variants", "Copy Number Variation", "Somatic Mutation"] },
      { name: "Genome evolution", modules: ["Gene Duplication", "Polyploidy", "Horizontal Gene Transfer", "Genome Rearrangements", "Molecular Clocks", "Codon Usage Bias", "Adaptive Evolution at Genes"] },
    ],
    [
      { name: "Genome-wide association studies", modules: ["GWAS Design", "Population Stratification", "Genotype Imputation", "Fine-Mapping", "Rare Variant Analysis", "Summary Statistics", "Replication in GWAS"] },
      { name: "Sequencing technologies", modules: ["Short-Read Sequencing", "Long-Read Sequencing", "Exome Sequencing", "Whole-Genome Sequencing", "RNA-seq in Genetics", "Targeted Gene Panels", "Sequencing Error Models"] },
      { name: "Genetic diseases", modules: ["Cystic Fibrosis Genetics", "Huntington Disease Genetics", "Muscular Dystrophy Genetics", "Cancer Predisposition Genes", "Rare Disease Gene Discovery", "Mitochondrial Genetic Disease", "Complex Disease Genetics"] },
      { name: "Model organism genetics", modules: ["Yeast Genetics", "Drosophila Genetics", "C. elegans Genetics", "Mouse Genetics", "Zebrafish Genetics", "Arabidopsis Genetics", "Forward and Reverse Genetics"] },
    ],
    [
      { name: "Functional genomics", modules: ["CRISPR Screens", "RNAi Screens", "Saturation Mutagenesis", "Massively Parallel Reporter Assays", "Deep Mutational Scanning", "Perturb-seq", "Variant Effect Prediction"] },
      { name: "Epigenomics and inheritance", modules: ["Epigenome Mapping", "Transgenerational Epigenetic Inheritance", "DNA Methylation Clocks", "Chromatin Accessibility Mapping", "Histone Mark Profiling", "Enhancer Variation", "Epialleles"] },
      { name: "Computational genomics", modules: ["Genome Assembly Algorithms", "Variant Calling", "Phasing and Haplotypes", "Population Genomic Inference", "Machine Learning in Genetics", "Genome Databases", "Reproducible Genomic Pipelines"] },
      { name: "Frontier genomics", modules: ["Pangenomes", "Ancient Genomes", "Synthetic Genomes", "Single-Cell DNA Sequencing", "Genome Editing in Populations", "Gene Drives", "Telomere Genomics"] },
    ],
    [
      { name: "Research design in genetics", modules: ["Study Design for Genetic Association", "Statistical Power in Genetics", "Multiple Testing Correction", "Sample Size Planning", "Replication and Validation", "Preregistration in Genetics", "Reporting Genetic Results"] },
      { name: "Frontier genetics", modules: ["Noncoding Genome Function", "Gene Regulatory Variation", "Gene Dosage Sensitivity", "Genetic Architecture of Complex Traits", "Missing Heritability", "Genetic Basis of Adaptation", "Clonal Evolution"] },
      { name: "Translational genomics", modules: ["Polygenic Risk in Clinical Practice", "Gene Therapy Genetics", "Newborn Genome Sequencing", "Implementing Pharmacogenomics", "Genetic Data Privacy", "Clinical Variant Interpretation", "Rare Disease Diagnostics"] },
      { name: "Ethics and society", modules: ["Ethics of Human Genetic Data", "Genetic Discrimination", "Consent in Genomic Research", "Indigenous Genomic Data", "Governance of Gene Editing", "Public Understanding of Genetics", "Careers in Genomics"] },
    ],
  ],
  "biochemistry": [
    [
      { name: "Chemistry of Life", modules: ["Atoms and Chemical Bonds", "Water as a Solvent", "Acids, Bases and pH", "Functional Groups", "Stereochemistry Basics", "Biological Buffers", "Free Energy Basics"] },
      { name: "The Four Macromolecule Families", modules: ["Carbohydrates Overview", "Lipids Overview", "Amino Acids Overview", "Nucleotides Overview", "Polymers and Condensation", "Hydrolysis Basics", "Macromolecule Structure Levels"] },
      { name: "Enzymes at a Glance", modules: ["What Is an Enzyme", "Substrates and Active Sites", "Enzyme Classes", "Cofactors and Coenzymes", "Reaction Rates Basics", "Enzyme Inhibition Basics", "Enzymes in Everyday Life"] },
      { name: "Metabolism Overview", modules: ["Metabolic Pathways Overview", "Catabolism and Anabolism", "ATP as Energy Currency", "Redox Reactions Basics", "Glycolysis Overview", "Citric Acid Cycle Overview", "Oxidative Phosphorylation Overview"] },
    ],
    [
      { name: "Carbohydrate Metabolism", modules: ["Glycolysis in Detail", "Gluconeogenesis", "Glycogen Metabolism", "Pentose Phosphate Pathway", "Fermentation", "Aerobic Respiration Steps", "Carbohydrate Regulation"] },
      { name: "Lipid and Membrane Biochemistry", modules: ["Fatty Acid Structure", "Triacylglycerol Storage", "Beta-Oxidation", "Phospholipid Synthesis", "Cholesterol Basics", "Ketone Bodies", "Lipid Signaling Molecules"] },
      { name: "Protein Biochemistry", modules: ["Peptide Bond Chemistry", "Protein Purification Basics", "Protein Structure Levels", "Enzyme Kinetics Basics", "Michaelis-Menten Equation", "Allosteric Regulation Basics", "Protein Denaturation"] },
      { name: "Nucleotide Biochemistry", modules: ["Nucleotide Synthesis Basics", "Purine Metabolism", "Pyrimidine Metabolism", "Nucleotide Coenzymes", "DNA and RNA Chemistry", "Nucleic Acid Stability", "Nucleotide Salvage Pathways"] },
    ],
    [
      { name: "Enzyme Kinetics and Mechanism", modules: ["Steady-State Kinetics", "Inhibitor Types", "Catalytic Mechanisms", "Transition State Theory", "Enzyme Regulation by Phosphorylation", "Isoenzymes", "Enzyme Assay Design"] },
      { name: "Bioenergetics", modules: ["Thermodynamics of Metabolism", "Electron Transport Chain", "ATP Synthase Mechanism", "Proton Gradients", "Uncoupling Proteins", "Respiratory Control", "Photosynthetic Electron Transport"] },
      { name: "Metabolic Regulation", modules: ["Hormonal Control of Metabolism", "Insulin Signaling Pathways", "Glucagon Signaling", "Energy Sensing by AMPK", "Feedback Inhibition", "Metabolic Flux Basics", "Compartmentation of Metabolism"] },
      { name: "Analytical Biochemistry", modules: ["Spectrophotometry in Biochemistry", "Chromatography for Proteins", "Mass Spectrometry Basics", "Electrophoresis of Proteins", "Radioisotope Labeling", "Western Blot Analysis", "Quantitative Assays"] },
    ],
    [
      { name: "Advanced Metabolism", modules: ["Amino Acid Catabolism", "Urea Cycle", "Heme Biosynthesis", "Sphingolipid Metabolism", "Nitrogen Metabolism", "One-Carbon Metabolism", "Vitamin Cofactor Chemistry"] },
      { name: "Structural Biochemistry", modules: ["X-ray Crystallography of Enzymes", "Protein Folding Thermodynamics", "Protein Dynamics", "Enzyme Evolution", "Allostery in Depth", "Cofactor Binding Sites", "Protein Engineering Basics"] },
      { name: "Biochemical Signaling", modules: ["Second Messenger Chemistry", "Kinase Mechanisms", "Phosphatase Mechanisms", "GTPase Switches", "Lipid Second Messengers", "Calcium Biochemistry", "Receptor Ligand Binding"] },
      { name: "Biochemical Methods", modules: ["Enzyme Purification Strategies", "Isothermal Titration Calorimetry", "Surface Plasmon Resonance", "Protein Crystallization", "Isotope Tracing", "Metabolomics Methods", "Biochemical Data Analysis"] },
    ],
    [
      { name: "Clinical Biochemistry", modules: ["Blood Glucose Testing", "Liver Function Markers", "Kidney Function Chemistry", "Lipid Panels", "Inborn Errors of Metabolism", "Enzyme Assays in Diagnosis", "Therapeutic Drug Monitoring"] },
      { name: "Industrial Biochemistry", modules: ["Enzyme Production", "Biocatalysis", "Fermentation Chemistry", "Metabolic Engineering Basics", "Biofuel Biochemistry", "Food Biochemistry", "Biochemical Process Control"] },
      { name: "Plant and Microbial Biochemistry", modules: ["Photosynthetic Carbon Fixation", "Secondary Metabolites", "Nitrogen Fixation Biochemistry", "Microbial Metabolism", "Plant Hormone Biochemistry", "Lignin Biosynthesis", "Antibiotic Biosynthesis"] },
      { name: "Biochemistry of Disease", modules: ["Cancer Metabolism", "Oxidative Stress", "Mitochondrial Disorders", "Diabetes Biochemistry", "Neurodegeneration Biochemistry", "Drug Metabolism", "Toxin Biochemistry"] },
    ],
    [
      { name: "Research Methods in Biochemistry", modules: ["Designing Biochemical Experiments", "Controls in Enzyme Assays", "Statistics in Biochemistry", "Reproducibility in Biochemistry", "Data Management", "Writing Biochemistry Papers", "Peer Review"] },
      { name: "Frontier Biochemistry", modules: ["Metabolic Channeling", "Enzyme Promiscuity", "Intrinsically Disordered Enzymes", "Protein Condensates in Metabolism", "Noncanonical Amino Acids", "Synthetic Metabolic Pathways", "Metabolite Repair"] },
      { name: "Translational Biochemistry", modules: ["Drug Target Enzymology", "Biomarker Chemistry", "Enzyme Replacement Therapy", "Biochemical Diagnostics", "Pharmacokinetics Basics", "Antibody Engineering", "Biosimilar Characterization"] },
      { name: "Biochemistry and Society", modules: ["Ethics of Biochemical Research", "Biosafety in Chemistry Labs", "Open Biochemical Databases", "Careers in Biochemistry", "Teaching Biochemistry", "Funding Priorities", "Public Communication"] },
    ],
    [
      { name: "Doctoral Research Design", modules: ["Hypothesis Formation", "Experimental Plan Writing", "Grant Writing", "Thesis Structure", "Mentoring and Lab Culture", "Ethics Review", "Publishing Strategy"] },
      { name: "Advanced Frontier Research", modules: ["Single-Molecule Enzymology", "Cryo-EM of Metabolic Complexes", "Computational Enzymology", "Metabolic Network Modeling", "Chemical Biology Tools", "Redox Proteomics", "Systems Biochemistry"] },
      { name: "Research Translation", modules: ["Technology Transfer", "Commercial Biochemistry Products", "Regulatory Pathways", "Clinical Trial Biochemistry", "Intellectual Property", "Startup Formation", "Industry Collaboration"] },
      { name: "Future Directions", modules: ["Synthetic Biochemistry", "AI in Enzyme Design", "Origins of Metabolism", "Planetary Biochemistry", "Sustainable Chemistry", "Long-Term Research Priorities", "Interdisciplinary Collaboration"] },
    ],
  ],
  "microbiology": [
    [
      { name: "Microbes and Microbial Diversity", modules: ["What Is a Microbe", "Bacteria Overview", "Archaea Overview", "Fungi Overview", "Protists Overview", "Viruses Overview", "Microbial Diversity Survey"] },
      { name: "Microbial Structure", modules: ["Bacterial Cell Walls", "Gram Staining", "Bacterial Membranes", "Flagella and Motility", "Pili and Fimbriae", "Endospores", "Capsules and Biofilms Introduction"] },
      { name: "Growth and Nutrition", modules: ["Microbial Nutrition", "Growth Phases", "Oxygen Requirements", "Culture Media", "Binary Fission", "Counting Microbes", "Environmental Factors for Growth"] },
      { name: "Microbes and Humans", modules: ["Normal Microbiota", "Pathogens and Disease", "Infection Basics", "Immune Response to Microbes", "Vaccines Introduction", "Antibiotics Introduction", "Food Microbiology Basics"] },
    ],
    [
      { name: "Bacterial Physiology", modules: ["Metabolism in Bacteria", "Anaerobic Respiration", "Fermentation in Microbes", "Photosynthetic Bacteria", "Chemolithotrophy", "Nitrogen Cycle Microbes", "Bacterial Stress Responses"] },
      { name: "Microbial Genetics", modules: ["Bacterial Chromosome", "Plasmids", "Horizontal Gene Transfer Basics", "Transformation", "Transduction", "Conjugation", "Mutation and Selection in Microbes"] },
      { name: "Microbial Ecology Basics", modules: ["Microbial Habitats", "Soil Microbes", "Aquatic Microbes", "Symbiosis Overview", "Microbial Succession", "Decomposition by Microbes", "Extremophiles"] },
      { name: "Medical Microbiology Basics", modules: ["Gram-Positive Pathogens", "Gram-Negative Pathogens", "Mycobacteria", "Viral Pathogens Overview", "Fungal Infections", "Parasitic Infections", "Opportunistic Infections"] },
    ],
    [
      { name: "Microbial Metabolism", modules: ["Central Metabolism in Bacteria", "Carbon Source Utilization", "Nitrogen Assimilation", "Sulfur Metabolism", "Secondary Metabolite Production", "Quorum Sensing", "Metabolic Regulation in Microbes"] },
      { name: "Virology", modules: ["Virus Structure", "Viral Replication Cycles", "Bacteriophages", "Retroviruses", "Viral Evolution", "Viral Genomics", "Emerging Viruses"] },
      { name: "Immunology of Infection", modules: ["Innate Immunity to Microbes", "Adaptive Responses", "Antibody Responses to Infection", "Complement", "Immune Evasion by Pathogens", "Inflammation in Infection", "Immunological Memory"] },
      { name: "Microbial Techniques", modules: ["Aseptic Technique", "Microscopy of Microbes", "Culture-Independent Methods", "PCR for Microbes", "Antimicrobial Susceptibility Testing", "Sterilization Methods", "Microbial Identification"] },
    ],
    [
      { name: "Pathogenesis", modules: ["Virulence Factors", "Toxins", "Type III Secretion", "Biofilm Formation", "Intracellular Pathogens", "Host Cell Invasion", "Pathogen Persistence"] },
      { name: "Microbial Genomics", modules: ["Bacterial Genome Sequencing", "Pangenomes of Bacteria", "Comparative Microbial Genomics", "Metagenomics Basics", "Transcriptomics in Microbes", "Proteomics of Microbes", "Genome Annotation for Microbes"] },
      { name: "Antimicrobial Agents", modules: ["Mechanisms of Antibiotic Action", "Antibiotic Resistance Genes", "Efflux Pumps", "Antifungal Drugs", "Antiviral Drugs", "Antiparasitic Drugs", "Drug Combination Strategies"] },
      { name: "Advanced Microbial Ecology", modules: ["Microbial Community Assembly", "Microbial Interactions", "Marine Microbiology", "Gut Microbiome Ecology", "Plant Microbiome", "Microbial Biogeochemistry", "Microbial Evolution in Nature"] },
    ],
    [
      { name: "Clinical Microbiology", modules: ["Diagnostic Microbiology", "Blood Culture", "Urinary Tract Infection Microbiology", "Hospital-Acquired Infections", "Sepsis Microbiology", "Surveillance of Infections", "Laboratory Quality Control"] },
      { name: "Food and Industrial Microbiology", modules: ["Food Spoilage Microbes", "Fermented Foods", "Probiotics", "Industrial Fermentation", "Wastewater Microbiology", "Biofilm Control in Industry", "Microbial Biotechnology"] },
      { name: "Environmental Microbiology", modules: ["Bioremediation", "Microbial Corrosion", "Water Quality Microbiology", "Air Microbiology", "Microbial Mining", "Antimicrobial Resistance in the Environment", "Marine Viruses"] },
      { name: "Public Health Microbiology", modules: ["Epidemiology of Infection", "Outbreak Investigation", "Vaccine Development", "Vaccination Programs", "Infection Prevention", "Pandemic Preparedness", "Global Health Microbiology"] },
    ],
    [
      { name: "Research Design in Microbiology", modules: ["Microbiology Hypotheses", "Controls in Microbial Experiments", "Statistics for Microbiology", "Replication in Culture", "Reproducibility in Microbiology", "Data Management", "Writing Microbiology Papers"] },
      { name: "Frontier Microbiology", modules: ["Microbial Dark Matter", "Phage Therapy", "Microbial Electrochemistry", "Synthetic Microbiology", "Microbial Communication", "Archaeal Biology", "Giant Viruses"] },
      { name: "Translational Microbiology", modules: ["Diagnostic Development", "Antibiotic Discovery", "Microbiome Therapeutics", "Vaccine Platforms", "Biosensors for Pathogens", "Phage Engineering", "Regulatory Pathways for Microbial Products"] },
      { name: "Microbiology and Society", modules: ["Biosafety Levels", "Dual-Use Research in Microbiology", "Ethics of Pathogen Research", "Global Surveillance Ethics", "Careers in Microbiology", "Teaching Microbiology", "Public Trust in Science"] },
    ],
    [
      { name: "Doctoral Research in Microbiology", modules: ["Designing a Microbiology Thesis", "Model Organisms in Microbiology", "Advanced Experimental Design", "Grant Writing", "Mentoring", "Ethics Review", "Publishing Strategy"] },
      { name: "Advanced Frontier Microbiology", modules: ["Single-Cell Microbiology", "Microbial Metabolomics", "Cryo-ET of Bacteria", "Microbial Systems Biology", "Community Modeling", "Experimental Evolution", "Phage-Host Coevolution"] },
      { name: "Research Translation in Microbiology", modules: ["Technology Transfer", "Commercial Microbial Products", "Clinical Trials for Antimicrobials", "Intellectual Property", "Startup Formation", "Industry Partnerships", "Market Access"] },
      { name: "The Future of Microbiology", modules: ["Synthetic Pathogen Ethics", "AI in Microbial Discovery", "Microbes and Climate", "Planetary Protection", "Microbial Origins", "Future of Antimicrobial Stewardship", "Long-Term Research Priorities"] },
    ],
  ],
  "neuroscience": [
    [
      { name: "Nervous System Basics", modules: ["Neurons Overview", "Glial Cells", "Action Potential Basics", "Synapses Overview", "Neurotransmitters Introduction", "Nervous System Organization", "Brain Regions Overview"] },
      { name: "Sensation and Perception", modules: ["Vision Basics", "Hearing Basics", "Touch and Pain", "Taste and Smell", "Sensory Receptors", "Sensory Pathways", "Perception Overview"] },
      { name: "Movement and the Brain", modules: ["Motor Neurons", "Reflexes", "Muscle Contraction Basics", "Motor Cortex Overview", "Cerebellum Basics", "Basal Ganglia Overview", "Movement Disorders Introduction"] },
      { name: "Brain and Behavior", modules: ["Sleep and the Brain", "Emotion Overview", "Memory Overview", "Learning Basics", "Attention Basics", "Stress and the Brain", "Brain Development Overview"] },
    ],
    [
      { name: "Neuron Physiology", modules: ["Resting Membrane Potential", "Ion Channels", "Action Potential Propagation", "Myelination", "Synaptic Transmission", "Receptor Types", "Neuronal Signal Integration"] },
      { name: "Neurochemistry", modules: ["Dopamine", "Serotonin", "Acetylcholine", "GABA and Glutamate", "Neuropeptides", "Neurotransmitter Synthesis", "Neurotransmitter Breakdown"] },
      { name: "Neural Circuits", modules: ["Circuit Motifs", "Feedforward and Feedback", "Neural Coding Basics", "Oscillations in Neurons", "Sensory Circuits", "Motor Circuits", "Circuit Plasticity Introduction"] },
      { name: "Neuroanatomy", modules: ["Spinal Cord Anatomy", "Brainstem Structures", "Thalamus", "Hypothalamus", "Limbic System", "Cerebral Cortex Layers", "Cranial Nerves"] },
    ],
    [
      { name: "Synaptic Plasticity", modules: ["Long-Term Potentiation", "Long-Term Depression", "Spike-Timing Plasticity", "Homeostatic Plasticity", "Structural Plasticity", "Metaplasticity", "Plasticity and Learning"] },
      { name: "Neural Development", modules: ["Neural Tube Formation", "Neuronal Migration", "Axon Guidance", "Synapse Formation", "Critical Periods", "Pruning of Synapses", "Neural Stem Cells"] },
      { name: "Systems Neuroscience", modules: ["Sensory Processing Systems", "Visual System Pathways", "Auditory System Pathways", "Somatosensory Pathways", "Motor Control Systems", "Decision Circuits", "Reward Circuits"] },
      { name: "Neuroscience Methods", modules: ["Electrophysiology Basics", "Patch Clamp", "Calcium Imaging", "fMRI Basics", "EEG Basics", "Optogenetics Introduction", "Histology of Brain Tissue"] },
    ],
    [
      { name: "Cellular Neuroscience", modules: ["Dendritic Integration", "Axonal Transport", "Synaptic Vesicle Cycle", "Neurotransmitter Receptors in Depth", "Glia-Neuron Interaction", "Neurovascular Coupling", "Neuronal Energy Metabolism"] },
      { name: "Neural Computation", modules: ["Neural Networks in the Brain", "Population Coding", "Predictive Coding", "Attractor Networks", "Computational Models of Neurons", "Information Theory in Neuroscience", "Bayesian Brain Ideas"] },
      { name: "Neurodevelopmental Disorders", modules: ["Autism Spectrum Neurobiology", "ADHD Neurobiology", "Intellectual Disability Genetics", "Fragile X Syndrome", "Rett Syndrome", "Developmental Epilepsy", "Cortical Malformations"] },
      { name: "Advanced Sensory Neuroscience", modules: ["Photoreceptor Biology", "Cochlear Mechanics", "Mechanoreceptors", "Olfactory Receptor Coding", "Taste Receptor Cells", "Nociception", "Proprioception"] },
    ],
    [
      { name: "Clinical Neuroscience", modules: ["Stroke Neurology", "Epilepsy Clinical Basics", "Multiple Sclerosis", "Parkinson Disease", "Alzheimer Disease", "Migraine Neurobiology", "Traumatic Brain Injury"] },
      { name: "Neuropharmacology", modules: ["Drug Action on Synapses", "Antidepressant Mechanisms", "Antipsychotic Mechanisms", "Anesthetics", "Opioid Pharmacology", "Stimulant Pharmacology", "Neuroprotective Drugs"] },
      { name: "Neuroimaging Applications", modules: ["Structural MRI", "Diffusion Tensor Imaging", "PET Imaging of the Brain", "Clinical EEG", "Neuroimaging Ethics", "Functional Connectivity", "Imaging Biomarkers"] },
      { name: "Cognitive Neuroscience", modules: ["Attention Networks", "Working Memory Circuits", "Language Areas", "Executive Function", "Social Cognition Neurobiology", "Consciousness Overview", "Cognitive Aging"] },
    ],
    [
      { name: "Research Design in Neuroscience", modules: ["Hypotheses in Neuroscience", "Controls for Electrophysiology", "Statistics for Neural Data", "Animal Model Design", "Reproducibility in Neuroscience", "Data Sharing", "Writing Neuroscience Papers"] },
      { name: "Frontier Neuroscience", modules: ["Connectomics", "Whole-Brain Imaging", "Brain-Computer Interfaces", "Neuromorphic Computing", "Organoid Brain Models", "Single-Neuron Transcriptomics", "Neural Prosthetics"] },
      { name: "Translational Neuroscience", modules: ["Neurotherapeutics Development", "Deep Brain Stimulation", "Gene Therapy for Brain Disorders", "Biomarker Development", "Clinical Trials in Neurology", "Neurorehabilitation", "Diagnostic Tools for Dementia"] },
      { name: "Neuroscience and Society", modules: ["Ethics of Neuroscience", "Neuroenhancement", "Neurodata Privacy", "Neurolaw Basics", "Careers in Neuroscience", "Teaching Neuroscience", "Public Understanding of the Brain"] },
    ],
    [
      { name: "Doctoral Neuroscience Research", modules: ["Designing a Neuroscience Thesis", "Advanced Animal Models", "Grant Writing for Neuroscience", "Mentoring", "Ethics Review of Animal Studies", "Publishing Strategy", "Collaborative Neuroscience"] },
      { name: "Advanced Frontier Neuroscience", modules: ["Large-Scale Recording", "Cryo-EM of Synaptic Proteins", "Computational Neuroanatomy", "Multi-Scale Brain Models", "Molecular Neuroscience Tools", "Neural Circuit Manipulation", "Human Intracranial Recording"] },
      { name: "Research Translation in Neuroscience", modules: ["Neurotechnology Commercialization", "Regulatory Approval for Neuro Devices", "Clinical Translation Pathways", "Intellectual Property in Neurotech", "Startup Formation", "Industry Partnerships", "Patient Advocacy"] },
      { name: "The Future of Neuroscience", modules: ["Artificial Neural Systems", "Neuroscience of Consciousness", "Brain Aging Futures", "Neuroethics of AI", "Global Brain Projects", "Long-Term Research Priorities", "Interdisciplinary Brain Science"] },
    ],
  ],
};

/** The specializations that have a curriculum, by their slug. */
export const CURRICULUM_SPECIALIZATIONS = Object.keys(DATA);

/** The academic levels of a specialization with its disciplines and module titles, or [] when it has no curriculum yet. */
export function specializationLevels(specSlug: string, specName: string): CurriculumLevel[] {
  const data = DATA[specSlug];
  if (!data) return [];
  return genericLevels(specName).map((lv, i) => ({ ...lv, disciplines: data[i] ?? [] }));
}
