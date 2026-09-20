import os
import json
import joblib
import datetime
import pandas as pd
import numpy as np

class ModelService:
    def __init__ (self):
        self.model = None
        self.metadata = None
        self.load_artifacts()

    def load_artifacts(self):
        artifacts_dir = os.path.join(os.path.dirname(__file__), 'artifacts')
        model_path = os.path.join(artifacts_dir, 'catboost_model.joblib')
        meta_path = os.path.join(artifacts_dir, 'model_metadata.json')

        if not os.path.exists(model_path) or not os.path.exists(meta_path):
            print("Artifacts not found, executing train_model...")
            from backend.train_model import train_and_export_model
            train_and_export_model()

        self.model = joblib.load(model_path)
        with open(meta_path, 'r', encoding='utf-8') as f:
            self.metadata = json.load(f)
        print("ModelService loaded CatBoostClassifier pipeline successfully.")

    def predict(self, observation_data: dict) -> dict:
        # Convert observation dict into single-row DataFrame
        input_dict = {
            'cap-shape': [str(observation_data.get('cap-shape', 'x'))],
            'cap-surface': [str(observation_data.get('cap-surface', 's'))],
            'cap-color': [str(observation_data.get('cap-color', 'n'))],
            'bruises': [str(observation_data.get('bruises', 't'))],
            'number_of_bruises': [float(observation_data.get('number_of_bruises', 0.0))],
            'odor': [str(observation_data.get('odor', 'n'))],
            'gill-attachment': [str(observation_data.get('gill-attachment', 'f'))],
            'gill-spacing': [str(observation_data.get('gill-spacing', 'c'))],
            'gill-size': [str(observation_data.get('gill-size', 'b'))],
            'gill-color': [str(observation_data.get('gill-color', 'k'))],
            'stalk-shape': [str(observation_data.get('stalk-shape', 'e'))],
            'stalk-root': [str(observation_data.get('stalk-root', 'b'))],
            'stalk-surface-above-ring': [str(observation_data.get('stalk-surface-above-ring', 's'))],
            'stalk-surface-below-ring': [str(observation_data.get('stalk-surface-below-ring', 's'))],
            'stalk-color-above-ring': [str(observation_data.get('stalk-color-above-ring', 'w'))],
            'stalk-color-below-ring': [str(observation_data.get('stalk-color-below-ring', 'w'))],
            'veil-type': [str(observation_data.get('veil-type', 'p'))],
            'veil-color': [str(observation_data.get('veil-color', 'w'))],
            'ring-number': [float(observation_data.get('ring-number', 1.0))],
            'ring-type': [str(observation_data.get('ring-type', 'p'))],
            'spore-print-color': [str(observation_data.get('spore-print-color', 'k'))],
            'population': [str(observation_data.get('population', 's'))],
            'habitat': [str(observation_data.get('habitat', 'd'))]
        }
        
        df = pd.DataFrame(input_dict)

        # Apply exact notebook feature engineering
        df['odor_gill_size'] = df['odor'].astype(str) + '_' + df['gill-size'].astype(str)
        df['odor_gill_color'] = df['odor'].astype(str) + '_' + df['gill-color'].astype(str)
        df['ring_spore'] = df['ring-type'].astype(str) + '_' + df['spore-print-color'].astype(str)

        # Run inference
        pred_class = int(self.model.predict(df)[0])
        probs = self.model.predict_proba(df)[0]
        prob_val = float(probs[pred_class])

        class_code = 'p' if pred_class == 1 else 'e'
        class_name = 'Poisonous' if pred_class == 1 else 'Edible'

        summary_text = (
            "Specimen exhibits physical features strongly associated with TOXIC / POISONOUS wild mushroom species."
            if pred_class == 1 else
            "Specimen exhibits physical characteristics consistent with EDIBLE wild mushroom species."
        )

        return {
            'prediction': class_name,
            'class_code': class_code,
            'probability': round(prob_val, 4),
            'confidence_percentage': f"{round(prob_val * 100, 2)}%",
            'is_edible': (pred_class == 0),
            'summary': summary_text,
            'observations': observation_data,
            'feature_importances': self.metadata.get('feature_importances', []),
            'model_name': self.metadata.get('model_name', 'CatBoostClassifier'),
            'timestamp': datetime.datetime.now().isoformat()
        }

# Singleton instance
model_service = ModelService()
