FROM golang:1.20 
RUN mkdir /app
ADD  . /app
WORKDIR /app
# RUN echo $(ls -1 /app)
RUN go mod download && go mod verify
RUN go build -o app /app/cmd
# CMD ["go", "run", "./cmd/main.go"]
# RUN ./main
# RUN echo $(ls -1 /app)
CMD [ "./app" ] 