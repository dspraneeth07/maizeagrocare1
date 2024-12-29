import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "te", name: "తెలుగు" }
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language || "en");

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode);
    i18n.changeLanguage(langCode);
    console.log(`Language changed to: ${langCode}`);
  };

  return (
    <Select value={selectedLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px] bg-white/90 backdrop-blur-sm">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}