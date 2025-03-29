FROM golang:1.24 AS builder

WORKDIR /app

COPY go.mod go.sum ./
COPY .env ./
COPY . . 
RUN chmod 644 .env
RUN go mod download
RUN go mod tidy

WORKDIR /app/cmd
RUN go build -o /app/main .

FROM gcr.io/distroless/base-debian12

WORKDIR /app
COPY --from=builder /app/main .
COPY --from=builder /app/.env .

EXPOSE 5000

CMD ["/app/main"]