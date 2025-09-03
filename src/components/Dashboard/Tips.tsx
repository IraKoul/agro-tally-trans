import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Lightbulb, 
  Sprout, 
  PiggyBank, 
  Shield, 
  FileText, 
  Droplets, 
  BarChart3 
} from 'lucide-react';

export default function Tips() {
  const { t } = useLanguage();

  const tips = [
    {
      id: 1,
      icon: Sprout,
      title: t('tip1Title'),
      description: t('tip1Desc'),
      color: 'success'
    },
    {
      id: 2,
      icon: PiggyBank,
      title: t('tip2Title'),
      description: t('tip2Desc'),
      color: 'accent'
    },
    {
      id: 3,
      icon: Shield,
      title: t('tip3Title'),
      description: t('tip3Desc'),
      color: 'primary'
    },
    {
      id: 4,
      icon: FileText,
      title: t('tip4Title'),
      description: t('tip4Desc'),
      color: 'warning'
    },
    {
      id: 5,
      icon: Droplets,
      title: t('tip5Title'),
      description: t('tip5Desc'),
      color: 'primary-light'
    },
    {
      id: 6,
      icon: BarChart3,
      title: t('tip6Title'),
      description: t('tip6Desc'),
      color: 'success'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'success':
        return 'border-success/20 bg-success/5 text-success';
      case 'accent':
        return 'border-accent/20 bg-accent/5 text-accent-foreground';
      case 'primary':
        return 'border-primary/20 bg-primary/5 text-primary';
      case 'warning':
        return 'border-warning/20 bg-warning/5 text-warning-foreground';
      default:
        return 'border-primary/20 bg-primary/5 text-primary';
    }
  };

  const getIconColorClasses = (color: string) => {
    switch (color) {
      case 'success':
        return 'text-success bg-success/10';
      case 'accent':
        return 'text-accent-foreground bg-accent/10';
      case 'primary':
        return 'text-primary bg-primary/10';
      case 'warning':
        return 'text-warning-foreground bg-warning/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">{t('farmingTips')}</h2>
        <p className="text-muted-foreground">Expert advice for better farming and financial management</p>
      </div>

      {/* Header Card */}
      <Card className="shadow-medium bg-gradient-primary text-primary-foreground">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
            <Lightbulb className="h-8 w-8" />
            <span>Smart Farming Tips</span>
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Practical advice to grow your farming business and increase profitability
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tips Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip) => {
          const IconComponent = tip.icon;
          return (
            <Card 
              key={tip.id} 
              className={`shadow-soft hover:shadow-medium transition-shadow duration-300 ${getColorClasses(tip.color)}`}
            >
              <CardHeader>
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getIconColorClasses(tip.color)}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight">{tip.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{tip.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Resources */}
      <Card className="shadow-medium border-accent/20">
        <CardHeader>
          <CardTitle className="text-accent-foreground">Need More Help?</CardTitle>
          <CardDescription>
            Connect with agricultural experts and access more resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-accent/5 rounded-lg">
              <h4 className="font-semibold text-accent-foreground mb-2">Agricultural Extension Services</h4>
              <p className="text-sm text-muted-foreground">
                Contact your local agricultural extension office for personalized farming advice and training programs.
              </p>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Financial Planning Resources</h4>
              <p className="text-sm text-muted-foreground">
                Explore government schemes, subsidies, and loan programs available for farmers in your region.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}