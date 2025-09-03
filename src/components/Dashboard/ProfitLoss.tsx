import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

interface ProfitLossProps {
  userId: string;
}

export default function ProfitLoss({ userId }: ProfitLossProps) {
  const [totals, setTotals] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netProfit: 0
  });
  const { t } = useLanguage();

  useEffect(() => {
    // Mock data for demo
    const mockTotals = {
      totalIncome: 125000,
      totalExpenses: 87500,
      netProfit: 37500
    };
    setTotals(mockTotals);
  }, [userId]);

  const isProfit = totals.netProfit >= 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">{t('profitLoss')} {t('overview')}</h2>
        <p className="text-muted-foreground">{t('thisMonth')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Income */}
        <Card className="shadow-soft border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('totalIncome')}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ₹{totals.totalIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              All income sources
            </p>
          </CardContent>
        </Card>

        {/* Total Expenses */}
        <Card className="shadow-soft border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('totalExpenses')}
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              ₹{totals.totalExpenses.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingDown className="h-3 w-3 inline mr-1" />
              All operational costs
            </p>
          </CardContent>
        </Card>

        {/* Net Profit/Loss */}
        <Card className={`shadow-soft ${isProfit ? 'border-primary/20' : 'border-destructive/20'} md:col-span-2 lg:col-span-1`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {isProfit ? t('netProfit') : t('netLoss')}
            </CardTitle>
            {isProfit ? (
              <TrendingUp className="h-4 w-4 text-primary" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${isProfit ? 'text-primary' : 'text-destructive'}`}>
              ₹{Math.abs(totals.netProfit).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              <Calendar className="h-3 w-3 inline mr-1" />
              Current month performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Profit/Loss Summary Card */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Financial Summary</span>
          </CardTitle>
          <CardDescription>
            Your farming business performance overview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-success/5 rounded-lg">
            <span className="font-medium">Income</span>
            <span className="text-success font-bold">₹{totals.totalIncome.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-warning/5 rounded-lg">
            <span className="font-medium">Expenses</span>
            <span className="text-warning font-bold">₹{totals.totalExpenses.toLocaleString()}</span>
          </div>
          <div className="border-t pt-4">
            <div className={`flex justify-between items-center p-4 rounded-lg ${isProfit ? 'bg-primary/5' : 'bg-destructive/5'}`}>
              <span className="font-bold text-lg">Net {isProfit ? 'Profit' : 'Loss'}</span>
              <span className={`font-bold text-xl ${isProfit ? 'text-primary' : 'text-destructive'}`}>
                ₹{Math.abs(totals.netProfit).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}