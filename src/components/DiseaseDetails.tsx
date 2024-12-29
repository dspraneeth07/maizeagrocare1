import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Leaf } from "lucide-react";
import type { DiseaseInfo } from "@/data/maizeDiseases";

interface DiseaseDetailsProps {
  diseaseInfo: DiseaseInfo;
  confidence: number;
}

export function DiseaseDetails({ diseaseInfo, confidence }: DiseaseDetailsProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{diseaseInfo.name}</span>
          <span className="text-forest-600 text-sm">
            {t('results.confidence')}: {(confidence * 100).toFixed(2)}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">{t('results.description')}</h4>
          <p className="text-gray-600">{diseaseInfo.description}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2">{t('results.analyzedRange')}</h4>
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-500" />
            <span>{(confidence * 100).toFixed(2)}%</span>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">{t('results.normalRange')}</h4>
          <div className="flex items-center gap-2">
            <Leaf className="text-green-500" />
            <span>{diseaseInfo.normalRange}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}