import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import metadata from '../data/model_metadata.json';
import { BarChart2, Layers, PieChart, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { BotanicalBranch, WindSwayLeaf } from './BotanicalElements';

export default function DataExplorationSection() {
  const [activeTab, setActiveTab] = useState('performance');
  const [metricKey, setMetricKey] = useState('accuracy');
  const [showFullTable, setShowFullTable] = useState(false);
  const [hoveredModel, setHoveredModel] = useState(null);

  const models = metadata.compared_models;
  const featureImportances = metadata.feature_importances;

  const metricLabels = {
    accuracy: 'Validation Accuracy',
    f1: 'F1 Score',
    roc_auc: 'ROC-AUC',
    cv_accuracy: '5-Fold CV Accuracy'
  };

  const getMetricValue = (model, key) => {
    if (key === 'accuracy') return model.accuracy;
    if (key === 'f1') return model.f1;
    if (key === 'roc_auc') return model.roc_auc;
    if (key === 'cv_accuracy') return model.cv_accuracy;
    return model.accuracy;
  };

  const getMetricFormatted = (val, key) => {
    if (key === 'accuracy' || key === 'cv_accuracy') {
      return `${(val * 100).toFixed(2)}%`;
    }
    return val.toFixed(4);
  };

  return (
    <section className="block data-exploration" id="data-exploration" style={{ position: 'relative', overflow: 'hidden' }}>
      <BotanicalBranch direction="right" />

      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="kicker">04 — INTERACTIVE BOTANICAL ANALYTICS</div>
        
        <div className="intro" style={{ marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '38px', color: 'var(--ink)' }}>
              Explore The Data.
            </h2>
            <p className="lead" style={{ marginTop: '8px' }}>
              Empirical field diagnostics and model evaluation metrics extracted directly from the verified <code>Mushroom_Classification.ipynb</code> single source of truth.
            </p>
          </div>
        </div>

        {/* Segmented Control Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid var(--line)',
          marginBottom: '32px',
          paddingBottom: '12px',
          flexWrap: 'wrap'
        }}>
          <button
            className={`btn ${activeTab === 'performance' ? 'primary' : 'secondary'}`}
            style={{ fontSize: '11px', padding: '10px 18px' }}
            onClick={() => setActiveTab('performance')}
          >
            <BarChart2 size={14} /> MODEL PERFORMANCE LANDSCAPE
          </button>

          <button
            className={`btn ${activeTab === 'features' ? 'primary' : 'secondary'}`}
            style={{ fontSize: '11px', padding: '10px 18px' }}
            onClick={() => setActiveTab('features')}
          >
            <Layers size={14} /> FEATURE IMPORTANCE
          </button>

          <button
            className={`btn ${activeTab === 'overview' ? 'primary' : 'secondary'}`}
            style={{ fontSize: '11px', padding: '10px 18px' }}
            onClick={() => setActiveTab('overview')}
          >
            <PieChart size={14} /> DATASET OVERVIEW
          </button>

          <button
            className={`btn ${activeTab === 'cv' ? 'primary' : 'secondary'}`}
            style={{ fontSize: '11px', padding: '10px 18px' }}
            onClick={() => setActiveTab('cv')}
          >
            <ShieldCheck size={14} /> CROSS-VALIDATION
          </button>
        </div>

        {/* TAB CONTENT AREA */}
        <AnimatePresence mode="wait">
          {/* TAB 1: MODEL PERFORMANCE LANDSCAPE */}
          {activeTab === 'performance' && (
            <motion.div
              key="tab-performance"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {/* Metric Switcher Control */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--paper)',
                padding: '16px 20px',
                border: '1px solid var(--line)',
                marginBottom: '28px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--sage)', textTransform: 'uppercase' }}>
                  SELECT EVALUATION METRIC:
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {Object.keys(metricLabels).map((key) => (
                    <button
                      key={key}
                      onClick={() => setMetricKey(key)}
                      style={{
                        padding: '6px 14px',
                        fontSize: '11px',
                        fontFamily: 'Outfit, sans-serif',
                        borderRadius: '2px',
                        border: metricKey === key ? '1px solid var(--sage)' : '1px solid var(--line)',
                        background: metricKey === key ? 'var(--forest)' : 'var(--cream)',
                        color: metricKey === key ? 'white' : 'var(--ink)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {metricLabels[key]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Model Spotlight Card */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(27,59,43,0.06), rgba(61,96,78,0.03))',
                border: '1.5px solid var(--sage)',
                padding: '24px',
                marginBottom: '32px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700 }}>
                    SELECTED PRODUCTION MODEL
                  </div>
                  <h3 style={{ fontSize: '24px', fontFamily: 'Cinzel, Georgia, serif', color: 'var(--forest)', margin: '4px 0 8px' }}>
                    {metadata.model_name}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
                    Categorical Gradient Boosting pipeline selected for native string handling, zero leakage risks, and superior cross-validation stability.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '24px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase' }}>Validation Acc.</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--forest)' }}>
                      {(metadata.metrics.validation_accuracy * 100).toFixed(2)}%
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase' }}>ROC-AUC</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--forest)' }}>
                      {metadata.metrics.roc_auc.toFixed(4)}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase' }}>5-Fold CV</div>
                    <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--forest)' }}>
                      {(metadata.metrics.cross_val_mean_accuracy * 100).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* GRAPHICAL MODEL COMPARISON BARS */}
              <div style={{
                background: 'var(--paper)',
                padding: '28px',
                border: '1px solid var(--line)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '11px', color: 'var(--sage)', fontWeight: 600, letterSpacing: '0.1em' }}>
                  <span>MODEL ARCHITECTURE</span>
                  <span>{metricLabels[metricKey].toUpperCase()}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {models.map((item, idx) => {
                    const val = getMetricValue(item, metricKey);
                    const minBound = 0.95;
                    const barWidthPct = Math.max(8, Math.min(100, ((val - minBound) / (1.00 - minBound)) * 100));
                    const isSelected = item.model === 'CatBoost';

                    return (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredModel(item)}
                        onMouseLeave={() => setHoveredModel(null)}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '220px 1fr 90px',
                          alignItems: 'center',
                          gap: '16px',
                          padding: '6px 8px',
                          borderRadius: '2px',
                          background: hoveredModel === item ? 'rgba(234, 239, 233, 0.6)' : 'transparent',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        <div style={{ fontSize: '13px', fontWeight: isSelected ? 700 : 500, color: isSelected ? 'var(--forest)' : 'var(--ink)' }}>
                          {item.model} {isSelected && <span style={{ fontSize: '10px', color: 'var(--sage)', marginLeft: '4px' }}>(Selected)</span>}
                        </div>

                        <div style={{ background: 'var(--paper-subtle)', height: '22px', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--line)', position: 'relative' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${barWidthPct}%` }}
                            transition={{ duration: 0.6, delay: idx * 0.04 }}
                            style={{
                              height: '100%',
                              background: isSelected
                                ? 'linear-gradient(90deg, #1B3B2B, #3D604E)'
                                : item.status.includes('Ensemble')
                                ? 'linear-gradient(90deg, #4A6B5D, #708E80)'
                                : 'linear-gradient(90deg, #8A9D93, #B0BEB7)'
                            }}
                          />
                        </div>

                        <div style={{ fontSize: '13px', fontWeight: 600, textAlign: 'right', color: isSelected ? 'var(--forest)' : 'var(--ink)' }}>
                          {getMetricFormatted(val, metricKey)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ marginTop: '24px', fontSize: '11px', color: 'var(--muted)', borderTop: '1px solid var(--line)', paddingTop: '14px' }}>
                  * Metrics extracted from 5-fold stratified validation splits in <code>Mushroom_Classification.ipynb</code>.
                </div>
              </div>

              {/* EXPANDABLE DETAILED TABLE */}
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <button
                  type="button"
                  className="btn secondary"
                  style={{ fontSize: '11px', padding: '8px 20px' }}
                  onClick={() => setShowFullTable(!showFullTable)}
                >
                  {showFullTable ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {showFullTable ? 'Hide Detailed Spreadsheet View' : 'Expand Full Academic Results Table'}
                </button>
              </div>

              {showFullTable && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ marginTop: '20px', overflow: 'hidden' }}
                >
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
                          <tr key={idx} className={m.model === 'CatBoost' ? 'highlight' : ''}>
                            <td><strong>{m.model}</strong></td>
                            <td><strong>{(m.accuracy * 100).toFixed(2)}%</strong></td>
                            <td>{m.f1.toFixed(4)}</td>
                            <td>{m.roc_auc.toFixed(4)}</td>
                            <td>{(m.cv_accuracy * 100).toFixed(2)}% ± {(m.cv_std * 100).toFixed(2)}%</td>
                            <td>
                              <span className="guide-tag" style={{
                                background: m.model === 'CatBoost' ? 'var(--sage)' : 'transparent',
                                color: m.model === 'CatBoost' ? 'white' : 'var(--sage)'
                              }}>
                                {m.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* TAB 2: FEATURE IMPORTANCE */}
          {activeTab === 'features' && (
            <motion.div
              key="tab-features"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ background: 'var(--paper)', padding: '28px', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '20px', color: 'var(--forest)', marginBottom: '8px', fontFamily: 'Cinzel, Georgia, serif' }}>
                  WHAT INFLUENCED THE MODEL?
                </h3>
                <p className="muted" style={{ marginBottom: '24px' }}>
                  Relative feature importance within the trained CatBoost model. Note: feature importance reflects statistical weighting within the decision tree ensemble, not causal mechanism.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {featureImportances.map((item, idx) => {
                    const maxVal = featureImportances[0].importance;
                    const barWidth = Math.round((item.importance / maxVal) * 100);

                    return (
                      <div key={idx} style={{ display: 'grid', gridTemplateColumns: '240px 1fr 80px', alignItems: 'center', gap: '16px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
                          {item.feature}
                        </div>

                        <div style={{ background: 'var(--paper-subtle)', height: '20px', border: '1px solid var(--line)', borderRadius: '2px', overflow: 'hidden' }}>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${barWidth}%` }}
                            transition={{ duration: 0.7, delay: idx * 0.05 }}
                            style={{
                              height: '100%',
                              background: 'linear-gradient(90deg, #1B3B2B 0%, #3D604E 100%)'
                            }}
                          />
                        </div>

                        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--forest)', textAlign: 'right' }}>
                          {item.importance.toFixed(2)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: DATASET OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="tab-overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'var(--paper)', padding: '24px', border: '1px solid var(--line)' }}>
                  <h4 style={{ color: 'var(--forest)', marginBottom: '12px' }}>Target Distribution</h4>
                  <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--forest)' }}>7,000</div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '16px' }}>Total Training Samples</div>
                  
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <div style={{ flex: 1, background: '#EAEFE9', padding: '12px', borderLeft: '4px solid #2B7A4B' }}>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>EDIBLE (class e)</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#2B7A4B' }}>3,712 (53.0%)</div>
                    </div>
                    <div style={{ flex: 1, background: '#FDEAEA', padding: '12px', borderLeft: '4px solid #9E2A2B' }}>
                      <div style={{ fontSize: '11px', color: 'var(--muted)' }}>POISONOUS (class p)</div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#9E2A2B' }}>3,288 (47.0%)</div>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'var(--paper)', padding: '24px', border: '1px solid var(--line)' }}>
                  <h4 style={{ color: 'var(--forest)', marginBottom: '12px' }}>Missing Values Handling</h4>
                  <div style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: '1.6' }}>
                    <p><strong>Odor:</strong> 3,236 missing (~46.23%) imputed with explicit category string <code>'Missing'</code> to preserve row volume.</p>
                    <p><strong>Stalk Root:</strong> 192 missing (~2.74%) imputed with <code>'Missing'</code>.</p>
                    <p><strong>Ring Number & Type:</strong> Imputed with median and constant values inside scikit-learn <code>ColumnTransformer</code>.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: CROSS-VALIDATION */}
          {activeTab === 'cv' && (
            <motion.div
              key="tab-cv"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ background: 'var(--paper)', padding: '28px', border: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '20px', color: 'var(--forest)', marginBottom: '8px', fontFamily: 'Cinzel, Georgia, serif' }}>
                  5-FOLD STRATIFIED CROSS-VALIDATION
                </h3>
                <p className="muted" style={{ marginBottom: '24px' }}>
                  To verify model stability and eliminate data leakage risks, 5-fold cross-validation was evaluated on complete predictors.
                </p>

                <div className="metrics-table-wrapper">
                  <table className="metrics-table">
                    <thead>
                      <tr>
                        <th>Candidate Model</th>
                        <th>Mean CV Accuracy</th>
                        <th>Std Deviation (σ)</th>
                        <th>Cross-Validation Assessment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {models.filter(m => m.cv_accuracy > 0).map((m, idx) => (
                        <tr key={idx}>
                          <td><strong>{m.model}</strong></td>
                          <td><strong style={{ color: 'var(--forest)' }}>{(m.cv_accuracy * 100).toFixed(2)}%</strong></td>
                          <td>± {(m.cv_std * 100).toFixed(2)}%</td>
                          <td>
                            {m.cv_std === 0 ? 'Optimal Zero Variance Across Folds' : 'High Generalization Stability'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
