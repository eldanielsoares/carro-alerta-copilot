import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, CheckCircle, TrendingUp, Gift, Users, Instagram, Youtube, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReferralTab from '@/components/ReferralTab';
import { toast } from "@/hooks/use-toast";

const Quiz = () => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', coupon: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const randomCoupon = `ORYZUM${Math.floor(Math.random() * 1000)}`;
    const cupomToSend = formData.coupon || randomCoupon;
    setCouponCode(cupomToSend);

    const leadUrl = 'https://api.sheety.co/dcad7a9f3b6bfb680d978268bd9f9ee9/outis/leads';
    const cupomUrl = 'https://api.sheety.co/dcad7a9f3b6bfb680d978268bd9f9ee9/outis/cupom';

    const body = {
      lead: {
        nome: formData.name,
        email: formData.email,
        telefone: formData.whatsapp,
        cupom: cupomToSend
      }
    };

    try {
      const response = await fetch(leadUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (formData.email) {
        await fetch(cupomUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cupom: {
              email: formData.email,
              cupom: cupomToSend
            }
          }),
        });
      }

      if (response.ok) {
        const data = await response.json();
        console.log("Lead salvo com sucesso (quiz):", data.lead);
        toast({
          title: "Sucesso!",
          description: "Seus dados foram salvos. Veja seu cupom especial abaixo.",
        });
        setShowSuccess(true);
      } else {
        toast({
          title: "Erro ao salvar dados!",
          description: "Não foi possível enviar seus dados. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro inesperado!",
        description: "Ocorreu um problema ao enviar seus dados.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo and Social Icons */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-black hover:text-gray-700 transition-colors"
            >
              ORYZUM COPILOT
            </button>
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

      {/* Quiz Section */}
      {!showForm && !showSuccess && (
        <section className="py-16 bg-blue-50 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-black mb-8">
                🎯 Descubra o nível de risco do seu carro em 30 segundos
              </h2>

              {quizStep < quizQuestions.length ? (
                <Card className="bg-white border-2 border-gray-200 shadow-xl">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600 font-semibold">
                          Pergunta {quizStep + 1} de {quizQuestions.length}
                        </span>
                        <div className="flex gap-1">
                          {quizQuestions.map((_, index) => (
                            <div
                              key={index}
                              className={`w-3 h-3 rounded-full ${
                                index <= quizStep ? 'bg-gray-600' : 'bg-gray-300'
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
                          className="w-full bg-gray-700 hover:bg-gray-800 text-white p-4 text-left justify-start font-bold"
                          size="lg"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-white border-2 border-gray-200 shadow-xl">
                  <CardContent className="p-8 text-center">
                    <div>
                      <TrendingUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-black mb-4">
                        {quizQuestions[quizQuestions.length - 1].loading}
                      </h3>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div className="bg-gray-600 h-2 rounded-full transition-all duration-1000" style={{width: '100%'}}></div>
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
        <section className="py-16 bg-orange-50 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Alert className="mb-8 border-orange-200 bg-orange-100">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-black">
                  <strong>⚠️ ATENÇÃO:</strong> Você quase chegou a tempo. A primeira leva de 300 scanners ESGOTOU.
                </AlertDescription>
              </Alert>

              <Card className="bg-white border-2 border-gray-200 shadow-xl">
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
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 text-lg font-bold"
                      disabled={isSubmitting}
                    >
                      <Gift className="mr-2" />
                      {isSubmitting ? "Enviando..." : "QUERO MEU SCANNER COM DESCONTO"}
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
        <section className="py-16 bg-green-50 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <ReferralTab couponCode={couponCode} setCouponCode={setCouponCode} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Quiz;
