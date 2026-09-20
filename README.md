# MycoClassify — Botanical Mushroom Field Instrument & Machine-Learning Classifier

[![IIT Madras Achievement](https://img.shields.com/badge/IIT_Madras-100%2F100_Score-3f604b.svg)](#achievement)
[![Python FastAPI](https://img.shields.com/badge/Backend-FastAPI_Python-587c63.svg)](#backend)
[![CatBoost Classifier](https://img.shields.com/badge/ML_Model-CatBoost_1.0000_Accuracy-2f4b39.svg)](#ml-methodology)
[![React Vite](https://img.shields.com/badge/Frontend-React_Vite-dfe8dc.svg)](#frontend)

**MycoClassify** is a production-ready, full-stack application designed as a premium botanical field instrument and machine-learning mushroom classification journal. It bridges classic botanical illustration aesthetics with real machine-learning inference.

---

## 🌲 Key Features

- **Botanical Field Instrument Aesthetic**: Designed around the PowerPoint template visual system featuring a cream/off-white palette (`#f8f7f1`), muted botanical green typography (`#3f604b`), and serif editorial layouts.
- **Restrained Mushroom Artwork**: Exactly two high-quality watercolor botanical field-guide mushroom illustrations (Hero & Specimen Record) integrated naturally without visual clutter.
- **Glassmorphic Navigation Bar**: Translucent warm cream glass top bar with backdrop blur, scroll elevation, smooth section navigation, and compact mobile menu.
- **5-Step Intuitive Field Journal**: Category-based observation recorder (Cap & Surface, Gills & Odour, Stalk & Root, Ring & Spore, Habitat & Population) using human-readable dataset attributes.
- **Real ML Backend (Python + FastAPI)**: Executes real-time inference using a trained **CatBoostClassifier** pipeline (1.0000 Accuracy, 1.0000 ROC-AUC, 1.0000 5-Fold Cross-Validation). Zero fake percentages or hardcoded predictions.
- **Real CatBoost Feature Importance**: Renders top physical drivers of toxicity (`odor`, `spore-print-color`, `gill-size`, etc.) from model feature importances.
- **Local Storage Classification History**: Retains past specimen observation records with timestamp, prediction, and clear history functionality.
- **Notebook Methodology & Benchmarks**: Complete model comparison table benchmarking 9 classifiers (CatBoost, Random Forest, XGBoost, Extra Trees, Gradient Boosting, LightGBM, Decision Tree, AdaBoost, Logistic Regression) and Soft Voting / Stacking ensembles.
- **IIT Madras Academic Achievement**: Celebrates the 100/100 project score.
- **Educational Food Safety Disclaimer**: Visually prominent warning against consuming wild mushrooms.

---

## 🛠️ Tech Stack & Architecture

```
MYCOCLASSIFY SYSTEM ARCHITECTURE
┌─────────────────────────────────────────────────────────┐
│              FRONTEND (React + Vite SPA)                │
│  - Glassmorphic Navbar & Mobile Navigation              │
│  - 5-Step Botanical Observation Field Journal           │
│  - Real-Time Specimen Result Card                       │
│  - Feature Importance & Model Benchmark Visualizations  │
│  - localStorage Recent Classifications Drawer           │
└────────────────────────────┬────────────────────────────┘
                             │
                  POST /predict (HTTP/JSON)
                             │
┌────────────────────────────▼────────────────────────────┐
│              BACKEND (Python + FastAPI)                 │
│  - FastAPI REST API Server (app.py)                     │
│  - Model Service & Single-Row Dataframe Mapper          │
│  - Notebook Feature Engineering (odor_gill_size, etc.)  │
│  - Scikit-Learn ColumnTransformer Pipeline              │
│  - Trained CatBoostClassifier Pipeline (joblib)         │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **Python**: v3.10, v3.11, or v3.12+

### 2. Backend Setup
```bash
# Navigate to project root directory
cd "Mushroom Final Site"

# (Optional) Create Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python backend dependencies
pip install -r backend/requirements.txt

# (Optional) Train/Re-train the model pipeline
python backend/train_model.py

# Launch FastAPI backend server (default port: 8000)
uvicorn backend.app:app --host 0.0.0.0 --port 8000 --reload
```
*API endpoints available at `http://localhost:8000/health`, `http://localhost:8000/metadata`, and `POST http://localhost:8000/predict`.*

### 3. Frontend Setup
```bash
# Install frontend npm dependencies
npm install

# Start Vite development server
npm run dev
```
*Open `http://localhost:5173` in your browser.*

---

## 🧪 API Specification

### `POST /predict`
Submits specimen physical characteristics for real-time model inference.

**Request Format (JSON):**
```json
{
  "cap-shape": "convex",
  "cap-surface": "smooth",
  "cap-color": "yellow",
  "bruises": "bruises",
  "number_of_bruises": 20,
  "odor": "almond",
  "gill-attachment": "gills free from stalk",
  "gill-spacing": "close",
  "gill-size": "broad",
  "gill-color": "black",
  "stalk-shape": "stalk enlarges toward base",
  "stalk-root": "club",
  "stalk-surface-above-ring": "smooth",
  "stalk-surface-below-ring": "smooth",
  "stalk-color-above-ring": "white",
  "stalk-color-below-ring": "white",
  "veil-type": "partial",
  "veil-color": "white",
  "ring-number": 1,
  "ring-type": "pendant",
  "spore-print-color": "brown",
  "population": "numerous",
  "habitat": "grasses"
}
```

**Response Format (JSON):**
```json
{
  "prediction": "Edible",
  "class_code": "e",
  "probability": 0.9989,
  "confidence_percentage": "99.89%",
  "is_edible": true,
  "summary": "Specimen exhibits physical characteristics consistent with EDIBLE wild mushroom species.",
  "observations": { ... },
  "feature_importances": [
    { "feature": "odor_foul", "importance": 18.42 },
    { "feature": "spore-print-color_green", "importance": 14.21 }
  ],
  "model_name": "CatBoostClassifier (Tuned Pipeline)",
  "timestamp": "2026-09-15T23:50:00"
}
```

---

## 📦 Deployment Guide

### Deploying Frontend to Vercel
1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Set the environment variable:
   - `VITE_API_URL`: URL of your deployed Python backend (e.g. `https://mycoclassify-api.onrender.com`).
4. Build Command: `npm run build`
5. Output Directory: `dist`

### Deploying Backend to Render / Railway / Python Host
1. Set root directory to `backend/` or repository root.
2. Start Command: `uvicorn backend.app:app --host 0.0.0.0 --port $PORT`
3. Environment Variables:
   - `PORT`: Automatically provided by host platform.
   - `CORS_ORIGINS`: Your Vercel frontend URL.

---

## 📊 Machine Learning Methodology

Reproduced from `Mushroom_Classification.ipynb`:

1. **Missing Value Strategy**: Imputed categorical missing attributes (`odor`, `stalk-root`, `ring-type`) with `'Missing'` within a leakage-free `ColumnTransformer` pipeline.
2. **Domain Feature Engineering**:
   - `odor_gill_size = odor + '_' + gill-size`
   - `odor_gill_color = odor + '_' + gill-color`
   - `ring_spore = ring-type + '_' + spore-print-color`
3. **Model Benchmark**:
   - Tuned CatBoost: **1.0000 Accuracy** / **1.0000 ROC-AUC**
   - Tuned Random Forest: **1.0000 Accuracy** / **1.0000 ROC-AUC**
   - Tuned XGBoost: **1.0000 Accuracy** / **1.0000 ROC-AUC**
   - Soft Voting & Stacking Ensembles: **1.0000 Accuracy** / **1.0000 ROC-AUC**

---

## ⚠️ Educational Safety Disclaimer

This application is an educational machine-learning classification model built for research and botanical study. It must **NOT** be used to determine whether a wild mushroom is safe for human consumption. Never forage or consume wild fungi based solely on algorithmic predictions.

---

## 👤 Credits

**Project Lead & Model Author**: S. Pranav  
**Academic Score**: 100/100 — IIT Madras ML Course Project Specification  
