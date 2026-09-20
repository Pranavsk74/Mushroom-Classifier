import React from 'react';
import { X, Trash2, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function HistoryDrawer({ isOpen, onClose, historyItems, onClearHistory }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-header">
          <div className="drawer-title">Recent Records</div>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink)' }}>
            <X size={24} />
          </button>
        </div>

        <p className="muted" style={{ marginBottom: '20px' }}>
          Saved botanical specimen classifications stored in your browser's local storage.
        </p>

        {historyItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--muted)' }}>
            <p>No specimen records saved yet.</p>
            <p className="muted">Classify a specimen and click "Save Record" to store it here.</p>
          </div>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {historyItems.map((item, idx) => {
              const isEdible = item.is_edible;
              return (
                <div key={idx} className="history-item">
                  <div className="history-meta">
                    <span><Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} /> {new Date(item.timestamp).toLocaleString()}</span>
                    <span>{item.confidence_percentage}</span>
                  </div>
                  
                  <div className={`history-pred ${isEdible ? 'edible' : 'poisonous'}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isEdible ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                    <span>{item.prediction.toUpperCase()}</span>
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '8px' }}>
                    Odour: {item.observations.odor} · Gills: {item.observations['gill-size']} · Habitat: {item.observations.habitat}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {historyItems.length > 0 && (
          <div style={{ paddingTop: '20px', borderTop: '1px solid var(--line)', marginTop: 'auto' }}>
            <button 
              type="button" 
              className="btn secondary" 
              style={{ width: '100%', justifyContent: 'center', color: 'var(--poison-red)', borderColor: 'var(--poison-red)' }}
              onClick={onClearHistory}
            >
              <Trash2 size={14} /> Clear History
            </button>
          </div>
        )}
      </div>
    </>
  );
}
