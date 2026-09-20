import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="footer" style={{ position: 'relative', overflow: 'hidden', padding: '80px 0 40px' }}>
      
      {/* Background Leaf */}
      <motion.img
        src="/assets/ppt/media_image3.png"
        alt="Botanical Leaf"
        initial={{ x: '30%', opacity: 0.2 }}
        whileInView={{ x: '10%', opacity: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        style={{
          position: 'absolute',
          right: 0,
          bottom: '-15%',
          width: '28vw',
          maxWidth: '360px',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="footer-container">
          <div className="footer-left">
            <div className="big" style={{ fontFamily: 'Cinzel, Georgia, serif' }}>MYCOCLASSIFY</div>
            <div className="footer-sub">
              A machine-learning botanical field instrument & specimen journal
            </div>
          </div>

          <div className="footer-credit">
            <div className="credit-label">MADE BY</div>
            <strong className="credit-author">S. PRANAV</strong>
            <div className="credit-role">Machine Learning · Computer Engineering</div>
          </div>
        </div>

        {/* Tasteful educational safety note */}
        <div className="footer-safety-line">
          Educational classification model built for scientific study. Not intended for wild mushroom consumption decisions.
        </div>
      </div>
    </footer>
  );
}
