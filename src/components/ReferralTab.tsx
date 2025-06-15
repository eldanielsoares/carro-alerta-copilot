
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Users } from "lucide-react";

type ReferralTabProps = {
  couponCode: string;
  setCouponCode?: (value: string) => void;
};

const ReferralTab = ({ couponCode, setCouponCode }: ReferralTabProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="bg-white border-2 border-gray-200 shadow-xl">
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
                onChange={e => setCouponCode?.(e.target.value)}
                className="bg-white border-2 border-gray-200 text-black"
              />
              <Button 
                className="bg-purple-600 hover:bg-purple-700 font-bold"
                type="button"
                onClick={handleCopy}
              >
                {copied ? "Copiado!" : "Copiar"}
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
          <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100 font-bold">
            WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralTab;

