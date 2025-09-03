import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, DollarSign, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IncomeProps {
  userId: string;
}

interface IncomeItem {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export default function Income({ userId }: IncomeProps) {
  const [incomes, setIncomes] = useState<IncomeItem[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    // Mock data for demo
    const mockIncomes: IncomeItem[] = [
      {
        id: '1',
        description: 'Wheat Sale',
        amount: 45000,
        date: '2024-03-01'
      },
      {
        id: '2', 
        description: 'Rice Harvest',
        amount: 62000,
        date: '2024-03-05'
      },
      {
        id: '3',
        description: 'Vegetable Market',
        amount: 18000,
        date: '2024-03-10'
      }
    ];
    setIncomes(mockIncomes);
  }, [userId]);

  const handleAddIncome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount || !date) return;

    const newIncome: IncomeItem = {
      id: Date.now().toString(),
      description: description.trim(),
      amount: parseFloat(amount),
      date
    };

    setIncomes(prev => [newIncome, ...prev]);
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);

    toast({
      title: "Success",
      description: "Income added successfully!",
    });
  };

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-success mb-2">{t('income')} Tracking</h2>
        <p className="text-muted-foreground">Manage your farming income sources</p>
      </div>

      {/* Add Income Form */}
      <Card className="shadow-medium border-success/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-success">
            <Plus className="h-5 w-5" />
            <span>{t('addIncome')}</span>
          </CardTitle>
          <CardDescription>Record new income from your farming activities</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddIncome} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="description">{t('description')}</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Wheat sale, Rice harvest"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">{t('amount')} (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">{t('date')}</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="bg-success hover:bg-success/90">
              <Plus className="h-4 w-4 mr-2" />
              {t('add')} {t('income')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Income Summary */}
      <Card className="shadow-soft border-success/30 bg-success/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-success rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-2xl font-bold text-success">₹{totalIncome.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              {incomes.length} transactions
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Income List */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>{t('recentTransactions')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {incomes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t('noTransactions')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {incomes.map((income) => (
                <div
                  key={income.id}
                  className="flex items-center justify-between p-4 bg-success/5 rounded-lg hover:bg-success/10 transition-colors"
                >
                  <div>
                    <p className="font-medium">{income.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(income.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">₹{income.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}