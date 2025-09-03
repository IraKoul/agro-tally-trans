import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Plus, CreditCard, Calendar, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExpensesProps {
  userId: string;
}

interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  date: string;
}

export default function Expenses({ userId }: ExpensesProps) {
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { t } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    // Mock data for demo
    const mockExpenses: ExpenseItem[] = [
      {
        id: '1',
        description: 'Seeds Purchase',
        amount: 15000,
        date: '2024-02-15'
      },
      {
        id: '2',
        description: 'Fertilizer',
        amount: 22000,
        date: '2024-02-20'
      },
      {
        id: '3',
        description: 'Fuel & Equipment',
        amount: 18500,
        date: '2024-02-25'
      },
      {
        id: '4',
        description: 'Labor Costs',
        amount: 32000,
        date: '2024-03-01'
      }
    ];
    setExpenses(mockExpenses);
  }, [userId]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount || !date) return;

    const newExpense: ExpenseItem = {
      id: Date.now().toString(),
      description: description.trim(),
      amount: parseFloat(amount),
      date
    };

    setExpenses(prev => [newExpense, ...prev]);
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);

    toast({
      title: "Success",
      description: "Expense added successfully!",
    });
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-warning mb-2">{t('expenses')} Tracking</h2>
        <p className="text-muted-foreground">Monitor your farming operational costs</p>
      </div>

      {/* Add Expense Form */}
      <Card className="shadow-medium border-warning/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-warning">
            <Plus className="h-5 w-5" />
            <span>{t('addExpense')}</span>
          </CardTitle>
          <CardDescription>Record new expenses from your farming operations</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddExpense} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="expense-description">{t('description')}</Label>
                <Input
                  id="expense-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Seeds, Fertilizer, Equipment"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-amount">{t('amount')} (₹)</Label>
                <Input
                  id="expense-amount"
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
                <Label htmlFor="expense-date">{t('date')}</Label>
                <Input
                  id="expense-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="bg-warning hover:bg-warning/90 text-warning-foreground">
              <Plus className="h-4 w-4 mr-2" />
              {t('add')} {t('expenses')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Expenses Summary */}
      <Card className="shadow-soft border-warning/30 bg-warning/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-warning rounded-lg">
                <TrendingDown className="h-6 w-6 text-warning-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-2xl font-bold text-warning">₹{totalExpenses.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              {expenses.length} transactions
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses List */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>{t('recentTransactions')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {expenses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>{t('noTransactions')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-warning/5 rounded-lg hover:bg-warning/10 transition-colors"
                >
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(expense.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-warning">₹{expense.amount.toLocaleString()}</p>
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