import React from 'react';
import { Heart, Shield, Eye, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-16 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mensagem Principal */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Heart className="h-20 w-20 text-red-400 animate-pulse" />
              <div className="absolute -inset-4 bg-red-400/20 rounded-full animate-ping"></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-green-300 bg-clip-text text-transparent">
            Muito obrigado desde já pelo carinho e apoio!
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-medium">
            Cada gesto de solidariedade faz a diferença na vida de uma família. 
            Juntos, estamos construindo um mundo mais justo e amoroso.
          </p>
        </div>

        {/* Cards de Informações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <Shield className="h-12 w-12 text-blue-300 mx-auto mb-4" />
            <h4 className="font-bold text-xl text-white mb-3">Transparência</h4>
            <p className="text-blue-100">Todos os valores arrecadados são destinados integralmente para as cestas básicas.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <Eye className="h-12 w-12 text-green-300 mx-auto mb-4" />
            <h4 className="font-bold text-xl text-white mb-3">Prestação de Contas</h4>
            <p className="text-green-100">Compartilharemos fotos e relatórios de todas as entregas realizadas.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
            <MessageCircle className="h-12 w-12 text-blue-300 mx-auto mb-4" />
            <h4 className="font-bold text-xl text-white mb-3">Contato</h4>
            <p className="text-blue-100">Entre em contato conosco para sugerir instituições ou tirar dúvidas.</p>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <p className="text-blue-200 text-center font-medium">
            © 2025 Corrente do Bem. Feito com amor para espalhar solidariedade.
          </p>
        </div>

        {/* Mensagem Final Inspiradora */}
        <div className="bg-blue-500/20 backdrop-blur-lg rounded-3xl p-10 border border-white/30 text-center">
          <blockquote className="text-2xl md:text-3xl font-bold text-white mb-4 italic">
            "A verdadeira medida de nossa humanidade está em como tratamos os mais vulneráveis entre nós."
          </blockquote>
          <p className="text-blue-200 text-lg font-medium">
            Obrigado por fazer parte desta corrente de amor e esperança!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;