import os
import json
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.metrics import confusion_matrix, accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from catboost import CatBoostClassifier

class AnalyticsService:
    def __init__(self):
        self.cached_analytics = None

    def compute_analytics(self) -> dict:
        if self.cached_analytics:
            return self.cached_analytics

        print("Computing SporeX real-time dataset EDA, PCA clustering, and validation analytics from train.csv...")

        # Locate train.csv
        data_path = os.path.join(os.path.dirname(__file__), '..', 'train.csv')
        if not os.path.exists(data_path):
            data_path = 'train.csv'

        df = pd.read_csv(data_path)
        total_samples = len(df)

        # 1. Target Distribution
        target_counts = df['class'].value_counts().to_dict()
        edible_count = int(target_counts.get('e', 0))
        poisonous_count = int(target_counts.get('p', 0))

        target_dist = {
            'total': total_samples,
            'edible': {
                'count': edible_count,
                'percentage': round((edible_count / total_samples) * 100, 2)
            },
            'poisonous': {
                'count': poisonous_count,
                'percentage': round((poisonous_count / total_samples) * 100, 2)
            }
        }

        # 2. Missing Value Profile
        missing_list = []
        for col in df.columns:
            m_count = int(df[col].isnull().sum())
            if m_count > 0:
                missing_list.append({
                    'column': col,
                    'missing_count': m_count,
                    'percentage': round((m_count / total_samples) * 100, 2)
                })
        missing_list = sorted(missing_list, key=lambda x: x['missing_count'], reverse=True)

        # Helper for Categorical x Class breakdown
        def get_cat_by_class(col_name):
            df_filled = df.fillna({col_name: 'Missing'})
            ct = pd.crosstab(df_filled[col_name], df_filled['class'])
            res = []
            for cat_val in ct.index:
                e_cnt = int(ct.loc[cat_val, 'e']) if 'e' in ct.columns else 0
                p_cnt = int(ct.loc[cat_val, 'p']) if 'p' in ct.columns else 0
                res.append({
                    'category': str(cat_val).title(),
                    'raw_value': str(cat_val),
                    'edible': e_cnt,
                    'poisonous': p_cnt,
                    'total': e_cnt + p_cnt
                })
            return sorted(res, key=lambda x: x['total'], reverse=True)

        # 3. Categorical Breakdown Analyses
        odor_eda = get_cat_by_class('odor')
        gill_size_eda = get_cat_by_class('gill-size')
        spore_print_eda = get_cat_by_class('spore-print-color')
        habitat_eda = get_cat_by_class('habitat')
        bruises_eda = get_cat_by_class('bruises')
        ring_number_eda = get_cat_by_class('ring-number')
        cap_shape_eda = get_cat_by_class('cap-shape')

        # 4. Feature Preprocessing, PCA 2D & KMeans Clustering
        y = df['class'].map({'e': 0, 'p': 1})
        X = df.drop(columns=['ID', 'class', 'mushroom_id'], errors='ignore')

        X['odor_gill_size'] = X['odor'].astype(str) + '_' + X['gill-size'].astype(str)
        X['odor_gill_color'] = X['odor'].astype(str) + '_' + X['gill-color'].astype(str)
        X['ring_spore'] = X['ring-type'].astype(str) + '_' + X['spore-print-color'].astype(str)

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

        X_encoded = preprocessor.fit_transform(X)

        # Compute 2D PCA & KMeans (3 clusters)
        pca = PCA(n_components=2, random_state=42)
        X_pca = pca.fit_transform(X_encoded)
        kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
        clusters = kmeans.fit_predict(X_encoded)

        pca_sample_points = []
        # Sample 150 points for responsive rendering
        sample_indices = np.random.RandomState(42).choice(len(df), size=min(150, len(df)), replace=False)
        for idx in sample_indices:
            pca_sample_points.append({
                'pca_x': round(float(X_pca[idx, 0]), 3),
                'pca_y': round(float(X_pca[idx, 1]), 3),
                'cluster': int(clusters[idx]),
                'class': "Edible" if y.iloc[idx] == 0 else "Poisonous",
                'odor': str(df['odor'].iloc[idx]).title()
            })

        # 5. Fit Validation Model & Calculate Confusion Matrix + Predicted vs Actual
        X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)

        clf = CatBoostClassifier(iterations=250, random_state=42, verbose=0)
        pipeline = Pipeline([('prep', preprocessor), ('clf', clf)])
        pipeline.fit(X_train, y_train)

        val_preds = pipeline.predict(X_val)
        val_probs = pipeline.predict_proba(X_val)[:, 1]

        val_acc = float(accuracy_score(y_val, val_preds))
        val_prec = float(precision_score(y_val, val_preds))
        val_rec = float(recall_score(y_val, val_preds))
        val_f1 = float(f1_score(y_val, val_preds))
        val_auc = float(roc_auc_score(y_val, val_probs))

        # Confusion Matrix
        cm = confusion_matrix(y_val, val_preds)
        tn, fp, fn, tp = int(cm[0,0]), int(cm[0,1]), int(cm[1,0]), int(cm[1,1])

        confusion_matrix_data = {
            'true_edible': tn,
            'false_poisonous': fp,
            'false_edible': fn,
            'true_poisonous': tp,
            'total_validation_samples': len(y_val)
        }

        val_samples = []
        for i in range(min(50, len(y_val))):
            act_label = "Edible" if y_val.iloc[i] == 0 else "Poisonous"
            pred_label = "Edible" if val_preds[i] == 0 else "Poisonous"
            prob_val = float(val_probs[i])
            conf_pct = f"{((1 - prob_val) if val_preds[i] == 0 else prob_val) * 100:.2f}%"
            val_samples.append({
                'id': i + 1,
                'actual': act_label,
                'predicted': pred_label,
                'is_correct': act_label == pred_label,
                'confidence': conf_pct,
                'odor': str(X_val.iloc[i]['odor']).title(),
                'gill_size': str(X_val.iloc[i]['gill-size']).title(),
                'habitat': str(X_val.iloc[i]['habitat']).title()
            })

        # Assemble Full SporeX Analytics JSON
        self.cached_analytics = {
            'target_distribution': target_dist,
            'missing_values': missing_list,
            'odor_breakdown': odor_eda,
            'gill_size_breakdown': gill_size_eda,
            'spore_print_breakdown': spore_print_eda,
            'habitat_breakdown': habitat_eda,
            'bruises_breakdown': bruises_eda,
            'ring_number_breakdown': ring_number_eda,
            'cap_shape_breakdown': cap_shape_eda,
            'pca_cluster_points': pca_sample_points,
            'validation_metrics': {
                'accuracy': val_acc,
                'precision': val_prec,
                'recall': val_rec,
                'f1_score': val_f1,
                'roc_auc': val_auc
            },
            'confusion_matrix': confusion_matrix_data,
            'predicted_vs_actual_samples': val_samples
        }

        print("SporeX dataset analytics & PCA clustering successfully computed!")
        return self.cached_analytics

analytics_service = AnalyticsService()
