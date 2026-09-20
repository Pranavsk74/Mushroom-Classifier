import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, Copy, Bookmark, RotateCcw, Download, Loader2, ShieldAlert } from 'lucide-react';
import { generateReportPdf } from '../services/api';

export default function SpecimenResultCard({ resultData, onReset, onSaveHistory }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!resultData) {
    return (
      <section className="block result" id="result">
        <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="kicker">03 — IDENTIFICATION RECORD</div>
          <div className="result-card" style={{ position: 'relative', overflow: 'visible' }}>
            <div className="empty-result">
              <div>
                <div className="specimen-stamp">Specimen Identification Record</div>
                <div className="result-title" style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '36px' }}>
                  Awaiting<br />classification
                </div>
                <p className="lead">
                  Once the observation log is complete and submitted, this digital field record will display the real Python backend CatBoost prediction, confidence probability, and model feature importances.
                </p>
                <div className="note">
                  No prediction is fabricated in SporeX. All values originate directly from <strong>POST /predict</strong>.
                </div>
              </div>

              {/* Specimen Illustration */}
              <div style={{ textAlign: 'center', position: 'relative', overflow: 'visible' }}>
                <img 
                  src="/assets/result_mushroom.jpg" 
                  alt="Specimen Botanical Drawing"
                  style={{
                    maxWidth: '260px',
                    width: '100%',
                    height: 'auto',
                    border: '1px solid var(--line)',
                    padding: '8px',
                    background: 'var(--paper)',
                    boxShadow: '0 12px 32px rgba(29,51,40,0.18)',
                    transform: 'rotate(-2deg) translateY(-10px)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isEdible = resultData.is_edible;
  const timestampStr = new Date(resultData.timestamp).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
  const specimenId = `SPEC-${resultData.class_code.toUpperCase()}-${new Date(resultData.timestamp).getTime().toString().slice(-6)}`;

  const handleCopySummary = () => {
    const text = `SPOREX DIGITAL FIELD SPECIMEN RECORD\nSpecimen ID: ${specimenId}\nClassification: ${resultData.prediction.toUpperCase()}\nModel Confidence: ${resultData.confidence_percentage}\nModel: ${resultData.model_name}\nDate: ${timestampStr}\nObservations: Odour=${resultData.observations.odor}, Gill Size=${resultData.observations['gill-size']}, Cap Colour=${resultData.observations['cap-color']}, Habitat=${resultData.observations.habitat}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    if (onSaveHistory) {
      onSaveHistory({
        ...resultData,
        specimenId
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleDownloadPdfReport = async () => {
    setIsGeneratingPdf(true);
    try {
      const blob = await generateReportPdf(resultData.observations, {
        specimen_id: specimenId,
        prediction: resultData.prediction,
        probability: resultData.probability,
        class_code: resultData.class_code,
        model_name: resultData.model_name,
        top_features: resultData.feature_importances
      });
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sporex_${specimenId.toLowerCase()}_report.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert(err.message || "Failed to download PDF report. Ensure Python backend is active.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <section className="block result" id="result">
      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="kicker">03 — DIGITAL FIELD SPECIMEN RECORD</div>
        
        <div className="result-card" style={{ position: 'relative', overflow: 'visible' }}>
          
          {/* Record Header Meta */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--line)',
            paddingBottom: '14px',
            marginBottom: '28px',
            fontSize: '11px',
            color: 'var(--sage)',
            fontWeight: 600,
            letterSpacing: '0.12em',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <span>SPECIMEN ID: {specimenId}</span>
            <span>DATE / TIME: {timestampStr.toUpperCase()}</span>
          </div>

          <div className="result-grid">
            <div>
              {/* SECTION 1: SPECIMEN IDENTIFICATION */}
              <div style={{ fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700, marginBottom: '6px' }}>
                SPECIMEN IDENTIFICATION
              </div>
              
              <h2 className={`result-title ${isEdible ? 'edible' : 'poisonous'}`} style={{ fontFamily: 'Cinzel, Georgia, serif', margin: '4px 0 14px' }}>
                {resultData.prediction.toUpperCase()}
              </h2>

              <div className={`result-badge ${isEdible ? 'edible' : 'poisonous'}`}>
                {isEdible ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                <span>
                  {resultData.prediction} · {resultData.confidence_percentage} Model Probability
                </span>
              </div>

              {/* CLASSIFICATION SUMMARY */}
              <div style={{
                background: 'var(--paper)',
                borderLeft: `4px solid ${isEdible ? 'var(--edible-green)' : 'var(--poison-red)'}`,
                padding: '16px 20px',
                margin: '20px 0',
                fontSize: '14px',
                color: 'var(--ink-dark)',
                lineHeight: '1.6'
              }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700, marginBottom: '4px' }}>
                  CLASSIFICATION SUMMARY
                </div>
                The model classified this specimen as <strong>{resultData.prediction}</strong> based on the supplied morphological and habitat characteristics.
              </div>

              <div className="note" style={{ marginBottom: '24px' }}>
                Deployed Model: <strong>{resultData.model_name}</strong> (Trained on 7,000 physical wild mushroom observations).
              </div>

              {/* SECTION 2: OBSERVED CHARACTERISTICS */}
              <div style={{ marginTop: '28px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '12px', fontWeight: 700 }}>
                  OBSERVED CHARACTERISTICS
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                  gap: '10px',
                  fontSize: '12px',
                  background: 'var(--paper)',
                  padding: '18px',
                  border: '1px solid var(--line)'
                }}>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>Cap Shape & Color</span>
                    <strong>{resultData.observations['cap-shape']} ({resultData.observations['cap-color']})</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>Cap Surface & Bruises</span>
                    <strong>{resultData.observations['cap-surface']} · {resultData.observations.bruises}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>Odour Profile</span>
                    <strong>{resultData.observations.odor}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>Gill Size & Attachment</span>
                    <strong>{resultData.observations['gill-size']} · {resultData.observations['gill-attachment']}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>Gill Colour</span>
                    <strong>{resultData.observations['gill-color']}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>Stalk Root & Shape</span>
                    <strong>{resultData.observations['stalk-root']} · {resultData.observations['stalk-shape']}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>Spore Print Colour</span>
                    <strong>{resultData.observations['spore-print-color']}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--muted)', display: 'block', fontSize: '10px', textTransform: 'uppercase' }}>Habitat & Population</span>
                    <strong>{resultData.observations.habitat} ({resultData.observations.population})</strong>
                  </div>
                </div>
              </div>

              {/* REPORT ACTIONS */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '30px' }}>
                <button type="button" className="btn primary" onClick={handleDownloadPdfReport} disabled={isGeneratingPdf}>
                  {isGeneratingPdf ? <Loader2 size={14} className="spin" /> : <Download size={14} />}
                  {isGeneratingPdf ? 'Generating PDF Report...' : 'DOWNLOAD SPECIMEN REPORT'}
                </button>

                <button type="button" className="btn secondary" onClick={onReset}>
                  <RotateCcw size={14} /> Examine Another Specimen
                </button>
                
                <button type="button" className="btn secondary" onClick={handleSave}>
                  <Bookmark size={14} /> {saved ? 'Saved To Records' : 'Save Record'}
                </button>

                <button type="button" className="btn secondary" onClick={handleCopySummary}>
                  <Copy size={14} /> {copied ? 'Copied' : 'Copy Summary'}
                </button>
              </div>
            </div>

            {/* Botanical Specimen Journal Plate */}
            <div className="result-illustration-wrapper" style={{ position: 'relative', overflow: 'visible' }}>
              <img 
                className="result-illustration"
                src="/assets/result_mushroom.jpg" 
                alt="Mushroom Specimen Botanical Watercolor"
                style={{
                  boxShadow: '0 16px 36px rgba(29,51,40,0.22)',
                  transform: 'rotate(2deg) translateY(-12px)'
                }}
              />
              <div style={{ fontSize: '11px', color: 'var(--sage)', marginTop: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Fig 02. Botanical Specimen Journal Plate
              </div>
            </div>
          </div>

          {/* SECTION 3: MODEL INSIGHTS (MODEL FEATURE IMPORTANCE) */}
          {resultData.feature_importances && resultData.feature_importances.length > 0 && (
            <div className="importance-section">
              <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '8px', fontWeight: 700 }}>
                MODEL INSIGHTS
              </div>
              <h4 style={{ fontSize: '18px', fontFamily: 'Cinzel, Georgia, serif', color: 'var(--forest)', margin: '0 0 8px' }}>
                Model Feature Importance
              </h4>
              <p className="muted" style={{ marginBottom: '20px', fontSize: '12px' }}>
                Relative feature weightings extracted from the trained CatBoost decision tree ensemble. Note: Model feature importance represents statistical weighting within decision splits, not biological causality.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {resultData.feature_importances.slice(0, 8).map((item, idx) => {
                  const maxImp = resultData.feature_importances[0].importance || 1;
                  const pct = Math.round((item.importance / maxImp) * 100);
                  return (
                    <div key={idx} className="feature-item">
                      <div className="feature-label">
                        <span>{item.feature}</span>
                        <strong>{item.importance}</strong>
                      </div>
                      <div className="feature-bar">
                        <i style={{ width: `${pct}%` }}></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 4: SAFETY NOTE */}
          <div style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '12px',
            color: 'var(--muted)',
            background: 'rgba(255,253,248,0.7)',
            padding: '16px',
            border: '1px solid var(--line)'
          }}>
            <ShieldAlert size={20} color="var(--sage)" style={{ flexShrink: 0 }} />
            <div>
              <strong>SAFETY NOTE:</strong> This classification is for educational purposes and should not be used as a basis for consuming a wild mushroom. Machine-learning predictions can be uncertain.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
