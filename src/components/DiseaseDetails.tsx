import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Leaf, Microscope, AlertCircle } from "lucide-react";
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
          <div className="flex items-center gap-2">
            <Microscope className="h-6 w-6 text-forest-600" />
            <span>{diseaseInfo.name}</span>
          </div>
          <span className="text-forest-600 text-sm">
            {t('results.confidence')}: {(confidence * 100).toFixed(2)}%
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-forest-600" />
            {t('results.description')}
          </h4>
          <p className="text-gray-600 text-left">{diseaseInfo.description}</p>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
            {t('results.analyzedRange')}
          </h4>
          <p className="text-left">
            {(confidence * 100).toFixed(2)}% of crop affected
          </p>
        </div>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-500" />
            {t('results.normalRange')}
          </h4>
          <p className="text-left">{diseaseInfo.normalRange}</p>
        </div>
      </CardContent>
    </Card>
  );
}