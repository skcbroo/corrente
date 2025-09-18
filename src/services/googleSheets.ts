interface DonorData {
  name: string;
  amount: number;
  date: string;
  email?: string;
}

export class GoogleSheetsService {
  private apiKey: string;
  private spreadsheetId: string;
  private range: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
    this.spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID;
    this.range = import.meta.env.VITE_GOOGLE_SHEETS_RANGE || 'Doadores!A2:D100';

    console.log("⚙️ [GoogleSheetsService] Variáveis carregadas:", {
      apiKey: this.apiKey ? "✅ definida" : "❌ indefinida",
      spreadsheetId: this.spreadsheetId || "❌ indefinido",
      range: this.range
    });
  }

  async getDonors(): Promise<DonorData[]> {
    if (!this.apiKey || !this.spreadsheetId) {
      console.warn('⚠️ Google Sheets API não configurada. Usando dados mock.');
      return this.getMockData();
    }

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`;
      console.log("🌐 [GoogleSheetsService] URL chamada:", url);

      const response = await fetch(url);
      console.log("📡 [GoogleSheetsService] Status resposta:", response.status);

      if (!response.ok) {
        console.error("❌ [GoogleSheetsService] Erro HTTP:", response.status, response.statusText);
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      console.log("📥 [GoogleSheetsService] Resposta JSON:", data);

      if (!data.values || data.values.length === 0) {
        console.warn('⚠️ Nenhum dado encontrado na planilha');
        return [];
      }

      return this.parseSheetData(data.values);
    } catch (error) {
      console.error('❌ [GoogleSheetsService] Erro no fetch:', error);
      return this.getMockData();
    }
  }

  private parseSheetData(rows: string[][]): DonorData[] {
    console.log("🔎 [GoogleSheetsService] Dados crus da planilha:", rows);

    return rows
      .filter(row => row.length >= 3 && row[0] && row[1] && row[2])
      .map((row, index) => ({
        name: row[0]?.trim() || `Doador ${index + 1}`,
        amount: this.parseAmount(row[1]),
        date: this.parseDate(row[2]),
        email: row[3]?.trim() || undefined
      }))
      .filter(donor => donor.amount > 0);
  }

  private parseAmount(value: string): number {
    if (!value) return 0;
    const cleanValue = value.toString().replace(/[^\d,.-]/g, '');
    const normalizedValue = cleanValue.replace(',', '.');
    const amount = parseFloat(normalizedValue);
    return isNaN(amount) ? 0 : amount;
  }

  private parseDate(value: string): string {
    if (!value) return new Date().toISOString().split('T')[0];
    try {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        const parts = value.split('/');
        if (parts.length === 3) {
          const [day, month, year] = parts;
          const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          if (!isNaN(parsedDate.getTime())) {
            return parsedDate.toISOString().split('T')[0];
          }
        }
        return new Date().toISOString().split('T')[0];
      }
      return date.toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  }

  private getMockData(): DonorData[] {
    console.warn("⚠️ [GoogleSheetsService] Retornando MOCK data");
    return [
      { name: "Ana Silva", amount: 94.00, date: "2025-01-20" },
      { name: "Carlos Santos", amount: 47.00, date: "2025-01-20" },
      { name: "Maria Oliveira", amount: 141.00, date: "2025-01-19" }
    ];
  }
}

export const googleSheetsService = new GoogleSheetsService();
