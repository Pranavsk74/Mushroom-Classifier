import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, ArrowDown } from 'lucide-react';

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Smooth subtle fade & position transform without aggressive scale zoom
  const textY = useTransform(scrollY, [0, 500], [0, -30]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.6]);

  const scrollToSection = (id) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="hero" id="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      
      {/* 4K Forest Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/hero_mushroom.jpg"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/assets/hero_forest_video.mp4" type="video/mp4" />
      </video>

      {/* Subtle Dark Atmospheric Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(29,51,40,0.30) 0%, rgba(29,51,40,0.60) 60%, rgba(15,30,22,0.90) 100%)',
          zIndex: 1
        }}
      />

      {/* Hero Content inside site-container */}
      <div className="site-container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <motion.div 
          className="hero-copy" 
          style={{ 
            maxWidth: '1000px', 
            y: textY,
            opacity: textOpacity
          }}
        >
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#E9E4D5',
            fontWeight: 600,
            marginBottom: '16px',
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
          }}>
            A FIELD GUIDE TO THE HIDDEN WORLD OF MUSHROOMS
          </div>

          <h1 style={{
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(54px, 10vw, 110px)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            color: '#F5F3EA',
            margin: '0 0 16px',
            textShadow: '0 4px 24px rgba(0,0,0,0.4)'
          }}>
            SPOREX
          </h1>

          <div style={{
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
            fontSize: 'clamp(20px, 3vw, 30px)',
            fontWeight: 300,
            color: '#E9E4D5',
            marginBottom: '32px',
            letterSpacing: '-0.01em'
          }}>
            Observe. Record. Classify.
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              className="btn primary"
              style={{
                padding: '14px 28px',
                fontSize: '12px',
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                fontWeight: 600,
                background: 'rgba(41, 73, 54, 0.85)',
                color: '#F5F3EA',
                border: '1px solid rgba(113, 140, 114, 0.6)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
              }}
              onClick={() => scrollToSection('expedition')}
            >
              <Compass size={16} /> ENTER THE FIELD
            </button>

            <button
              type="button"
              className="btn secondary"
              style={{
                padding: '14px 28px',
                fontSize: '12px',
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                fontWeight: 600,
                background: 'rgba(245,243,234,0.12)',
                color: '#F5F3EA',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(12px)'
              }}
              onClick={() => scrollToSection('classify')}
            >
              <ArrowDown size={16} /> RECORD OBSERVATIONS
            </button>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
