import React, { useState } from 'react';
import { MUSHROOM_OPTIONS, FORM_STEPS } from '../data/options';
import { SPECIMEN_PRESETS } from '../data/presets';
import { ArrowLeft, ArrowRight, RefreshCw, AlertCircle, Compass, Check, FileText } from 'lucide-react';
import { BotanicalBranch, WindSwayLeaf } from './BotanicalElements';

export default function ObservationForm({ onSubmit, isLoading, apiError, onRetry }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isReviewing, setIsReviewing] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  
  // Default pre-selected observation values
  const [formData, setFormData] = useState({
    'cap-shape': 'convex',
    'cap-surface': 'smooth',
    'cap-color': 'yellow',
    'bruises': 'bruises',
    'number_of_bruises': 10,
    'odor': 'almond',
    'gill-attachment': 'gills free from stalk',
    'gill-spacing': 'close',
    'gill-size': 'broad',
    'gill-color': 'black',
    'stalk-shape': 'stalk enlarges toward base',
    'stalk-root': 'club',
    'stalk-surface-above-ring': 'smooth',
    'stalk-surface-below-ring': 'smooth',
    'stalk-color-above-ring': 'white',
    'stalk-color-below-ring': 'white',
    'veil-type': 'partial',
    'veil-color': 'white',
    'ring-number': 1,
    'ring-type': 'pendant',
    'spore-print-color': 'brown',
    'population': 'numerous',
    'habitat': 'grasses'
  });

  const stepInfo = FORM_STEPS.find(s => s.id === currentStep);

  const handleSelectChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    setSelectedPresetId(null);
  };

  const handleSelectPreset = (preset) => {
    setFormData(preset.data);
    setSelectedPresetId(preset.id);
    setIsReviewing(true); // Jump directly to review for fast examination
  };

  const isCurrentStepValid = () => {
    return stepInfo.fields.every(f => formData[f.name] !== '');
  };

  const handleNext = () => {
    if (currentStep < FORM_STEPS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsReviewing(true);
    }
  };

  const handlePrev = () => {
    if (isReviewing) {
      setIsReviewing(false);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setFormData({
      'cap-shape': '',
      'cap-surface': '',
      'cap-color': '',
      'bruises': '',
      'number_of_bruises': 0,
      'odor': '',
      'gill-attachment': '',
      'gill-spacing': '',
      'gill-size': '',
      'gill-color': '',
      'stalk-shape': '',
      'stalk-root': '',
      'stalk-surface-above-ring': '',
      'stalk-surface-below-ring': '',
      'stalk-color-above-ring': '',
      'stalk-color-below-ring': '',
      'veil-type': 'partial',
      'veil-color': 'white',
      'ring-number': 1,
      'ring-type': '',
      'spore-print-color': '',
      'population': '',
      'habitat': ''
    });
    setSelectedPresetId(null);
    setCurrentStep(1);
    setIsReviewing(false);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="block classifier" id="classify">
      <BotanicalBranch direction="left" />

      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-head">
          <div>
            <div className="kicker">SPECIMEN LOG 001 — BOTANICAL EXPEDITION</div>
            <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '38px' }}>Observation Field Journal.</h2>
          </div>
          
          <div className="progress-wrap">
            <div className="progress-top">
              <span>Observation Log Step</span>
              <span>Step 0{currentStep} / 05</span>
            </div>
            <div className="progress">
              <i style={{ width: `${(currentStep / 5) * 100}%` }}></i>
            </div>
          </div>
        </div>

        {/* CHOOSE A SPECIMEN — PRESET UI SECTION */}
        <div style={{
          background: 'var(--paper)',
          padding: '24px',
          border: '1px solid var(--line)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700 }}>
                OPTION A — PRESET SPECIMEN PROFILES
              </div>
              <h3 style={{ fontSize: '20px', fontFamily: 'Cinzel, Georgia, serif', color: 'var(--forest)', margin: '4px 0 0' }}>
                Field Specimens Records
              </h3>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
              Select an authentic dataset preset to auto-populate observation fields.
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {SPECIMEN_PRESETS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                style={{
                  background: selectedPresetId === preset.id ? 'var(--cream)' : 'var(--paper)',
                  border: selectedPresetId === preset.id ? '2px solid var(--sage)' : '1px solid var(--line)',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '10px', color: 'var(--sage)', fontWeight: 700 }}>{preset.kicker}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--forest)', margin: '4px 0 6px' }}>{preset.name}</div>
                <p style={{ fontSize: '11px', color: 'var(--muted)', margin: '0 0 12px', lineHeight: '1.4' }}>{preset.description}</p>
                
                <button
                  type="button"
                  className={`btn ${selectedPresetId === preset.id ? 'primary' : 'secondary'}`}
                  style={{ fontSize: '10px', padding: '6px 12px', width: '100%', justifyContent: 'center' }}
                >
                  {selectedPresetId === preset.id ? <Check size={12} /> : <FileText size={12} />}
                  {selectedPresetId === preset.id ? 'Specimen Selected' : 'Use Specimen'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '16px', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700 }}>
          OPTION B — MANUAL OBSERVATION RECORDING
        </div>

        <div className="form-shell">
          <form onSubmit={handleSubmitForm} style={{ position: 'relative' }}>
            
            {/* Real Loading Overlay */}
            {isLoading && (
              <div className="loading-overlay">
                <div className="botanical-loading-icon">
                  <svg viewBox="0 0 50 50" width="52" height="52" fill="none" stroke="var(--sage)" strokeWidth="1.5">
                    <path d="M25 5 C15 5 10 15 10 25 C10 35 25 45 25 45 C25 45 40 35 40 25 C40 15 35 5 25 5 Z" />
                    <path d="M25 5 L25 45" />
                  </svg>
                </div>
                <div className="loading-title">EXAMINING SPECIMEN...</div>
                <div className="loading-sub">Executing Python ML Inference Pipeline</div>
              </div>
            )}

            {/* API Error Notification */}
            {apiError && (
              <div className="api-error-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                  <AlertCircle size={18} />
                  <span>{apiError}</span>
                </div>
                {onRetry && (
                  <button 
                    type="button" 
                    className="btn primary" 
                    style={{ padding: '8px 16px', fontSize: '10px' }}
                    onClick={onRetry}
                  >
                    Retry Request
                  </button>
                )}
              </div>
            )}

            {/* Field-Note Review Mode */}
            {isReviewing ? (
              <div className="form-panel review-panel">
                <div className="section-kicker">06 — FIELD-NOTE REVIEW</div>
                <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '26px' }}>Review Recorded Observations</h3>
                <p className="muted">Inspect physical characteristics prior to backend model examination.</p>
                
                <div className="field-note-summary">
                  <div className="field-note-section">
                    <div className="field-note-head">01 CAP & SURFACE</div>
                    <div className="field-note-row"><span>Cap Shape</span> <strong>{formData['cap-shape']}</strong></div>
                    <div className="field-note-row"><span>Cap Surface</span> <strong>{formData['cap-surface']}</strong></div>
                    <div className="field-note-row"><span>Cap Colour</span> <strong>{formData['cap-color']}</strong></div>
                    <div className="field-note-row"><span>Bruising</span> <strong>{formData['bruises']}</strong></div>
                  </div>

                  <div className="field-note-section">
                    <div className="field-note-head">02 GILLS & ODOUR</div>
                    <div className="field-note-row"><span>Odour</span> <strong>{formData['odor']}</strong></div>
                    <div className="field-note-row"><span>Gill Attachment</span> <strong>{formData['gill-attachment']}</strong></div>
                    <div className="field-note-row"><span>Gill Spacing</span> <strong>{formData['gill-spacing']}</strong></div>
                    <div className="field-note-row"><span>Gill Size</span> <strong>{formData['gill-size']}</strong></div>
                    <div className="field-note-row"><span>Gill Colour</span> <strong>{formData['gill-color']}</strong></div>
                  </div>

                  <div className="field-note-section">
                    <div className="field-note-head">03 STALK & ROOT</div>
                    <div className="field-note-row"><span>Stalk Shape</span> <strong>{formData['stalk-shape']}</strong></div>
                    <div className="field-note-row"><span>Stalk Root</span> <strong>{formData['stalk-root']}</strong></div>
                    <div className="field-note-row"><span>Surface Above Ring</span> <strong>{formData['stalk-surface-above-ring']}</strong></div>
                    <div className="field-note-row"><span>Surface Below Ring</span> <strong>{formData['stalk-surface-below-ring']}</strong></div>
                  </div>

                  <div className="field-note-section">
                    <div className="field-note-head">04 RING & SPORE & HABITAT</div>
                    <div className="field-note-row"><span>Ring Count</span> <strong>{formData['ring-number']} Ring(s)</strong></div>
                    <div className="field-note-row"><span>Ring Type</span> <strong>{formData['ring-type']}</strong></div>
                    <div className="field-note-row"><span>Spore Print Colour</span> <strong>{formData['spore-print-color']}</strong></div>
                    <div className="field-note-row"><span>Habitat</span> <strong>{formData['habitat']}</strong></div>
                    <div className="field-note-row"><span>Population</span> <strong>{formData['population']}</strong></div>
                  </div>
                </div>

                <div className="actions">
                  <button type="button" className="btn secondary" onClick={handlePrev}>
                    <ArrowLeft size={14} /> Back To Edit Log
                  </button>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button type="button" className="btn secondary" onClick={handleReset}>
                      <RefreshCw size={12} /> Reset Log
                    </button>
                    <button type="submit" className="btn primary" disabled={isLoading}>
                      <Compass size={14} /> EXAMINE SPECIMEN
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Step-by-step Observation Panel */
              <div className="form-panel">
                <div className="section-kicker">{stepInfo.kicker}</div>
                <h3 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '26px' }}>{stepInfo.title}</h3>
                <p className="muted">{stepInfo.subtitle}</p>

                <div className="field-grid">
                  {stepInfo.fields.map(field => {
                    const options = MUSHROOM_OPTIONS[field.name] || [];
                    return (
                      <label key={field.name} className="field">
                        <span>
                          {field.label} {field.required && <i>*</i>}
                        </span>
                        <select
                          value={formData[field.name] || ''}
                          onChange={(e) => handleSelectChange(field.name, e.target.value)}
                          required={field.required}
                        >
                          <option value="">Select observation...</option>
                          {options.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    );
                  })}
                </div>

                <div className="fixed-fields">
                  <span className="pill">Veil type · partial</span>
                  <span className="pill">Veil colour · white</span>
                </div>

                <div className="actions">
                  <button
                    type="button"
                    className="btn"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft size={14} /> Previous
                  </button>

                  <span className="status">
                    {isCurrentStepValid() ? 'Observation Recorded' : 'Select required observation'}
                  </span>

                  <button
                    type="button"
                    className="btn primary"
                    onClick={handleNext}
                    disabled={!isCurrentStepValid()}
                  >
                    {currentStep === FORM_STEPS.length ? 'Review Observations' : 'Next Observation'} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </section>
  );
}
