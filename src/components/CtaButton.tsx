
import { Button } from "@/components/ui/button";

interface CtaButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
}

const CtaButton = ({
  onClick,
  variant = "primary",
  children = "QUERO PROTEGER MEU CARRO AGORA",
}: CtaButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className={
        variant === "primary"
          ? "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-4 text-lg font-bold w-full md:w-auto transition-colors"
          : "border-gray-600 text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold w-full md:w-auto transition-colors"
      }
    >
      {children}
    </Button>
  );
};

export default CtaButton;
