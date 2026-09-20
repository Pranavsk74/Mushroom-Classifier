import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BigLeafPushInTransition({ imageSrc = "/assets/ppt/media_image4.png", align = "left" }) {
  const containerRef = React.useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calm parallax vertical float and opacity reveal (NO aggressive 3.5x scale zoom)
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.75, 0.75, 0.1]);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '100px', overflow: 'hidden', pointerEvents: 'none', zIndex: 10 }}>
      <motion.img
        src={imageSrc}
        alt="Botanical Foliage"
        style={{
          position: 'absolute',
          top: '-40px',
          [align]: '2%',
          width: '32vw',
          maxWidth: '380px',
          y,
          opacity,
          filter: 'drop-shadow(0 15px 30px rgba(29,51,40,0.15))'
        }}
      />
    </div>
  );
}
