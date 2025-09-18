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

      // 🔔 Mostra erro visível na tela
      if (typeof window !== "undefined") {
        const banner = document.createElement("div");
        banner.innerText = `❌ Falha ao carregar doadores: ${msg}`;
        banner.style.position = "fixed";
        banner.style.bottom = "10px";
        banner.style.left = "10px";
        banner.style.padding = "10px 20px";
        banner.style.background = "#dc2626"; // vermelho
        banner.style.color = "white";
        banner.style.fontWeight = "bold";
        banner.style.borderRadius = "8px";
        banner.style.zIndex = "9999";
        document.body.appendChild(banner);

        setTimeout(() => banner.remove(), 6000); // some depois de 6s
      }
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
