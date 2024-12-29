import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";

interface ResultsProps {
  imageUrl: string | null;
  analysisResults: any;
}

const getTreatmentRecommendations = (disease: string) => {
  const recommendations = {
    "Northern Leaf Blight": {
      pesticides: ["Propiconazole", "Azoxystrobin"],
      fertilizers: ["Balanced NPK (10-10-10)", "Calcium nitrate"],
      medicines: ["Copper-based fungicides", "Mancozeb"]
    },
    "Common Rust": {
      pesticides: ["Tebuconazole", "Chlorothalonil"],
      fertilizers: ["High-phosphorus fertilizer", "Potassium sulfate"],
      medicines: ["Triazole fungicides", "Strobilurin fungicides"]
    },
    "Gray Leaf Spot": {
      pesticides: ["Pyraclostrobin", "Fluxapyroxad"],
      fertilizers: ["Nitrogen-rich fertilizer", "Micronutrient mix"],
      medicines: ["Systemic fungicides", "Contact fungicides"]
    },
    "Healthy": {
      pesticides: ["Preventive fungicides"],
      fertilizers: ["Regular balanced fertilizer"],
      medicines: ["None required"]
    }
  };

  return recommendations[disease as keyof typeof recommendations] || {
    pesticides: ["Consult local agricultural expert"],
    fertilizers: ["Balanced NPK fertilizer"],
    medicines: ["Consult plant pathologist"]
  };
};

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
    pdf.text(t('results.analysis'), 20, 150);
    
    let yPosition = 170;
    
    if (analysisResults && analysisResults.length > 0) {
      const disease = analysisResults[0].label;
      const treatment = getTreatmentRecommendations(disease);

      // Disease information
      pdf.setFontSize(12);
      pdf.text(`${t('results.disease')}: ${disease}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`${t('results.currentValue')}: ${(analysisResults[0].score * 100).toFixed(2)}%`, 20, yPosition);
      yPosition += 10;
      pdf.text(`${t('results.healthyRange')}`, 20, yPosition);
      yPosition += 20;

      // Treatment recommendations
      pdf.text(t('results.treatment'), 20, yPosition);
      yPosition += 10;
      
      pdf.text(`${t('results.pesticides')}: ${treatment.pesticides.join(", ")}`, 30, yPosition);
      yPosition += 10;
      pdf.text(`${t('results.fertilizers')}: ${treatment.fertilizers.join(", ")}`, 30, yPosition);
      yPosition += 10;
      pdf.text(`${t('results.medicines')}: ${treatment.medicines.join(", ")}`, 30, yPosition);
    }
    
    // Save the PDF
    pdf.save("maize-analysis-report.pdf");
  };

  const getMainDisease = () => {
    if (!analysisResults || analysisResults.length === 0) return null;
    return analysisResults[0];
  };

  const mainDisease = getMainDisease();
  const treatment = mainDisease ? getTreatmentRecommendations(mainDisease.label) : null;

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
        <>
          <Card>
            <CardHeader>
              <CardTitle>{t('results.analysis')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-2">{t('results.disease')}</h3>
                  <p className="text-lg">{mainDisease?.label || t('results.noDisease')}</p>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>{t('results.currentValue')}: {(mainDisease?.score * 100).toFixed(2)}%</p>
                    <p>{t('results.healthyRange')}</p>
                  </div>
                </div>

                {treatment && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">{t('results.pesticides')}</h3>
                      <ul className="list-disc pl-5">
                        {treatment.pesticides.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">{t('results.fertilizers')}</h3>
                      <ul className="list-disc pl-5">
                        {treatment.fertilizers.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">{t('results.medicines')}</h3>
                      <ul className="list-disc pl-5">
                        {treatment.medicines.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
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