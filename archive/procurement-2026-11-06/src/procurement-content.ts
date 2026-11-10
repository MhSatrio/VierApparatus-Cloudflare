export type Service = {
  icon: string;
  title: string;
  text: string;
  /** Who actually performs the work, so we never overstate what VierApparatus itself does. */
  mode: "vier" | "coordinated";
  note?: string;
};

export const services: Service[] = [
  {
    icon: "globe",
    title: "Global laboratory equipment sourcing",
    text: "Find equipment from manufacturers and suppliers worldwide, matched to your requirement and delivery country.",
    mode: "vier",
  },
  {
    icon: "compare",
    title: "Supplier discovery and quotation comparison",
    text: "We approach suitable suppliers and present quotations side by side so options are easy to compare.",
    mode: "vier",
  },
  {
    icon: "spec",
    title: "Technical specification assistance",
    text: "Help translating a research need into clear equipment specifications that suppliers can quote against.",
    mode: "vier",
  },
  {
    icon: "shield",
    title: "Supplier verification and due diligence",
    text: "Document-based checks on supplier information and credentials they provide, before you commit to an order.",
    mode: "vier",
    note: "Based on information and documents supplied; not a formal audit.",
  },
  {
    icon: "check",
    title: "Quality-control coordination",
    text: "We coordinate quality checks to your requirements, such as supplier test reports or pre-shipment inspection.",
    mode: "coordinated",
    note: "Inspections are performed by the supplier or an independent inspection partner.",
  },
  {
    icon: "docs",
    title: "Procurement and documentation support",
    text: "Assistance with quotations, purchase documentation, specification sheets and supplier paperwork.",
    mode: "vier",
  },
  {
    icon: "truck",
    title: "Import/export and logistics coordination",
    text: "Coordination between suppliers, freight forwarders and customs brokers, subject to applicable requirements and service availability.",
    mode: "coordinated",
    note: "Freight and customs clearance are carried out by licensed third parties.",
  },
  {
    icon: "search",
    title: "Custom sourcing for unlisted equipment",
    text: "Not in our catalogue? Send us the specification and we will explore suitable options for you.",
    mode: "vier",
  },
];

export const steps = [
  { title: "Submit your requirements", text: "Tell us what you need, how many, and where it should be delivered." },
  { title: "Receive recommendations and quotations", text: "We shortlist suitable suppliers and share comparable quotations." },
  { title: "Confirm specifications and arrangements", text: "Agree the final specification, commercial terms and purchasing arrangements." },
  { title: "Coordinate documentation, checks and logistics", text: "We coordinate paperwork, quality checks and shipping with the parties involved." },
  { title: "Track through to delivery", text: "Follow progress through the delivery arrangement agreed for your order." },
];

export const reasons = [
  { title: "Global supplier access", text: "One point of contact for suppliers and manufacturers in multiple regions." },
  { title: "Technical understanding", text: "A biotechnology and laboratory-science background helps us read and discuss specifications." },
  { title: "Competitive sourcing", text: "Multiple quotations compared, so you can make an informed purchasing decision." },
  { title: "Consolidated communication", text: "One conversation instead of many, covering suppliers, documents and logistics." },
  { title: "Reduced procurement workload", text: "We handle the legwork so your team can stay focused on research and operations." },
];
