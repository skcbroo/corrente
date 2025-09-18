# Etapa de build
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# 👇 Adicione isso para garantir que o Vite veja as envs
ARG VITE_GOOGLE_SHEETS_API_KEY
ARG VITE_GOOGLE_SHEETS_SPREADSHEET_ID
ARG VITE_GOOGLE_SHEETS_RANGE
ENV VITE_GOOGLE_SHEETS_API_KEY=$VITE_GOOGLE_SHEETS_API_KEY
ENV VITE_GOOGLE_SHEETS_SPREADSHEET_ID=$VITE_GOOGLE_SHEETS_SPREADSHEET_ID
ENV VITE_GOOGLE_SHEETS_RANGE=$VITE_GOOGLE_SHEETS_RANGE

RUN npm run build

# Etapa de produção
FROM node:18-slim
WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

CMD ["serve", "-s", "dist", "-l", "8080"]
