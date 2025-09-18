import { useState, useEffect } from "react";
import { googleSheetsService } from "../services/googleSheets";

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
    console.log("🔄 [useDonors] Iniciando fetch...");
    try {
      setLoading(true);
      setError(null);

      const donorData = await googleSheetsService.getDonors();
      console.log("📥 [useDonors] Dados recebidos:", donorData);

      const donorsWithId = donorData.map((donor, index) => ({
        ...donor,
        id: index + 1,
      }));

      setDonors(donorsWithId);
      setLastUpdated(new Date());
      console.log("✅ [useDonors] Doadores atualizados:", donorsWithId);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao carregar doadores";
      setError(msg);
      console.error("❌ [useDonors] Erro ao buscar doadores:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors().catch((err) =>
      console.error("🔥 [useDonors] Erro inesperado no useEffect:", err)
    );

    const interval = setInterval(fetchDonors, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const refreshDonors = () => {
    console.log("🔄 [useDonors] Atualização manual chamada");
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
    totalCestas,
  };
};
