import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Users, Share } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ReferralTabProps = {
  couponCode: string;
  setCouponCode?: (value: string) => void;
};

const siteUrl = 'https://oryzum.com';
const shareMessage = (couponCode: string) =>
  `Problema: manutenção cara no carro? Solução: use o Oryzum Copilot para economizar! Use o cupom: ${couponCode}. Saiba mais: ${siteUrl}`;

const shareOptions = [
  {
    name: 'WhatsApp',
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path fill="#25D366" d="M16.016 3C9.374 3 3.95 8.424 3.95 15.067c0 2.669.713 5.219 2.062 7.472L3 29l6.642-2.066c2.187 1.201 4.654 1.825 7.374 1.825 6.64 0 12.065-5.424 12.065-12.066C28.017 8.425 22.657 3 16.016 3zm7.52 17.184c-.32.893-1.836 1.759-2.522 1.876-.678.116-1.568.162-2.532-.162-.583-.188-1.332-.432-2.282-.866-2.006-.89-3.304-2.978-3.401-3.115-.097-.135-.81-1.078-.81-2.059 0-.981.512-1.463.692-1.663.179-.2.384-.25.513-.25.13 0 .257.001.371.007.119.005.28-.044.439.334.162.388.552 1.346.602 1.447.05.097.083.213.017.348-.064.134-.098.216-.19.334-.097.119-.206.266-.292.358-.099.098-.201.205-.088.403.113.195.502.831 1.079 1.345.743.664 1.366.872 1.564.967.199.094.311.08.428-.047.113-.125.509-.594.644-.799.134-.201.27-.166.459-.1.188.067 1.19.563 1.39.665.195.097.323.146.371.23.046.083.046.478-.276 1.371z"/>
      </svg>
    ),
    onClick: (couponCode: string) => {
      const text = encodeURIComponent(shareMessage(couponCode));
      window.open(
        `https://wa.me/?text=${text}`,
        "_blank"
      );
    },
  },
  {
    name: "Twitter",
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path fill="#1DA1F2" d="M32 6.08a13.14 13.14 0 01-3.77 1.03 6.6 6.6 0 002.88-3.62 13.1 13.1 0 01-4.17 1.6A6.56 6.56 0 0022.16 4c-3.64 0-6.59 2.95-6.59 6.59 0 .52.06 1.03.17 1.51-5.48-.27-10.34-2.9-13.59-6.88a6.51 6.51 0 00-.89 3.32c0 2.29 1.16 4.32 2.93 5.51a6.54 6.54 0 01-2.99-.83v.09c0 3.2 2.27 5.87 5.28 6.48-.55.15-1.13.23-1.72.23-.42 0-.83-.04-1.24-.12.83 2.59 3.23 4.48 6.08 4.53A13.17 13.17 0 012 27.53c-.42 0-.84-.02-1.26-.07A18.62 18.62 0 009.86 30C21.13 30 27.45 18.7 27.45 8.69c0-.29 0-.57-.02-.86A9.69 9.69 0 0032 6.08z"/>
      </svg>
    ),
    onClick: (couponCode: string) => {
      const text = encodeURIComponent(shareMessage(couponCode));
      window.open(
        `https://twitter.com/intent/tweet?text=${text}`,
        "_blank"
      );
    },
  },
  {
    name: "Facebook",
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <path fill="#1877F3" d="M29 0H3C1.35 0 0 1.35 0 3v26c0 1.65 1.35 3 3 3h13V20h-4v-5h4v-3c0-4.13 2.52-6.4 6.23-6.4 1.75 0 3.58.31 3.58.31v4h-2.02c-1.99 0-2.61 1.24-2.61 2.5V15h4.44l-.7 5h-3.74v12h7c1.65 0 3-1.35 3-3V3c0-1.65-1.35-3-3-3z"/>
      </svg>
    ),
    onClick: (couponCode: string) => {
      const text = encodeURIComponent(shareMessage(couponCode));
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${text}`,
        "_blank"
      );
    },
  },
  {
    name: "Instagram",
    icon: (
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" fill="#E1306C"/>
        <rect x="9" y="9" width="14" height="14" rx="5" fill="white"/>
        <circle cx="16" cy="16" r="5" fill="#E1306C"/>
        <circle cx="22" cy="10" r="1.15" fill="#E1306C"/>
      </svg>
    ),
    onClick: (couponCode: string) => {
      // Instagram doesn't allow pre-filled DM/share via web.
      // We open the site and let the user copy+paste the message.
      window.open(siteUrl, "_blank");
      setTimeout(() => {
        alert(
          "Copie e cole a mensagem a seguir no seu Instagram para compartilhar:\n\n" +
          shareMessage(couponCode)
        );
      }, 700);
    },
  },
];

const ReferralTab = ({ couponCode, setCouponCode }: ReferralTabProps) => {
  const [copied, setCopied] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

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
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 font-bold" type="button">
                <Users className="mr-2" />
                Compartilhar
                <Share className="ml-2" size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-3">
              <div className="flex flex-col gap-2">
                {shareOptions.map(option => (
                  <Button
                    key={option.name}
                    variant="ghost"
                    className="justify-start gap-2 text-black"
                    onClick={() => {
                      option.onClick(couponCode);
                      setPopoverOpen(false);
                    }}
                  >
                    {option.icon}
                    {option.name}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralTab;
