FROM python:3.10.9-slim-bullseye

COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /app
COPY ./src .

ENTRYPOINT [ "python", "main.py"]