import joblib
import pandas as pd
import os

# Define paths for model and encoders
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "crop_waste_prediction_model2.pkl")
ENCODER_CROP_PATH = os.path.join(BASE_DIR, "crop_type_encoder1.pkl")
ENCODER_WASTE_PATH = os.path.join(BASE_DIR, "waste_type_encoder1.pkl")

def waste_prediction(crop_input, waste_input, farm_size):
    try:
        print("Received inputs:", crop_input, waste_input, farm_size)  # Debugging line

        # Load model
        loaded_model = joblib.load(MODEL_PATH)
        loaded_le_crop = joblib.load(ENCODER_CROP_PATH)
        loaded_le_waste = joblib.load(ENCODER_WASTE_PATH)

        # Encode categorical values
        encoded_crop = loaded_le_crop.transform([crop_input])[0]
        encoded_waste = loaded_le_waste.transform([waste_input])[0]

        print("Encoded values:", encoded_crop, encoded_waste)  # Debugging line

        # Predict
        sample_input = pd.DataFrame([[encoded_crop, encoded_waste, farm_size]], 
                                    columns=['Crop Type', 'Waste Type', 'Farm Size (hectares)'])
        predicted_waste = loaded_model.predict(sample_input)
        print("Predicted waste:", predicted_waste)  # Debugging line

        return round(float(predicted_waste[0]), 2)
    
    except Exception as e:
        print("Error in prediction:", e)
        return None  # Returning None to handle error properly in Flask
