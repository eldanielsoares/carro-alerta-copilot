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
import { Progress } from "@/components/ui/progress";

const Quiz = () => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', coupon: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scoreStep, setScoreStep] = useState(false); // novo: controla se mostra o score
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

  // Mensagens de motivação para cada etapa do quiz
  const feedbacks = [
    "Ótimo! Falta pouco para sua análise personalizada 🚗",
    "Boa! Só mais uma pergunta e você garantirá seu desconto 💸",
    "Show! Analisando seus dados para garantir o melhor desconto 👏"
  ];

  // Função simples para gerar score
  function calculateScore(answers: string[]) {
    let pontos = 0;
    if (answers[0] === "Mais de 10 anos") pontos += 2;
    else if (answers[0] === "6 a 10 anos") pontos += 1;
    if (answers[1] === "Sim") pontos += 2;
    if (answers[2] === "Sim") pontos += 2;
    else if (answers[2] === "Não lembro") pontos += 1;

    if (pontos >= 4) {
      return { 
        label: "ALTO", 
        msg: "Seu risco está alto! Recomenda-se atenção urgente.",
        progress: 100,
        labelColor: "text-red-600"
      };
    } else if (pontos >= 2) {
      return { 
        label: "MÉDIO", 
        msg: "Risco moderado, vale a pena cuidar mais do seu veículo.",
        progress: 66,
        labelColor: "text-yellow-500"
      };
    } else {
      return { 
        label: "BAIXO", 
        msg: "Muito bom! Seu risco está baixo, continue assim.",
        progress: 33,
        labelColor: "text-green-600"
      };
    }
  }

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];

    // Exibe o toast (do topo) como feedback motivacional
    toast({
      title: feedbacks[quizStep] || 'Perfeito!',
      description: "",
    });
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setTimeout(() => {
        setQuizStep(quizStep + 1);
      }, 500);
    } else {
      // Última pergunta: mostra loading, então formulário, como antes
      setTimeout(() => {
        setScoreStep(true); // mostrar feedback do score
      }, 2000);
    }
  };

  const handleContinueAfterScore = () => {
    setScoreStep(false);
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Sempre gera um cupom aleatório novo ao enviar
    const randomCoupon = `ORYZUM${Math.floor(Math.random() * 100000)}`;
    setCouponCode(randomCoupon);

    const leadUrl = 'https://api.sheety.co/dcad7a9f3b6bfb680d978268bd9f9ee9/outis/leads';
    const cupomUrl = 'https://api.sheety.co/dcad7a9f3b6bfb680d978268bd9f9ee9/outis/cupom';

    const body = {
      lead: {
        nome: formData.name,
        email: formData.email,
        telefone: formData.whatsapp,
        // Aqui envia "coupon" do form (indicação do amigo), se houver
        cupom: formData.coupon || ''
      }
    };

    try {
      const response = await fetch(leadUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Sempre salva o cupom NOVO e aleatório
      if (formData.email) {
        await fetch(cupomUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cupom: {
              email: formData.email,
              cupom: randomCoupon
            }
          }),
        });
      }

      if (response.ok) {
        const data = await response.json();
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
      {!showForm && !showSuccess && !scoreStep && (
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

      {/* Card de feedback do score */}
      {scoreStep && !showForm && !showSuccess && (
        <section className="py-16 bg-blue-50 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto">
              <div className="bg-white border-2 border-gray-200 shadow-xl rounded-xl p-8 text-center flex flex-col items-center">
                {
                  (() => {
                    const result = calculateScore(quizAnswers);
                    const progress = result.progress;
                    return (
                      <>
                        <span className={`text-xl font-bold mb-3 uppercase tracking-wide ${result.labelColor}`}>
                          {result.label}
                        </span>
                        <div className="relative w-full max-w-xs mb-2 h-8 flex items-center">
                          <div className="w-full h-5 rounded-full overflow-hidden bg-gradient-to-r from-green-400 via-yellow-400 to-red-500" />
                          <div
                            className="absolute top-0 left-0 h-8 flex items-center pointer-events-none"
                            style={{
                              left: `calc(${progress}% - 1px)`,
                            }}
                          >
                            <div className="w-0.5 h-8 bg-black/80 rounded" />
                          </div>
                          <div
                            className="absolute top-0 bottom-0 right-0 bg-white pointer-events-none"
                            style={{
                              left: `calc(${progress}% )`,
                              width: `calc(100% - ${progress}%)`,
                              borderRadius: "0 999px 999px 0",
                              opacity: 0.75,
                              zIndex: 10,
                            }}
                          ></div>
                        </div>
                        <div className="mb-6 text-gray-800 text-lg mt-4">{result.msg}</div>
                        <Button
                          size="lg"
                          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-10 break-words whitespace-normal"
                          onClick={handleContinueAfterScore}
                        >
                          GARANTIR MEU DESCONTO AGORA
                        </Button>
                      </>
                    );
                  })()
                }
              </div>
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
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 text-lg font-bold break-words whitespace-normal"
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
