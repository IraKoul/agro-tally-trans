import React, { createContext, useContext, useState } from 'react';
import { translateText } from '@/lib/translationService';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateDynamic: (text: string) => Promise<string>;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translation dictionary
const translations = {
  en: {
    // Navigation & Auth
    'login': 'Login',
    'logout': 'Logout',
    'email': 'Email',
    'phone': 'Phone',
    'password': 'Password',
    'signin': 'Sign In',
    'welcome': 'Welcome back!',
    'loginSubtitle': 'Sign in to your AgriFinTech account',
    
    // Dashboard
    'dashboard': 'Dashboard',
    'profitLoss': 'Profit/Loss',
    'income': 'Income',
    'expenses': 'Expenses',
    'tips': 'Tips',
    
    // Profit/Loss
    'totalIncome': 'Total Income',
    'totalExpenses': 'Total Expenses',
    'netProfit': 'Net Profit',
    'netLoss': 'Net Loss',
    'thisMonth': 'This Month',
    'overview': 'Overview',
    
    // Income/Expenses
    'addIncome': 'Add Income',
    'addExpense': 'Add Expense',
    'description': 'Description',
    'amount': 'Amount',
    'date': 'Date',
    'add': 'Add',
    'recentTransactions': 'Recent Transactions',
    'noTransactions': 'No transactions yet',
    
    // Tips
    'farmingTips': 'Farming & Finance Tips',
    'tip1Title': 'Crop Planning',
    'tip1Desc': 'Plan your crop rotation to maximize soil health and profits. Diversify crops to reduce risk.',
    'tip2Title': 'Save for Equipment',
    'tip2Desc': 'Set aside 10-15% of your income for equipment maintenance and upgrades.',
    'tip3Title': 'Insurance Coverage',
    'tip3Desc': 'Protect your crops with agricultural insurance to safeguard against weather risks.',
    'tip4Title': 'Record Keeping',
    'tip4Desc': 'Maintain detailed records of all expenses and income for better financial planning.',
    'tip5Title': 'Water Management',
    'tip5Desc': 'Invest in efficient irrigation systems to reduce water costs and improve yields.',
    'tip6Title': 'Market Research',
    'tip6Desc': 'Stay informed about market prices and demand to time your sales optimally.',
    'translation': 'Translation',
  },
  hi: {
    // Navigation & Auth
    'login': 'लॉगिन',
    'logout': 'लॉगआउट',
    'email': 'ईमेल',
    'phone': 'फोन',
    'password': 'पासवर्ड',
    'signin': 'साइन इन करें',
    'welcome': 'वापस आपका स्वागत है!',
    'loginSubtitle': 'अपने एग्रीफिनटेक खाते में साइन इन करें',
    
    // Dashboard
    'dashboard': 'डैशबोर्ड',
    'profitLoss': 'लाभ/हानि',
    'income': 'आय',
    'expenses': 'खर्च',
    'tips': 'सुझाव',
    
    // Profit/Loss
    'totalIncome': 'कुल आय',
    'totalExpenses': 'कुल खर्च',
    'netProfit': 'शुद्ध लाभ',
    'netLoss': 'शुद्ध हानि',
    'thisMonth': 'इस महीने',
    'overview': 'अवलोकन',
    
    // Income/Expenses
    'addIncome': 'आय जोड़ें',
    'addExpense': 'खर्च जोड़ें',
    'description': 'विवरण',
    'amount': 'राशि',
    'date': 'तारीख',
    'add': 'जोड़ें',
    'recentTransactions': 'हाल के लेनदेन',
    'noTransactions': 'अभी तक कोई लेनदेन नहीं',
    
    // Tips
    'farmingTips': 'कृषि और वित्त सुझाव',
    'tip1Title': 'फसल योजना',
    'tip1Desc': 'मिट्टी के स्वास्थ्य और मुनाफे को अधिकतम करने के लिए अपने फसल चक्र की योजना बनाएं।',
    'tip2Title': 'उपकरण के लिए बचत',
    'tip2Desc': 'उपकरण रखरखाव और अपग्रेड के लिए अपनी आय का 10-15% अलग रखें।',
    'tip3Title': 'बीमा कवरेज',
    'tip3Desc': 'मौसम जोखिमों से बचाव के लिए अपनी फसलों का कृषि बीमा कराएं।',
    'tip4Title': 'रिकॉर्ड रखना',
    'tip4Desc': 'बेहतर वित्तीय योजना के लिए सभी खर्चों और आय का विस्तृत रिकॉर्ड रखें।',
    'tip5Title': 'जल प्रबंधन',
    'tip5Desc': 'पानी की लागत कम करने और उत्पादन बढ़ाने के लिए कुशल सिंचाई प्रणाली में निवेश करें।',
    'tip6Title': 'बाजार अनुसंधान',
    'tip6Desc': 'अपनी बिक्री का सही समय जानने के लिए बाजार की कीमतों और मांग की जानकारी रखें।',
    'translation': 'अनुवाद',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isTranslating, setIsTranslating] = useState(false);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const translateDynamic = async (text: string): Promise<string> => {
    if (language === 'en') return text;
    
    setIsTranslating(true);
    try {
      const result = await translateText({ text, targetLang: language });
      return result.translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translateDynamic, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};