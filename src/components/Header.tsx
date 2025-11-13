import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

type HeaderProps = {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const Header = ({ cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, setCart }: HeaderProps) => {
  const totalCalories = cart.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalProtein = cart.reduce((sum, item) => sum + (item.protein * item.quantity), 0);
  const totalCarbs = cart.reduce((sum, item) => sum + (item.carbs * item.quantity), 0);
  const totalFats = cart.reduce((sum, item) => sum + (item.fats * item.quantity), 0);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/26e64aca-e25a-4bbe-81c9-7aec4b660090.jpg" 
              alt="Pro Баланс" 
              className="h-12 w-12 object-contain rounded-2xl"
            />
            <h1 className="text-2xl font-bold text-lime-800">Pro Баланс</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#menu" className="text-sm font-medium hover:text-primary transition-colors text-yellow-900">Меню</a>
            <a href="#rations" className="text-sm font-medium hover:text-primary transition-colors text-yellow-900">Рационы</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors text-yellow-900">О нас</a>
            <a href="#blog" className="text-sm font-medium hover:text-primary transition-colors text-yellow-900">Блог</a>
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
  );
};

export default Header;
