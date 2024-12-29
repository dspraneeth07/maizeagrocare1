import { useState, useRef } from "react";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { analyzeMaizeImage } from "@/utils/mlService";
import { Results } from "./Results";
import { useToast } from "@/components/ui/use-toast";

export function ImageUploader() {
  const [image, setImage] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysisResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Error",
        description: "Could not access camera",
        variant: "destructive",
      });
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg");
      setImage(dataUrl);
      setAnalysisResults(null);
      setIsCapturing(false);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };

  const handleAnalyze = async () => {
    if (!image) {
      toast({
        title: "Error",
        description: "Please upload or capture an image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const results = await analyzeMaizeImage(image);
      setAnalysisResults(results);
      toast({
        title: "Success",
        description: "Analysis completed successfully",
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Error",
        description: "Failed to analyze image",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 justify-center">
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="bg-forest-600 hover:bg-forest-700"
        >
          <Upload className="mr-2 h-4 w-4" /> {t('upload.uploadButton')}
        </Button>
        <Button
          onClick={startCamera}
          className="bg-forest-600 hover:bg-forest-700"
        >
          <Camera className="mr-2 h-4 w-4" /> {t('upload.captureButton')}
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
      </div>

      {isCapturing && (
        <div className="relative w-full max-w-md mx-auto">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg"
          />
          <Button
            onClick={captureImage}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-maize-500 hover:bg-maize-600 text-black"
          >
            {t('upload.captureButton')}
          </Button>
        </div>
      )}

      {image && !isCapturing && (
        <div className="space-y-6">
          <div className="w-full max-w-md mx-auto">
            <img
              src={image}
              alt="Uploaded maize"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-maize-500 hover:bg-maize-600 text-black"
          >
            {isAnalyzing ? t('analyze.analyzing') : t('analyze.button')}
          </Button>

          {analysisResults && (
            <Results imageUrl={image} analysisResults={analysisResults} />
          )}
        </div>
      )}
    </div>
  );
}