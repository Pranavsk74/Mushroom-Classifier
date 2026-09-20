import React from 'react';
import { motion } from 'framer-motion';

// SVG Organic Branch Drawing
export function BotanicalBranch({ direction = 'left', className = '' }) {
  const isLeft = direction === 'left';

  return (
    <motion.div
      className={`botanical-branch-wrap ${isLeft ? 'branch-left' : 'branch-right'} ${className}`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <svg
        viewBox="0 0 200 120"
        width="220"
        height="130"
        fill="none"
        stroke="var(--sage)"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{ transform: isLeft ? 'none' : 'scaleX(-1)' }}
      >
        {/* Main Stem Curve */}
        <motion.path
          d="M 0,100 C 40,80 80,90 120,40 C 140,15 170,10 195,5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />
        
        {/* Offshoot Branch 1 */}
        <motion.path
          d="M 60,82 C 75,60 90,55 105,50"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />
        
        {/* Offshoot Branch 2 */}
        <motion.path
          d="M 120,40 C 135,55 150,60 165,62"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.7, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />

        {/* Leaves along branch */}
        <path d="M 105,50 Q 115,42 120,50 Q 112,58 105,50 Z" fill="rgba(88,124,99,0.15)" stroke="var(--sage)" />
        <path d="M 165,62 Q 175,54 180,62 Q 172,70 165,62 Z" fill="rgba(88,124,99,0.15)" stroke="var(--sage)" />
        <path d="M 195,5 Q 198,18 190,22 Q 185,10 195,5 Z" fill="rgba(88,124,99,0.2)" stroke="var(--sage)" />
      </svg>
    </motion.div>
  );
}

// Nature to Data Stem Divider
export function NatureToDataStem() {
  return (
    <div className="nature-to-data-divider">
      <motion.svg
        viewBox="0 0 600 60"
        width="100%"
        height="60"
        fill="none"
        stroke="var(--sage)"
        strokeWidth="1.2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Organic curve transitioning into straight structured line */}
        <motion.path
          d="M 0,30 Q 150,55 300,30 L 600,30"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          viewport={{ once: true }}
        />
        {/* Leaf on organic end */}
        <path d="M 150,42 Q 165,30 170,42 Q 160,52 150,42 Z" fill="rgba(88,124,99,0.2)" stroke="var(--sage)" />
        {/* Data node on structured end */}
        <circle cx="450" cy="30" r="4" fill="var(--sage)" />
        <circle cx="550" cy="30" r="4" fill="var(--sage)" />
      </motion.svg>
      <div className="stem-caption">TRANSFORMATION: ORGANIC SPECIMEN → STRUCTURED FEATURE VECTOR</div>
    </div>
  );
}

// Wind Sway Leaf Element
export function WindSwayLeaf({ style = {}, className = '' }) {
  return (
    <motion.div
      className={`wind-leaf ${className}`}
      style={style}
      animate={{
        rotate: [0, 4, -3, 2, 0],
        y: [0, -5, 3, -2, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <svg viewBox="0 0 40 60" width="36" height="54" fill="none" stroke="var(--sage)" strokeWidth="1">
        <path d="M 20,0 C 35,20 35,40 20,60 C 5,40 5,20 20,0 Z" fill="rgba(88,124,99,0.12)" />
        <path d="M 20,0 L 20,60" />
        <path d="M 20,20 L 30,12" />
        <path d="M 20,30 L 10,22" />
        <path d="M 20,40 L 30,32" />
      </svg>
    </motion.div>
  );
}
