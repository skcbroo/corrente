import { useState, useEffect } from 'react';
import { googleSheetsService } from '../services/googleSheets';

interface Donor {
  id: number;
  name: string;
  amount: number;
  date: string;
  email?: string;
}

export const useDonors = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const donorData = await googleSheetsService.getDonors();
      
      const donorsWithId = donorData.map((donor, index) => ({
        ...donor,
        id: index + 1
      }));
      
      setDonors(donorsWithId);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar doadores');
      console.error('Erro ao buscar doadores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
    
    // Atualiza os dados a cada 5 minutos
    const interval = setInterval(fetchDonors, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshDonors = () => {
    fetchDonors();
  };

  const totalArrecadado = donors.reduce((sum, donor) => sum + donor.amount, 0);
  const totalCestas = Math.floor(totalArrecadado / 47);

  return {
    donors,
    loading,
    error,
    lastUpdated,
    refreshDonors,
    totalArrecadado,
    totalCestas
  };
};