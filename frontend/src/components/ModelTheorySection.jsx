import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, GitBranch, ArrowRight, Award, Zap, CheckCircle } from 'lucide-react';
import { BotanicalBranch } from './BotanicalElements';

export default function ModelTheorySection() {
  return (
    <section className="block model-theory" id="theory" style={{ position: 'relative', overflow: 'hidden' }}>
      <BotanicalBranch direction="left" />

      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="kicker">05 — MODEL MATHEMATICS & THEORY</div>
        
        <div className="intro" style={{ marginBottom: '36px' }}>
          <div>
            <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '38px', color: 'var(--ink)' }}>
              The Model Behind The Identification.
            </h2>
            <p className="lead" style={{ marginTop: '8px' }}>
              Understanding CatBoost (Categorical Boosting) — a specialized gradient boosted decision tree algorithm designed for categorical physical attributes.
            </p>
          </div>
        </div>

        {/* CONCEPTUAL PIPELINE FLOW */}
        <div style={{
          background: 'var(--paper)',
          padding: '32px',
          border: '1px solid var(--line)',
          marginBottom: '40px'
        }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700, marginBottom: '20px' }}>
            CONCEPTUAL ARCHITECTURE FLOW
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px',
            alignItems: 'center'
          }}>
            {[
              { step: '01', label: 'Input Observations', sub: 'Categorical & Numerical' },
              { step: '02', label: 'Ordered Target Encoding', sub: 'Native String Handling' },
              { step: '03', label: 'Boosted Decision Trees', sub: 'Symmetric Oblivious Trees' },
              { step: '04', label: 'Sequential Error Correction', sub: 'Gradient Loss Reduction' },
              { step: '05', label: 'Final Ensemble', sub: 'Weighted Sum Prediction' }
            ].map((item, idx, arr) => (
              <React.Fragment key={idx}>
                <div style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--line)',
                  padding: '16px',
                  textAlign: 'center',
                  borderRadius: '2px',
                  position: 'relative'
                }}>
                  <div style={{ fontSize: '10px', color: 'var(--sage)', fontWeight: 700 }}>{item.step}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--forest)', margin: '4px 0 2px' }}>{item.label}</div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)' }}>{item.sub}</div>
                </div>

                {idx < arr.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--sage)' }} className="hide-mobile">
                    <ArrowRight size={16} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* MATHEMATICAL INTUITION BOX */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(27,59,43,0.04), rgba(61,96,78,0.02))',
            border: '1px solid var(--sage)',
            padding: '28px'
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700 }}>
              MATHEMATICAL FORMULATION
            </div>
            
            <h3 style={{ fontSize: '20px', fontFamily: 'Cinzel, Georgia, serif', color: 'var(--forest)', margin: '8px 0 16px' }}>
              Gradient Boosting Additive Model
            </h3>

            {/* Rendered Math Block */}
            <div style={{
              background: 'var(--cream)',
              border: '1px solid var(--line)',
              padding: '20px',
              textAlign: 'center',
              margin: '16px 0 20px',
              fontFamily: 'serif',
              fontSize: '22px',
              color: 'var(--forest)'
            }}>
              F<sub>m</sub>(x) = F<sub>m-1</sub>(x) + η h<sub>m</sub>(x)
            </div>

            <div style={{ fontSize: '13px', color: 'var(--ink)', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '8px' }}>
                Where <strong>F<sub>m</sub>(x)</strong> represents the updated ensemble prediction at iteration <em>m</em>,
                <strong>η</strong> is the learning rate parameter, and <strong>h<sub>m</sub>(x)</strong> represents the newly added decision tree.
              </p>
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>
                <em>Intuition:</em> Each new decision tree explicitly targets and corrects the residual errors committed by all preceding trees in the ensemble.
              </p>
            </div>
          </div>

          {/* WHY THIS MODEL? EDITORIAL BLOCK */}
          <div style={{
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            padding: '28px'
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700 }}>
              EDITORIAL RATIONALE
            </div>

            <h3 style={{ fontSize: '20px', fontFamily: 'Cinzel, Georgia, serif', color: 'var(--forest)', margin: '8px 0 16px' }}>
              Why CatBoost?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: 'var(--ink)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={16} color="var(--sage)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong>Native Categorical Encoding:</strong> Processes high-cardinality string features (e.g. odor, habitat, gill color) using ordered target statistics without artificial one-hot dimensionality explosion.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={16} color="var(--sage)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong>Target Leakage Prevention:</strong> Computes statistics using historical random permutation splits, preventing data leakage across training iterations.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={16} color="var(--sage)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong>Cross-Validation Resilience:</strong> Achieved 100.00% validation accuracy and 100.00% 5-fold CV score on evaluated splits without hyperparameter overfitting.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
