export interface RangoliPoint {
  x: number;
  y: number;
}

export interface RangoliPreset {
  id: string;
  name: string;
  description: string;
  symmetry: number;
  paths: {
    color: string;
    width: number;
    points: [number, number][]; // normalized [0, 1] relative to center
  }[];
}

export const RANGOLI_PRESETS: RangoliPreset[] = [
  {
    id: "lotus-mandala",
    name: "Sacred Lotus Mandala",
    description: "Traditional 8-fold radial lotus petals welcoming Lakshmi.",
    symmetry: 8,
    paths: [
      {
        color: "#D4AF37",
        width: 3,
        points: [
          [0, -0.1],
          [0.05, -0.2],
          [0, -0.35],
          [-0.05, -0.2],
          [0, -0.1],
        ],
      },
      {
        color: "#FF8C00",
        width: 2.5,
        points: [
          [0, -0.35],
          [0.08, -0.5],
          [0, -0.7],
          [-0.08, -0.5],
          [0, -0.35],
        ],
      },
      {
        color: "#D9383A",
        width: 2,
        points: [
          [0.05, -0.2],
          [0.15, -0.25],
          [0.08, -0.35],
        ],
      },
      {
        color: "#FFE27B",
        width: 2,
        points: [
          [0, -0.7],
          [0.04, -0.85],
          [0, -0.92],
          [-0.04, -0.85],
          [0, -0.7],
        ],
      },
    ],
  },
  {
    id: "cosmic-star",
    name: "Star of Prosperity",
    description: "Auspicious geometric interlocking chakras with golden dots.",
    symmetry: 6,
    paths: [
      {
        color: "#00D2D3",
        width: 3,
        points: [
          [0, 0],
          [0.2, -0.35],
          [0, -0.6],
          [-0.2, -0.35],
          [0, 0],
        ],
      },
      {
        color: "#D4AF37",
        width: 2.5,
        points: [
          [0, -0.6],
          [0.15, -0.75],
          [0, -0.9],
          [-0.15, -0.75],
          [0, -0.6],
        ],
      },
      {
        color: "#FFB547",
        width: 2,
        points: [
          [0.1, -0.2],
          [0.25, -0.2],
          [0.18, -0.35],
        ],
      },
    ],
  },
  {
    id: "peacock-grace",
    name: "Peacock Elegance",
    description: "Royal blues and emerald curves reflecting the national bird.",
    symmetry: 8,
    paths: [
      {
        color: "#00D2D3",
        width: 3,
        points: [
          [0, -0.15],
          [0.12, -0.3],
          [0.05, -0.6],
          [-0.05, -0.6],
          [-0.12, -0.3],
          [0, -0.15],
        ],
      },
      {
        color: "#54258C",
        width: 2.5,
        points: [
          [0, -0.6],
          [0.08, -0.75],
          [0, -0.88],
          [-0.08, -0.75],
          [0, -0.6],
        ],
      },
      {
        color: "#D4AF37",
        width: 2,
        points: [
          [0, -0.3],
          [0.06, -0.42],
          [0, -0.54],
          [-0.06, -0.42],
          [0, -0.3],
        ],
      },
    ],
  },
];

