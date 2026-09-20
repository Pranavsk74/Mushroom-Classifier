import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Disc, Feather, TreePine, Sparkles, CheckCircle2 } from 'lucide-react';
import { BotanicalBranch } from './BotanicalElements';

export default function ClassificationJourney() {
  const [activeStep, setActiveStep] = useState(0);

  const journeySteps = [
    {
      id: "observe",
      kicker: "01 — INITIAL FIELD DISCOVERY",
      title: "Observe The Specimen",
      icon: Eye,
      description: "Step into the living jungle. Before touching the specimen, take note of its micro-habitat, soil moisture, and spatial arrangement.",
      detail: "Observation begins at eye level: notice whether the mushroom grows solitary, in clustered colonies, or along woodland paths."
    },
    {
      id: "cap",
      kicker: "02 — CAP MORPHOLOGY",
      title: "Examine Cap Structure & Surface",
      icon: Disc,
      description: "Inspect the pileus (cap). Note whether it is convex, bell-shaped, flat, or knobbed, along with its color pigments and bruising reactions.",
      detail: "Physical bruising when touched can indicate rapid chemical oxidation within cell tissues."
    },
    {
      id: "gills",
      kicker: "03 — HYMENIUM & AROMA",
      title: "Inspect Gills & Odour Profile",
      icon: Feather,
      description: "Turn the mushroom over to examine gill spacing, size, attachment to the stalk, and scent signature.",
      detail: "Odor is one of the single most influential biological indicators: sweet almond or anise scent leans toward edible species, whereas acrid or foul scent correlates with toxicity."
    },
    {
      id: "stalk",
      kicker: "04 — STIPE & ROOT",
      title: "Examine Stalk & Subterranean Root",
      icon: TreePine,
      description: "Inspect stipe thickness, tapering, bulbous root structures, and surface texture above and below the annulus ring.",
      detail: "Bulbous subterranean volva structures are characteristic signatures of amanita species."
    },
    {
      id: "ring",
      kicker: "05 — ANNULUS & SPORE PRINT",
      title: "Record Ring Type & Spore Pigment",
      icon: Sparkles,
      description: "Observe the pendant or flaring annulus ring left by the partial veil and note the color of spore prints.",
      detail: "Green spore prints strongly signal toxic chlorophyllum species, whereas brown/black prints lean toward edible agarics."
    },
    {
      id: "classify",
      kicker: "06 — MACHINE-LEARNING DIAGNOSTIC",
      title: "Execute CatBoost Classification",
      icon: CheckCircle2,
      description: "Transform physical field notes into clean model inputs, passing observations to the CatBoost classifier for real-time inference.",
      detail: "The trained machine-learning model computes prediction probabilities based on thousands of evaluated botanical records."
    }
  ];

  return (
    <section className="block journey-section" id="journey" style={{ position: 'relative', overflow: 'hidden' }}>
      <BotanicalBranch direction="right" />

      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="kicker">CINEMATIC EXPEDITION STORYTELLING</div>
        
        <div className="intro" style={{ marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: '38px', color: 'var(--ink)' }}>
              The Classification Journey.
            </h2>
            <p className="lead" style={{ marginTop: '8px' }}>
              Follow the botanical field journey from initial forest encounter to scientific machine-learning discovery.
            </p>
          </div>
        </div>

        {/* Interactive Timeline Journey Selector */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '8px',
          marginBottom: '32px',
          borderBottom: '1px solid var(--line)',
          paddingBottom: '16px'
        }}>
          {journeySteps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              style={{
                padding: '12px 10px',
                fontSize: '11px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: activeStep === idx ? 700 : 500,
                color: activeStep === idx ? 'var(--forest)' : 'var(--muted)',
                background: activeStep === idx ? 'var(--paper)' : 'transparent',
                border: activeStep === idx ? '1px solid var(--sage)' : '1px solid transparent',
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <step.icon size={16} color={activeStep === idx ? 'var(--forest)' : 'var(--muted)'} />
              <span>{step.id.toUpperCase()}</span>
            </button>
          ))}
        </div>

        {/* Active Step Showcase */}
        <motion.div
          key={journeySteps[activeStep].id}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'var(--paper)',
            border: '1px solid var(--line)',
            padding: '36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'var(--sage)', fontWeight: 700, textTransform: 'uppercase' }}>
              {journeySteps[activeStep].kicker}
            </div>

            <h3 style={{ fontSize: '28px', fontFamily: 'Cinzel, Georgia, serif', color: 'var(--forest)', margin: '10px 0 16px' }}>
              {journeySteps[activeStep].title}
            </h3>

            <p className="lead" style={{ fontSize: '15px', color: 'var(--ink)', marginBottom: '18px', lineHeight: '1.6' }}>
              {journeySteps[activeStep].description}
            </p>

            <div style={{
              background: 'var(--cream)',
              borderLeft: '3px solid var(--sage)',
              padding: '14px 18px',
              fontSize: '13px',
              color: 'var(--muted)',
              lineHeight: '1.5'
            }}>
              {journeySteps[activeStep].detail}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img
              src={activeStep % 2 === 0 ? "/assets/hero_mushroom.jpg" : "/assets/result_mushroom.jpg"}
              alt="Classification Journey Botanical Illustration"
              style={{
                maxWidth: '280px',
                width: '100%',
                height: 'auto',
                border: '1px solid var(--line)',
                padding: '10px',
                background: 'var(--paper)',
                boxShadow: '0 8px 24px rgba(27,59,43,0.06)'
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
