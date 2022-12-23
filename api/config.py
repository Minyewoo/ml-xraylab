from os import getenv


class ApiConfig:
    def __init__(self) -> None:
        self.rabbitmq_host = getenv('RABBITMQ_HOST', 'localhost')
        self.inference_exchange_name = getenv(
            'INFERENCE_EXCHANGE_NAME',
            'inference',
        )