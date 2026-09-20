import os
import json
import joblib
import pandas as pd
import numpy as np

from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from catboost import CatBoostClassifier

def train_and_export_model():
    print("Initializing MycoClassify Model Training Pipeline...")
    
    # 1. Load Training Data
    data_path = os.path.join(os.path.dirname(__file__), '..', 'train.csv')
    if not os.path.exists(data_path):
        data_path = 'train.csv'
        
    df = pd.read_csv(data_path)
    print(f"Loaded dataset with {len(df)} observations.")
    
    # 2. Separate Target and Predictors
    y = df['class'].map({'e': 0, 'p': 1})
    X = df.drop(columns=['ID', 'class', 'mushroom_id'], errors='ignore')
    
    # 3. Exact Notebook Feature Engineering
    X['odor_gill_size'] = X['odor'].astype(str) + '_' + X['gill-size'].astype(str)
    X['odor_gill_color'] = X['odor'].astype(str) + '_' + X['gill-color'].astype(str)
    X['ring_spore'] = X['ring-type'].astype(str) + '_' + X['spore-print-color'].astype(str)
    
    # 4. Preprocessing Pipeline Definition
    num_cols = ['number_of_bruises', 'ring-number']
    cat_cols = [c for c in X.columns if c not in num_cols]
    
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', Pipeline([
                ('imputer', SimpleImputer(strategy='median')),
                ('scaler', StandardScaler())
            ]), num_cols),
            ('cat', Pipeline([
                ('imputer', SimpleImputer(strategy='constant', fill_value='Missing')),
                ('ohe', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
            ]), cat_cols)
        ]
    )
    
    # 5. Build and Fit CatBoost Pipeline
    clf = CatBoostClassifier(iterations=250, random_state=42, verbose=0)
    pipeline = Pipeline([
        ('prep', preprocessor),
        ('clf', clf)
    ])
    
    print("Fitting CatBoostClassifier pipeline on training dataset...")
    pipeline.fit(X, y)
    print("Pipeline training completed successfully!")
    
    # 6. Extract CatBoost Feature Importances
    cat_ohe_names = pipeline.named_steps['prep'].named_transformers_['cat'].named_steps['ohe'].get_feature_names_out(cat_cols)
    all_feature_names = num_cols + list(cat_ohe_names)
    importances = pipeline.named_steps['clf'].get_feature_importance()
    
    feat_imp_list = []
    for name, imp in zip(all_feature_names, importances):
        feat_imp_list.append({
            'feature': name,
            'importance': round(float(imp), 4)
        })
    
    # Sort descending
    feat_imp_list = sorted(feat_imp_list, key=lambda x: x['importance'], reverse=True)
    
    # 7. Define Notebook Exact Comparison Metrics
    metadata = {
        'model_name': 'CatBoostClassifier (Tuned Pipeline)',
        'target_mapping': {'e': 'Edible (Class 0)', 'p': 'Poisonous (Class 1)'},
        'training_samples': len(df),
        'metrics': {
            'validation_accuracy': 1.0000,
            'precision': 1.0000,
            'recall': 1.0000,
            'f1_score': 1.0000,
            'roc_auc': 1.0000,
            'cross_val_mean_accuracy': 1.0000,
            'cross_val_std_accuracy': 0.0000
        },
        'compared_models': [
            {'model': 'CatBoost', 'accuracy': 1.0000, 'roc_auc': 1.0000, 'status': 'Selected Best Pipeline'},
            {'model': 'Random Forest (Tuned)', 'accuracy': 1.0000, 'roc_auc': 1.0000, 'status': 'Candidate'},
            {'model': 'XGBoost (Tuned)', 'accuracy': 1.0000, 'roc_auc': 1.0000, 'status': 'Candidate'},
            {'model': 'Soft Voting Ensemble', 'accuracy': 1.0000, 'roc_auc': 1.0000, 'status': 'Ensemble'},
            {'model': 'Stacking Ensemble', 'accuracy': 1.0000, 'roc_auc': 1.0000, 'status': 'Ensemble'},
            {'model': 'Extra Trees', 'accuracy': 0.9986, 'roc_auc': 1.0000, 'status': 'Baseline'},
            {'model': 'Gradient Boosting', 'accuracy': 0.9979, 'roc_auc': 1.0000, 'status': 'Baseline'},
            {'model': 'LightGBM', 'accuracy': 0.9971, 'roc_auc': 1.0000, 'status': 'Baseline'},
            {'model': 'Decision Tree', 'accuracy': 0.9957, 'roc_auc': 0.9956, 'status': 'Baseline'},
            {'model': 'AdaBoost', 'accuracy': 0.9929, 'roc_auc': 0.9997, 'status': 'Baseline'},
            {'model': 'Logistic Regression', 'accuracy': 0.9857, 'roc_auc': 0.9987, 'status': 'Baseline'}
        ],
        'feature_importances': feat_imp_list[:20],
        'achievement': '100/100 — IIT Madras',
        'author': 'S. Pranav'
    }
    
    # 8. Save Artifacts
    artifacts_dir = os.path.join(os.path.dirname(__file__), 'artifacts')
    os.makedirs(artifacts_dir, exist_ok=True)
    
    model_path = os.path.join(artifacts_dir, 'catboost_model.joblib')
    joblib.dump(pipeline, model_path)
    print(f"Saved trained pipeline artifact to {model_path}")
    
    meta_path = os.path.join(artifacts_dir, 'model_metadata.json')
    with open(meta_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2)
    print(f"Saved model metadata to {meta_path}")

if __name__ == '__main__':
    train_and_export_model()
