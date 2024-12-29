import { LanguageSelector } from "@/components/LanguageSelector";
import { ImageUploader } from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-forest-50 to-maize-50 bg-grain-pattern">
      <header className="py-6 px-4 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-forest-600" />
            <h1 className="text-2xl font-bold text-forest-900">
              {t('header.title')}
            </h1>
          </div>
          <LanguageSelector />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <section className="space-y-4">
            <h2 className="text-4xl font-bold text-forest-900">
              {t('header.description')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('upload.title')}
            </p>
          </section>

          <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <ImageUploader />
          </section>

          <Button
            size="lg"
            className="bg-maize-500 hover:bg-maize-600 text-black text-lg px-8"
          >
            {t('analyze.button')}
          </Button>
        </div>
      </main>

      <footer className="mt-auto py-8 bg-forest-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p>{t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;