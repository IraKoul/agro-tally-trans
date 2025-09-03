import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import heroFarm from '@/assets/hero-farm.jpg';

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // For demo purposes, create a mock user session
        const mockUser = {
          id: '1',
          email: email,
          user_metadata: { name: 'Demo Farmer' }
        };
        onLogin(mockUser);
        toast({
          title: "Success",
          description: "Demo login successful! (Using mock data for demo)",
        });
      } else {
        onLogin(data.user);
        toast({
          title: "Success", 
          description: "Login successful!",
        });
      }
    } catch (error) {
      // Even on error, allow demo login
      const mockUser = {
        id: '1',
        email: email,
        user_metadata: { name: 'Demo Farmer' }
      };
      onLogin(mockUser);
      toast({
        title: "Demo Mode",
        description: "Logged in with demo data for testing",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero image */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
        <img 
          src={heroFarm} 
          alt="AgriFinTech Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-primary opacity-80" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">AgriFinTech</h1>
          <p className="text-xl opacity-90">Empowering farmers with smart financial tools</p>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:hidden">
            <h1 className="text-3xl font-bold text-primary mb-2">AgriFinTech</h1>
            <p className="text-muted-foreground">Smart farming, better profits</p>
          </div>

          <Card className="shadow-medium border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">{t('welcome')}</CardTitle>
              <CardDescription>{t('loginSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmer@example.com"
                    required
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-12"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : t('signin')}
                </Button>
              </form>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  Demo: Use any email and password to login
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}