import React, { useState } from 'react';
import { Heart, Copy, CheckCircle, Phone } from 'lucide-react';

const HeroSection = () => {
  const [pixCopied, setPixCopied] = useState(false);
  const pixKey = "011.970.271-14"; // Substitua pela chave Pix real
  const whatsappNumber = "(61) 9 9999-9999"; // 🔹 Substitua pelo número real

  const copyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 2000);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen flex items-center px-4 py-12 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-200/20 rounded-full blur-lg animate-bounce"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Título Principal com gradiente */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-blue-600 mb-6 leading-tight animate-fade-in">
            Corrente do Bem
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8 animate-slide-up">
            Juntos pela Solidariedade
          </h2>
        </div>

        {/* Card principal com glassmorphism */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl mb-12 border border-white/20 transform hover:scale-105 transition-all duration-500">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Heart className="h-16 w-16 text-red-500 animate-pulse" />
              <div className="absolute -inset-2 bg-red-100 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 max-w-4xl mx-auto font-medium">
            Opa, tudo bem? Estamos iniciando uma <span className="text-blue-600 font-bold">corrente do bem</span>: 
            vamos arrecadar cestas básicas para doar a instituições que precisam. A cada ação, ajudaremos um 
            local diferente, e nesta primeira vez escolhemos apoiar uma <span className="text-green-600 font-bold">creche</span> onde 
            uma amiga nossa trabalha.
          </p>
          
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-10 max-w-4xl mx-auto font-medium">
            Ela contou que muitas famílias enfrentam dificuldades e que qualquer ajuda faz uma 
            <span className="text-green-600 font-bold"> diferença enorme</span> para as crianças.
          </p>
          
          {/* Destaque do valor */}
          <div className="bg-green-500 p-8 rounded-2xl mb-10 shadow-lg transform hover:scale-105 transition-all duration-300">
            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
              Valor super acessível!
            </p>
            <p className="text-4xl md:text-5xl font-extrabold text-white">
              R$ 47,00 = 1 cesta básica
            </p>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            Se você puder participar, já vai ser incrível — juntos podemos levar 
            <span className="text-blue-600 font-bold"> esperança e cuidado</span> a quem mais precisa!
          </p>
        </div>

       
        {/* Seção PIX */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/30 max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
            Faça sua doação via PIX
          </h3>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-8 border-2 border-dashed border-blue-300">
            <p className="text-sm text-gray-600 mb-3 font-semibold">Chave PIX:</p>
            <p className="text-xl font-mono text-gray-800 break-all bg-white p-3 rounded-lg shadow-inner">
              {pixKey}
            </p>
          </div>
          
          <button
            onClick={copyPix}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-5 px-10 rounded-full text-2xl shadow-2xl transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center gap-4 mx-auto animate-bounce hover:animate-none"
          >
            {pixCopied ? (
              <>
                <CheckCircle className="h-8 w-8" />
                PIX Copiado!
              </>
            ) : (
              <>
                <Copy className="h-8 w-8" />
                Copiar PIX
              </>
            )}
          </button>

          {/* 🔹 NOVA SEÇÃO: Envio do comprovante */}
          <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Phone className="h-6 w-6 text-green-600" />
              <h4 className="text-lg font-bold text-green-700">
                Envie seu comprovante
              </h4>
            </div>
            <p className="text-xl font-semibold text-gray-800">{whatsappNumber}</p>
            <p className="text-sm text-gray-600 mt-2">
              Mande seu comprovante nesse WhatsApp para confirmarmos sua doação 💚
            </p>
          </div>

          <p className="text-sm text-gray-600 mt-6 font-medium">
            Clique para copiar a chave PIX e fazer sua doação
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
