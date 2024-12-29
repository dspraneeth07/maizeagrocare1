import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Droplet } from "lucide-react";
import type { DiseaseInfo } from "@/data/maizeDiseases";

interface TreatmentRecommendationsProps {
  diseaseInfo: DiseaseInfo;
}

export function TreatmentRecommendations({ diseaseInfo }: TreatmentRecommendationsProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('results.treatment')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
}