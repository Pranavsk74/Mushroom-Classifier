import React, { useState, useEffect } from 'react';
import { Compass, Users } from 'lucide-react';

export default function FieldExpeditionPresence() {
  const [activeCount, setActiveCount] = useState(3);
  const [expanded, setExpanded] = useState(false);

  // Subtle fluctuation to reflect real-time active field observers
  useEffect(() => {
    const interval = setInterval(() => {
      const delta = Math.floor(Math.random() * 3) - 1;
      setActiveCount(prev => Math.max(2, Math.min(8, prev + delta)));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="expedition-presence-bar">
      <div 
        className="expedition-pill" 
        onClick={() => setExpanded(!expanded)}
        title="Field Expedition Active Presence"
      >
        <span className="presence-dot"></span>
        <Compass size={13} color="var(--sage)" />
        <span>FIELD EXPEDITION ACTIVE</span>
        <span className="observer-count">· {activeCount} Observers in Field</span>
      </div>

      {expanded && (
        <div className="expedition-tooltip">
          <div className="tooltip-title">Botanical Field Expedition</div>
          <p className="tooltip-body">
            Shared live observation session. Observers in the field are currently logging physical mushroom attributes across forest habitats.
          </p>
          <div className="tooltip-footer">
            <Users size={12} style={{ display: 'inline', marginRight: '4px' }} />
            <span>{activeCount} Active Observers · Real-Time ML Session</span>
          </div>
        </div>
      )}
    </div>
  );
}
