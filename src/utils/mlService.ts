import { pipeline } from "@huggingface/transformers";

let classifier: any = null;

export const initializeModel = async () => {
  try {
    console.log("Initializing ML model...");
    classifier = await pipeline(
      "image-classification",
      "microsoft/resnet-18",
      { revision: "main" }
    );
    console.log("ML model initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing ML model:", error);
    return false;
  }
};

export const analyzeMaizeImage = async (imageUrl: string) => {
  try {
    console.log("Analyzing image...");
    if (!classifier) {
      await initializeModel();
    }
    const results = await classifier(imageUrl);
    console.log("Analysis results:", results);
    return results;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};