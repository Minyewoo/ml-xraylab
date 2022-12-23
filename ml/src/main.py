import json
import logging
import sys
from inference_config import InferenceConfig
import pika
from predict import predict_diseases
import requests
import io

def inference_callback(ch, method, properties, body):
    config = InferenceConfig()
    payload = json.loads(body)
    snapshot_id = payload['snapshot_id']
    snapshot_path = payload['snapshot_path']
    snapshot_url = f'{config.api_url}/{snapshot_path}' 

    predictions, heatmaped_image = predict_diseases(snapshot_url, config)

    with io.BytesIO() as output:
        heatmaped_image.save(output, format="PNG")
        output.seek(0)
        files = {'mask': ('mask.png', output, 'image/png', {'Expires': '0'})}
        mask_aquisition_url = f'{config.api_url}/add_mask/{snapshot_id}'
        mask_response = requests.post(mask_aquisition_url, files=files)
        logging.critical(f'Mask uploading sucseeded: {mask_response.ok}')
    
    # token = requests.post(
    #     f'{config.api_url}/login',
    #     data={
    #         'username': config.api_user,
    #         'password': config.api_password,
    #     },
    # ).json()['token']
    
    preds_aquisition_url = f'{config.api_url}/add_predictions/{snapshot_id}'
    preds_response = requests.post(
        preds_aquisition_url, 
        # headers={'Authorization': f'Bearer {token}'},
        json={'conclusion': json.dumps(predictions)}
    )

    logging.critical(f'Predictions sending sucseeded: {preds_response.ok}')

    ch.basic_ack(delivery_tag = method.delivery_tag)

if __name__ == '__main__':
    LOG_FORMAT = ('%(levelname) -10s %(asctime)s %(name) -30s %(funcName) '
              '-35s %(lineno) -5d: %(message)s')
    logging.basicConfig(stream=sys.stdout, level=logging.CRITICAL, format=LOG_FORMAT)

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
        exchange=config.inference_exchange_name, queue=queue_name)

    channel.basic_consume(
        queue=queue_name, on_message_callback=inference_callback)

    channel.start_consuming()