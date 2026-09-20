export const MUSHROOM_OPTIONS = {
  "cap-shape": [
    { value: "bell", label: "Bell-shaped" },
    { value: "conical", label: "Conical" },
    { value: "convex", label: "Convex (Domed)" },
    { value: "flat", label: "Flat" },
    { value: "knobbed", label: "Knobbed (Umbonate)" },
    { value: "sunken", label: "Sunken (Depressed)" }
  ],
  "cap-surface": [
    { value: "fibrous", label: "Fibrous" },
    { value: "grooves", label: "Grooved" },
    { value: "scaly", label: "Scaly" },
    { value: "smooth", label: "Smooth" }
  ],
  "cap-color": [
    { value: "brown", label: "Brown" },
    { value: "buff", label: "Buff / Pale Tan" },
    { value: "cinnamon", label: "Cinnamon" },
    { value: "gray", label: "Gray" },
    { value: "green", label: "Green" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "white", label: "White" },
    { value: "yellow", label: "Yellow" }
  ],
  "bruises": [
    { value: "bruises", label: "Bruises Present" },
    { value: "no", label: "No Bruising" }
  ],
  "odor": [
    { value: "almond", label: "Almond (Sweet Nutty)" },
    { value: "anise", label: "Anise (Licorice)" },
    { value: "creosote", label: "Creosote (Tar / Chemical)" },
    { value: "fishy", label: "Fishy" },
    { value: "foul", label: "Foul / Pungent Odor" },
    { value: "musty", label: "Musty" },
    { value: "none", label: "None / Inodorous" },
    { value: "pungent", label: "Pungent / Sharp" },
    { value: "spicy", label: "Spicy" }
  ],
  "gill-attachment": [
    { value: "gills attached to stalk", label: "Gills Attached To Stalk" },
    { value: "gills free from stalk", label: "Gills Free From Stalk" }
  ],
  "gill-spacing": [
    { value: "close", label: "Close Spacing" },
    { value: "crowded", label: "Crowded Spacing" }
  ],
  "gill-size": [
    { value: "broad", label: "Broad Gills" },
    { value: "narrow", label: "Narrow Gills" }
  ],
  "gill-color": [
    { value: "black", label: "Black" },
    { value: "brown", label: "Brown" },
    { value: "buff", label: "Buff" },
    { value: "gray", label: "Gray" },
    { value: "grayish", label: "Grayish" },
    { value: "green", label: "Green" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "white", label: "White" },
    { value: "yellow", label: "Yellow" }
  ],
  "stalk-shape": [
    { value: "stalk enlarges toward base", label: "Stalk Enlarges Toward Base" },
    { value: "stalk tapers toward base", label: "Stalk Tapers Toward Base" }
  ],
  "stalk-root": [
    { value: "bulbous", label: "Bulbous Base" },
    { value: "club", label: "Club-shaped" },
    { value: "equal", label: "Equal Thickness" },
    { value: "missing", label: "Missing / Obscured Root" }
  ],
  "stalk-surface-above-ring": [
    { value: "fibrous", label: "Fibrous" },
    { value: "scaly", label: "Scaly" },
    { value: "silky", label: "Silky" },
    { value: "smooth", label: "Smooth" }
  ],
  "stalk-surface-below-ring": [
    { value: "fibrous", label: "Fibrous" },
    { value: "scaly", label: "Scaly" },
    { value: "silky", label: "Silky" },
    { value: "smooth", label: "Smooth" }
  ],
  "stalk-color-above-ring": [
    { value: "brown", label: "Brown" },
    { value: "buff", label: "Buff" },
    { value: "cinnamon", label: "Cinnamon" },
    { value: "gray", label: "Gray" },
    { value: "pink", label: "Pink" },
    { value: "red", label: "Red" },
    { value: "white", label: "White" }
  ],
  "stalk-color-below-ring": [
    { value: "brown", label: "Brown" },
    { value: "buff", label: "Buff" },
    { value: "cinnamon", label: "Cinnamon" },
    { value: "gray", label: "Gray" },
    { value: "pink", label: "Pink" },
    { value: "red", label: "Red" },
    { value: "white", label: "White" },
    { value: "yellow", label: "Yellow" }
  ],
  "ring-number": [
    { value: "1", label: "1 Ring" },
    { value: "2", label: "2 Rings" }
  ],
  "ring-type": [
    { value: "evanescent", label: "Evanescent (Fading)" },
    { value: "flaring", label: "Flaring" },
    { value: "large", label: "Large" },
    { value: "pendant", label: "Pendant (Hanging)" }
  ],
  "spore-print-color": [
    { value: "black", label: "Black Spore Print" },
    { value: "brown", label: "Brown Spore Print" },
    { value: "chocolate", label: "Chocolate Spore Print" },
    { value: "green", label: "Green Spore Print" },
    { value: "purple", label: "Purple Spore Print" },
    { value: "white", label: "White Spore Print" }
  ],
  "population": [
    { value: "abundant", label: "Abundant" },
    { value: "clustered", label: "Clustered" },
    { value: "numerous", label: "Numerous" },
    { value: "scattered", label: "Scattered" },
    { value: "several", label: "Several" },
    { value: "solitary", label: "Solitary" }
  ],
  "habitat": [
    { value: "grasses", label: "Grasses / Meadows" },
    { value: "paths", label: "Paths / Trail Edges" },
    { value: "urban", label: "Urban / Gardens" },
    { value: "waste", label: "Waste Places / Composting" },
    { value: "woods", label: "Woods / Forest Floor" }
  ]
};

export const FORM_STEPS = [
  {
    id: 1,
    title: "CAP & SURFACE",
    kicker: "01",
    subtitle: "Record cap morphology, texture, pigmentation, and bruising intensity.",
    fields: [
      { name: "cap-shape", label: "Cap Shape", required: true },
      { name: "cap-surface", label: "Cap Surface", required: true },
      { name: "cap-color", label: "Cap Colour", required: true },
      { name: "bruises", label: "Bruising Tendency", required: true }
    ]
  },
  {
    id: 2,
    title: "GILLS & ODOUR",
    kicker: "02",
    subtitle: "Examine hymenial gill arrangement, spacing, color, and aromatic profile.",
    fields: [
      { name: "odor", label: "Odour Characteristic", required: true },
      { name: "gill-attachment", label: "Gill Attachment", required: true },
      { name: "gill-spacing", label: "Gill Spacing", required: true },
      { name: "gill-size", label: "Gill Size", required: true },
      { name: "gill-color", label: "Gill Colour", required: true }
    ]
  },
  {
    id: 3,
    title: "STALK & ROOT",
    kicker: "03",
    subtitle: "Inspect stipe structure, root architecture, surface texture, and shading.",
    fields: [
      { name: "stalk-shape", label: "Stalk Shape", required: true },
      { name: "stalk-root", label: "Stalk Root Structure", required: true },
      { name: "stalk-surface-above-ring", label: "Surface Above Ring", required: true },
      { name: "stalk-surface-below-ring", label: "Surface Below Ring", required: true },
      { name: "stalk-color-above-ring", label: "Colour Above Ring", required: true },
      { name: "stalk-color-below-ring", label: "Colour Below Ring", required: true }
    ]
  },
  {
    id: 4,
    title: "RING & SPORE",
    kicker: "04",
    subtitle: "Note annulus ring formation and spore print color profile.",
    fields: [
      { name: "ring-number", label: "Ring Count", required: true },
      { name: "ring-type", label: "Ring Type", required: true },
      { name: "spore-print-color", label: "Spore Print Colour", required: true }
    ]
  },
  {
    id: 5,
    title: "HABITAT & POPULATION",
    kicker: "05",
    subtitle: "Record environmental distribution and micro-habitat surroundings.",
    fields: [
      { name: "population", label: "Population Distribution", required: true },
      { name: "habitat", label: "Natural Habitat", required: true }
    ]
  }
];
