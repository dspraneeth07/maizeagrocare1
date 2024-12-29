import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, AlertTriangle, Leaf, Droplet, Shield } from "lucide-react";
import jsPDF from "jspdf";

interface ResultsProps {
  imageUrl: string | null;
  analysisResults: any;
}

interface DiseaseInfo {
  name: string;
  description: string;
  causes: string[];
  prevention: string[];
  treatment: {
    medicine: string;
    dosage: string;
    frequency: string;
    instructions: string;
  };
  normalRange: string;
}

const getDiseaseInfo = (label: string): DiseaseInfo => {
  // This would ideally come from a database or API
  return {
    name: label,
    description: "A common fungal disease affecting maize plants, characterized by rust-colored spots on leaves.",
    causes: [
      "High humidity",
      "Poor air circulation",
      "Over-irrigation"
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
  };
};

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
      pdf.text(`Disease: ${diseaseInfo.name}`, 30, 165);
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
          <Card>
            <CardHeader>
              <CardTitle>{t('results.analysis')}</CardTitle>
            </CardHeader>
            <CardContent>
              {analysisResults.map((result: any, index: number) => {
                const diseaseInfo = getDiseaseInfo(result.label);
                return (
                  <div key={index} className="space-y-6">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-medium">{result.label}</span>
                      <span className="text-forest-600">
                        {t('results.confidence')}: {(result.score * 100).toFixed(2)}%
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">{t('results.description')}</h4>
                        <p className="text-gray-600">{diseaseInfo.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">{t('results.analyzedRange')}</h4>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="text-yellow-500" />
                          <span>{(result.score * 100).toFixed(2)}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">{t('results.normalRange')}</h4>
                        <div className="flex items-center gap-2">
                          <Leaf className="text-green-500" />
                          <span>{diseaseInfo.normalRange}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">{t('results.causes')}</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {diseaseInfo.causes.map((cause, idx) => (
                            <li key={idx}>{cause}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">{t('results.prevention')}</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {diseaseInfo.prevention.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">{t('results.treatment')}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Shield className="text-blue-500" />
                            <span><strong>{t('results.medicine')}:</strong> {diseaseInfo.treatment.medicine}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Droplet className="text-blue-500" />
                            <span><strong>{t('results.dosage')}:</strong> {diseaseInfo.treatment.dosage}</span>
                          </div>
                          <p><strong>{t('results.frequency')}:</strong> {diseaseInfo.treatment.frequency}</p>
                          <p><strong>{t('results.instructions')}:</strong> {diseaseInfo.treatment.instructions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

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