import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Droplet, FileText, AlertOctagon } from "lucide-react";
import type { DiseaseInfo } from "@/data/maizeDiseases";

interface TreatmentRecommendationsProps {
  diseaseInfo: DiseaseInfo;
}

export function TreatmentRecommendations({ diseaseInfo }: TreatmentRecommendationsProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-forest-600" />
          {t('results.treatment')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <AlertOctagon className="h-5 w-5 text-red-500" />
            {t('results.causes')}
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-left">
            {diseaseInfo.causes.map((cause, idx) => (
              <li key={idx}>{cause}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            {t('results.prevention')}
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-left">
            {diseaseInfo.prevention.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <FileText className="h-5 w-5 text-forest-600" />
            {t('results.treatment')}
          </h4>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-500" />
              <span><strong>{t('results.medicine')}:</strong> {diseaseInfo.treatment.medicine}</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              <span><strong>{t('results.dosage')}:</strong> {diseaseInfo.treatment.dosage}</span>
            </div>
            <p className="ml-6"><strong>{t('results.frequency')}:</strong> {diseaseInfo.treatment.frequency}</p>
            <p className="ml-6"><strong>{t('results.instructions')}:</strong> {diseaseInfo.treatment.instructions}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}