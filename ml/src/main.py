import json
import logging
import sys
from inference_config import InferenceConfig
import pika
from utils import get_image, save_to_bucket
from predict import predict_diseases

def inference_callback(ch, method, properties, body):
    payload = json.loads(body)
    snapshot_url = get_image(payload['snapshot_url'])
    predictions, heatmaped_image = predict_diseases(snapshot_url)
    mask_url = save_to_bucket(heatmaped_image)
    
    ch.basic_ack(delivery_tag = method.delivery_tag)

if __name__ == '__main__':
    LOG_FORMAT = ('%(levelname) -10s %(asctime)s %(name) -30s %(funcName) '
              '-35s %(lineno) -5d: %(message)s')
    logging.basicConfig(stream=sys.stdout, level=logging.INFO, format=LOG_FORMAT)

    config = InferenceConfig()

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(config.rabbitmq_host,heartbeat=1800),
    )
    channel = connection.channel()

    channel.exchange_declare(
        exchange=config.inference_exchange_name,
        exchange_type='fanout',
        durable=True,
    )

    queue_info = channel.queue_declare(queue='', exclusive=True)
    queue_name = queue_info.method.queue

    channel.queue_bind(
        exchange=config.scheduler_exchange_name, queue=queue_name)

    channel.basic_consume(
        queue=queue_name, on_message_callback=inference_callback)

    channel.start_consuming()