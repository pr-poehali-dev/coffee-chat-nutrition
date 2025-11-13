import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type MenuItem = {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  price: number;
  category: string;
  image: string;
};

type CartItem = MenuItem & { quantity: number };

type HeroSectionProps = {
  cart: CartItem[];
  calorieGoal: number;
  setCalorieGoal: (goal: number) => void;
};

const HeroSection = ({ cart, calorieGoal, setCalorieGoal }: HeroSectionProps) => {
  const totalCalories = cart.reduce((sum, item) => sum + (item.calories * item.quantity), 0);

  return (
    <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Правильное питание — вкусно и просто
          </h2>
          <p className="text-xl text-muted-foreground">
            Здоровые блюда с точным подсчётом калорий и нутриентов. Доставка за 60 минут.
          </p>
          
          <Card className="mt-8 max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-lg">Калькулятор калорий</CardTitle>
              <CardDescription>Укажите вашу дневную норму</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="calories">Целевая норма калорий</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={calorieGoal}
                    onChange={(e) => setCalorieGoal(Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                {cart.length > 0 && (
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Выбрано:</span>
                      <span className="font-semibold">{totalCalories} ккал</span>
                    </div>
                    <div className="mt-2 bg-background rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${Math.min((totalCalories / calorieGoal) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {calorieGoal - totalCalories > 0 
                        ? `Осталось ${calorieGoal - totalCalories} ккал` 
                        : 'Дневная норма достигнута'}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
