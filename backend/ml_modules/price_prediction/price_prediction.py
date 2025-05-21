import joblib
import pandas as pd
import os

# Define paths for model and encoders
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "crop_waste_price_prediction_model1.pkl")
ENCODER_CROP_PATH = os.path.join(BASE_DIR, "crop_type_encoder.pkl")
ENCODER_WASTE_PATH = os.path.join(BASE_DIR, "waste_type_encoder.pkl")
SCALER = os.path.join(BASE_DIR, "scaler.pkl")

def price_prediction(crop_input, waste_input, farm_size, predicted_waste):
    try:
        print("Received inputs:", crop_input, waste_input, farm_size, predicted_waste)  # Debugging line

        # Load model
        loaded_model = joblib.load(MODEL_PATH)
        loaded_le_crop = joblib.load(ENCODER_CROP_PATH)
        loaded_le_waste = joblib.load(ENCODER_WASTE_PATH)
        loaded_scaler = joblib.load(SCALER)

        # Encode categorical values
        encoded_crop = loaded_le_crop.transform([crop_input])[0]
        encoded_waste = loaded_le_waste.transform([waste_input])[0]

        print("Encoded values:", encoded_crop, encoded_waste)  # Debugging line

        # Predict
        sample_input = pd.DataFrame([[encoded_crop, encoded_waste, farm_size, predicted_waste]], 
                                    columns=['Crop Type', 'Waste Type', 'Farm Size (hectares)', 'Predicted Waste (tons)'])
        
        # Apply scaling
        sample_input_scaled = loaded_scaler.transform(sample_input)

        # Predict waste generation
        predicted_price = loaded_model.predict(sample_input_scaled) 

        return round(float(predicted_price[0]), 2)
    
    except Exception as e:
        print("Error in prediction:", e)
        return None  # Returning None to handle error properly in Flask
    
    
# print(price_prediction("Soybean","Husks",3.37,5.05))
