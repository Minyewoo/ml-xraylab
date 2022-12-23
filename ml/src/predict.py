import logging
from inference_config import InferenceConfig
from utils import apply_heatmap, get_image, make_gradcam_heatmap, preprocess_image
from tensorflow import keras
import numpy as np

classes = ['No Finding', 'Atelectasis', 'Consolidation', 'Cardiomegaly', 'Infiltration', 'Pneumothorax', 'Edema', 'Emphysema', 'Fibrosis', 'Effusion', 'Pneumonia', 'Pleural_Thickening', 'Nodule', 'Mass', 'Hernia']

def predict_diseases(snapshot_url, config: InferenceConfig):

    model = keras.models.load_model(config.weights_path)
    image = get_image(snapshot_url)
    preprocessed_image = preprocess_image(image)
    predictions = map_prediction(np.squeeze(model.predict(preprocessed_image)))

    # heatmap = make_gradcam_heatmap(preprocessed_image, model, 'conv5_block16_2_conv')
    heatmap = make_gradcam_heatmap(preprocessed_image, model, 'top_conv')
    masked_image = apply_heatmap(image, heatmap)
    return predictions, masked_image

def map_prediction(prediction):
    mapped_prediction = {}

    for i in range(len(classes)):
        mapped_prediction[classes[i]] = float(prediction[i])

    # logging.critical(mapped_prediction)
    return mapped_prediction