import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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

type MenuSectionProps = {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  filteredItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
};

const MenuSection = ({ selectedCategory, setSelectedCategory, filteredItems, addToCart }: MenuSectionProps) => {
  return (
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
  );
};

export default MenuSection;
