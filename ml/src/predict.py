from inference_config import InferenceConfig
from utils import apply_heatmap, get_image, make_gradcam_heatmap, preprocess_image
from tensorflow import keras
import numpy as np

classes = ['No Finding', 'Atelectasis', 'Consolidation', 'Cardiomegaly', 'Infiltration', 'Pneumothorax', 'Edema', 'Emphysema', 'Fibrosis', 'Effusion', 'Pneumonia', 'Pleural_Thickening', 'Nodule', 'Mass', 'Hernia']

def predict_diseases(snapshot_url, config: InferenceConfig):
    image = get_image(snapshot_url)

    model = keras.models.load_model(config.weights_path)
    predictions = map_prediction(np.squeeze(model.predict(image)))

    heatmap = make_gradcam_heatmap(preprocess_image(image), model, 'conv5_block16_2_conv')
    masked_image = apply_heatmap(image, heatmap)
    return predictions, masked_image

def map_prediction(prediction):
    mapped_prediction = {}

    for i in range(len(classes)):
        mapped_prediction[classes[i]] = prediction[i]

    return mapped_prediction