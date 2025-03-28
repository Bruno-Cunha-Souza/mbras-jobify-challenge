# Usa a imagem oficial do Golang
FROM golang:1.24 AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app/cmd

# Copia os arquivos de configuração do Go (go.mod e go.sum) primeiro para aproveitar o cache de camadas
COPY go.mod go.sum ./

# Faz o download das dependências do Go
RUN go mod download

# Copia o arquivo .env para o contêiner
COPY .env ./

# Copia o restante do código-fonte
COPY . .

# Ajusta as permissões do .env
RUN chmod 644 /app/.env

# Faz a compilação do aplicativo Go
RUN go build -o main .

# Cria a imagem final baseada no distroless (sem dependências extras)
FROM gcr.io/distroless/base-debian12

# Define o diretório de trabalho no contêiner final
WORKDIR /app

# Copia o binário da imagem builder para o contêiner final
COPY --from=builder /app/cmd/main .

# Copia o arquivo .env para o contêiner final
COPY --from=builder /app/.env ./

# Expõe a porta padrão da API
EXPOSE 3000

# Comando para rodar a API
CMD ["/app/cmd/main"]
