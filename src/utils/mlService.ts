import { pipeline } from "@huggingface/transformers";
import { getDiseaseInfo } from "@/data/maizeDiseases";

let classifier: any = null;

const CONFIDENCE_THRESHOLD = 0.35; // Minimum confidence threshold

// Map model labels to our disease database
const labelMapping: { [key: string]: string } = {
  "leaf_blight": "Maize Leaf Blight",
  "rust": "Maize Rust",
  "gray_leaf_spot": "Gray Leaf Spot",
  "healthy": "Healthy",
  // Add more mappings as needed
};

export const initializeModel = async () => {
  try {
    console.log("Initializing ML model...");
    classifier = await pipeline(
      "image-classification",
      "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
      { 
        revision: "main"
      }
    );
    console.log("ML model initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing ML model:", error);
    return false;
  }
};

const preprocessResults = (results: any[]) => {
  console.log("Raw analysis results:", results);
  
  if (!Array.isArray(results) || results.length === 0) {
    console.log("No predictions found");
    return [{
      label: "Unknown",
      score: 0,
      message: "Unable to detect disease. Please try with a clearer image."
    }];
  }

  // Filter results based on confidence threshold
  const validResults = results.filter(result => result.score > CONFIDENCE_THRESHOLD);
  
  if (validResults.length === 0) {
    console.log("No confident predictions found");
    return [{
      label: "Unknown",
      score: 0,
      message: "Unable to confidently detect disease. Please try with a clearer image."
    }];
  }

  // Map the results to our disease database
  return validResults.map(result => {
    if (!result.label) {
      return {
        label: "Unknown",
        score: result.score || 0,
        message: "Invalid prediction format"
      };
    }

    const predictionLabel = result.label.toLowerCase();
    
    // Try to match with our disease database
    let matchedDisease = null;
    
    // First try direct mapping
    for (const [key, value] of Object.entries(labelMapping)) {
      if (predictionLabel.includes(key)) {
        matchedDisease = value;
        break;
      }
    }

    // If no direct mapping found, try to match with disease database
    if (!matchedDisease) {
      const diseases = Object.values(getDiseaseInfo("dummy")).map(d => d.name.toLowerCase());
      for (const disease of diseases) {
        if (predictionLabel.includes(disease)) {
          matchedDisease = disease;
          break;
        }
      }
    }

    // If still no match, return unknown with original label
    if (!matchedDisease) {
      console.log(`No disease match found for prediction: ${predictionLabel}`);
      return {
        label: "Unknown",
        score: result.score,
        originalLabel: result.label
      };
    }

    return {
      label: matchedDisease,
      score: result.score,
      originalLabel: result.label
    };
  });
};

export const analyzeMaizeImage = async (imageUrl: string) => {
  try {
    console.log("Analyzing image...");
    if (!classifier) {
      await initializeModel();
    }

    // Get raw predictions from the model
    const rawResults = await classifier(imageUrl);
    console.log("Raw model output:", rawResults);

    // Process and refine the results
    const processedResults = preprocessResults(rawResults);
    console.log("Processed analysis results:", processedResults);

    return processedResults;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};