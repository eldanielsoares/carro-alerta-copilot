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
import Header from '@/components/Header';

const Quiz = () => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', coupon: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scoreStep, setScoreStep] = useState(false);
  const navigate = useNavigate();

  const quizQuestions = [
    {
      question: "O Momento da Verdade",
      subtitle: "A luz de 'check engine' (aquela do motorzinho) acende no seu painel. Qual é seu primeiro pensamento?",
      options: [
        "Droga, quanto isso vai me custar agora? Já imagino a conta da oficina.",
        "Será que é grave? E se eu ficar na rua no meio do caminho? Bate uma insegurança.",
        "Que preguiça... Agora vou ter que perder meu tempo na oficina e ainda por cima confiar no que o mecânico vai dizer.",
        "Interessante. Vou conectar meu scanner em casa para ver o código de erro e pesquisar o que pode ser."
      ],
      loading: "Analisando seu perfil de motorista..."
    },
    {
      question: "O Perfil da Manutenção",
      subtitle: "Qual destas frases descreve melhor a sua relação com a manutenção do carro?",
      options: [
        "Sigo o manual à risca. Manutenção preventiva é sagrada para mim.",
        "Sou do time 'só quando quebra'. Se não tem barulho nem fumaça, está tudo bem.",
        "Eu até tento, mas na correria do dia a dia, acabo sempre adiando e esquecendo.",
        "Deixa comigo! Troca de óleo, filtros, velas... O básico eu mesmo resolvo na garagem."
      ],
      loading: "Calculando seu potencial de economia..."
    },
    {
      question: "O Desejo Secreto",
      subtitle: "Se você pudesse ter um superpoder para o seu carro, qual você escolheria?",
      options: [
        "O poder da Previsão: Saber que uma peça vai quebrar antes que ela quebre.",
        "O poder do Raio-X: Entender na hora o que está errado e ter uma estimativa de quanto vai custar para arrumar.",
        "O poder da Eficiência: Saber exatamente como dirigir para economizar o máximo de combustível possível.",
        "O poder da Memória Total: Ter um diário de bordo digital e 100% confiável de toda a vida do carro."
      ],
      loading: "Preparando sua análise personalizada..."
    }
  ];

  // Mensagens de motivação para cada etapa do quiz
  const feedbacks = [
    "Ótimo! Falta pouco para sua análise personalizada 🚗",
    "Boa! Só mais uma pergunta e você garantirá seu desconto 💸",
    "Show! Analisando seus dados para garantir o melhor desconto 👏"
  ];

  // Função elaborada para gerar insights baseados nas respostas
  function generateInsights(answers: string[]) {
    const profiles = {
      preocupado: 0,    // A nos 3
      relaxado: 0,      // B nos 3
      atarefado: 0,     // C nos 3
      tecnico: 0        // D nos 3
    };

    // Contar perfis baseado nas respostas
    answers.forEach(answer => {
      if (answer.startsWith("Droga, quanto isso vai me custar") || 
          answer.startsWith("Sigo o manual à risca") || 
          answer.startsWith("O poder da Previsão")) {
        profiles.preocupado++;
      } else if (answer.startsWith("Será que é grave") || 
                 answer.startsWith("Sou do time 'só quando quebra'") || 
                 answer.startsWith("O poder do Raio-X")) {
        profiles.relaxado++;
      } else if (answer.startsWith("Que preguiça") || 
                 answer.startsWith("Eu até tento, mas na correria") || 
                 answer.startsWith("O poder da Eficiência")) {
        profiles.atarefado++;
      } else if (answer.startsWith("Interessante. Vou conectar") || 
                 answer.startsWith("Deixa comigo!") || 
                 answer.startsWith("O poder da Memória Total")) {
        profiles.tecnico++;
      }
    });

    // Determinar perfil dominante
    const dominantProfile = Object.keys(profiles).reduce((a, b) => 
      profiles[a as keyof typeof profiles] > profiles[b as keyof typeof profiles] ? a : b
    );

    const insights = {
      preocupado: {
        title: "O MOTORISTA CAUTELOSO",
        subtitle: "Você valoriza segurança e prevenção acima de tudo",
        description: "Seu perfil revela alguém que se preocupa genuinamente com o veículo e quer evitar surpresas desagradáveis. Você entende que manutenção preventiva é investimento, não gasto.",
        benefits: [
          "✓ Evite gastos inesperados de até R$ 3.000 em reparos emergenciais",
          "✓ Monitore a saúde do motor em tempo real",
          "✓ Receba alertas antes que pequenos problemas virem grandes prejuízos",
          "✓ Tenha a tranquilidade de saber exatamente o que acontece com seu carro"
        ],
        savings: "R$ 2.500 - R$ 4.000",
        urgency: "ALTA - Seu perfil indica que você precisa desta ferramenta AGORA",
        color: "text-blue-600",
        progress: 85
      },
      relaxado: {
        title: "O MOTORISTA DESPREOCUPADO",
        subtitle: "Você prefere resolver quando o problema aparece",
        description: "Seu estilo é mais reativo, mas isso pode estar custando caro. Pequenos problemas ignorados se transformam em grandes gastos. É hora de ter controle sem complicação.",
        benefits: [
          "✓ Identifique problemas antes que seu carro te deixe na mão",
          "✓ Evite as temidas 'surpresas' na oficina",
          "✓ Saiba quando é realmente necessário se preocupar",
          "✓ Economize nas manutenções desnecessárias que oficinas empurram"
        ],
        savings: "R$ 1.800 - R$ 3.200",
        urgency: "MÉDIA - Mas o quanto antes, melhor para seu bolso",
        color: "text-green-600",
        progress: 65
      },
      atarefado: {
        title: "O MOTORISTA OCUPADO",
        subtitle: "Você quer praticidade e eficiência em tudo",
        description: "Sabemos que seu tempo é precioso. Você precisa de soluções rápidas e inteligentes que funcionem no seu ritmo acelerado, sem complicar sua rotina.",
        benefits: [
          "✓ Diagnósticos instantâneos - sem perder tempo na oficina",
          "✓ Otimize o consumo de combustível e economize todo mês",
          "✓ Planeje manutenções de acordo com sua agenda",
          "✓ Tenha controle total sem precisar ser um especialista"
        ],
        savings: "R$ 1.500 - R$ 2.800",
        urgency: "ALTA - Perfeito para quem não tem tempo a perder",
        color: "text-orange-600",
        progress: 75
      },
      tecnico: {
        title: "O MOTORISTA EXPERT",
        subtitle: "Você gosta de entender e controlar tudo",
        description: "Seu perfil técnico é admirável! Você já entende que conhecimento é poder. Agora imagine ter dados precisos e em tempo real para potencializar ainda mais seu conhecimento.",
        benefits: [
          "✓ Acesso a dados técnicos detalhados que só oficinas especializadas têm",
          "✓ Histórico completo de performance e manutenções",
          "✓ Identifique padrões e otimize a performance do seu veículo",
          "✓ Seja completamente independente de terceiros para diagnósticos"
        ],
        savings: "R$ 2.000 - R$ 3.500",
        urgency: "MÉDIA - Mas você vai amar ter esses dados",
        color: "text-purple-600",
        progress: 70
      }
    };

    return insights[dominantProfile as keyof typeof insights];
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
    const quizUrl = 'https://api.sheety.co/dcad7a9f3b6bfb680d978268bd9f9ee9/outis/quiz';

    // Preparar dados do quiz
    const quizBody = {
      quiz: {
        q1: quizAnswers[0] || '',
        q2: quizAnswers[1] || '',
        q3: quizAnswers[2] || '',
        email: formData.email
      }
    };

    const leadBody = {
      lead: {
        nome: formData.name,
        email: formData.email,
        telefone: formData.whatsapp,
        cupom: formData.coupon || ''
      }
    };

    try {
      // Enviar dados do quiz
      console.log('Enviando dados do quiz:', quizBody);
      const quizResponse = await fetch(quizUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizBody),
      });

      if (quizResponse.ok) {
        const quizJson = await quizResponse.json();
        console.log('Resposta do quiz:', quizJson.quiz);
      }

      // Enviar dados do lead
      const leadResponse = await fetch(leadUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadBody),
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

      if (leadResponse.ok) {
        const data = await leadResponse.json();
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
      console.error('Erro ao enviar dados:', error);
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
      <Header />

      {/* Quiz Section */}
      {!showForm && !showSuccess && !scoreStep && (
        <section className="py-16 bg-blue-50 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-black mb-8">
                🎯 Descubra seu perfil de motorista em 30 segundos
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
                       <h3 className="text-2xl font-bold text-black mb-2">
                         {quizQuestions[quizStep].question}
                       </h3>
                       <p className="text-lg text-gray-700 mb-6">
                         {quizQuestions[quizStep].subtitle}
                       </p>
                     </div>
                    <div className="space-y-3">
                      {quizQuestions[quizStep].options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleQuizAnswer(option)}
                          className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white p-4 text-left justify-start font-medium transition-colors text-sm leading-relaxed min-h-[60px] whitespace-normal"
                          size="lg"
                        >
                          <div className="flex items-start gap-2 w-full">
                            <span className="font-bold text-base flex-shrink-0 mt-0.5">
                              {String.fromCharCode(65 + index)})
                            </span>
                            <span className="text-left break-words hyphens-auto">
                              {option}
                            </span>
                          </div>
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
            <div className="max-w-2xl mx-auto">
              <div className="bg-white border-2 border-gray-200 shadow-xl rounded-xl p-8">
                {
                  (() => {
                    const insight = generateInsights(quizAnswers);
                    return (
                      <>
                        <div className="text-center mb-6">
                          <span className={`text-2xl font-bold mb-2 block uppercase tracking-wide ${insight.color}`}>
                            {insight.title}
                          </span>
                          <p className="text-lg text-gray-600 mb-4">{insight.subtitle}</p>
                          <div className="relative w-full max-w-md mx-auto mb-4 h-6 flex items-center">
                            <div className="w-full h-4 rounded-full overflow-hidden bg-gradient-to-r from-green-400 via-yellow-400 to-red-500" />
                            <div
                              className="absolute top-0 left-0 h-6 flex items-center pointer-events-none"
                              style={{
                                left: `calc(${insight.progress}% - 2px)`,
                              }}
                            >
                              <div className="w-1 h-6 bg-black/80 rounded" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-left mb-6">
                          <p className="text-gray-800 text-base mb-4 leading-relaxed">{insight.description}</p>
                          
                          <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <h4 className="font-bold text-gray-800 mb-2">O que o ORYZUM pode fazer por você:</h4>
                            <div className="space-y-1">
                              {insight.benefits.map((benefit, index) => (
                                <p key={index} className="text-sm text-gray-700">{benefit}</p>
                              ))}
                            </div>
                          </div>
                          
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-600">Economia potencial anual:</p>
                                <p className="text-xl font-bold text-green-600">{insight.savings}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">Urgência:</p>
                                <p className="text-sm font-semibold text-gray-800">{insight.urgency}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          size="lg"
                          className="w-full min-h-[56px] flex items-center justify-center bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-6 px-4 break-words whitespace-normal text-center text-lg transition-colors"
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
                  <strong>⚠️ ATENÇÃO:</strong> Você quase chegou a tempo. <b>Esta remessa especial de 300 scanners ESGOTOU.</b>
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
                      className="w-full min-h-[56px] flex items-center justify-center bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-6 text-lg font-bold break-words whitespace-normal text-center transition-colors"
                      disabled={isSubmitting}
                    >
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
