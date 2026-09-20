import React from 'react';
import { Award } from 'lucide-react';

export default function AchievementAndSafety() {
  return (
    <section className="block achievement-section" id="about">
      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Botanical Stem Divider */}
        <div className="botanical-divider">
          <svg viewBox="0 0 100 20" width="120" height="24" fill="none" stroke="var(--sage)" strokeWidth="1">
            <path d="M0 10 Q 25 0, 50 10 T 100 10" />
            <circle cx="50" cy="10" r="3" fill="var(--sage)" />
          </svg>
        </div>

        <div className="achievement-container">
          <div className="achievement-content">
            <div className="kicker">PROJECT ACADEMIC PURPOSE</div>
            <h2 className="achievement-title">
              SporeX Botanical Classifier
            </h2>
            <p className="lead" style={{ marginTop: '12px', fontSize: '16px' }}>
              College-Level Machine Learning Classification Project & Educational Field Instrument.
            </p>
            <div className="achievement-subtext">
              Designed to demonstrate end-to-end data preprocessing, categorical feature engineering, multi-model benchmarking, hyperparameter tuning, and real-time Python model inference.
            </div>
          </div>

          <div className="achievement-badge-card">
            <div className="badge-icon-wrapper">
              <Award size={40} color="var(--sage)" />
            </div>
            <div>
              <div className="badge-kicker">Educational ML Project</div>
              <div className="badge-score">IIT Madras</div>
              <div className="badge-label">Machine Learning Portfolio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
