import React, { useState, useEffect } from 'react';
import { Camera, X, Sparkles, Heart } from 'lucide-react';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [availablePhotos, setAvailablePhotos] = useState<
    { id: number; url: string; title: string; description: string }[]
  >([]);

  const photoTitles = [
    "Preparando as cestas básicas",
    "Momento da entrega",
    "Sorrisos de gratidão", 
    "Trabalho em equipe",
    "Distribuição organizada",
    "Impacto positivo",
    "Organizando as doações",
    "Entrega na comunidade",
    "Famílias beneficiadas",
    "Voluntários em ação",
    "Cestas prontas para entrega",
    "Momento de solidariedade",
    "Ajudando quem precisa",
    "União pela causa",
    "Transformando vidas"
  ];
  
  const photoDescriptions = [
    "Organizando os alimentos com muito carinho",
    "Levando esperança às famílias",
    "A alegria de quem recebe e de quem doa",
    "Unidos pela solidariedade",
    "Cada cesta entregue com cuidado",
    "Fazendo a diferença na comunidade",
    "Separando cada item com dedicação",
    "Chegando aos lares que mais precisam",
    "Gratidão e emoção em cada entrega",
    "Pessoas do bem fazendo a diferença",
    "Alimentos selecionados com amor",
    "Compartilhando esperança e carinho",
    "Estendendo a mão a quem precisa",
    "Juntos somos mais fortes",
    "Cada gesto conta para um mundo melhor"
  ];

  // Verifica quais fotos realmente existem
  useEffect(() => {
    const checkPhotos = async () => {
      const validPhotos: { id: number; url: string; title: string; description: string }[] = [];

      for (let i = 1; i <= 15; i++) {
        const url = `/photos/foto${i}.jpg`;

        // Verifica carregamento da imagem
        const exists = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });

        if (exists) {
          validPhotos.push({
            id: i,
            url,
            title: photoTitles[i - 1] || `Momento especial ${i}`,
            description: photoDescriptions[i - 1] || `Registro importante da nossa campanha`,
          });
        }
      }

      setAvailablePhotos(validPhotos);
    };

    checkPhotos();
  }, []);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-20 px-4 relative overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Camera className="h-16 w-16 text-green-500" />
              <Sparkles className="h-8 w-8 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
              <div className="absolute -inset-3 bg-green-100 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Veja o resultado da nossa união
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
            Momentos especiais da nossa campanha de doação de cestas básicas. 
            Cada foto conta uma história de solidariedade e esperança transformando vidas.
          </p>
        </div>

        {/* Grid de Fotos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {availablePhotos.map((photo, index) => (
            <div 
              key={photo.id}
              className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-4 hover:rotate-1 ${
                index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'
              }`}
              onClick={() => openModal(photo.url)}
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-125"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-xl mb-2">
                    {photo.title}
                  </h3>
                  <p className="text-gray-200 text-sm">
                    {photo.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-5xl max-h-[90vh] m-4">
            <img
              src={selectedImage}
              alt="Foto ampliada"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black rounded-full p-3 transition-all duration-200 transform hover:scale-110 shadow-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default PhotoGallery;
