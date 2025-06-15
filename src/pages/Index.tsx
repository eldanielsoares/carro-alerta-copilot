import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, Shield, DollarSign, CheckCircle, Zap, Instagram, Youtube, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo and Social Icons */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-black">ORYZUM COPILOT</h1>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              <Youtube size={24} />
            </a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              <FileText size={24} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              <span className="text-gray-800">Seu carro pode estar escondendo</span>
              <br />
              <span className="text-black">um problema sério</span>
              <br />
              <span className="text-gray-600">— e você nem imagina.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Descubra os problemas ocultos do seu carro <span className="text-gray-800 font-bold">ANTES</span> que virem prejuízo. 
              Nossa IA monitora seu carro 24h e te avisa direto no WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-bold">
                <Zap className="mr-2" />
                QUERO PROTEGER MEU CARRO AGORA
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold">
                VER COMO FUNCIONA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA Section - Moved Up */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black mb-8">
              🎯 Descubra o nível de risco do seu carro em 30 segundos
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Responda 3 perguntas rápidas e veja quanto você pode estar perdendo por não proteger seu carro adequadamente.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/quiz')}
              className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 text-lg font-bold"
            >
              FAZER ANÁLISE GRATUITA
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Intensification */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white border-2 border-gray-300 rounded-lg p-8 mb-8 shadow-lg">
              <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-black mb-6">
                Você está jogando <span className="text-orange-600">ROLETA RUSSA</span> toda vez que liga o carro
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                A cada quilômetro rodado, seu carro acumula micro-falhas que você não vê. 
                Quando finalmente aparecem, já é tarde demais — e o estrago no seu bolso é inevitável.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-orange-600 text-3xl font-bold mb-2">R$ 3.000</div>
                  <p className="text-gray-700">Motor fundido sem aviso</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-orange-600 text-3xl font-bold mb-2">R$ 1.500</div>
                  <p className="text-gray-700">Bateria que morre na pior hora</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-orange-600 text-3xl font-bold mb-2">R$ 2.200</div>
                  <p className="text-gray-700">Sistema elétrico em pane</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-orange-600 text-3xl font-bold mb-2">R$ 800</div>
                  <p className="text-gray-700">Guincho + diária perdida</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 p-8 bg-white rounded-lg border-2 border-gray-300 shadow-lg">
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
              <Card className="bg-gray-50 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Smartphone className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-black">Alertas no WhatsApp</h3>
                  </div>
                  <p className="text-gray-700">
                    Receba notificações inteligentes direto no seu celular. 
                    Sem código confuso, tudo em português claro.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Shield className="w-8 h-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-black">Proteção 24/7</h3>
                  </div>
                  <p className="text-gray-700">
                    IA monitora continuamente a saúde do seu carro. 
                    Problemas detectados antes de virarem prejuízo.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
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

              <Card className="bg-gray-50 border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all">
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
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Plugue o Scanner</h3>
                <p className="text-gray-700">Conecte o dispositivo OBD2 em 30 segundos. Mais fácil que carregar o celular.</p>
              </div>

              <div className="text-center">
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">IA Monitora</h3>
                <p className="text-gray-700">Nossa inteligência artificial trabalha 24h analisando a saúde do seu carro.</p>
              </div>

              <div className="text-center">
                <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Recebe Alertas</h3>
                <p className="text-gray-700">WhatsApp te avisa sobre problemas ANTES que eles aconteçam. Simples assim.</p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-white rounded-lg border-2 border-gray-200 shadow-lg">
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
              <Badge variant="outline" className="text-black border-gray-400">✓ Tecnologia Internacional</Badge>
              <Badge variant="outline" className="text-black border-gray-400">✓ Manutenção Preditiva</Badge>
              <Badge variant="outline" className="text-black border-gray-400">✓ 100% Seguro</Badge>
              <Badge variant="outline" className="text-black border-gray-400">✓ Fácil Instalação</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 border-t border-gray-200">
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
