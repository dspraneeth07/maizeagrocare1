export interface Treatment {
  medicine: string;
  dosage: string;
  frequency: string;
  instructions: string;
}

export interface DiseaseInfo {
  name: string;
  scientificName: string;
  description: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  treatment: Treatment;
  normalRange: string;
}

export const maizeDiseases: Record<string, DiseaseInfo> = {
  "Maize Rust": {
    name: "Maize Rust",
    scientificName: "Puccinia sorghi",
    description: "A common fungal disease affecting maize plants, characterized by rust-colored spots on leaves.",
    symptoms: [
      "Yellow-orange pustules on leaves",
      "Reduced photosynthesis",
      "Stunted growth"
    ],
    causes: [
      "Fungal infection",
      "High humidity",
      "Poor air circulation"
    ],
    prevention: [
      "Proper ventilation",
      "Avoid waterlogging",
      "Rotate crops regularly"
    ],
    treatment: {
      medicine: "Azoxystrobin",
      dosage: "2.5 ml per liter of water",
      frequency: "Every 10 days",
      instructions: "Apply during early morning or evening to avoid direct sunlight"
    },
    normalRange: "0-5%"
  },
  "Maize Leaf Blight": {
    name: "Maize Leaf Blight",
    scientificName: "Exserohilum turcicum",
    description: "A serious fungal disease causing long, water-soaked lesions on maize leaves.",
    symptoms: [
      "Long, water-soaked lesions",
      "Greyish-yellow spots",
      "Leaf tissue death"
    ],
    causes: [
      "Fungal infection",
      "Wet conditions",
      "Poor drainage"
    ],
    prevention: [
      "Improve drainage",
      "Use resistant varieties",
      "Maintain proper spacing"
    ],
    treatment: {
      medicine: "Propiconazole",
      dosage: "1.5 ml per liter of water",
      frequency: "Every 14 days",
      instructions: "Ensure complete coverage of leaves when spraying"
    },
    normalRange: "0-10%"
  },
  "Southern Corn Leaf Blight": {
    name: "Southern Corn Leaf Blight",
    scientificName: "Bipolaris maydis",
    description: "A fungal disease that affects the maize plant by causing oval lesions on leaves and stalks.",
    symptoms: [
      "Oval, brown lesions on leaves",
      "Lesions merging into large areas of necrosis",
      "Yellowing of affected leaves"
    ],
    causes: [
      "Fungal infection",
      "Warm, humid conditions"
    ],
    prevention: [
      "Use resistant maize varieties",
      "Improve field ventilation",
      "Remove and destroy infected debris"
    ],
    treatment: {
      medicine: "Chlorothalonil",
      dosage: "2 ml per liter of water",
      frequency: "Every 10-15 days",
      instructions: "Spray on the plant's leaves and stalks during early stages of the disease"
    },
    normalRange: "0-5%"
  },
  "Northern Corn Leaf Blight": {
    name: "Northern Corn Leaf Blight",
    scientificName: "Exserohilum turcicum",
    description: "A common disease characterized by large, elongated lesions on maize leaves, which can cause significant damage if left untreated.",
    symptoms: [
      "Large, elongated lesions on leaves",
      "Greyish centers and dark edges",
      "Complete leaf necrosis if untreated"
    ],
    causes: [
      "Fungal infection",
      "Moisture stress",
      "Warm, humid weather"
    ],
    prevention: [
      "Use resistant maize hybrids",
      "Remove infected crop debris",
      "Apply fungicides early in the disease cycle"
    ],
    treatment: {
      medicine: "Azoxystrobin",
      dosage: "2 ml per liter of water",
      frequency: "Every 7-10 days",
      instructions: "Spray early in the morning or evening to ensure effectiveness"
    },
    normalRange: "0-10%"
  },
  "Corn Smut": {
    name: "Corn Smut",
    scientificName: "Ustilago maydis",
    description: "A fungal disease that results in the formation of swollen growths, or galls, on maize ears and kernels.",
    symptoms: [
      "Greyish, swollen growths on ears and kernels",
      "Deformed kernels with fungal growth",
      "Reduced grain yield"
    ],
    causes: [
      "Fungal infection",
      "High humidity",
      "Crowded planting conditions"
    ],
    prevention: [
      "Remove infected ears from the plant",
      "Avoid excessive moisture",
      "Use resistant varieties"
    ],
    treatment: {
      medicine: "Mancozeb",
      dosage: "3 ml per liter of water",
      frequency: "Every 7-10 days",
      instructions: "Apply to affected areas to control the spread of infection"
    },
    normalRange: "0-5%"
  },
  "Gray Leaf Spot": {
    name: "Gray Leaf Spot",
    scientificName: "Cercospora zeae-maydis",
    description: "This disease is caused by a fungus that produces lesions on maize leaves, which can lead to premature leaf death.",
    symptoms: [
      "Grayish, elongated lesions on leaves",
      "Lesions with dark borders and light centers",
      "Reduced photosynthetic area"
    ],
    causes: [
      "Fungal infection",
      "Damp conditions",
      "Poor air circulation"
    ],
    prevention: [
      "Rotate crops",
      "Use resistant varieties",
      "Improve spacing between plants"
    ],
    treatment: {
      medicine: "Propiconazole",
      dosage: "2 ml per liter of water",
      frequency: "Every 10-14 days",
      instructions: "Spray thoroughly on leaves, especially the underside"
    },
    normalRange: "0-5%"
  },
  "Fusarium Ear Rot": {
    name: "Fusarium Ear Rot",
    scientificName: "Fusarium verticillioides",
    description: "A fungal infection that causes rot in maize ears, characterized by pink or purple mold growth on the kernels.",
    symptoms: [
      "Pink or purple mold growth on ears",
      "Soft, discolored kernels",
      "Reduced grain quality"
    ],
    causes: [
      "Fungal infection",
      "Warm and dry conditions",
      "Poor plant health"
    ],
    prevention: [
      "Remove infected ears from plants",
      "Control irrigation practices",
      "Use resistant varieties"
    ],
    treatment: {
      medicine: "Fludioxonil",
      dosage: "1.5 ml per liter of water",
      frequency: "Every 7-10 days",
      instructions: "Apply to the ears at early stages of infection"
    },
    normalRange: "0-5%"
  },
  "Anthracnose": {
    name: "Anthracnose",
    scientificName: "Colletotrichum graminicola",
    description: "A fungal disease that causes lesions on maize leaves, stalks, and ears, leading to premature plant death.",
    symptoms: [
      "Dark lesions on leaves",
      "Sunken lesions on maize ears",
      "Stunted plant growth"
    ],
    causes: [
      "Fungal infection",
      "Damp, humid conditions",
      "Infected crop debris"
    ],
    prevention: [
      "Remove infected plants",
      "Maintain proper field spacing",
      "Use disease-resistant maize hybrids"
    ],
    treatment: {
      medicine: "Chlorothalonil",
      dosage: "3 ml per liter of water",
      frequency: "Every 10-14 days",
      instructions: "Spray on leaves and stalks at first sign of infection"
    },
    normalRange: "0-5%"
  },
  "Bacterial Leaf Blight": {
    name: "Bacterial Leaf Blight",
    scientificName: "Xanthomonas axonopodis pv. zeae",
    description: "A bacterial disease that causes water-soaked lesions on maize leaves, leading to leaf death and reduced yield.",
    symptoms: [
      "Water-soaked lesions on leaves",
      "Yellowing of leaf edges",
      "Wilting of infected leaves"
    ],
    causes: [
      "Bacterial infection",
      "Excess moisture",
      "Infected seed"
    ],
    prevention: [
      "Use certified disease-free seeds",
      "Improve drainage",
      "Practice crop rotation"
    ],
    treatment: {
      medicine: "Copper-based bactericides",
      dosage: "2 ml per liter of water",
      frequency: "Every 7-10 days",
      instructions: "Apply to infected areas, ensuring thorough coverage"
    },
    normalRange: "0-5%"
  }
  // Additional diseases can be added here following the same pattern
};

export const getDiseaseInfo = (label: string): DiseaseInfo => {
  // Try to match the exact disease name first
  if (maizeDiseases[label]) {
    return maizeDiseases[label];
  }

  // If no exact match, return a default disease (e.g., Maize Rust) for fallback
  return maizeDiseases["Maize Rust"];
};
