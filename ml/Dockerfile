FROM python:3.10.9-slim-bullseye

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y

COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /app
COPY ./src .

ENTRYPOINT [ "python", "main.py"]