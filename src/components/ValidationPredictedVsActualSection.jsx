import React, { useState } from 'react';
import { motion } from 'framer-motion';
import staticAnalytics from '../data/dataset_analytics.json';
import { CheckCircle2, XCircle, ShieldCheck, Activity } from 'lucide-react';
import { BotanicalBranch } from './BotanicalElements';

export default function ValidationPredictedVsActualSection() {
  const [filter, setFilter] = useState('all');
  const cm = staticAnalytics.confusion_matrix;
  const samples = staticAnalytics.predicted_vs_actual_samples;

  const filteredSamples = samples.filter(s => {
    if (filter === 'edible') return s.actual === 'Edible';
    if (filter === 'poisonous') return s.actual === 'Poisonous';
    return true;
  });

  return (
    <section className="block validation-section" id="validation" style={{ position: 'relative', overflow: 'hidden' }}>
      <BotanicalBranch direction="left" />

      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="kicker">06 — MODEL VALIDATION DIAGNOSTICS</div>
        
        <div className="intro" style={{ marginBottom: '36px' }}>
          <div>
            <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '38px', color: 'var(--ink)' }}>
              Validation: Predicted vs Actual.
            </h2>
            <p className="lead" style={{ marginTop: '8px' }}>
              Empirical evaluation executed on the 20% held-out validation split (1,400 observations) to verify model accuracy without test set label assumptions.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '40px'
        }}>
          
          {/* CONFUSION MATRIX CARD */}
          <div style={{ background: 'var(--paper)', padding: '28px', border: '1px solid var(--line)' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700, marginBottom: '12px' }}>
              01 · CONFUSION MATRIX (X_VAL, Y_VAL)
            </div>

            <h3 style={{ fontSize: '20px', fontFamily: 'Cinzel, Georgia, serif', color: 'var(--forest)', margin: '0 0 16px' }}>
              CatBoost 2x2 Confusion Grid
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
              marginBottom: '20px'
            }}>
              <div style={{ background: '#EAEFE9', padding: '20px', borderLeft: '4px solid #2B7A4B' }}>
                <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase' }}>TRUE EDIBLE (TN)</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#2B7A4B', margin: '4px 0 2px' }}>
                  {cm.true_edible}
                </div>
                <div style={{ fontSize: '11px', color: '#2B7A4B', fontWeight: 600 }}>Actual Edible → Pred Edible</div>
              </div>

              <div style={{ background: '#FDEAEA', padding: '20px', borderLeft: '4px solid #9E2A2B' }}>
                <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase' }}>FALSE POISONOUS (FP)</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#9E2A2B', margin: '4px 0 2px' }}>
                  {cm.false_poisonous}
                </div>
                <div style={{ fontSize: '11px', color: '#9E2A2B', fontWeight: 600 }}>Actual Edible → Pred Poisonous</div>
              </div>

              <div style={{ background: '#FDEAEA', padding: '20px', borderLeft: '4px solid #9E2A2B' }}>
                <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase' }}>FALSE EDIBLE (FN)</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#9E2A2B', margin: '4px 0 2px' }}>
                  {cm.false_edible}
                </div>
                <div style={{ fontSize: '11px', color: '#9E2A2B', fontWeight: 600 }}>Actual Poisonous → Pred Edible</div>
              </div>

              <div style={{ background: '#EAEFE9', padding: '20px', borderLeft: '4px solid #2B7A4B' }}>
                <div style={{ fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase' }}>TRUE POISONOUS (TP)</div>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#2B7A4B', margin: '4px 0 2px' }}>
                  {cm.true_poisonous}
                </div>
                <div style={{ fontSize: '11px', color: '#2B7A4B', fontWeight: 600 }}>Actual Poisonous → Pred Poisonous</div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--muted)', background: 'var(--cream)', padding: '12px 16px', border: '1px solid var(--line)' }}>
              <strong>VALIDATION INSIGHT:</strong> Zero classification errors occurred across the 1,400 held-out validation samples (742 True Edible, 658 True Poisonous).
            </div>
          </div>

          {/* VALIDATION SAMPLES INSPECTOR */}
          <div style={{ background: 'var(--paper)', padding: '28px', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700 }}>
                02 · HELD-OUT OBSERVATION STRIP
              </div>
              
              <div style={{ display: 'flex', gap: '6px' }}>
                {['all', 'edible', 'poisonous'].map(f => (
                  <button
                    key={f}
                    className={`btn ${filter === f ? 'primary' : 'secondary'}`}
                    style={{ fontSize: '9px', padding: '4px 8px' }}
                    onClick={() => setFilter(f)}
                  >
                    {f.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontFamily: 'Cinzel, Georgia, serif', color: 'var(--forest)', margin: '0 0 16px' }}>
              Sample Prediction Explorer
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: '280px',
              overflowY: 'auto',
              paddingRight: '6px'
            }}>
              {filteredSamples.map(sample => (
                <div key={sample.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 100px 100px 1fr 70px',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '11px',
                  padding: '8px 12px',
                  background: 'var(--cream)',
                  border: '1px solid var(--line)'
                }}>
                  <span style={{ fontWeight: 700, color: 'var(--sage)' }}>#{sample.id}</span>
                  <span>Actual: <strong>{sample.actual}</strong></span>
                  <span>Pred: <strong>{sample.predicted}</strong></span>
                  <span style={{ color: 'var(--muted)' }}>Odour: {sample.odor}</span>
                  <span style={{ color: '#2B7A4B', fontWeight: 700, textAlign: 'right' }}>{sample.confidence}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
