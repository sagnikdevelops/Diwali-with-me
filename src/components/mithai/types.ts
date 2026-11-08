export interface MithaiItem {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  description: string;
  accentColor: string;
  borderGlow: string;
}

export type BoxPackagingStyle = "royal-crimson" | "midnight-gold" | "marigold-brass";

export interface BoxThemeConfig {
  id: BoxPackagingStyle;
  label: string;
  subtitle: string;
  boxBg: string;
  boxBorder: string;
  boxShadow: string;
  compartmentBg: string;
  compartmentBorder: string;
  ribbonColor: string;
  ribbonGradient: string;
  lidPattern: string;
  tagColor: string;
}

export const MITHAI_MENU: MithaiItem[] = [
  {
    id: "kaju-katli",
    name: "Kaju Katli",
    hindiName: "काजू कतली",
    tagline: "Silver-Foil Cashew Diamond",
    description: "Finely ground royal cashews, delicately sweetened and adorned with lustrous silver vark.",
    accentColor: "#E2E8F0",
    borderGlow: "rgba(226, 232, 240, 0.4)",
  },
  {
    id: "motichoor-ladoo",
    name: "Motichoor Ladoo",
    hindiName: "मोतीचूर लड्डू",
    tagline: "Saffron Boondi Pearls",
    description: "Melt-in-the-mouth golden saffron boondi pearls bonded with pure desi ghee and crushed pistachios.",
    accentColor: "#FFA500",
    borderGlow: "rgba(255, 165, 0, 0.4)",
  },
  {
    id: "gulab-jamun",
    name: "Gulab Jamun",
    hindiName: "गुलाब जामुन",
    tagline: "Rose-Cardamom Syrup Globe",
    description: "Golden-brown fried khoya spheres soaked in warm rose water and saffron-infused sugar nectar.",
    accentColor: "#B45309",
    borderGlow: "rgba(180, 83, 9, 0.4)",
  },
  {
    id: "soan-papdi",
    name: "Soan Papdi",
    hindiName: "सोन पापड़ी",
    tagline: "Crisp Flaky Golden Layers",
    description: "The indestructible festive legend! Featherlight, multi-layered sweet strands with toasted almond slivers.",
    accentColor: "#FDE047",
    borderGlow: "rgba(253, 224, 71, 0.4)",
  },
  {
    id: "kaju-pista-roll",
    name: "Kaju Pista Roll",
    hindiName: "काजू पिस्ता रोल",
    tagline: "Emerald Pistachio Swirl",
    description: "A rich cylinder of roasted pistachios encased inside a velvety silver-leaf cashew dough.",
    accentColor: "#22C55E",
    borderGlow: "rgba(34, 197, 94, 0.4)",
  },
  {
    id: "besan-ladoo",
    name: "Besan Ladoo",
    hindiName: "बेसन लड्डू",
    tagline: "Aromatic Cardamom & Nuts",
    description: "Slow-roasted gram flour in churned desi ghee, crowned with toasted cashews and cardamom seeds.",
    accentColor: "#F59E0B",
    borderGlow: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: "jalebi",
    name: "Kesar Jalebi",
    hindiName: "केसर जलेबी",
    tagline: "Crisp Saffron Swirls",
    description: "Piping-hot fermented spirals deep-fried and plunged into steaming saffron-honey syrup.",
    accentColor: "#FF6B00",
    borderGlow: "rgba(255, 107, 0, 0.4)",
  },
  {
    id: "rasgulla",
    name: "Royal Rasgulla",
    hindiName: "रसगुल्ला",
    tagline: "Cloud-Soft Spongy Chenna",
    description: "Pristine white cottage cheese dumplings simmered until fluffy in a fragrant light cardamom broth.",
    accentColor: "#F8FAFC",
    borderGlow: "rgba(248, 250, 252, 0.4)",
  },
  {
    id: "gujiya",
    name: "Festive Gujiya",
    hindiName: "शाही गुजिया",
    tagline: "Fluted Khoya & Dry Fruit Pocket",
    description: "Crispy hand-pleated crescent pastry stuffed with roasted mawa, chirongi, dry coconut, and nutmeg.",
    accentColor: "#FBBF24",
    borderGlow: "rgba(251, 191, 36, 0.4)",
  },
];

export const BOX_THEMES: Record<BoxPackagingStyle, BoxThemeConfig> = {
  "royal-crimson": {
    id: "royal-crimson",
    label: "Royal Crimson & Gold",
    subtitle: "Mughal velvet red with brass filigree",
    boxBg: "from-[#450a12] via-[#2a060c] to-[#1a0306]",
    boxBorder: "border-[#D4AF37]/60",
    boxShadow: "shadow-[0_0_40px_rgba(212,175,55,0.35)]",
    compartmentBg: "bg-[#250409]/80",
    compartmentBorder: "border-[#D4AF37]/35",
    ribbonColor: "#D4AF37",
    ribbonGradient: "from-[#FFDF73] via-[#D4AF37] to-[#996515]",
    lidPattern: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 70%)",
    tagColor: "bg-[#7F1D1D] text-[#FFE27B] border-[#D4AF37]/50",
  },
  "midnight-gold": {
    id: "midnight-gold",
    label: "Midnight Sapphire & Gold",
    subtitle: "Deep starlit navy with golden foil borders",
    boxBg: "from-[#0A1128] via-[#070b1e] to-[#04060f]",
    boxBorder: "border-[#FFB547]/60",
    boxShadow: "shadow-[0_0_40px_rgba(255,181,71,0.35)]",
    compartmentBg: "bg-[#0c1533]/80",
    compartmentBorder: "border-[#FFB547]/35",
    ribbonColor: "#FFB547",
    ribbonGradient: "from-[#FFE27B] via-[#FFB547] to-[#B36B00]",
    lidPattern: "radial-gradient(circle at 50% 50%, rgba(255,181,71,0.15) 0%, transparent 70%)",
    tagColor: "bg-[#1E293B] text-[#FFD700] border-[#FFB547]/50",
  },
  "marigold-brass": {
    id: "marigold-brass",
    label: "Marigold Saffron & Brocade",
    subtitle: "Festive amber silk with antique gold borders",
    boxBg: "from-[#3B1900] via-[#241000] to-[#120800]",
    boxBorder: "border-[#FF8C00]/60",
    boxShadow: "shadow-[0_0_40px_rgba(255,140,0,0.35)]",
    compartmentBg: "bg-[#210e01]/80",
    compartmentBorder: "border-[#FF8C00]/35",
    ribbonColor: "#FF8C00",
    ribbonGradient: "from-[#FFB547] via-[#FF8C00] to-[#804000]",
    lidPattern: "radial-gradient(circle at 50% 50%, rgba(255,140,0,0.15) 0%, transparent 70%)",
    tagColor: "bg-[#78350F] text-[#FFE27B] border-[#FF8C00]/50",
  },
};

