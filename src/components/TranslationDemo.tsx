import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

export default function TranslationDemo() {
  const { t, translateDynamic, isTranslating, language } = useLanguage();
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    const result = await translateDynamic(inputText);
    setTranslatedText(result);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t('translation')} Demo
          {isTranslating && <Loader2 className="h-4 w-4 animate-spin" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Static Translation Example */}
        <div className="space-y-2">
          <h3 className="font-semibold">Static Translation (Pre-defined)</h3>
          <p className="text-sm text-muted-foreground">
            These use the `t()` function with predefined translations:
          </p>
          <div className="bg-muted p-3 rounded space-y-1">
            <p>• {t('welcome')}</p>
            <p>• {t('farmingTips')}</p>
            <p>• {t('addIncome')}</p>
          </div>
        </div>

        {/* Dynamic Translation Example */}
        <div className="space-y-2">
          <h3 className="font-semibold">Dynamic Translation (API-based)</h3>
          <p className="text-sm text-muted-foreground">
            Enter any text to translate it dynamically using MyMemory API:
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleTranslate}
              disabled={isTranslating || !inputText.trim()}
            >
              {isTranslating ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Translate'}
            </Button>
          </div>
          {translatedText && (
            <div className="bg-primary/10 p-3 rounded">
              <p className="font-medium">
                {language === 'en' ? 'Hindi' : 'English'}: {translatedText}
              </p>
            </div>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          <p><strong>How it works:</strong></p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Static translations: Instant, predefined key-value pairs</li>
            <li>Dynamic translations: Live API calls to MyMemory (free, no API key)</li>
            <li>Cached results: Repeated translations are cached for performance</li>
            <li>Fallback: Returns original text if translation fails</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}