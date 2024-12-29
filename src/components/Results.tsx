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
    
    // Add header
    pdf.setFontSize(20);
    pdf.text("MAIZE AGRO CARE - Analysis Report", 20, 20);
    
    // Add image if available
    if (imageUrl) {
      pdf.addImage(imageUrl, "JPEG", 20, 40, 170, 100);
    }
    
    // Add analysis results
    if (analysisResults && analysisResults.length > 0) {
      const result = analysisResults[0];
      const diseaseInfo = getDiseaseInfo(result.label);
      
      pdf.setFontSize(14);
      pdf.text("Analysis Results:", 20, 150);
      
      pdf.setFontSize(12);
      pdf.text(`Disease: ${diseaseInfo.name} (${diseaseInfo.scientificName})`, 30, 165);
      pdf.text(`Confidence: ${(result.score * 100).toFixed(2)}%`, 30, 180);
      pdf.text(`Analyzed Range: ${(result.score * 100).toFixed(2)}%`, 30, 195);
      pdf.text(`Normal Range: ${diseaseInfo.normalRange}`, 30, 210);
      
      pdf.text("Treatment:", 20, 230);
      pdf.text(`Medicine: ${diseaseInfo.treatment.medicine}`, 30, 245);
      pdf.text(`Dosage: ${diseaseInfo.treatment.dosage}`, 30, 260);
      pdf.text(`Frequency: ${diseaseInfo.treatment.frequency}`, 30, 275);
    }
    
    // Add footer
    pdf.setFontSize(10);
    pdf.text("© 2024 Copyrighted, developed, and designed by Dhadi Sai Praneeth Reddy", 20, 290);
    
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
        <>
          {analysisResults.map((result: any, index: number) => {
            const diseaseInfo = getDiseaseInfo(result.label);
            return (
              <div key={index} className="space-y-6">
                <DiseaseDetails 
                  diseaseInfo={diseaseInfo}
                  confidence={result.score}
                />
                <TreatmentRecommendations 
                  diseaseInfo={diseaseInfo}
                />
              </div>
            );
          })}

          <Button
            onClick={generatePDF}
            className="w-full bg-forest-600 hover:bg-forest-700"
          >
            <FileDown className="mr-2 h-4 w-4" />
            {t('results.downloadReport')}
          </Button>
        </>
      )}
    </div>
  );
}