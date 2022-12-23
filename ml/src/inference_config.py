from os import getenv, path
import requests

class InferenceConfig:
    def __init__(self) -> None:
        self.rabbitmq_host = getenv('RABBITMQ_HOST', 'localhost')
        self.inference_exchange_name = getenv(
            'INFERENCE_EXCHANGE_NAME',
            'inference',
        )

        self.weights_path = getenv(
            'WEIGHTS_PATH',
            path.join('/', 'app', 'weights', 'efficientnetb0.h5'),
        )

        self.api_url = getenv(
            'API_URL',
            'http://app:5000',
        )
        self.api_user = getenv(
            'API_USER',
            'user',
        )
        self.api_password = getenv(
            'API_PASSWORD',
            'password',
        )

        response = requests.post(
            f'{self.api_url}/login',
            data={
                'username': self.api_user,
                'password': self.api_password,
            },
        )
        if not response['token']:
            raise Exception('No token found')
        
        self.api_token=response['token']

        self.last_conv_layer = getenv(
            'LAST_CONV_LAYER',
            'conv5_block16_2_conv'
        )
