import { useDonors } from "../hooks/useDonors";

export function DonorsTable() {
  const { donors, loading, error, lastUpdated, totalArrecadado, totalCestas } = useDonors();

  console.log("📊 [DonorsTable] Renderizou");
  console.log("🔄 [DonorsTable] Estado:", {
    loading,
    error,
    donors,
    lastUpdated,
    totalArrecadado,
    totalCestas
  });

  if (loading) {
    return <p> Carregando doadores...</p>;
  }

  if (error) {
    return <p>❌ Erro: {error}</p>;
  }

  if (!donors || donors.length === 0) {
    return <p>⚠️ Nenhum doador encontrado</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Doadores</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Nome</th>
            <th className="px-4 py-2 border">Valor</th>
            <th className="px-4 py-2 border">Data</th>
            <th className="px-4 py-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor.id}>
              <td className="px-4 py-2 border">{donor.name}</td>
              <td className="px-4 py-2 border">R$ {donor.amount.toFixed(2)}</td>
              <td className="px-4 py-2 border">{donor.date}</td>
              <td className="px-4 py-2 border">{donor.email || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <p>
          💰 <strong>Total arrecadado:</strong> R$ {totalArrecadado.toFixed(2)}
        </p>
        <p>
          🛒 <strong>Total de cestas:</strong> {totalCestas}
        </p>
        {lastUpdated && (
          <p>⏱️ Última atualização: {lastUpdated.toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}
