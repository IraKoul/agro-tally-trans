import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ProfitLoss from './ProfitLoss';
import Income from './Income';
import Expenses from './Expenses';
import Tips from './Tips';
import LanguageSelector from '../ui/LanguageSelector';
import { LogOut, TrendingUp, DollarSign, CreditCard, Lightbulb } from 'lucide-react';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('profit-loss');
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">AgriFinTech</h1>
              <div className="hidden sm:block h-6 w-px bg-border" />
              <p className="hidden sm:block text-muted-foreground">
                Welcome, {user?.user_metadata?.name || user?.email || 'Farmer'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>{t('logout')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted/50">
            <TabsTrigger 
              value="profit-loss" 
              className="flex items-center space-x-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">{t('profitLoss')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="income" 
              className="flex items-center space-x-2 py-3 data-[state=active]:bg-success data-[state=active]:text-success-foreground"
            >
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">{t('income')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="expenses" 
              className="flex items-center space-x-2 py-3 data-[state=active]:bg-warning data-[state=active]:text-warning-foreground"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">{t('expenses')}</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tips" 
              className="flex items-center space-x-2 py-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">{t('tips')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profit-loss" className="space-y-6">
            <ProfitLoss userId={user?.id} />
          </TabsContent>

          <TabsContent value="income" className="space-y-6">
            <Income userId={user?.id} />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <Expenses userId={user?.id} />
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <Tips />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}