# Usa a imagem oficial do Node.js para build
FROM node:20 AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do frontend
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Faz o build da aplicação Next.js
RUN npm run build

# Cria a imagem final com uma imagem mais leve
FROM node:20-alpine

WORKDIR /app

# Copia apenas os arquivos necessários
COPY --from=builder /app ./

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para rodar o frontend
CMD ["npm", "start"]
