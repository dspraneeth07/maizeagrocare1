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
  "Gray Leaf Spot": {
    name: "Gray Leaf Spot",
    scientificName: "Cercospora zeae-maydis",
    description: "A significant foliar disease causing gray to tan rectangular lesions on maize leaves.",
    symptoms: [
      "Rectangular gray lesions",
      "Yellowing of leaves",
      "Premature death of leaves"
    ],
    causes: [
      "Fungal pathogen",
      "High humidity",
      "Poor air circulation"
    ],
    prevention: [
      "Crop rotation",
      "Resistant hybrids",
      "Proper plant spacing"
    ],
    treatment: {
      medicine: "Pyraclostrobin",
      dosage: "2.0 ml per liter of water",
      frequency: "Every 14-21 days",
      instructions: "Apply at first sign of disease and ensure good coverage"
    },
    normalRange: "0-15%"
  },
  "Unknown Disease": {
    name: "Unknown Disease",
    scientificName: "Not identified",
    description: "The disease could not be confidently identified. Please consult with a local agricultural expert.",
    symptoms: ["Various symptoms detected"],
    causes: ["Multiple potential causes"],
    prevention: [
      "Regular crop monitoring",
      "Maintain good field hygiene",
      "Consult local agricultural experts"
    ],
    treatment: {
      medicine: "Consult expert",
      dosage: "As recommended",
      frequency: "As recommended",
      instructions: "Please consult with a local agricultural expert for proper diagnosis and treatment"
    },
    normalRange: "Consult expert"
  },
  "Healthy": {
    name: "Healthy Plant",
    scientificName: "N/A",
    description: "The plant appears to be healthy with no significant signs of disease.",
    symptoms: ["No significant symptoms detected"],
    causes: ["N/A"],
    prevention: [
      "Continue regular monitoring",
      "Maintain good agricultural practices",
      "Regular crop rotation"
    ],
    treatment: {
      medicine: "No treatment needed",
      dosage: "N/A",
      frequency: "N/A",
      instructions: "Continue monitoring for any signs of disease"
    },
    normalRange: "100% healthy"
  }
};

export const getDiseaseInfo = (label: string): DiseaseInfo => {
  // Try to match the exact disease name first
  if (maizeDiseases[label]) {
    return maizeDiseases[label];
  }

  // If no exact match, try to find a partial match
  const lowerLabel = label.toLowerCase();
  for (const [key, disease] of Object.entries(maizeDiseases)) {
    if (lowerLabel.includes(key.toLowerCase())) {
      return disease;
    }
  }

  // If still no match, return Unknown Disease
  return maizeDiseases["Unknown Disease"];
};