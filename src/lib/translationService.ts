// Translation service using MyMemory API (free, no API key required)
const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get';

export interface TranslationRequest {
  text: string;
  targetLang: 'en' | 'hi';
}

export interface TranslationResponse {
  translatedText: string;
  success: boolean;
  error?: string;
}

// Cache for storing translations to avoid repeated API calls
const translationCache = new Map<string, string>();

function getCacheKey(text: string, targetLang: string): string {
  return `${text}:${targetLang}`;
}

export async function translateText(request: TranslationRequest): Promise<TranslationResponse> {
  const { text, targetLang } = request;
  
  // Return original text if same language or empty
  if (!text.trim()) {
    return { translatedText: text, success: true };
  }

  // Check cache first
  const cacheKey = getCacheKey(text, targetLang);
  const cached = translationCache.get(cacheKey);
  if (cached) {
    return { translatedText: cached, success: true };
  }

  try {
    // Language codes for MyMemory API
    const langPair = targetLang === 'hi' ? 'en|hi' : 'hi|en';
    
    const url = `${MYMEMORY_API_URL}?q=${encodeURIComponent(text)}&langpair=${langPair}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translated = data.responseData.translatedText;
      
      // Cache the translation
      translationCache.set(cacheKey, translated);
      
      return {
        translatedText: translated,
        success: true
      };
    } else {
      throw new Error('Translation failed');
    }
  } catch (error) {
    console.error('Translation error:', error);
    return {
      translatedText: text, // Fallback to original text
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Batch translation for multiple texts
export async function translateTexts(texts: string[], targetLang: 'en' | 'hi'): Promise<string[]> {
  const translations = await Promise.all(
    texts.map(text => translateText({ text, targetLang }))
  );
  
  return translations.map(result => result.translatedText);
}