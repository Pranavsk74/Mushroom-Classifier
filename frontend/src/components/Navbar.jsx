import React, { useState, useEffect } from 'react';
import { Clock, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenHistory, historyCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'OBSERVE', id: 'classify' },
    { label: 'METHODOLOGY', id: 'method' },
    { label: 'SPECIMENS', id: 'guide' },
    { label: 'PROJECT', id: 'about' }
  ];

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '1240px',
        zIndex: 100,
        background: scrolled ? 'rgba(29, 51, 40, 0.88)' : 'rgba(29, 51, 40, 0.55)',
        backdropFilter: 'blur(20px) saturate(140%)',
        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease'
      }}>
        {/* Editorial Serif Brand Name */}
        <div 
          onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{
            fontFamily: 'Cinzel, Georgia, serif',
            fontWeight: 700,
            fontSize: '20px',
            color: '#F5F3EA',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            letterSpacing: '0.05em'
          }}
        >
          <span style={{ color: '#718C72', fontSize: '14px' }}>•</span> SporeX
        </div>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="hide-mobile">
          {navItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#F5F3EA',
                fontSize: '11px',
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.15em',
                cursor: 'pointer',
                opacity: 0.9,
                transition: 'opacity 0.2s ease'
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={onOpenHistory}
            style={{
              background: 'rgba(245, 243, 234, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '6px',
              color: '#F5F3EA',
              fontSize: '11px',
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.15em',
              padding: '6px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Clock size={12} />
            RECORDS {historyCount > 0 && <span style={{ background: '#3F6850', padding: '1px 6px', borderRadius: '10px', fontSize: '9px' }}>{historyCount}</span>}
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: 'none',
            border: 'none',
            color: '#F5F3EA',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Drawer Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '74px',
          left: '16px',
          right: '16px',
          zIndex: 99,
          background: 'rgba(29, 51, 40, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#F5F3EA',
                fontSize: '13px',
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.15em',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => { setMobileMenuOpen(false); onOpenHistory(); }}
            style={{
              background: 'rgba(245, 243, 234, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '6px',
              color: '#F5F3EA',
              fontSize: '12px',
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.15em',
              padding: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px'
            }}
          >
            <Clock size={14} />
            FIELD RECORDS ({historyCount})
          </button>
        </div>
      )}
    </>
  );
}
