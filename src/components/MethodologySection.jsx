import React from 'react';
import { NatureToDataStem } from './BotanicalElements';

export default function MethodologySection() {
  const models = [
    { name: "Tuned CatBoost (Selected Pipeline)", accuracy: "100.00%", f1: "1.0000", auc: "1.0000", cv: "1.0000 +/- 0.0000", type: "Selected Best" },
    { name: "Tuned Random Forest", accuracy: "100.00%", f1: "1.0000", auc: "1.0000", cv: "1.0000 +/- 0.0000", type: "Tuned" },
    { name: "Tuned XGBoost", accuracy: "100.00%", f1: "1.0000", auc: "1.0000", cv: "1.0000 +/- 0.0000", type: "Tuned" },
    { name: "Soft Voting Ensemble", accuracy: "100.00%", f1: "1.0000", auc: "1.0000", cv: "1.0000 +/- 0.0000", type: "Ensemble" },
    { name: "Stacking Ensemble", accuracy: "100.00%", f1: "1.0000", auc: "1.0000", cv: "1.0000 +/- 0.0000", type: "Ensemble" },
    { name: "Extra Trees Classifier", accuracy: "99.86%", f1: "0.9985", auc: "1.0000", cv: "0.9986 +/- 0.0012", type: "Baseline" },
    { name: "Gradient Boosting", accuracy: "99.79%", f1: "0.9977", auc: "1.0000", cv: "0.9979 +/- 0.0015", type: "Baseline" },
    { name: "LightGBM Classifier", accuracy: "99.71%", f1: "0.9969", auc: "1.0000", cv: "0.9971 +/- 0.0018", type: "Baseline" },
    { name: "Decision Tree Classifier", accuracy: "99.57%", f1: "0.9954", auc: "0.9956", cv: "0.9957 +/- 0.0021", type: "Baseline" },
    { name: "AdaBoost Classifier", accuracy: "99.29%", f1: "0.9924", auc: "0.9997", cv: "0.9929 +/- 0.0028", type: "Baseline" },
    { name: "Logistic Regression Baseline", accuracy: "98.57%", f1: "0.9847", auc: "0.9987", cv: "0.9857 +/- 0.0042", type: "Baseline" }
  ];

  const steps = [
    { num: "01", title: "OBSERVATION", desc: "Collect physical attributes across cap, gills, stalk, ring, spore print, and habitat." },
    { num: "02", title: "PREPROCESSING", desc: "Handle missing values with 'Missing' constant imputer inside a leakage-free ColumnTransformer." },
    { num: "03", title: "FEATURE ENGINEERING", desc: "Construct domain interaction features: odor_gill_size, odor_gill_color, and ring_spore." },
    { num: "04", title: "MODEL", desc: "Benchmark 9 classifiers, tune hyper-parameters via 5-fold CV, and fit CatBoost." },
    { num: "05", title: "CLASSIFICATION", desc: "Return real-time prediction, confidence probability, and CatBoost feature importances." }
  ];

  return (
    <section className="block method" id="method">
      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Visual Stem Transition: Nature Becomes Data */}
        <NatureToDataStem />

        <div className="kicker">04 — Scientific Methodology</div>
        
        <div className="intro">
          <div>
            <h2>From field note to model output.</h2>
          </div>
          <div>
            <p className="lead">
              The machine-learning pipeline systematically preprocesses 7,000 observations, executes domain feature engineering, benchmarks 9 classifiers, tunes hyper-parameters via 5-fold cross-validation, and fits CatBoost.
            </p>
          </div>
        </div>

        {/* Editorial Workflow Timeline */}
        <div className="workflow-timeline">
          <div className="timeline-line"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="timeline-step">
              <div className="timeline-node">{step.num}</div>
              <div className="timeline-title">{step.title}</div>
              <div className="timeline-desc">{step.desc}</div>
            </div>
          ))}
        </div>

        {/* Large Editorial Key Metrics Display */}
        <div className="key-metrics-grid">
          <div className="metric-box">
            <div className="metric-val">100.00%</div>
            <div className="metric-lbl">Validation Accuracy</div>
            <div className="metric-sub">Tuned CatBoost Pipeline</div>
          </div>
          <div className="metric-box">
            <div className="metric-val">1.0000</div>
            <div className="metric-lbl">F1 & ROC-AUC Score</div>
            <div className="metric-sub">Zero Classification Error</div>
          </div>
          <div className="metric-box">
            <div className="metric-val">1.0000</div>
            <div className="metric-lbl">5-Fold CV Accuracy</div>
            <div className="metric-sub">Stratified Cross-Validation</div>
          </div>
          <div className="metric-box">
            <div className="metric-val">7,000</div>
            <div className="metric-lbl">Training Samples</div>
            <div className="metric-sub">Kaggle Botanical Dataset</div>
          </div>
        </div>

        {/* Model Benchmark Comparison Table */}
        <div style={{ marginTop: '55px' }}>
          <div className="kicker">Model Evaluation Benchmark</div>
          <h3 style={{ fontSize: '32px', color: 'var(--ink)', marginBottom: '8px' }}>
            Nine Classifiers Benchmark
          </h3>
          <p className="muted" style={{ marginBottom: '24px' }}>
            Empirical validation metrics extracted directly from <code>Mushroom_Classification.ipynb</code>.
          </p>

          <div className="metrics-table-wrapper">
            <table className="metrics-table">
              <thead>
                <tr>
                  <th>Model Architecture</th>
                  <th>Validation Accuracy</th>
                  <th>F1 Score</th>
                  <th>ROC-AUC</th>
                  <th>5-Fold CV Accuracy</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {models.map((m, idx) => (
                  <tr key={idx} className={idx === 0 ? 'highlight' : ''}>
                    <td><strong>{m.name}</strong></td>
                    <td><strong style={{ color: 'var(--ink)' }}>{m.accuracy}</strong></td>
                    <td>{m.f1}</td>
                    <td>{m.auc}</td>
                    <td>{m.cv}</td>
                    <td>
                      <span className="guide-tag" style={{
                        background: idx === 0 ? 'var(--sage)' : 'transparent',
                        color: idx === 0 ? 'white' : 'var(--sage)'
                      }}>
                        {m.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
