FROM golang:alpine AS build
USER root

WORKDIR /app
COPY api/ .

RUN apk add --no-cache git
RUN go get -d -v ./...

RUN go build -o main .

EXPOSE 80
CMD ["./main"]