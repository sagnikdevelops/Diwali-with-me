/**
 * Festive Calendar & Configuration
 * 
 * Target Timezone: Asia/Kolkata (IST: UTC +05:30)
 * Source: Hindu Luni-Solar Calendar (Kartik Amavasya / Deepavali Lakshmi Puja)
 * 2026 Date: November 8, 2026 at 18:00 IST (Auspicious Pradosh Kaal Muhurat)
 * 2027 Date: October 29, 2027 at 18:00 IST
 */

export interface DiwaliEventConfig {
  eventName: string;
  targetIsoDate: string; // ISO 8601 string with Asia/Kolkata offset
  timezone: string;
  nextYearDate: string;
  celebrationTitle: string;
  celebrationSubtitle: string;
}

export const FESTIVE_CONFIG: DiwaliEventConfig = {
  eventName: "Shubh Deepavali 2026",
  targetIsoDate: "2026-11-08T18:00:00+05:30",
  timezone: "Asia/Kolkata (IST)",
  nextYearDate: "2027-10-29T18:00:00+05:30",
  celebrationTitle: "Happy Diwali! The Festival of Lights is Here!",
  celebrationSubtitle: "May the divine glow of diyas illuminate your life with health, happiness, prosperity, and peace.",
};

export const FESTIVE_FACTS = [
  {
    title: "Victory of Inner Light",
    subtitle: "Tamaso Ma Jyotirgamaya",
    description:
      "Diwali symbolizes the triumph of spiritual light over darkness, knowledge over ignorance, and righteousness over despair. The lighting of clay lamps (diyas) reminds us to ignite our inner kindness and clarity.",
    icon: "sparkles",
  },
  {
    title: "Mindful & Eco-Friendly Fireworks",
    subtitle: "Breathe Clean, Celebrate Green",
    description:
      "Traditional firecrackers release heavy particulates and sulphur. Modern festivities embrace low-emission green crackers (CSIR-NEERI certified), digital light projections, and laser celebrations to safeguard our elders and respiratory health.",
    icon: "leaf",
  },
  {
    title: "Compassion for Pets & Street Animals",
    subtitle: "Paws, Claws & Gentle Hearts",
    description:
      "Canine and feline hearing is 4x more sensitive than human ears. Loud sudden explosions cause intense acoustic trauma, panic, and heart palpitations in animals. Silent celebrations and gentle indoor music keep our four-legged friends safe and comforted.",
    icon: "heart",
  },
  {
    title: "The Geometry of Rangoli",
    subtitle: "Sacred Math & Welcoming Lakshmi",
    description:
      "Rangoli patterns are sacred radial geometries traditionally drawn at entryways using rice flour, haldi (turmeric), and flower petals to harmonise vibrational energy, welcome guests, and feed tiny birds and ants in the spirit of universal harmony.",
    icon: "flower",
  },
];

