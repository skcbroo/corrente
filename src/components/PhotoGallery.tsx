import React, { useState } from 'react';
import { Camera, X, Sparkles, Heart } from 'lucide-react';

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Gera automaticamente a lista de fotos baseada nos arquivos disponíveis
  const generatePhotos = () => {
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

    const photos = [];
    // Suporta até 15 fotos (pode ser facilmente expandido)
    for (let i = 1; i <= 15; i++) {
      photos.push({
        id: i,
        url: `/photos/foto${i}.jpg`,
        title: photoTitles[i - 1] || `Momento especial ${i}`,
        description: photoDescriptions[i - 1] || `Registro importante da nossa campanha`
      });
    }
    return photos;
  };

  const allPhotos = generatePhotos();
  
  // Filtra apenas as fotos que existem (você pode remover esta lógica se quiser mostrar todas)
  const photos = allPhotos;

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
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header da Seção */}
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

        {/* Grid de Fotos com efeitos modernos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {photos.map((photo, index) => (
            <div 
              key={photo.id}
              className={`group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-4 hover:rotate-1 ${
                index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'
              }`}
              onClick={() => openModal(photo.url)}
            >
              <div className="aspect-w-16 aspect-h-12 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-125"
                />
              </div>
              
              {/* Overlay com gradiente e informações */}
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

              {/* Ícone de zoom com efeito */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                <Camera className="h-5 w-5 text-gray-700" />
              </div>

              {/* Borda colorida no hover */}
              <div className="absolute inset-0 rounded-2xl border-4 border-transparent group-hover:border-blue-400 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action com design atrativo */}
        <div className="text-center">
          <div className="bg-blue-500 rounded-3xl p-12 shadow-2xl text-white transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
            {/* Elementos decorativos internos */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Faça parte da próxima entrega!
              </h3>
              <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Sua doação se transformará em momentos como estes. 
                Juntos, podemos alcançar ainda mais famílias e espalhar esperança.
              </p>
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg">
                <Heart className="h-6 w-6" />
                Sua contribuição importa
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para visualização ampliada */}
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
