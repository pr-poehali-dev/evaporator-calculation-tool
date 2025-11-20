import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Index = () => {
  const [diameter, setDiameter] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [tubeCount, setTubeCount] = useState<string>('');
  const [tubeLength, setTubeLength] = useState<string>('');
  const [results, setResults] = useState<{
    surfaceArea: number;
    volume: number;
    heatTransferArea: number;
  } | null>(null);

  const calculateParameters = () => {
    const d = parseFloat(diameter);
    const h = parseFloat(height);
    const n = parseInt(tubeCount);
    const l = parseFloat(tubeLength);

    if (!d || !h || !n || !l) return;

    const surfaceArea = Math.PI * d * h + 2 * Math.PI * (d / 2) ** 2;
    const volume = Math.PI * (d / 2) ** 2 * h;
    const heatTransferArea = n * Math.PI * 0.025 * l;

    setResults({
      surfaceArea: parseFloat(surfaceArea.toFixed(4)),
      volume: parseFloat(volume.toFixed(4)),
      heatTransferArea: parseFloat(heatTransferArea.toFixed(4)),
    });
  };

  const referenceData = [
    { parameter: 'Теплоёмкость воды', value: '4.186 кДж/(кг·K)', description: 'При 20°C' },
    { parameter: 'Плотность воды', value: '998 кг/м³', description: 'При 20°C' },
    { parameter: 'Теплота парообразования', value: '2257 кДж/кг', description: 'При 100°C' },
    { parameter: 'Коэффициент теплопроводности стали', value: '50 Вт/(м·K)', description: 'Нержавеющая сталь' },
    { parameter: 'Диаметр трубки стандартный', value: '25 мм', description: 'Наружный диаметр' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-primary">
              <Icon name="FlaskConical" size={28} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Расчёт испарителя
              </h1>
              <p className="text-sm text-muted-foreground">
                Система инженерных расчётов геометрических параметров
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Icon name="Calculator" size={18} />
              Калькулятор
            </TabsTrigger>
            <TabsTrigger value="reference" className="flex items-center gap-2">
              <Icon name="BookOpen" size={18} />
              Справочник
            </TabsTrigger>
            <TabsTrigger value="schemes" className="flex items-center gap-2">
              <Icon name="Network" size={18} />
              Схемы
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Settings" size={20} />
                  Исходные данные
                </CardTitle>
                <CardDescription>
                  Введите геометрические параметры испарителя для расчёта
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="diameter">Диаметр корпуса, м</Label>
                    <Input
                      id="diameter"
                      type="number"
                      step="0.01"
                      placeholder="1.2"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Высота корпуса, м</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.01"
                      placeholder="3.5"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tubeCount">Количество трубок, шт</Label>
                    <Input
                      id="tubeCount"
                      type="number"
                      placeholder="120"
                      value={tubeCount}
                      onChange={(e) => setTubeCount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tubeLength">Длина трубок, м</Label>
                    <Input
                      id="tubeLength"
                      type="number"
                      step="0.01"
                      placeholder="2.5"
                      value={tubeLength}
                      onChange={(e) => setTubeLength(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  onClick={calculateParameters}
                  className="mt-6 w-full md:w-auto"
                  size="lg"
                >
                  <Icon name="Calculator" size={18} className="mr-2" />
                  Рассчитать
                </Button>
              </CardContent>
            </Card>

            {results && (
              <Card className="border-primary/20 animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="FileText" size={20} />
                    Результаты расчёта
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <div className="text-sm font-medium text-muted-foreground">
                        Площадь поверхности корпуса
                      </div>
                      <div className="mt-2 text-3xl font-bold text-foreground">
                        {results.surfaceArea}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">м²</div>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <div className="text-sm font-medium text-muted-foreground">
                        Объём корпуса
                      </div>
                      <div className="mt-2 text-3xl font-bold text-foreground">
                        {results.volume}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">м³</div>
                    </div>
                    <div className="rounded-lg border bg-muted/30 p-4">
                      <div className="text-sm font-medium text-muted-foreground">
                        Площадь теплообмена
                      </div>
                      <div className="mt-2 text-3xl font-bold text-foreground">
                        {results.heatTransferArea}
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">м²</div>
                    </div>
                  </div>
                  <div className="mt-6 rounded-lg bg-primary/5 p-4">
                    <div className="text-sm font-medium text-foreground">Формулы расчёта:</div>
                    <div className="mt-2 space-y-1 text-xs font-mono text-muted-foreground">
                      <div>S = π·D·H + 2·π·(D/2)²</div>
                      <div>V = π·(D/2)²·H</div>
                      <div>F = n·π·d·L (d = 0.025 м)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reference">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Database" size={20} />
                  Справочные данные
                </CardTitle>
                <CardDescription>
                  Технические характеристики и константы для расчётов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Параметр</TableHead>
                      <TableHead className="font-semibold">Значение</TableHead>
                      <TableHead className="font-semibold">Примечание</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referenceData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.parameter}</TableCell>
                        <TableCell className="font-mono text-primary">
                          {item.value}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {item.description}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Icon name="Info" size={18} />
                    Дополнительная информация
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="types">
                      <AccordionTrigger>Типы испарителей</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        <ul className="list-disc list-inside space-y-2">
                          <li>Кожухотрубные — наиболее распространённые в промышленности</li>
                          <li>Пластинчатые — компактные, высокая эффективность теплообмена</li>
                          <li>Плёночные — для термочувствительных продуктов</li>
                          <li>Выпарные аппараты — для концентрирования растворов</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="materials">
                      <AccordionTrigger>Материалы конструкций</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        <ul className="list-disc list-inside space-y-2">
                          <li>Нержавеющая сталь AISI 304, 316 — устойчивость к коррозии</li>
                          <li>Углеродистая сталь — экономичный вариант для нейтральных сред</li>
                          <li>Титан — для агрессивных сред и морской воды</li>
                          <li>Медные сплавы — высокая теплопроводность</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="norms">
                      <AccordionTrigger>Нормативные документы</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        <ul className="list-disc list-inside space-y-2">
                          <li>ГОСТ 9931-79 — Корпуса цилиндрические стальных сварных сосудов</li>
                          <li>ГОСТ 14249-89 — Сосуды и аппараты. Нормы и методы расчёта</li>
                          <li>ПБ 03-576-03 — Правила устройства и безопасной эксплуатации</li>
                          <li>ASME Section VIII — Международный стандарт на сосуды под давлением</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schemes">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Box" size={20} />
                    Конструкция испарителя
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center p-8">
                    <div className="text-center space-y-8 w-full">
                      <div className="relative mx-auto w-48 h-64 border-4 border-primary rounded-lg">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-medium">
                          D
                        </div>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-medium">
                          H
                        </div>
                        <div className="absolute inset-x-6 top-1/3 space-y-1">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-0.5 bg-primary/60 rounded"></div>
                          ))}
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                          <Icon name="ArrowDown" size={16} className="text-primary" />
                        </div>
                        <div className="absolute top-2 left-1/2 -translate-x-1/2">
                          <Icon name="ArrowUp" size={16} className="text-primary" />
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>D — Диаметр корпуса</div>
                        <div>H — Высота корпуса</div>
                        <div className="text-primary">Трубный пучок внутри</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Zap" size={20} />
                    Схема потоков
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted/30 rounded-lg border-2 border-dashed border-border flex items-center justify-center p-8">
                    <div className="space-y-6 w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded border border-primary">
                          <Icon name="Droplets" size={16} className="text-primary" />
                          <span className="text-sm font-medium">Сырьё</span>
                        </div>
                        <Icon name="ArrowRight" size={24} className="text-primary" />
                      </div>
                      
                      <div className="border-4 border-primary rounded-lg p-6 space-y-4">
                        <div className="text-center text-sm font-semibold">ИСПАРИТЕЛЬ</div>
                        <div className="grid grid-cols-3 gap-2">
                          {[...Array(9)].map((_, i) => (
                            <div key={i} className="h-8 bg-primary/20 rounded"></div>
                          ))}
                        </div>
                        <div className="flex items-center justify-center gap-2 text-xs text-primary">
                          <Icon name="Thermometer" size={14} />
                          <span>Теплообмен</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Icon name="ArrowRight" size={24} className="text-primary" />
                        <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded border border-primary">
                          <Icon name="Wind" size={16} className="text-primary" />
                          <span className="text-sm font-medium">Пар</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Icon name="ArrowRight" size={24} className="text-primary" />
                        <div className="flex items-center gap-2 px-3 py-2 bg-secondary/10 rounded border border-secondary">
                          <Icon name="Beaker" size={16} className="text-secondary" />
                          <span className="text-sm font-medium">Концентрат</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Gauge" size={20} />
                    Технические параметры
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Icon name="Thermometer" size={18} />
                        <span className="font-medium text-sm">Температура</span>
                      </div>
                      <div className="text-2xl font-bold">80-120°C</div>
                      <div className="text-xs text-muted-foreground">Рабочий диапазон</div>
                    </div>
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Icon name="Gauge" size={18} />
                        <span className="font-medium text-sm">Давление</span>
                      </div>
                      <div className="text-2xl font-bold">0.3-0.8 МПа</div>
                      <div className="text-xs text-muted-foreground">Номинальное</div>
                    </div>
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Icon name="Droplets" size={18} />
                        <span className="font-medium text-sm">Производительность</span>
                      </div>
                      <div className="text-2xl font-bold">1-5 т/ч</div>
                      <div className="text-xs text-muted-foreground">По испарению</div>
                    </div>
                    <div className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-2 text-primary">
                        <Icon name="Zap" size={18} />
                        <span className="font-medium text-sm">КПД</span>
                      </div>
                      <div className="text-2xl font-bold">85-95%</div>
                      <div className="text-xs text-muted-foreground">Эффективность</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
