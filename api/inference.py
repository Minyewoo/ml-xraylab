import json
import logging
from config import ApiConfig
import pika

def send_for_inference(snapshot_id, snapshot_path):
    config = ApiConfig()

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(config.rabbitmq_host))
    channel = connection.channel()

    channel.exchange_declare(
        exchange=config.inference_exchange_name,
        exchange_type='fanout',
        durable=True,
    )

    data = {'snapshot_id': snapshot_id, 'snapshot_path': snapshot_path}
    message = json.dumps(data)

    channel.basic_publish(exchange=config.inference_exchange_name,
                          routing_key='',
                          body=message)

    logging.critical(f' Sent: %s{message}, in {config.inference_exchange_name}')

    connection.close()
