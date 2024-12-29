import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";
import { DiseaseDetails } from "./DiseaseDetails";
import { TreatmentRecommendations } from "./TreatmentRecommendations";
import { getDiseaseInfo } from "@/data/maizeDiseases";

interface ResultsProps {
  imageUrl: string | null;
  analysisResults: any;
}

export function Results({ imageUrl, analysisResults }: ResultsProps) {
  const { t } = useTranslation();

  const generatePDF = () => {
    const pdf = new jsPDF();
    
    // Add header with logo
    pdf.setFontSize(24);
    pdf.setTextColor(22, 163, 74); // forest-600
    pdf.text("MAIZE AGRO CARE", 105, 20, { align: "center" });
    
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text("Disease Analysis Report", 105, 30, { align: "center" });
    
    // Add image if available
    if (imageUrl) {
      pdf.addImage(imageUrl, "JPEG", 20, 40, 170, 100);
    }
    
    // Add analysis results
    if (analysisResults && analysisResults.length > 0) {
      const result = analysisResults[0];
      const diseaseInfo = getDiseaseInfo(result.label);
      
      // Disease Details Section
      pdf.setFontSize(16);
      pdf.setTextColor(22, 163, 74);
      pdf.text("Disease Details", 20, 150);
      
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Disease: ${diseaseInfo.name}`, 30, 165);
      pdf.text(`Scientific Name: ${diseaseInfo.scientificName}`, 30, 175);
      pdf.text(`Confidence: ${(result.score * 100).toFixed(2)}%`, 30, 185);
      
      // Description Section
      pdf.setFontSize(16);
      pdf.setTextColor(22, 163, 74);
      pdf.text("Description", 20, 205);
      
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      const descriptionLines = pdf.splitTextToSize(diseaseInfo.description, 170);
      pdf.text(descriptionLines, 20, 220);
      
      // Treatment Section
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.setTextColor(22, 163, 74);
      pdf.text("Treatment Recommendations", 20, 20);
      
      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text("Medicine:", 20, 35);
      pdf.text(diseaseInfo.treatment.medicine, 30, 45);
      pdf.text("Dosage:", 20, 60);
      pdf.text(diseaseInfo.treatment.dosage, 30, 70);
      pdf.text("Frequency:", 20, 85);
      pdf.text(diseaseInfo.treatment.frequency, 30, 95);
    }
    
    // Add footer
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    pdf.text("© 2024 Copyrighted, developed, and designed by Dhadi Sai Praneeth Reddy", 105, 280, { align: "center" });
    
    // Save the PDF
    pdf.save("maize-analysis-report.pdf");
  };

  return (
    <div className="space-y-6">
      {imageUrl && (
        <Card>
          <CardHeader>
            <CardTitle>{t('results.originalImage')}</CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src={imageUrl}
              alt="Analyzed maize crop"
              className="w-full rounded-lg"
            />
          </CardContent>
        </Card>
      )}

      {analysisResults && analysisResults.length > 0 && (
        <div className="space-y-6">
          {/* Only show the first result */}
          <DiseaseDetails 
            diseaseInfo={getDiseaseInfo(analysisResults[0].label)}
            confidence={analysisResults[0].score}
          />
          <TreatmentRecommendations 
            diseaseInfo={getDiseaseInfo(analysisResults[0].label)}
          />

          <Button
            onClick={generatePDF}
            className="w-full bg-forest-600 hover:bg-forest-700"
          >
            <FileDown className="mr-2 h-4 w-4" />
            {t('results.downloadReport')}
          </Button>
        </div>
      )}
    </div>
  );
}