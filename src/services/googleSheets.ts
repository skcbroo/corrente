interface DonorData {
  name: string;
  amount: number;
  date: string;
  email?: string;
}

interface SheetRow {
  values: string[];
}

export class GoogleSheetsService {
  private apiKey: string;
  private spreadsheetId: string;
  private range: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
    this.spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID;
    this.range = import.meta.env.VITE_GOOGLE_SHEETS_RANGE || 'Doadores!A2:D100';
  }

  async getDonors(): Promise<DonorData[]> {
    if (!this.apiKey || !this.spreadsheetId) {
      console.warn('Google Sheets API não configurada. Usando dados mock.');
      return this.getMockData();
    }

    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.values || data.values.length === 0) {
        console.warn('Nenhum dado encontrado na planilha');
        return [];
      }

      return this.parseSheetData(data.values);
    } catch (error) {
      console.error('Erro ao buscar dados do Google Sheets:', error);
      return this.getMockData();
    }
  }

  private parseSheetData(rows: string[][]): DonorData[] {
    return rows
      .filter(row => row.length >= 3 && row[0] && row[1] && row[2]) // Nome, Valor, Data obrigatórios
      .map((row, index) => ({
        name: row[0]?.trim() || `Doador ${index + 1}`,
        amount: this.parseAmount(row[1]),
        date: this.parseDate(row[2]),
        email: row[3]?.trim() || undefined
      }))
      .filter(donor => donor.amount > 0); // Remove doações inválidas
  }

  private parseAmount(value: string): number {
    if (!value) return 0;
    
    // Remove caracteres não numéricos exceto vírgula e ponto
    const cleanValue = value.toString().replace(/[^\d,.-]/g, '');
    
    // Converte vírgula para ponto (formato brasileiro)
    const normalizedValue = cleanValue.replace(',', '.');
    
    const amount = parseFloat(normalizedValue);
    return isNaN(amount) ? 0 : amount;
  }

  private parseDate(value: string): string {
    if (!value) return new Date().toISOString().split('T')[0];
    
    try {
      // Tenta diferentes formatos de data
      const date = new Date(value);
      
      if (isNaN(date.getTime())) {
        // Se não conseguir parsear, tenta formato brasileiro DD/MM/YYYY
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
    return [
      { name: "Ana Silva", amount: 94.00, date: "2025-01-20" },
      { name: "Carlos Santos", amount: 47.00, date: "2025-01-20" },
      { name: "Maria Oliveira", amount: 141.00, date: "2025-01-19" },
      { name: "João Pedro", amount: 47.00, date: "2025-01-19" },
      { name: "Fernanda Costa", amount: 94.00, date: "2025-01-18" },
      { name: "Roberto Lima", amount: 47.00, date: "2025-01-18" },
      { name: "Juliana Rocha", amount: 188.00, date: "2025-01-17" },
      { name: "Pedro Alves", amount: 47.00, date: "2025-01-17" }
    ];
  }
}

export const googleSheetsService = new GoogleSheetsService();