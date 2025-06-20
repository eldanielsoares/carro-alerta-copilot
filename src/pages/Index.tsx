import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Smartphone, Shield, DollarSign, CheckCircle, Zap, Instagram, Youtube, FileText, AlertTriangle, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReferralTab from '@/components/ReferralTab';
import Header from '@/components/Header';
import CtaButton from "@/components/CtaButton";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', coupon: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const scrollToForm = () => {
    const formElement = document.getElementById('protection-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const howItWorksElement = document.getElementById('how-it-works');
    if (howItWorksElement) {
      howItWorksElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = 'https://api.sheety.co/dcad7a9f3b6bfb680d978268bd9f9ee9/outis/leads';
      const cupomUrl = 'https://api.sheety.co/dcad7a9f3b6bfb680d978268bd9f9ee9/outis/cupom';

      // Cupom NOVO e aleatório gerado SEMPRE na inscrição
      const generatedCoupon = `ORYZUM${Math.floor(Math.random() * 100000)}`;
      const body = {
        lead: {
          nome: formData.name,
          email: formData.email,
          telefone: formData.whatsapp,
          // Aqui envia "coupon" do form (indicação do amigo), se houver
          cupom: formData.coupon || ''
        }
      };

      console.log('Enviando dados para Sheety:', body);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const json = await response.json();
      
      if (response.ok) {
        console.log('Lead salvo com sucesso:', json.lead);

        // Após o lead ser salvo, salva o cupom aleatório NOVO na aba cupom
        if (formData.email) {
          await fetch(cupomUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              cupom: {
                email: formData.email,
                cupom: generatedCoupon
              }
            })
          });
        }

        setCouponCode(generatedCoupon);
        setShowSuccess(true);
        toast({
          title: "Sucesso!",
          description: "Seus dados foram salvos com sucesso. Entraremos em contato em breve!",
        });
      } else {
        throw new Error('Erro ao salvar os dados');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar seus dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ lineHeight: '1.2' }}>
              <span
                className="block bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent"
              >
                Seu carro pode estar escondendo
              </span>
              <span
                className="block bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent"
              >
                um problema sério
              </span>
              <span
                className="block bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent"
              >
                — e você nem imagina.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Descubra os problemas ocultos do seu carro <span className="text-gray-800 font-bold">ANTES</span> que virem prejuízo. 
              Nossa IA monitora seu carro 24h e te avisa direto no WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-4 text-base font-bold uppercase tracking-tight rounded-md border-0 shadow-none whitespace-normal text-center min-h-[56px] transition-colors leading-tight"
              >
                <span className="break-words hyphens-auto">
                  QUERO PROTEGER MEU CARRO AGORA
                </span>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={scrollToHowItWorks}
                className="w-full sm:w-auto border-gray-600 text-gray-700 hover:bg-gray-100 px-6 py-4 text-base font-bold whitespace-normal text-center min-h-[56px] rounded-md shadow-none leading-tight"
              >
                <span className="break-words hyphens-auto">
                  VER COMO FUNCIONA
                </span>
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
              className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-4 text-base font-bold transition-colors whitespace-normal leading-tight"
            >
              <span className="break-words hyphens-auto">
                FAZER ANÁLISE GRATUITA
              </span>
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
                  <div className="text-orange-600 text-3xl font-bold mb-2">R$ 600</div>
                  <p className="text-gray-700">Bateria que morre na pior hora</p>
                </CardContent>
              </Card>
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-orange-600 text-3xl font-bold mb-2">R$ 3.000</div>
                  <p className="text-gray-700">Motor fundido sem aviso</p>
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
      <section 
        id="how-it-works"
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-black mb-12">
              Como funciona (é mais simples do que trocar pneu)
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                    Plugue o Scanner
                  </span>
                </h3>
                <p className="text-gray-700">Conecte o dispositivo OBD2 em 30 segundos. Mais fácil que carregar o celular.</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                    IA Monitora
                  </span>
                </h3>
                <p className="text-gray-700">Nossa inteligência artificial trabalha 24h analisando a saúde do seu carro.</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-green-500 to-green-700 bg-clip-text text-transparent">
                    Recebe Alertas
                  </span>
                </h3>
                <p className="text-gray-700">WhatsApp te avisa sobre problemas ANTES que eles aconteçam. Simples assim.</p>
              </div>
            </div>
            <div className="mt-12 p-8 bg-white rounded-lg border-2 border-gray-200 shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                Resultado: <span className="text-green-600">R$ 1.500 a R$ 3.000 economizados por ano</span>
              </h3>
              <p className="text-lg text-gray-700">
                Isso sem contar a tranquilidade de nunca mais ficar na mão ou passar vergonha com o carro parado.
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <CtaButton onClick={scrollToForm}>
                QUERO PROTEGER MEU CARRO AGORA
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black mb-8">
              Tecnologia que já salvou <span className="text-green-600">centenas de motoristas</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                <p className="text-gray-700">Compatibilidade com carros brasileiros</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">+1k</div>
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

      {/* Protection Form Section */}
      <section
        id="protection-form"
        className="py-16 bg-gradient-to-br from-green-100 via-green-200 to-green-300"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {!showSuccess ? (
              <Card
                className="relative bg-white border-none shadow-[0_8px_32px_0_rgba(34,197,94,0.22)] hover:scale-[1.025] transition-all animate-fade-in"
                style={{ zIndex: 2 }}
              >
                <CardContent className="p-10 sm:p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-black mb-4 flex items-center justify-center gap-2">
                      <span role="img" aria-label="escudo">🛡️</span>
                      Proteja seu carro <span className="text-orange-600 ml-1">AGORA</span>
                    </h2>
                    <p className="text-lg text-gray-700">
                      A oferta especial já acabou, mas você ainda pode entrar para a <span className="font-bold text-orange-600">lista de espera</span> e ser avisado na próxima abertura. Preencha seus dados e garanta prioridade!
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

                    <div>
                      <Label htmlFor="coupon" className="text-black font-semibold">Cupom de desconto (opcional)</Label>
                      <Input
                        id="coupon"
                        type="text"
                        value={formData.coupon}
                        onChange={(e) => setFormData({...formData, coupon: e.target.value})}
                        className="bg-white border-2 border-gray-200 text-black focus:border-orange-500"
                        placeholder="Digite seu cupom aqui"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-4 text-base font-bold disabled:opacity-50 transition-colors whitespace-normal leading-tight"
                    >
                      <Gift className="mr-2 flex-shrink-0" />
                      <span className="break-words hyphens-auto">
                        {isSubmitting ? 'ENVIANDO...' : 'ENTRAR NA LISTA DE ESPERA'}
                      </span>
                    </Button>
                  </form>
                  {/* Bloco da Oferta Especial estilizado igual ao quiz */}
                  <div className="mt-8 p-6 bg-green-50 rounded-lg border-2 border-green-200">
                    <h3 className="text-xl font-bold text-green-600 mb-2 flex items-center justify-center gap-1">
                      <Gift className="inline-block mr-2" /> Oferta Especial:
                    </h3>
                    <p className="text-black mb-2">
                      ✓ <strong>25% de desconto exclusivo</strong> na próxima leva
                    </p>
                    <p className="text-black mb-2">
                      ✓ <strong>Indique 1 amigo e ambos ganham 40% de desconto</strong>
                    </p>
                    <p className="text-black mt-2">
                      As próximas vagas serão avisadas por e-mail e WhatsApp. Cadastre-se para garantir prioridade!
                    </p>
                  </div>
                </CardContent>
                {/* brilho visual no topo do card */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1/2 h-2 bg-gradient-to-r from-green-400/60 via-green-200/60 to-green-400/60 rounded-xl blur-md opacity-80 z-10 pointer-events-none" />
              </Card>
            ) : (
              <ReferralTab couponCode={couponCode} setCouponCode={setCouponCode} />
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/lovable-uploads/f4f1a624-beb8-4c0f-9145-34cec43e1fb1.png"
              alt="ORYZUM Logo"
              className="mx-auto h-8 md:h-10 lg:h-12 w-auto"
              style={{ maxWidth: 180 }}
            />
          </div>
          <p className="text-gray-600 mb-4">
            A solução definitiva para nunca mais ter surpresas com seu carro.
          </p>
          <div className="flex justify-center mt-4">
            <CtaButton onClick={scrollToForm}>
              QUERO PROTEGER MEU CARRO AGORA
            </CtaButton>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            © 2025 Oryzum Copilot. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
