import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";

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
    pdf.text("Maize Agro Care - Analysis Report", 20, 20);
    
    // Add image if available
    if (imageUrl) {
      pdf.addImage(imageUrl, "JPEG", 20, 40, 170, 100);
    }
    
    // Add analysis results
    pdf.setFontSize(14);
    pdf.text("Analysis Results:", 20, 150);
    
    if (analysisResults && analysisResults.length > 0) {
      analysisResults.forEach((result: any, index: number) => {
        pdf.setFontSize(12);
        pdf.text(
          `${result.label}: ${(result.score * 100).toFixed(2)}%`,
          30,
          170 + index * 10
        );
      });
    }
    
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

      {analysisResults && (
        <Card>
          <CardHeader>
            <CardTitle>{t('results.analysis')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisResults.map((result: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <span className="font-medium">{result.label}</span>
                  <span className="text-forest-600">
                    {(result.score * 100).toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={generatePDF}
        className="w-full bg-forest-600 hover:bg-forest-700"
      >
        <FileDown className="mr-2 h-4 w-4" />
        {t('results.downloadReport')}
      </Button>
    </div>
  );
}