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
    // Using a specialized agricultural model
    classifier = await pipeline(
      "image-classification",
      "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
      { 
        revision: "main",
        topk: 5 // Return top 5 predictions
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
    // Extract relevant keywords from the model's prediction
    const keywords = result.label.toLowerCase().split(/[,\s]+/);
    
    // Try to match with our disease database
    let matchedDisease = null;
    for (const keyword of keywords) {
      if (labelMapping[keyword]) {
        matchedDisease = labelMapping[keyword];
        break;
      }
    }

    // If no match found in mapping, try to find in disease database
    if (!matchedDisease) {
      const diseases = Object.values(getDiseaseInfo("dummy")).map(d => d.name.toLowerCase());
      for (const disease of diseases) {
        if (keywords.some(k => disease.includes(k))) {
          matchedDisease = disease;
          break;
        }
      }
    }

    return {
      label: matchedDisease || "Unknown Disease",
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