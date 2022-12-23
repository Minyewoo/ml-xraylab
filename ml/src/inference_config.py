from os import getenv, path


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
            'http://app:5000/',
        )

        self.last_conv_layer = getenv(
            'LAST_CONV_LAYER',
            'conv5_block16_2_conv'
        )

        self.s3_key_id = getenv(
            'S3_KEY_ID',
            's3-key-id'
        )

        self.s3_id_key = getenv(
            'S3_SECRET_KEY',
            's3-secret-key'
        )