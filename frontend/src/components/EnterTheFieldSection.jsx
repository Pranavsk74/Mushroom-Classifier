import React from 'react';
import { motion } from 'framer-motion';

export default function EnterTheFieldSection() {
  return (
    <section className="block enter-the-field" id="expedition" style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Botanical Leaf */}
      <motion.img
        src="/assets/ppt/media_image4.png"
        alt="Botanical Leaf"
        initial={{ x: '-20%', opacity: 0.2 }}
        whileInView={{ x: '-5%', opacity: 0.65 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        style={{
          position: 'absolute',
          left: 0,
          top: '-10%',
          width: '35vw',
          maxWidth: '420px',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'drop-shadow(0 15px 30px rgba(41,73,54,0.12))'
        }}
      />

      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <div className="kicker" style={{ color: 'var(--sage)', letterSpacing: '0.25em' }}>
              EXPEDITION STEP 01 — STEPPING INTO THE JUNGLE
            </div>

            <h2 style={{
              fontFamily: 'Cinzel, Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: 'var(--ink)',
              margin: '14px 0 24px',
              lineHeight: 1.15
            }}>
              Enter The Field.
            </h2>

            <p className="lead" style={{ fontSize: '20px', color: 'var(--ink)', maxWidth: '780px', margin: '0 auto 36px', lineHeight: 1.6 }}>
              "Every specimen begins with an observation. Before the machine-learning model sees the data, someone has to notice it."
            </p>
          </motion.div>
        </div>

        {/* Human Storytelling Editorial Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '48px',
          textAlign: 'left'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              background: 'var(--paper)',
              padding: '28px',
              border: '1px solid var(--line)',
              position: 'relative'
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--sage)', fontWeight: 700, letterSpacing: '0.2em' }}>FIELD NOTE 01</div>
            <h4 style={{ fontSize: '18px', color: 'var(--forest)', margin: '8px 0 10px', fontFamily: 'Cinzel, Georgia, serif' }}>
              Observe What The Forest Gives You
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
              Physical characteristics—cap surface, gill attachment, ring structure, and odor—are biological fingerprints left behind by evolution.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'var(--paper)',
              padding: '28px',
              border: '1px solid var(--line)',
              position: 'relative'
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--sage)', fontWeight: 700, letterSpacing: '0.2em' }}>FIELD NOTE 02</div>
            <h4 style={{ fontSize: '18px', color: 'var(--forest)', margin: '8px 0 10px', fontFamily: 'Cinzel, Georgia, serif' }}>
              From Observation To Inference
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
              Raw observations are transformed into clean numerical encodings and passed into gradient boosted decision trees for real-time classification.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              background: 'var(--paper)',
              padding: '28px',
              border: '1px solid var(--line)',
              position: 'relative'
            }}
          >
            <div style={{ fontSize: '10px', color: 'var(--sage)', fontWeight: 700, letterSpacing: '0.2em' }}>FIELD NOTE 03</div>
            <h4 style={{ fontSize: '18px', color: 'var(--forest)', margin: '8px 0 10px', fontFamily: 'Cinzel, Georgia, serif' }}>
              Scientific Integrity
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>
              No prediction or metric is fabricated. Every accuracy score, confusion matrix, and feature weight is computed dynamically from the dataset.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
