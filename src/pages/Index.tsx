import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

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

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Капучино без сахара',
    description: 'Классический капучино на миндальном молоке',
    calories: 120,
    protein: 6,
    carbs: 10,
    fats: 5,
    price: 250,
    category: 'coffee',
    image: '☕'
  },
  {
    id: 2,
    name: 'Овсяная каша с ягодами',
    description: 'Овсянка на воде с лесными ягодами и медом',
    calories: 320,
    protein: 12,
    carbs: 55,
    fats: 6,
    price: 350,
    category: 'breakfast',
    image: '🥣'
  },
  {
    id: 3,
    name: 'Боул с авокадо',
    description: 'Киноа, авокадо, томаты черри, шпинат',
    calories: 450,
    protein: 15,
    carbs: 48,
    fats: 22,
    price: 520,
    category: 'lunch',
    image: '🥗'
  },
  {
    id: 4,
    name: 'Смузи "Зелёный детокс"',
    description: 'Шпинат, банан, яблоко, имбирь',
    calories: 180,
    protein: 4,
    carbs: 38,
    fats: 2,
    price: 320,
    category: 'drinks',
    image: '🥤'
  },
  {
    id: 5,
    name: 'Куриная грудка с киноа',
    description: 'Запечённая куриная грудка, киноа, овощи гриль',
    calories: 520,
    protein: 45,
    carbs: 42,
    fats: 12,
    price: 680,
    category: 'lunch',
    image: '🍗'
  },
  {
    id: 6,
    name: 'Протеиновый шейк',
    description: 'Банан, протеин, миндальное молоко, арахисовая паста',
    calories: 380,
    protein: 32,
    carbs: 35,
    fats: 12,
    price: 420,
    category: 'drinks',
    image: '🥛'
  },
  {
    id: 7,
    name: 'Сэндвич с лососем',
    description: 'Цельнозерновой хлеб, лосось, авокадо, микрозелень',
    calories: 420,
    protein: 28,
    carbs: 38,
    fats: 18,
    price: 590,
    category: 'breakfast',
    image: '🥪'
  },
  {
    id: 8,
    name: 'Матча латте',
    description: 'Матча премиум качества на овсяном молоке',
    calories: 140,
    protein: 5,
    carbs: 18,
    fats: 5,
    price: 320,
    category: 'coffee',
    image: '🍵'
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [calorieGoal, setCalorieGoal] = useState<number>(2000);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    toast.success(`${item.name} добавлено в корзину`);
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const totalCalories = cart.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalProtein = cart.reduce((sum, item) => sum + (item.protein * item.quantity), 0);
  const totalCarbs = cart.reduce((sum, item) => sum + (item.carbs * item.quantity), 0);
  const totalFats = cart.reduce((sum, item) => sum + (item.fats * item.quantity), 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌱</span>
              <h1 className="text-2xl font-bold text-primary">GreenCafe</h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#menu" className="text-sm font-medium hover:text-primary transition-colors">Меню</a>
              <a href="#rations" className="text-sm font-medium hover:text-primary transition-colors">Рационы</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
              <a href="#blog" className="text-sm font-medium hover:text-primary transition-colors">Блог</a>
              <a href="#reviews" className="text-sm font-medium hover:text-primary transition-colors">Отзывы</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>

            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров: ${cart.length}`}
                  </SheetDescription>
                </SheetHeader>
                
                {cart.length > 0 && (
                  <div className="mt-8 space-y-6">
                    <div className="space-y-4">
                      {cart.map(item => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <div className="text-4xl">{item.image}</div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm">{item.name}</h4>
                                <p className="text-xs text-muted-foreground mt-1">{item.calories} ккал</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="text-sm w-8 text-center">{item.quantity}</span>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{item.price * item.quantity} ₽</p>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-7 w-7 mt-2"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card className="bg-muted/50">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Калории:</span>
                          <span className="font-semibold">{totalCalories} ккал</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Белки / Углеводы / Жиры:</span>
                          <span className="font-semibold">{totalProtein}г / {totalCarbs}г / {totalFats}г</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span>{totalPrice} ₽</span>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <Label htmlFor="address">Адрес доставки</Label>
                      <Input id="address" placeholder="Улица, дом, квартира" />
                      
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
                      
                      <Label htmlFor="time">Желаемое время</Label>
                      <Input id="time" type="time" />
                      
                      <Button className="w-full mt-4" size="lg" onClick={() => {
                        toast.success('Заказ оформлен! Мы свяжемся с вами в ближайшее время.');
                        setCart([]);
                        setIsCartOpen(false);
                      }}>
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

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

      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Наше меню</h3>
            <p className="text-muted-foreground">Выбирайте блюда под вашу норму калорий</p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
              <TabsTrigger value="all">Всё</TabsTrigger>
              <TabsTrigger value="coffee">Кофе</TabsTrigger>
              <TabsTrigger value="breakfast">Завтраки</TabsTrigger>
              <TabsTrigger value="lunch">Обеды</TabsTrigger>
              <TabsTrigger value="drinks">Напитки</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredItems.map(item => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-7xl">
                      {item.image}
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                        <Badge variant="secondary" className="shrink-0">{item.calories} ккал</Badge>
                      </div>
                      <CardDescription className="text-sm">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="font-semibold">{item.protein}г</p>
                          <p className="text-muted-foreground">Белки</p>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="font-semibold">{item.carbs}г</p>
                          <p className="text-muted-foreground">Углеводы</p>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="font-semibold">{item.fats}г</p>
                          <p className="text-muted-foreground">Жиры</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{item.price} ₽</span>
                        <Button onClick={() => addToCart(item)} size="sm">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Добавить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="rations" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Готовые рационы</h3>
            <p className="text-muted-foreground">Сбалансированное питание на весь день</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="text-5xl mb-4">🔥</div>
                <CardTitle>Похудение</CardTitle>
                <CardDescription>1200-1400 ккал/день</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Низкокалорийный рацион с высоким содержанием белка
                </p>
                <Button variant="outline" className="w-full">Подробнее</Button>
              </CardContent>
            </Card>

            <Card className="text-center border-primary">
              <CardHeader>
                <div className="text-5xl mb-4">⚖️</div>
                <CardTitle>Поддержание</CardTitle>
                <CardDescription>1800-2000 ккал/день</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Сбалансированный рацион для поддержания веса
                </p>
                <Button className="w-full">Подробнее</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="text-5xl mb-4">💪</div>
                <CardTitle>Набор массы</CardTitle>
                <CardDescription>2500-3000 ккал/день</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Высококалорийный рацион для роста мышц
                </p>
                <Button variant="outline" className="w-full">Подробнее</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Отзывы клиентов</h3>
            <p className="text-muted-foreground">Что говорят наши клиенты</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Анна', text: 'Отличная кофейня! Наконец-то могу питаться правильно и вкусно. Калории считаются точно.', rating: 5 },
              { name: 'Дмитрий', text: 'Заказываю рацион на поддержание уже 2 месяца. Результат отличный, чувствую себя бодрым!', rating: 5 },
              { name: 'Мария', text: 'Быстрая доставка, всё свежее и вкусное. Рекомендую всем, кто следит за питанием!', rating: 5 }
            ].map((review, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Icon key={j} name="Star" size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{review.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-3">Блог о правильном питании</h3>
            <p className="text-muted-foreground">Полезные статьи и советы</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Как рассчитать свою норму калорий', emoji: '📊', date: '10 ноября 2024' },
              { title: 'Белки, жиры, углеводы: зачем они нужны', emoji: '🥗', date: '8 ноября 2024' },
              { title: 'Топ-10 здоровых перекусов', emoji: '🍎', date: '5 ноября 2024' },
              { title: 'Правда о детокс-диетах', emoji: '🥤', date: '3 ноября 2024' }
            ].map((post, i) => (
              <Card key={i} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-3">{post.emoji}</div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-bold">Контакты</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={24} className="text-primary" />
                    <div>
                      <CardTitle className="text-base">Адрес</CardTitle>
                      <CardDescription>г. Москва, ул. Здоровья, 15</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={24} className="text-primary" />
                    <div>
                      <CardTitle className="text-base">Телефон</CardTitle>
                      <CardDescription>+7 (495) 123-45-67</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={24} className="text-primary" />
                    <div>
                      <CardTitle className="text-base">Email</CardTitle>
                      <CardDescription>info@greencafe.ru</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" size={24} className="text-primary" />
                    <div>
                      <CardTitle className="text-base">Режим работы</CardTitle>
                      <CardDescription>Ежедневно 8:00 — 22:00</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary/5 py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 GreenCafe. Все права защищены.</p>
          <p className="mt-2">Здоровое питание — это просто 🌱</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
