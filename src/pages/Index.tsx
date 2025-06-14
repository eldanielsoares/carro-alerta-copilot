
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, CheckCircle, Smartphone, Shield, TrendingUp, Users, Gift, Zap, Clock, DollarSign } from 'lucide-react';

const Index = () => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour countdown

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const quizQuestions = [
    {
      question: "Qual o ano de fabricação do seu carro?",
      options: ["Até 5 anos", "6 a 10 anos", "Mais de 10 anos"],
      loading: "Analisando o nível de risco do seu veículo..."
    },
    {
      question: "Alguma vez já precisou chamar guincho?",
      options: ["Sim", "Não"],
      loading: "Calculando sua exposição a falhas mecânicas..."
    },
    {
      question: "Já viu a luz da injeção acender?",
      options: ["Sim", "Não", "Não lembro"],
      loading: "Estamos calculando quanto você poderia estar economizando..."
    }
  ];

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setTimeout(() => {
        setShowForm(true);
      }, 2000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    const randomCoupon = `ORYZUM${Math.floor(Math.random() * 1000)}`;
    setCouponCode(randomCoupon);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Countdown */}
      <div className="bg-red-600 text-white py-3 px-4 text-center animate-pulse-red">
        <div className="flex items-center justify-center gap-2">
          <Clock size={16} />
          <span className="font-bold">OFERTA EXPIRA EM: {formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            <span className="text-red-600">Seu carro pode estar escondendo</span>
            <br />
            <span className="text-black">um problema sério</span>
            <br />
            <span className="text-gray-600">— e você nem imagina.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Descubra os problemas ocultos do seu carro <span className="text-red-600 font-bold">ANTES</span> que virem prejuízo. 
            Nossa IA monitora seu carro 24h e te avisa direto no WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold">
              <Zap className="mr-2" />
              QUERO PROTEGER MEU CARRO AGORA
            </Button>
            <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg font-bold">
              VER COMO FUNCIONA
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Intensification */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-8">
              <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4 animate-shake" />
              <h2 className="text-3xl font-bold text-black mb-6">
                Você está jogando <span className="text-red-600">ROLETA RUSSA</span> toda vez que liga o carro
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                A cada quilômetro rodado, seu carro acumula micro-falhas que você não vê. 
                Quando finalmente aparecem, já é tarde demais — e o estrago no seu bolso é inevitável.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-red-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-red-600 text-3xl font-bold mb-2">R$ 3.000</div>
                  <p className="text-gray-700">Motor fundido sem aviso</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-red-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-red-600 text-3xl font-bold mb-2">R$ 1.500</div>
                  <p className="text-gray-700">Bateria que morre na pior hora</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-red-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-red-600 text-3xl font-bold mb-2">R$ 2.200</div>
                  <p className="text-gray-700">Sistema elétrico em pane</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-red-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-red-600 text-3xl font-bold mb-2">R$ 800</div>
                  <p className="text-gray-700">Guincho + diária perdida</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-8 bg-white rounded-lg border-2 border-red-200 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-4">
                "Você não precisa mais jogar roleta russa toda vez que liga o carro. 
                <span className="text-green-600"> Agora existe um jeito de saber ANTES."</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-black mb-12">
              Transforme seu carro num <span className="text-green-600">aliado inteligente</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-green-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Smartphone className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-black">Alertas no WhatsApp</h3>
                  </div>
                  <p className="text-gray-700">
                    Receba notificações inteligentes direto no seu celular. 
                    Sem código confuso, tudo em português claro.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Shield className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-black">Proteção 24/7</h3>
                  </div>
                  <p className="text-gray-700">
                    IA monitora continuamente a saúde do seu carro. 
                    Problemas detectados antes de virarem prejuízo.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <DollarSign className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-black">Economia Real</h3>
                  </div>
                  <p className="text-gray-700">
                    Evite gastos de R$ 1.500 a R$ 3.000 por ano. 
                    Manutenção preventiva custa 5x menos.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                    <h3 className="text-xl font-bold text-black">Tranquilidade Total</h3>
                  </div>
                  <p className="text-gray-700">
                    Durma em paz sabendo que sua família está protegida. 
                    Nunca mais fique na mão.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-black mb-12">
              Como funciona (é mais simples do que trocar pneu)
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Plugue o Scanner</h3>
                <p className="text-gray-700">Conecte o dispositivo OBD2 em 30 segundos. Mais fácil que carregar o celular.</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">IA Monitora</h3>
                <p className="text-gray-700">Nossa inteligência artificial trabalha 24h analisando a saúde do seu carro.</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Recebe Alertas</h3>
                <p className="text-gray-700">WhatsApp te avisa sobre problemas ANTES que eles aconteçam. Simples assim.</p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-white rounded-lg border-2 border-green-200 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-4">
                Resultado: <span className="text-green-600">R$ 1.500 a R$ 3.000 economizados por ano</span>
              </h3>
              <p className="text-lg text-gray-700">
                Isso sem contar a tranquilidade de nunca mais ficar na mão ou passar vergonha com o carro parado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black mb-8">
              Tecnologia que já salvou <span className="text-green-600">milhares de motoristas</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                <p className="text-gray-700">Compatibilidade com carros brasileiros</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">15.000+</div>
                <p className="text-gray-700">Motoristas já protegidos</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">R$ 2.100</div>
                <p className="text-gray-700">Economia média por motorista/ano</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="text-black border-black">✓ Tecnologia Internacional</Badge>
              <Badge variant="outline" className="text-black border-black">✓ Manutenção Preditiva</Badge>
              <Badge variant="outline" className="text-black border-black">✓ 100% Seguro</Badge>
              <Badge variant="outline" className="text-black border-black">✓ Fácil Instalação</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      {!showForm && !showSuccess && (
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-black mb-8">
                🎯 Descubra o nível de risco do seu carro em 30 segundos
              </h2>

              {quizStep < quizQuestions.length ? (
                <Card className="bg-white border-2 border-blue-200 shadow-xl">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-blue-600 font-semibold">
                          Pergunta {quizStep + 1} de {quizQuestions.length}
                        </span>
                        <div className="flex gap-1">
                          {quizQuestions.map((_, index) => (
                            <div
                              key={index}
                              className={`w-3 h-3 rounded-full ${
                                index <= quizStep ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-black mb-6">
                        {quizQuestions[quizStep].question}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {quizQuestions[quizStep].options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleQuizAnswer(option)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 text-left justify-start font-bold"
                          size="lg"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white border-2 border-blue-200 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div className="animate-pulse">
                      <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-black mb-4">
                        {quizQuestions[quizQuestions.length - 1].loading}
                      </h3>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
                      </div>
                      <p className="text-gray-700">Preparando sua análise personalizada...</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Scarcity + Form Section */}
      {showForm && !showSuccess && (
        <section className="py-16 bg-orange-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Alert className="mb-8 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-black">
                  <strong>⚠️ ATENÇÃO:</strong> Você quase chegou a tempo. A primeira leva de 300 scanners ESGOTOU.
                </AlertDescription>
              </Alert>

              <Card className="bg-white border-2 border-orange-200 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-black mb-4">
                      Mas você ainda pode entrar na próxima remessa <span className="text-orange-600">PRIORITÁRIA</span>
                    </h2>
                    <p className="text-lg text-gray-700">
                      Preencha seus dados abaixo e entre para o grupo dos motoristas que mais economizam 
                      antes que seu carro vire um problema.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-black font-semibold">Nome completo</Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-white border-2 border-gray-200 text-black focus:border-orange-500"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-black font-semibold">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-white border-2 border-gray-200 text-black focus:border-orange-500"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatsapp" className="text-black font-semibold">WhatsApp</Label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                        className="bg-white border-2 border-gray-200 text-black focus:border-orange-500"
                        placeholder="(11) 99999-9999"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-bold animate-pulse-red"
                    >
                      <Gift className="mr-2" />
                      QUERO MEU SCANNER COM DESCONTO
                    </Button>
                  </form>

                  <div className="mt-8 p-6 bg-green-50 rounded-lg border-2 border-green-200">
                    <h3 className="text-xl font-bold text-green-600 mb-2">🎁 Oferta Especial:</h3>
                    <p className="text-black mb-2">
                      ✓ <strong>25% de desconto exclusivo</strong> na próxima leva
                    </p>
                    <p className="text-black">
                      ✓ <strong>Indique 1 amigo e ambos ganham 40% de desconto</strong>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Success Section */}
      {showSuccess && (
        <section className="py-16 bg-green-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="bg-white border-2 border-green-200 shadow-xl">
                <CardContent className="p-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-black mb-4">
                    🎉 Parabéns! Seus problemas com o carro estão prestes a virar coisa do passado.
                  </h2>
                  <p className="text-lg text-gray-700 mb-8">
                    Agora sim: vai sobrar mais dinheiro pra levar o mozão pra comer sushi caro. 😉
                  </p>

                  <Separator className="my-8" />

                  <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
                    <h3 className="text-xl font-bold text-black mb-4">
                      🎫 Crie seu cupom VIP, compartilhe com os amigos e economize ainda mais
                    </h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Crie seu código personalizado"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="bg-white border-2 border-gray-200 text-black"
                        />
                        <Button className="bg-purple-600 hover:bg-purple-700 font-bold">
                          Gerar
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Compartilhe este cupom com seus amigos e ganhem 40% de desconto juntos!
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <Button className="bg-green-600 hover:bg-green-700 font-bold">
                      <Users className="mr-2" />
                      Compartilhar
                    </Button>
                    <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white font-bold">
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-black mb-4">ORYZUM COPILOT</h3>
          <p className="text-gray-600 mb-4">
            A solução definitiva para nunca mais ter surpresas com seu carro.
          </p>
          <p className="text-sm text-gray-500">
            © 2024 Oryzum Copilot. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
