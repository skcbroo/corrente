# Configuração do Google Sheets API

## Passo 1: Criar um projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. No menu lateral, vá em "APIs e Serviços" > "Biblioteca"
4. Procure por "Google Sheets API" e ative

## Passo 2: Criar uma API Key

1. Vá em "APIs e Serviços" > "Credenciais"
2. Clique em "Criar credenciais" > "Chave de API"
3. Copie a chave gerada
4. (Opcional) Configure restrições de API para maior segurança

## Passo 3: Preparar sua planilha

1. Crie uma planilha no Google Sheets
2. Configure as colunas na seguinte ordem:
   - **Coluna A**: Nome do doador
   - **Coluna B**: Valor da doação (ex: 47.00 ou R$ 47,00)
   - **Coluna C**: Data da doação (ex: 20/01/2025 ou 2025-01-20)
   - **Coluna D**: Email (opcional)

3. Nomeie a aba como "Doadores" (ou ajuste no .env)
4. Torne a planilha pública:
   - Clique em "Compartilhar"
   - Altere para "Qualquer pessoa com o link pode visualizar"

## Passo 4: Configurar as variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env`
2. Preencha as variáveis:

```env
VITE_GOOGLE_SHEETS_API_KEY=sua_api_key_aqui
VITE_GOOGLE_SHEETS_SPREADSHEET_ID=id_da_sua_planilha_aqui
VITE_GOOGLE_SHEETS_RANGE=Doadores!A2:D100
```

### Como encontrar o ID da planilha:
Na URL da sua planilha: `https://docs.google.com/spreadsheets/d/1ABC123DEF456/edit`
O ID é: `1ABC123DEF456`

## Exemplo de planilha:

| Nome          | Valor  | Data       | Email              |
|---------------|--------|------------|--------------------|
| Ana Silva     | 94,00  | 20/01/2025 | ana@email.com      |
| Carlos Santos | 47     | 20/01/2025 | carlos@email.com   |
| Maria Oliveira| R$ 141 | 19/01/2025 | maria@email.com    |

## Funcionalidades:

✅ **Atualização automática**: Os dados são atualizados a cada 5 minutos
✅ **Botão de refresh**: Permite atualização manual
✅ **Fallback**: Se a API falhar, usa dados de exemplo
✅ **Formatos flexíveis**: Aceita diferentes formatos de data e valor
✅ **Status visual**: Mostra se está conectado ou offline

## Troubleshooting:

- **Erro 403**: Verifique se a API está ativada e a planilha é pública
- **Erro 400**: Verifique se o range está correto (ex: Doadores!A2:D100)
- **Dados não aparecem**: Verifique se as colunas estão na ordem correta