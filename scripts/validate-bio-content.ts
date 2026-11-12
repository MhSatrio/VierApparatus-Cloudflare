/* Validates the Biology module Markdown in content/modules/bio and writes the curriculum manifest.
 *
 * Every file goes through the platform's own importer (src/lib/content/module-import.ts), so a file that passes here is one the
 * Module Editor accepts. The checks are the production rules from the curriculum brief:
 *   - front matter present and the hierarchy matches curriculum.ts (specialization, academic level, module title)
 *   - every module has at least 8 chapters (subtopics), each with more than 200 words of body text
 *   - every chapter has APA in-text citations, and each cited author appears in that chapter's reference list
 *   - every DOI is well formed and has been checked against Crossref (VERIFIED_DOIS below)
 *   - the module overview meets the platform's publish minimum (100 words)
 *   - no em dashes anywhere in the content
 *
 *   npx tsx --tsconfig scripts/tsconfig.json scripts/validate-bio-content.ts [--write-manifest]
 *
 * Passing the checks means "structurally ready". It does NOT mean scientifically reviewed: content_status stays "drafting"
 * until a person with the right expertise has reviewed the text, and images are still missing.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { importModuleMarkdown, type ModuleImport } from "../src/lib/content/module-import";
import { slugify } from "../src/lib/content/text";
import { BIOLOGY_LEVELS, BIOLOGY_SPECIALIZATIONS } from "../src/lib/modules/curriculum";
import { CURRICULUM_SPECIALIZATIONS, specializationLevels } from "../src/lib/modules/curriculum-specializations";

const ROOT = join(process.cwd(), "content", "modules", "bio");
const GENERAL = "general-biology";
const SPEC_NAME = "General Biology";
const MIN_CHAPTER_WORDS = 200;
const MIN_CHAPTERS = 8;

/**
 * Rules for one specialization. General Biology: chapters of more than 200 words, no citation-count rule.
 * The specializations added later (Molecular Biology, Cell Biology, Genetics and Genomics): chapters of at least 600 words,
 * and 3 to 4 in-text citations per chapter.
 */
type SpecConfig = { specName: string; folder: string; minWords: number; citeRange?: [number, number]; minOverviewWords?: number };
const GENERAL_CFG: SpecConfig = { specName: SPEC_NAME, folder: GENERAL, minWords: MIN_CHAPTER_WORDS + 1 };
const MIN_PUBLISH_WORDS = 100;
const IMAGE_STATUS = "No Image Yet";

/** DOIs checked against the Crossref REST API (api.crossref.org/works/<doi>) on 2026-11-11. Add a DOI here only after checking it. */
const VERIFIED_DOIS = new Set([
  "10.1038/nature09486", // Lane & Martin (2010), Nature 467(7318)
  "10.1073/pnas.87.12.4576", // Woese, Kandler & Wheelis (1990), PNAS 87(12)
  "10.1038/171737a0", // Watson & Crick (1953), Nature 171(4356)
  "10.1126/science.146.3642.347", // Platt (1964), Science 146(3642)
  "10.1126/science.1068489", // Koshland (2002), Science 295(5563)
  "10.2307/4444260", // Dobzhansky (1973), The American Biology Teacher 35(3)
  "10.1371/journal.pmed.0020124", // Ioannidis (2005), PLoS Medicine 2(8)
  "10.1021/ja02261a002", // Lewis (1916), JACS 38(4)
  "10.1021/cr068037a", // Ball (2008), Chemical Reviews 108(1)
  "10.1126/science.181.4096.223", // Anfinsen (1973), Science 181(4096)
  "10.1038/185422a0", // Kendrew et al. (1960), Nature 185(4711)
  "10.1073/pnas.37.5.251", // Pauling & Corey (1951), PNAS 37(5)
  "10.1126/science.117.3046.528", // Miller (1953), Science 117(3046)
  "10.1364/OL.19.000780", // Hell & Wichmann (1994), Optics Letters 19(11) (Crossref returns lower case; DOIs are case-insensitive)
  "10.1126/science.1127344", // Betzig et al. (2006), Science 313(5793)
  "10.1086/282400", // Paine (1966), The American Naturalist 100(910)
  "10.1038/nmicrobiol.2016.48", // Hug et al. (2016), Nature Microbiology 1(5)
  "10.1016/S0022-2836(61)80072-7", // Jacob & Monod (1961), J. Mol. Biol. 3(3) (Crossref lower-cases the DOI)
  "10.1073/pnas.44.7.671", // Meselson & Stahl (1958), PNAS 44(7)
  "10.1038/35057062", // International Human Genome Sequencing Consortium (2001), Nature 409(6822)
  "10.1038/nrm1525", // Nelson & Ben-Shem (2004), Nature Rev. Mol. Cell Biol. 5(12)
  "10.1126/science.284.5423.2129", // Knoll & Carroll (1999), Science 284(5423)
  "10.2307/2408678", // Felsenstein (1985), Evolution 39(4)
  "10.1113/jphysiol.1952.sp004764", // Hodgkin & Huxley (1952), J. Physiol. 117(4)
  "10.1126/science.1068883", // Medzhitov & Janeway (2002), Science 296(5566)
  "10.1038/287795a0", // Nüsslein-Volhard & Wieschaus (1980), Nature 287(5785)
  "10.1016/0022-5193(64)90038-4", // Hamilton (1964), J. Theor. Biol. 7(1)
  "10.1086/282146", // Hairston, Smith & Slobodkin (1960), Am. Nat. 94(879)
  "10.1126/science.1063127", // Jenuwein & Allis (2001), Science 293(5532)
  "10.1101/gad.947102", // Bird (2002), Genes & Development 16(1)
  "10.1038/362709a0", // Lindahl (1993), Nature 362(6422)
  "10.1016/j.cell.2009.01.035", // Carthew & Sontheimer (2009), Cell 136(4)
  "10.1126/science.1219021", // Dill & MacCallum (2012), Science 338(6110)
  "10.1146/annurev.biochem.71.110601.135425", // Bell & Dutta (2002), Annu. Rev. Biochem. 71
  "10.1038/191144a0", // Mitchell (1961), Nature 191(4784)
  "10.1146/annurev.biochem.66.1.717", // Boyer (1997), Annu. Rev. Biochem. 66(1)
  "10.1016/j.cell.2012.02.035", // Nunnari & Suomalainen (2012), Cell 148(6)
  "10.1016/j.cell.2006.07.024", // Takahashi & Yamanaka (2006), Cell 126(4)
  "10.1038/nature01804", // Okada, Higuchi & Hirokawa (2003), Nature 424(6948)
  "10.1016/S0092-8674(00)81683-9", // Hanahan & Weinberg (2000), Cell 100(1) (Crossref lower-cases the DOI)
  "10.1016/j.cell.2011.02.013", // Hanahan & Weinberg (2011), Cell 144(5)
  "10.1126/science.1235122", // Vogelstein et al. (2013), Science 339(6127)
  "10.1128/mmbr.61.2.136-169.1997", // Finlay & Falkow (1997), Microbiol. Mol. Biol. Rev. 61(2)
  // Batch 8 (Experimental: microscopy, spectrophotometry, chromatography, electrophoresis, PCR, extraction, purification)
  "10.1016/0076-6879(87)55023-6", // Mullis & Faloona (1987), Methods Enzymol. 155
  "10.1126/science.2448875", // Saiki et al. (1988), Science 239(4839)
  "10.1016/0003-2697(76)90527-3", // Bradford (1976), Anal. Biochem. 72
  "10.1038/227680a0", // Laemmli (1970), Nature 227
  "10.1073/pnas.74.12.5463", // Sanger, Nicklen & Coulson (1977), PNAS 74(12)
  "10.1073/pnas.76.9.4350", // Towbin, Staehelin & Gordon (1979), PNAS 76(9)
  "10.1016/0003-2697(87)90587-2", // Schägger & von Jagow (1987), Anal. Biochem. 166(2)
  "10.1006/abio.1987.9999", // Chomczynski & Sacchi (1987), Anal. Biochem. 162(1)
  "10.1677/jme.0.0250169", // Bustin (2000), J. Mol. Endocrinol. 25(2)
  // Batch 9 (Western blotting, ELISA, cell culture, microbial cultivation, flow cytometry, IHC, NGS)
  "10.1016/0019-2791(71)90454-X", // Engvall & Perlmann (1971), Immunochemistry 8(9)
  "10.3181/00379727-47-13084p", // Coons, Creech & Jones (1941), Exp. Biol. Med. 47(2)
  "10.1038/nbt1486", // Shendure & Ji (2008), Nat. Biotechnol. 26(10)
  "10.1093/clinchem/48.10.1819", // Herzenberg et al. (2002), Clin. Chem. 48(10)
  "10.1016/0014-4827(61)90192-6", // Hayflick & Moorhead (1961), Exp. Cell Res. 25(3)
  "10.1146/annurev.mi.39.100185.001541", // Staley & Konopka (1985), Annu. Rev. Microbiol. 39(1)
  "10.1111/j.1574-6976.2009.00200.x", // Oliver (2010), FEMS Microbiol. Rev. 34(4)
  // Batch 10 (CRISPR and genome editing, biomedical sciences)
  "10.1126/science.1225829", // Jinek et al. (2012), Science 337(6096)
  "10.1126/science.1231143", // Cong et al. (2013), Science 339(6121)
  "10.1126/science.1232033", // Mali et al. (2013), Science 339(6121)
  "10.1056/NEJM199901143400207", // Ross (1999), N. Engl. J. Med. 340(2)
  "10.1038/bjc.1972.33", // Kerr, Wyllie & Currie (1972), Br. J. Cancer 26(4)
  "10.2307/3570892", // Till & McCulloch (1961), Radiat. Res. 14(2)
  // Batch 11 (neuroscience, clinical microbiology, immunology, virology, parasitology, pharmacology, toxicology)
  "10.1113/jphysiol.1962.sp006837", // Hubel & Wiesel (1962), J. Physiol. 160(1)
  "10.1113/jphysiol.1973.sp010273", // Bliss & Lømo (1973), J. Physiol. 232(2)
  "10.1038/256495a0", // Köhler & Milstein (1975), Nature 256(5517)
  "10.1126/science.1071059", // Matzinger (2002), Science 296(5566)
  "10.1085/jgp.36.1.39", // Hershey & Chase (1952), J. Gen. Physiol. 36(1)
  "10.1038/415680a", // Sachs & Malaney (2002), Nature 415(6872)
  "10.1016/S0169-409X(96)00423-1", // Lipinski et al. (1997), Adv. Drug Deliv. Rev. 23(1-3)
  // Batch 12 (pharmacogenomics, molecular diagnostics, regenerative medicine, translational medicine, precision/quantitative biology)
  "10.1126/science.286.5439.487", // Evans & Relling (1999), Science 286(5439)
  "10.1126/science.282.5391.1145", // Thomson et al. (1998), Science 282(5391)
  "10.1016/S0002-9343(03)00013-5", // Contopoulos-Ioannidis et al. (2003), Am. J. Med. 114(6)
  "10.1056/NEJMp1500523", // Collins & Varmus (2015), N. Engl. J. Med. 372(9)
  "10.1021/j100540a008", // Gillespie (1977), J. Phys. Chem. 81(25)
  // Batch 13 (statistical mechanics, stochastic processes, molecular and membrane biophysics, single-molecule, molecular dynamics)
  "10.1016/0021-9991(76)90041-3", // Gillespie (1976), J. Comput. Phys. 22(4)
  "10.1016/S0006-3495(77)85544-6", // Berg & Purcell (1977), Biophys. J. 20(2)
  "10.1146/annurev.bi.52.070183.001403", // Karplus & McCammon (1983), Annu. Rev. Biochem. 52(1)
  "10.1126/science.1187409", // Shaw et al. (2010), Science 330(6002)
  "10.1126/science.175.4023.720", // Singer & Nicolson (1972), Science 175(4023)
  "10.1103/PhysRevLett.24.156", // Ashkin (1970), Phys. Rev. Lett. 24(4)
  "10.1126/science.283.5408.1670", // Moerner & Orrit (1999), Science 283(5408)
  "10.1063/1.1740409", // Zwanzig (1954), J. Chem. Phys. 22(8)
  // Batch 14 (structural biology, X-ray crystallography, cryo-EM, NMR, biomechanics, electrophysiology, neural biophysics)
  "10.1038/181662a0", // Kendrew et al. (1958), Nature 181(4610)
  "10.1016/j.tibs.2014.10.005", // Bai et al. (2015), Trends Biochem. Sci. 40(1)
  "10.1038/355472a0", // Brünger (1992), Nature 355(6359)
  "10.1038/173971a0", // Huxley & Niedergerke (1954), Nature 173(4412)
  "10.1038/260799a0", // Neher & Sakmann (1976), Nature 260(5554)
  "10.1073/pnas.79.8.2554", // Hopfield (1982), PNAS 79(8)
  // Batch 15 (quantitative systems biology, bioinformatics, computing, biological databases; each checked against Crossref)
  "10.1016/0022-2836(70)90057-4",
  "10.1016/0022-2836(81)90087-5",
  "10.1016/S0022-2836(05)80360-2",
  "10.1016/j.softx.2015.06.001",
  "10.1038/nbt.1754",
  "10.1038/nmeth.3252",
  "10.1038/nrg1272",
  "10.1038/s41586-021-03819-2",
  "10.1038/s41592-019-0686-2",
  "10.1038/sdata.2016.18",
  "10.1063/5.0014475",
  "10.1073/pnas.89.22.10915",
  "10.1093/bioinformatics/btp163",
  "10.1093/bioinformatics/btp324",
  "10.1093/bioinformatics/btp616",
  "10.1093/molbev/mst010",
  "10.1093/nar/25.17.3389",
  "10.1093/nar/28.1.235",
  "10.1093/nar/gkab1049",
  "10.1093/nar/gkac1052",
  "10.1093/nar/gkh340",
  "10.1093/nar/gks1195",
  "10.1111/j.1558-5646.1985.tb00420.x",
  "10.1126/science.1069492",
  "10.1126/science.1213847",
  "10.1126/science.2983426",
  "10.1186/gb-2004-5-10-r80",
  "10.1186/gb-2010-11-5-207",
  "10.1186/s13059-014-0550-8",
  "10.1371/journal.pcbi.1003285",
  "10.1371/journal.pcbi.1005412",
  "10.21105/joss.01686",
  // Batch 16 (biological databases, sequence search, UniProt, PDB, alignment, phylogenetics; each checked against Crossref)
  "10.1093/bioinformatics/14.9.755",
  "10.1093/bioinformatics/btu033",
  "10.1093/molbev/mst197",
  "10.1093/molbev/msu300",
  "10.1093/nar/gkab1112",
  "10.1101/gr.229102",
  "10.1101/gr.229202",
  "10.1126/science.abj8754",
  "10.1371/journal.pcbi.1002195",
  // Batch 17 (genome assembly, annotation, comparative genomics, metagenomics, transcriptomics, RNA-seq, single-cell; each checked against Crossref)
  "10.1016/j.cell.2015.05.002",
  "10.1016/j.cell.2019.05.031",
  "10.1038/nbt.3935",
  "10.1038/nmeth.1226",
  "10.1038/nmeth.1315",
  "10.1038/nmeth.2066",
  "10.1038/nmeth.3317",
  "10.1038/nrg2484",
  "10.1038/s41587-019-0072-8",
  "10.1089/cmb.2012.0021",
  "10.1093/bioinformatics/btg1080",
  "10.1093/bioinformatics/bts635",
  "10.1093/bioinformatics/btu638",
  "10.1093/nar/27.11.2369",
  "10.1101/gr.215087.116",
  "10.1186/gb-2008-9-1-r7",
  "10.1186/s13059-017-1382-0",
  // Batch 18 (proteomics, metabolomics, structural bioinformatics, structure prediction, docking, molecular dynamics, network biology; each checked against Crossref)
  "10.1002/jcc.21256",
  "10.1002/jcc.21334",
  "10.1002/prot.21123",
  "10.1006/jmbi.1993.1489",
  "10.1006/jmbi.1993.1626",
  "10.1021/ct700301q",
  "10.1021/jm0306430",
  "10.1038/nature19949",
  "10.1038/nbt.1511",
  "10.1073/pnas.1914677117",
  "10.1093/nar/gki524",
  "10.1093/nar/gkx1089",
  "10.1093/nar/gky1131",
  "10.1101/gr.1239303",
  // Batch 19 (biostatistics, knowledge graphs, multi-omics; each checked against Crossref)
  "10.1016/S0140-6736(86)90837-8",
  "10.1038/nrg3868",
  "10.1080/00031305.2016.1154108",
  "10.1080/01621459.1952.10483441",
  "10.1098/rsta.1933.0009",
  "10.1111/j.2517-6161.1995.tb02031.x",
  "10.1177/0956797613504966",
  "10.1186/s13059-017-1215-1",
  "10.1214/aoms/1177730491",
  "10.2307/2331554",
  "10.2307/3001968",
  "10.7554/eLife.26726",
  // Batch 20 (biostatistics: ANOVA, regression, GLMs, multivariate, mixed models, Bayesian, survival; each checked against Crossref)
  "10.1037/h0071325",
  "10.1080/01621459.1958.10501452",
  "10.1109/TAC.1974.1100705",
  "10.1111/j.2044-8317.2011.02037.x",
  "10.1111/j.2517-6161.1972.tb00899.x",
  "10.18637/jss.v067.i01",
  "10.2307/2344614",
  "10.2307/2529876",
  // Batch 21 (biostatistics: experimental design, epidemiology, statistical genetics, spatial, machine learning, deep learning, causal inference; each checked against Crossref)
  "10.1038/nrn3475",
  "10.1002/sim.4780110811",
  "10.1111/j.2517-6161.1996.tb02080.x",
  "10.1023/A:1010933404324",
  "10.1038/nature14539",
  "10.1037/h0037350",
  "10.1097/00001648-199901000-00008",
  "10.1038/ng1847",
  "10.1016/j.ajhg.2017.06.005",
  "10.2307/1939924",
  // Batch 22 (scientific data visualization, systems biology, networks, metabolic reconstruction, FBA, dynamic modelling, synthetic biology; each checked against Crossref)
  "10.1080/01621459.1984.10478080",
  "10.1371/journal.pbio.1002128",
  "10.1371/journal.pcbi.1003833",
  "10.1126/science.1069492",
  "10.1038/nrg2102",
  "10.1038/nrg1272",
  "10.1038/nprot.2009.203",
  "10.1038/nbt.1614",
  "10.1038/nprot.2011.308",
  "10.1038/35002125",
  "10.1038/35002131",
  // Batch 23 (synthetic biology and engineering, bioprocess and industry; each checked against Crossref)
  "10.1126/science.1225829",
  "10.1126/science.1231143",
  "10.1126/science.1232033",
  "10.1126/science.1258096",
  "10.1126/science.1193990",
  "10.1038/nrg3927",
  "10.1038/nature11117",
  "10.1016/j.ymben.2012.01.004",
  "10.1016/j.biotechadv.2008.10.006",
  "10.1126/science.aac7341",
  // Batch 24 (bioprocess and industry, tissues and materials, sector biotechnology; each checked against Crossref)
  "10.1126/science.8493529",
  "10.1016/S0142-9612(00)00121-6",
  "10.1016/j.biomaterials.2008.04.023",
  "10.1038/nmat2442",
  "10.1126/science.244.4910.1293",
  "10.1126/science.1185383",
  "10.1038/nrmicro731",
  // Batch 25 (marine biotechnology, neuroscience, computational neuroscience, evo-devo, chronobiology, astrobiology, origins of life; each checked against Crossref)
  "10.1371/journal.pbio.1001127",
  "10.1039/C7NP00052A",
  "10.1038/nrn3962",
  "10.1113/jphysiol.1952.sp004764",
  "10.1016/j.cell.2008.06.030",
  "10.1111/j.1558-5646.2007.00105.x",
  "10.1126/science.aah4967",
  "10.1038/nrg.2016.150",
  "10.1089/ast.2008.0819",
  // Batch 26 (quantum biology, mathematical biology, planetary health, ecotoxicology, environmental and population genomics; each checked against Crossref)
  "10.1038/nature05678",
  "10.1038/nphys2474",
  "10.1098/rspa.1927.0118",
  "10.1016/S0140-6736(15)60901-1",
  "10.1210/er.2011-1050",
  "10.1111/j.1365-294X.2012.05470.x",
  "10.1038/nrg2844",
  "10.1146/annurev.genet.39.073003.112420",
  // Batch 27 (molecular ecology, microbiome science, plant-microbe interactions, phytopathology, plant physiology, agricultural genomics, veterinary biomedical sciences; each checked against Crossref)
  "10.1038/nature06244",
  "10.1016/j.tplants.2012.04.001",
  "10.1038/nature05286",
  "10.1038/35081161",
  "10.1111/j.1469-8137.2004.01224.x",
  "10.2135/cropsci2008.08.0512",
  "10.3201/eid1112.050997",
  "10.1038/nature06536",
  // Batch 28 (forensic biology, computational and AI-driven drug design, research question development, literature review, systematic reviews, meta-analysis; each checked against Crossref)
  "10.1038/318577a0",
  "10.1016/j.fsigen.2015.06.008",
  "10.1038/nature03197",
  "10.1126/science.1096361",
  "10.1038/s41586-021-03819-2",
  "10.1016/j.cell.2020.01.021",
  "10.1038/s41562-016-0021",
  "10.1136/bmj.n71",
  "10.1002/sim.1186",
  "10.1016/0197-2456(86)90046-2",
  // Batch 32 (whole-cell modeling; Karr et al. 2012, Crossref-verified 2026-11-11)
  "10.1016/j.cell.2012.05.044",
  // Molecular Biology pilot, Transcription Initiation and Elongation (Crossref-verified 2026-11-12, with the metadata in its references)
  "10.1038/nsmb763", // Hahn (2004)
  "10.1016/0968-0004(96)10050-5", // Roeder (1996)
  "10.1126/science.1162228", // Core et al. (2008)
  "10.1099/mic.0.28982-0", // Ciampi (2006)
  "10.1038/nrm3951", // Allen & Taatjes (2015)
  "10.1146/annurev.biochem.72.121801.161520", // Smale & Kadonaga (2003)
  "10.1101/gad.200303.112", // Hsin & Manley (2012)
  "10.1038/nrmicro787", // Browning & Busby (2004)
  "10.1126/science.1069594", // Murakami et al. (2002)
  "10.1073/pnas.0704138104", // Kornberg (2007)
  "10.1042/bst0341062", // Landick (2006)
  "10.1016/s0092-8674(00)81958-3", // Kornberg & Lorch (1999)
  // Molecular Biology, foundations, The molecules of heredity (Crossref-verified 2026-11-12)
  "10.1038/171737a0", // Watson & Crick (1953)
  "10.1038/171740a0", // Franklin & Gosling (1953)
  "10.1093/nar/gkj454", // Yakovchuk et al. (2006)
  "10.1038/227561a0", // Crick (1970)
  "10.1007/s12045-009-0024-6", // Morange (2009)
  "10.1038/38444", // Luger et al. (1997)
  "10.1126/science.183.4122.330", // Olins & Olins (1974)
  "10.1093/hmg/ddl046", // Mattick & Makunin (2006)
  "10.1038/35103511", // Eddy (2001)
  "10.1038/35057062", // International Human Genome Sequencing Consortium (2001)
  "10.1038/nature11247", // ENCODE Project Consortium (2012)
  "10.1073/pnas.0912629107", // Lynch (2010)
  "10.1093/genetics/156.1.297", // Nachman & Crowell (2000)
  "10.1093/hmg/ddg359", // Sunyaev (2003)
  "10.1016/S0092-8674(00)81683-9", // Hanahan & Weinberg (2000)
  // Molecular Biology, foundations, Chromosomes and DNA packaging, Genes and genomes, Mutations (Crossref-verified 2026-11-12)
  "10.1016/s0092-8674(01)00492-5", // Blackburn (2001)
  "10.1038/nm1006-1133", // Blackburn, Greider & Szostak (2006)
  // Molecular Biology, foundations, Proteins and their building blocks (Crossref-verified 2026-11-12)
  "10.1126/science.181.4096.223", // Anfinsen (1973)
  "10.1073/pnas.37.4.205", // Pauling, Corey & Branson (1951)
  "10.1126/science.1219021", // Dill & MacCallum (2012)
  "10.1038/357543a0", // Chothia (1992)
  "10.1073/pnas.47.10.1588", // Nirenberg & Matthaei (1961)
  "10.1073/pnas.44.2.98", // Koshland (1958)
  "10.1126/science.1085515", // Benkovic & Hammes-Schiffer (2003)
  "10.1126/science.288.5463.88", // Vale & Milligan (2000)
  "10.1016/0022-2836(82)90515-0", // Kyte & Doolittle (1982)
  "10.1038/ng.259", // Pan et al. (2008)
  "10.1146/annurev.biochem.75.103004.142738", // Pearl & Prodromou (2006)
  "10.1038/nrm2352", // Steitz (2008)
  // Molecular Biology, foundations, Protein Diversity from One Gene (Crossref-verified 2026-11-12)
  "10.1146/annurev.biochem.72.121801.161720", // Black (2003)
  "10.1038/nature07509", // Wang et al. (2008)
  "10.1038/nature08909", // Nilsen & Graveley (2010)
  "10.1038/nbt0303-255", // Mann & Jensen (2003)
  "10.1002/anie.200501023", // Walsh et al. (2005)
  "10.1146/annurev.genet.34.1.499", // Gott & Emeson (2000)
  "10.1038/nrm3525", // Kornblihtt et al. (2013)
  "10.1016/j.molcel.2007.11.019", // Hunter (2007)
  // Biochemistry, foundations, Atoms and Chemical Bonds (Crossref-verified 2026-11-12)
  "10.1021/bi00866a011", // Good et al. (1966)
  // Biochemistry, foundations, Acids, Bases and pH; Stereochemistry (Crossref-verified 2026-11-12)
  "10.1021/ed078p1499", // Po & Senozan (2001)
  "10.1002/anie.196603851", // Cahn, Ingold & Prelog (1966)
]);

type Issue = { file: string; msg: string };
const errors: Issue[] = [];
const warnings: Issue[] = [];
const rel = (p: string) => p.replace(process.cwd(), "").replace(/\\/g, "/").replace(/^\//, "");

/** Words of body text: headings, the reference section and front matter do not count. */
function bodyWords(source: string): number {
  const body = source.replace(/^---[\s\S]*?\n---\r?\n/, "").replace(/\n## References[\s\S]*$/i, "");
  return body
    .split(/\r?\n/)
    .filter((l) => !/^\s*#/.test(l))
    .join(" ")
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length;
}

/** Checks the in-text citations of a chapter against its own reference list. Returns the number of citations found. */
function checkCitations(file: string, source: string, refs: string[]): number {
  const body = source.replace(/^---[\s\S]*?\n---\r?\n/, "").replace(/\n## References[\s\S]*$/i, "");
  const refText = refs.join("\n");
  let count = 0;
  const seen = new Set<string>();
  // A parenthetical citation has an author and a year, as in "(Hahn, 2004)". A bare year such as the "(2004)" inside "Hahn (2004)"
  // is part of a narrative citation, which is counted by the second pattern below, so it is not counted twice here.
  for (const m of body.matchAll(/\(([^()]*?)\)/g)) {
    if (!/\b(1[5-9]\d\d|20\d\d)[a-z]?\b/.test(m[1])) continue;
    if (!/[A-Z][A-Za-z'-]+/.test(m[1])) continue;
    count++;
    const surname = /[A-Z][A-Za-z'-]+/.exec(m[1])?.[0];
    if (surname && !refText.includes(surname)) seen.add(surname);
  }
  for (const m of body.matchAll(/([A-Z][A-Za-z'-]+)(?:,? (?:et al\.|and colleagues|and co-workers|and [A-Z][A-Za-z'-]+|& [A-Z][A-Za-z'-]+))? \((1[5-9]\d\d|20\d\d)[a-z]?\)/g)) {
    count++;
    if (!refText.includes(m[1])) seen.add(m[1]);
  }
  for (const s of seen) errors.push({ file, msg: `in-text citation "${s}" has no matching entry in the reference list` });
  return count;
}

function checkDois(file: string, imp: ModuleImport) {
  for (const r of imp.references) {
    if (!r.doi) continue;
    if (!/^10\.\d{4,9}\/\S+$/.test(r.doi)) errors.push({ file, msg: `malformed DOI ${r.doi}` });
    else if (!VERIFIED_DOIS.has(r.doi)) errors.push({ file, msg: `DOI ${r.doi} has not been checked against Crossref (add it to VERIFIED_DOIS only after checking)` });
  }
}

function checkNoEmDash(file: string, source: string) {
  if (source.includes("—")) errors.push({ file, msg: "contains an em dash (U+2014); rewrite the sentence" });
  if (/\bnot only\b[^.]*\bbut\b/i.test(source)) warnings.push({ file, msg: 'contains the "not only ... but" construction; check whether it is needed' });
}

function readFile(path: string): string {
  return readFileSync(path, "utf8").replace(/^﻿/, "");
}

type ChapterResult = { file: string; title: string; words: number; citations: number; references: number; ok: boolean };
type ModuleResult = { title: string; slug: string; folder: string; status: "not_started" | "drafted_needs_review" | "in_progress"; moduleWords: number; chapters: ChapterResult[] };

function validateModule(levelSlug: string, levelName: string, title: string, cfg: SpecConfig = GENERAL_CFG): ModuleResult {
  const slug = slugify(title);
  const folder = join(ROOT, cfg.folder, levelSlug, slug);
  const result: ModuleResult = { title, slug, folder: rel(folder), status: "not_started", moduleWords: 0, chapters: [] };
  const overview = join(folder, "module.md");
  if (!existsSync(overview)) return result;

  const before = errors.length;
  const src = readFile(overview);
  const imp = importModuleMarkdown(src);
  checkNoEmDash(rel(overview), src);
  checkDois(rel(overview), imp);
  result.moduleWords = bodyWords(src);
  if (imp.meta.title !== title) errors.push({ file: rel(overview), msg: `title "${imp.meta.title}" does not match curriculum title "${title}"` });
  if (imp.meta.specialization !== cfg.specName) errors.push({ file: rel(overview), msg: `specialization must be "${cfg.specName}"` });
  if (imp.meta.academicLevel !== levelName) errors.push({ file: rel(overview), msg: `academic_level must be "${levelName}"` });
  if (imp.meta.subject !== "Biology") errors.push({ file: rel(overview), msg: 'subject must be "Biology"' });
  if (!imp.objectives.length) errors.push({ file: rel(overview), msg: "no learning objectives" });
  if (!imp.references.length) errors.push({ file: rel(overview), msg: "no references" });
  const minOverview = cfg.minOverviewWords ?? MIN_PUBLISH_WORDS;
  if (result.moduleWords < minOverview) errors.push({ file: rel(overview), msg: `overview has ${result.moduleWords} words; the minimum for this specialization is ${minOverview}` });
  for (const w of imp.warnings) warnings.push({ file: rel(overview), msg: w });

  const chapDir = join(folder, "chapters");
  const files = existsSync(chapDir) ? readdirSync(chapDir).filter((f) => f.endsWith(".md")).sort() : [];
  if (files.length < MIN_CHAPTERS) errors.push({ file: rel(folder), msg: `${files.length} chapters; a topic needs at least ${MIN_CHAPTERS}` });

  for (const f of files) {
    const file = join(chapDir, f);
    const cs = readFile(file);
    const ci = importModuleMarkdown(cs);
    checkNoEmDash(rel(file), cs);
    checkDois(rel(file), ci);
    const words = bodyWords(cs);
    const citations = checkCitations(rel(file), cs, ci.references.map((r) => r.text));
    const ok0 = errors.length;
    if (ci.meta.specialization !== cfg.specName) errors.push({ file: rel(file), msg: `specialization must be "${cfg.specName}"` });
    if (ci.meta.academicLevel !== levelName) errors.push({ file: rel(file), msg: `academic_level must be "${levelName}"` });
    if (!ci.objectives.length) errors.push({ file: rel(file), msg: "no learning objectives" });
    if (!ci.references.length) errors.push({ file: rel(file), msg: "no references" });
    if (words < cfg.minWords) errors.push({ file: rel(file), msg: `${words} words of body text; the minimum is ${cfg.minWords}` });
    if (citations === 0) errors.push({ file: rel(file), msg: "no APA in-text citations" });
    if (cfg.citeRange && (citations < cfg.citeRange[0] || citations > cfg.citeRange[1])) errors.push({ file: rel(file), msg: `${citations} in-text citations; this specialization needs ${cfg.citeRange[0]} to ${cfg.citeRange[1]} per chapter` });
    for (const w of ci.warnings) warnings.push({ file: rel(file), msg: w });
    result.chapters.push({ file: rel(file), title: ci.meta.title ?? f, words, citations, references: ci.references.length, ok: errors.length === ok0 });
  }
  const ready = errors.length === before && files.length >= MIN_CHAPTERS;
  result.status = ready ? "drafted_needs_review" : "in_progress";
  return result;
}

function main() {
  const write = process.argv.includes("--write-manifest");
  const levels = BIOLOGY_LEVELS.map((lvl) => {
    const modules = lvl.disciplines.flatMap((d) => d.modules);
    const results = modules.map((title) => validateModule(lvl.slug, lvl.name, title));
    return { slug: lvl.slug, name: lvl.name, modules: results, moduleCount: modules.length };
  });

  // The specializations added later, each module against the rules (600 words per chapter, 8 chapters, 3 to 4 citations per chapter).
  const specTopics = CURRICULUM_SPECIALIZATIONS.map((slug) => {
    const spec = BIOLOGY_SPECIALIZATIONS.find((b) => b.slug === slug)!;
    const cfg: SpecConfig = { specName: spec.name, folder: slug, minWords: 600, citeRange: [3, 4], minOverviewWords: 600 };
    const specLevels = specializationLevels(slug, spec.name).map((lvl) => {
      const modules = lvl.disciplines.flatMap((d) => d.modules);
      return { slug: lvl.slug, name: lvl.name, moduleCount: modules.length, modules: modules.map((title) => validateModule(lvl.slug, lvl.name, title, cfg)) };
    });
    return { slug, name: spec.name, levels: specLevels };
  });

  const started = levels.flatMap((l) => l.modules).filter((m) => m.status !== "not_started");
  const total = levels.reduce((n, l) => n + l.moduleCount, 0);
  const fileCount = started.reduce((n, m) => n + m.chapters.length + 1, 0);

  const manifest = {
    generatedBy: "scripts/validate-bio-content.ts",
    subject: "Biology",
    contentRoot: "content/modules/bio",
    rules: {
      minChaptersPerTopic: MIN_CHAPTERS,
      minWordsPerChapter: `more than ${MIN_CHAPTER_WORDS}`,
      minWordsPerOverview: MIN_PUBLISH_WORDS,
      imageStatus: IMAGE_STATUS,
      note: "A topic is 'drafted_needs_review' when every check passes. It is not 'final': scientific review, citation review against the live sources and the image upload are still to do.",
    },
    imageStatusNote: "Text content completed or in progress. Images and illustrations have not yet been added; visual assets will be uploaded separately.",
    specializations: BIOLOGY_SPECIALIZATIONS.map((s) => ({
      slug: s.slug,
      name: s.name,
      status: s.slug === GENERAL ? "in_progress" : "structure_only",
    })),
    levels: levels.map((l) => ({
      slug: l.slug,
      name: l.name,
      topics: l.modules.map((m) => ({
        topic: m.title,
        folder: m.folder,
        status: m.status,
        imageStatus: IMAGE_STATUS,
        overviewWords: m.moduleWords,
        chapterCount: m.chapters.length,
        chapters: m.chapters.map((c) => ({ title: c.title, file: c.file, words: c.words, citations: c.citations, references: c.references, ok: c.ok })),
      })),
    })),
    specializationTopics: specTopics.map((sp) => {
      const all = sp.levels.flatMap((l) => l.modules);
      const begun = all.filter((m) => m.status !== "not_started");
      return {
        slug: sp.slug,
        name: sp.name,
        status: begun.length ? "in_progress" : "structure_only",
        rules: { minChaptersPerTopic: MIN_CHAPTERS, minWordsPerChapter: 600, citationsPerChapter: "3 to 4", imageStatus: IMAGE_STATUS },
        topicsInCurriculum: sp.levels.reduce((n, l) => n + l.moduleCount, 0),
        topicsStarted: begun.length,
        levels: sp.levels.map((l) => ({
          slug: l.slug,
          name: l.name,
          topics: l.modules.map((m) => ({
            topic: m.title,
            folder: m.folder,
            status: m.status,
            overviewWords: m.moduleWords,
            chapterCount: m.chapters.length,
            chapters: m.chapters.map((c) => ({ title: c.title, file: c.file, words: c.words, citations: c.citations, references: c.references, ok: c.ok })),
          })),
        })),
      };
    }),
    totals: { topicsInCurriculum: total, topicsStarted: started.length, topicsDraftedNeedsReview: started.filter((m) => m.status === "drafted_needs_review").length, markdownFiles: fileCount },
  };

  if (write) writeFileSync(join(ROOT, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");

  console.log(`Biology curriculum: ${total} topics in the General Biology curriculum, ${started.length} started.`);
  for (const m of started) console.log(`  ${m.status.padEnd(20)} ${m.title}  (${m.chapters.length} chapters)`);
  for (const sp of specTopics) {
    const all = sp.levels.flatMap((l) => l.modules);
    const n = all.filter((m) => m.status !== "not_started").length;
    console.log(`${sp.name}: ${n} of ${all.length} modules started.`);
  }
  console.log(`Warnings: ${warnings.length}`);
  for (const w of warnings) console.log(`  [warn] ${w.file}: ${w.msg}`);
  console.log(`Errors: ${errors.length}`);
  for (const e of errors) console.log(`  [error] ${e.file}: ${e.msg}`);
  if (write) console.log(`Manifest written: ${rel(join(ROOT, "manifest.json"))}`);
  process.exitCode = errors.length ? 1 : 0;
}

main();
