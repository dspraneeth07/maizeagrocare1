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
  }
  // ... Additional diseases can be added here
};

export const getDiseaseInfo = (label: string): DiseaseInfo => {
  // Try to match the exact disease name first
  if (maizeDiseases[label]) {
    return maizeDiseases[label];
  }

  // If no exact match, return the first disease as default
  // In a production environment, you might want to implement fuzzy matching
  return maizeDiseases["Maize Rust"];
};