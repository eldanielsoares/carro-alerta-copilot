
import { Instagram, Youtube, FileText } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica se está na home para o click no logo rotear corretamente
  const logoClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <header
      className="sticky top-0 z-40 px-4 py-3 backdrop-blur-md bg-white/60 border-b border-gray-200 transition-colors"
      style={{
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)"
      }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={logoClick}>
          <img
            src="/lovable-uploads/f4f1a624-beb8-4c0f-9145-34cec43e1fb1.png"
            alt="ORYZUM Logo"
            className="h-8 md:h-10 lg:h-12 w-auto"
            style={{ maxWidth: 180 }}
          />
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="Instagram">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="Youtube">
            <Youtube size={24} />
          </a>
          <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="Docs">
            <FileText size={24} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
