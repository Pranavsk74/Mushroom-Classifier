import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import staticAnalytics from '../data/dataset_analytics.json';
import { BarChart3, PieChart, AlertTriangle, Eye, Layers, Filter, Compass } from 'lucide-react';
import { BotanicalBranch } from './BotanicalElements';

export default function ExpandedEDASection() {
  const [data, setData] = useState(staticAnalytics);
  const [activeTab, setActiveTab] = useState('odor');

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.ok ? res.json() : fetch('http://127.0.0.1:8000/analytics').then(r => r.json()))
      .then(fetchedData => {
        if (fetchedData && fetchedData.target_distribution) {
          setData(fetchedData);
        }
      })
      .catch(() => {});
  }, []);

  const target = data.target_distribution;
  const missing = data.missing_values;
  const pcaPoints = data.pca_cluster_points || [];

  return (
    <section className="block eda-section" id="eda" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Foliage Accent */}
      <motion.img
        src="/assets/ppt/media_image1.png"
        alt="Botanical Foliage"
        initial={{ x: '20%', opacity: 0.2 }}
        whileInView={{ x: '5%', opacity: 0.6 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        style={{
          position: 'absolute',
          right: 0,
          top: '5%',
          width: '32vw',
          maxWidth: '400px',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="kicker">03 — EXPLORATORY DATA ANALYSIS (EDA)</div>
        
        <div className="intro" style={{ marginBottom: '40px' }}>
          <div>
            <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '38px', color: 'var(--ink)' }}>
              Reading The Forest: The Data Underneath.
            </h2>
            <p className="lead" style={{ marginTop: '8px' }}>
              Calculated directly from the 7,000 training observations in <code>train.csv</code> by SporeX analytics engine.
            </p>
          </div>
        </div>

        {/* TOP ROW: TARGET DISTRIBUTION & MISSING VALUE PROFILE */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '40px'
        }}>
          
          {/* 1. TARGET DISTRIBUTION */}
          <div style={{ background: 'var(--paper)', padding: '28px', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700 }}>
                01 · TARGET CLASS BALANCE
              </div>
              <PieChart size={16} color="var(--sage)" />
            </div>

            <h3 style={{ fontSize: '20px', fontFamily: 'Cinzel, Georgia, serif', color: 'var(--forest)', margin: '0 0 16px' }}>
              Edible vs Poisonous Distribution
            </h3>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
              <div style={{ flex: 1, background: '#EAEFE9', padding: '16px', borderLeft: '4px solid #2B7A4B' }}>
                <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>EDIBLE (class e)</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#2B7A4B', margin: '4px 0 2px' }}>
                  {target.edible.count}
                </div>
                <div style={{ fontSize: '12px', color: '#2B7A4B', fontWeight: 600 }}>
                  {target.edible.percentage}% of dataset
                </div>
              </div>

              <div style={{ flex: 1, background: '#FDEAEA', padding: '16px', borderLeft: '4px solid #9E2A2B' }}>
                <div style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 600 }}>POISONOUS (class p)</div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: '#9E2A2B', margin: '4px 0 2px' }}>
                  {target.poisonous.count}
                </div>
                <div style={{ fontSize: '12px', color: '#9E2A2B', fontWeight: 600 }}>
                  {target.poisonous.percentage}% of dataset
                </div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--muted)', background: 'var(--cream)', padding: '12px 16px', border: '1px solid var(--line)' }}>
              <strong>DATA FIELD NOTE 01:</strong> Target class distribution is well-balanced (~53% Edible / 47% Poisonous). Standard classification accuracy is a statistically robust evaluation metric without requiring SMOTE oversampling.
            </div>
          </div>

          {/* 2. MISSING DATA PROFILE */}
          <div style={{ background: 'var(--paper)', padding: '28px', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700 }}>
                02 · MISSING VALUE PROFILE
              </div>
              <AlertTriangle size={16} color="var(--sage)" />
            </div>

            <h3 style={{ fontSize: '20px', fontFamily: 'Cinzel, Georgia, serif', color: 'var(--forest)', margin: '0 0 16px' }}>
              Attribute Missingness Analysis
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              {missing.map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 65px', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--ink)' }}>{item.column}</div>
                  <div style={{ background: 'var(--paper-subtle)', height: '16px', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--line)' }}>
                    <div style={{ height: '100%', width: `${item.percentage}%`, background: 'var(--forest)' }} />
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--forest)', textAlign: 'right' }}>
                    {item.percentage}%
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '12px', color: 'var(--muted)', background: 'var(--cream)', padding: '12px 16px', border: '1px solid var(--line)' }}>
              <strong>DATA FIELD NOTE 02:</strong> <code>odor</code> contains 3,236 missing values (46.23%). Rather than dropping half the dataset, imputing with constant <code>'Missing'</code> allows tree models to learn missingness as a biological pattern.
            </div>
          </div>
        </div>

        {/* CATEGORICAL & CLUSTERING BREAKDOWN EXPLORER TABS */}
        <div style={{ background: 'var(--paper)', padding: '28px', border: '1px solid var(--line)' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sage)', fontWeight: 700, marginBottom: '12px' }}>
            03 · CATEGORICAL & PCA CLUSTERING EXPLORATION
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
            {[
              { id: 'odor', label: 'ODOR × CLASS' },
              { id: 'gill_size', label: 'GILL SIZE × CLASS' },
              { id: 'spore_print', label: 'SPORE PRINT × CLASS' },
              { id: 'habitat', label: 'HABITAT × CLASS' },
              { id: 'bruises', label: 'BRUISES × CLASS' },
              { id: 'pca_clusters', label: 'PCA + KMEANS CLUSTERS' }
            ].map(tab => (
              <button
                key={tab.id}
                className={`btn ${activeTab === tab.id ? 'primary' : 'secondary'}`}
                style={{ fontSize: '10px', padding: '8px 14px' }}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ACTIVE BREAKDOWN CHART OR PCA CLUSTER PLOT */}
          {activeTab === 'pca_clusters' ? (
            <div>
              <h4 style={{ fontSize: '18px', color: 'var(--forest)', fontFamily: 'Cinzel, Georgia, serif', marginBottom: '8px' }}>
                PCA 2D Projection & KMeans Exploratory Clustering
              </h4>
              <p className="muted" style={{ marginBottom: '20px' }}>
                2D scatter plot projection of encoded categorical attributes via Principal Component Analysis (PCA). Color coded by target class (Green = Edible, Red = Poisonous).
              </p>

              <div style={{
                height: '280px',
                background: 'var(--cream)',
                border: '1px solid var(--line)',
                position: 'relative',
                padding: '20px',
                overflow: 'hidden'
              }}>
                {/* Axes lines */}
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, borderLeft: '1px dashed var(--line)' }} />
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px dashed var(--line)' }} />

                {pcaPoints.map((pt, idx) => {
                  const leftPct = Math.min(95, Math.max(5, ((pt.pca_x + 3.5) / 7.0) * 100));
                  const topPct = Math.min(95, Math.max(5, ((3.5 - pt.pca_y) / 7.0) * 100));
                  const isEdible = pt.class === 'Edible';

                  return (
                    <div
                      key={idx}
                      title={`Obs #${idx+1}: Class=${pt.class}, Odor=${pt.odor}`}
                      style={{
                        position: 'absolute',
                        left: `${leftPct}%`,
                        top: `${topPct}%`,
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: isEdible ? '#2B7A4B' : '#9E2A2B',
                        opacity: 0.8,
                        border: '1px solid rgba(255,255,255,0.8)',
                        cursor: 'pointer'
                      }}
                    />
                  );
                })}

                <div style={{ position: 'absolute', bottom: '8px', right: '12px', fontSize: '10px', color: 'var(--muted)' }}>
                  Component 1 vs Component 2
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'var(--muted)', background: 'var(--cream)', padding: '14px 18px', border: '1px solid var(--line)', marginTop: '16px' }}>
                <strong>DATA FIELD NOTE:</strong> High spatial separation occurs between edible and poisonous sample clusters in 2D PCA space, confirming clear feature discriminability for gradient boosted decision trees.
              </div>
            </div>
          ) : (
            (() => {
              let list = data.odor_breakdown;
              let note = "Odor carries tremendous discriminative power. Foul, fishy, spicy, and pungent odors correlate almost 100% with poisonous mushrooms, whereas almond and anise odors correlate exclusively with edible mushrooms.";
              
              if (activeTab === 'gill_size') {
                list = data.gill_size_breakdown;
                note = "Narrow gill size exhibits a substantially higher probability of toxicity compared to broad gill size.";
              } else if (activeTab === 'spore_print') {
                list = data.spore_print_breakdown;
                note = "Green spore prints indicate high toxicity, whereas brown and white spore prints lean strongly toward edible specimens.";
              } else if (activeTab === 'habitat') {
                list = data.habitat_breakdown;
                note = "Meadows and waste habitats show high proportions of edible samples, whereas urban and path habitats show higher poisonous proportions.";
              } else if (activeTab === 'bruises') {
                list = data.bruises_breakdown;
                note = "Bruising tendency reflects cellular oxidation reactions upon physical contact.";
              }

              const maxTotal = Math.max(...list.map(i => i.total));

              return (
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    {list.map((item, idx) => {
                      const eWidth = Math.round((item.edible / maxTotal) * 100);
                      const pWidth = Math.round((item.poisonous / maxTotal) * 100);

                      return (
                        <div key={idx} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 120px', alignItems: 'center', gap: '16px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
                            {item.category}
                          </div>

                          <div style={{ background: 'var(--paper-subtle)', height: '22px', borderRadius: '2px', overflow: 'hidden', border: '1px solid var(--line)', display: 'flex' }}>
                            <div style={{ width: `${eWidth}%`, background: '#2B7A4B', height: '100%' }} title={`Edible: ${item.edible}`} />
                            <div style={{ width: `${pWidth}%`, background: '#9E2A2B', height: '100%' }} title={`Poisonous: ${item.poisonous}`} />
                          </div>

                          <div style={{ fontSize: '12px', textAlign: 'right' }}>
                            <span style={{ color: '#2B7A4B', fontWeight: 700 }}>{item.edible} e</span> / <span style={{ color: '#9E2A2B', fontWeight: 700 }}>{item.poisonous} p</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--muted)', background: 'var(--cream)', padding: '14px 18px', border: '1px solid var(--line)' }}>
                    <strong>DATA FIELD NOTE:</strong> {note}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </div>
    </section>
  );
}
