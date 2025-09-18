import React from 'react';
import { Users, Package, Heart, TrendingUp, RefreshCw, AlertCircle } from 'lucide-react';
import { useDonors } from '../hooks/useDonors';

const DonorsTable = () => {
  const { 
    donors, 
    loading, 
    error, 
    lastUpdated, 
    refreshDonors, 
    totalArrecadado, 
    totalCestas 
  } = useDonors();
  
  const cestasProgress = (totalCestas / 50) * 100; // Assumindo meta de 50 cestas

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

    
  const getCestasFromAmount = (amount: number) => {
    return (amount / 47).toFixed(1); // retorna string com 1 casa decimal
  };


  return (
    <section className="bg-gradient-to-br from-white via-blue-50 to-green-50 py-20 px-4 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-200/20 rounded-full blur-xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Users className="h-16 w-16 text-blue-500" />
              <div className="absolute -inset-2 bg-blue-100 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-6">
            Nossos Colaboradores
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            Cada doação faz a diferença! Veja quem já está participando desta corrente do bem.
          </p>
          
          {/* Status da conexão com Google Sheets */}
          <div className="mt-6 flex items-center justify-center gap-4">
            {error ? (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Usando dados offline</span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Conectado ao Google Sheets</span>
                </div>
                {lastUpdated && (
                  <span className="text-sm text-gray-500">
                    Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
                  </span>
                )}
                <button
                  onClick={refreshDonors}
                  disabled={loading}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-full transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  <span className="text-sm font-medium">Atualizar</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Cards de Resumo com animações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-blue-500 rounded-2xl p-8 text-center shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/25">
            <Package className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-white mb-2">{totalCestas}</h3>
            <p className="text-blue-100 font-semibold text-lg">Cestas Arrecadadas</p>
          </div>
          
          <div className="bg-green-500 rounded-2xl p-8 text-center shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-green-500/25">
            <Heart className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-white mb-2">{formatCurrency(totalArrecadado)}</h3>
            <p className="text-green-100 font-semibold text-lg">Total Arrecadado</p>
          </div>
          
          <div className="bg-blue-600 rounded-2xl p-8 text-center shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/25">
            <TrendingUp className="h-12 w-12 text-white mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-white mb-2">{donors.length}</h3>
            <p className="text-blue-100 font-semibold text-lg">Colaboradores</p>
          </div>
        </div>

        {/* Barra de Progresso Moderna */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 mb-12 shadow-xl border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-700">Progresso da Meta</span>
            <span className="text-lg font-bold text-blue-600">{Math.min(cestasProgress, 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
            <div 
              className="bg-blue-500 h-4 rounded-full transition-all duration-1000 ease-out shadow-lg"
              style={{ width: `${Math.min(cestasProgress, 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-600 mt-3 font-medium">Meta: 50 cestas básicas</p>
        </div>

        {/* Tabela de Doadores Moderna */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-blue-600">
                <RefreshCw className="h-6 w-6 animate-spin" />
                <span className="text-lg font-medium">Carregando doadores...</span>
              </div>
            </div>
          )}
          
          {!loading && donors.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">Nenhum doador encontrado</h3>
              <p className="text-gray-500">Seja o primeiro a contribuir com esta causa!</p>
            </div>
          )}
          
          {!loading && donors.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Cestas
                  </th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {donors.map((donor, index) => (
                  <tr 
                    key={donor.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white/50' : 'bg-blue-50/50'
                    } hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-[1.02]`}
                  >
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <div className="h-12 w-12 rounded-full bg-blue-400 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">
                              {donor.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-lg font-bold text-gray-900">
                            {donor.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="text-lg font-bold text-green-600">
                        {formatCurrency(donor.amount)}
                      </div>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        {getCestasFromAmount(donor.amount)} {getCestasFromAmount(donor.amount) === 1 ? 'cesta' : 'cestas'}
                      </span>
                    </td>
                    <td className="px-8 py-6 whitespace-nowrap text-lg text-gray-600 font-medium">
                      {formatDate(donor.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>

        {/* Call to Action Final */}
        <div className="text-center mt-16">
          <div className="bg-green-500 rounded-3xl p-12 shadow-2xl text-white transform hover:scale-105 transition-all duration-300">
            <h3 className="text-3xl font-bold mb-4">
              Seja parte desta corrente do bem!
            </h3>
            <p className="text-xl mb-6 text-green-100">
              Sua doação se transformará em esperança para uma família.
            </p>
            <div className="text-2xl font-bold bg-white/20 backdrop-blur-sm rounded-full px-8 py-4 inline-block">
              R$ 47,00 = 1 cesta básica = uma família alimentada
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonorsTable;
