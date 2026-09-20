import React, { useState } from 'react';

export default function SpecimenGuideSection() {
  const [activeCategory, setActiveCategory] = useState('cap');

  const categories = [
    {
      id: 'cap',
      title: 'Cap & Surface',
      number: 'PLATE 01',
      description: 'Cap morphology, surface ornamentation, and pileus pigmentation form the opening morphological record in fungal taxonomy.',
      attributes: [
        { label: 'Cap Shapes', items: ['Bell-shaped', 'Conical', 'Convex (Domed)', 'Flat', 'Knobbed', 'Sunken'] },
        { label: 'Cap Surfaces', items: ['Fibrous', 'Grooved', 'Scaly', 'Smooth'] },
        { label: 'Color Palette', items: ['Brown', 'Buff', 'Cinnamon', 'Gray', 'Green', 'Pink', 'Purple', 'Red', 'White', 'Yellow'] }
      ]
    },
    {
      id: 'gills',
      title: 'Gills & Odour',
      number: 'PLATE 02',
      description: 'Hymenial gill spacing, size, attachment, and volatile aromatic compounds serve as key physical drivers of toxicity.',
      attributes: [
        { label: 'Odour Profiles', items: ['Almond (Sweet Nutty)', 'Anise (Licorice)', 'Creosote (Tar)', 'Fishy', 'Foul / Pungent', 'Musty', 'None', 'Spicy'] },
        { label: 'Gill Size & Spacing', items: ['Broad Gills', 'Narrow Gills', 'Close Spacing', 'Crowded Spacing'] },
        { label: 'Gill Attachment', items: ['Gills Free From Stalk', 'Gills Attached To Stalk'] }
      ]
    },
    {
      id: 'stalk',
      title: 'Stalk & Ring',
      number: 'PLATE 03',
      description: 'Stipe architecture, root structure, surface texture, and partial veil annulus ring morphology.',
      attributes: [
        { label: 'Root Architecture', items: ['Bulbous Base', 'Club-shaped', 'Equal Thickness', 'Missing / Obscured'] },
        { label: 'Ring Formations', items: ['Evanescent (Fading)', 'Flaring', 'Large', 'Pendant (Hanging)'] },
        { label: 'Stalk Shapes', items: ['Enlarges Toward Base', 'Tapers Toward Base'] }
      ]
    },
    {
      id: 'habitat',
      title: 'Habitat & Spores',
      number: 'PLATE 04',
      description: 'Environmental growth conditions, ecological distribution, and microscopic spore print pigmentation.',
      attributes: [
        { label: 'Natural Habitats', items: ['Grasses / Meadows', 'Paths / Trail Edges', 'Urban / Gardens', 'Waste / Composting', 'Woods / Forest Floor'] },
        { label: 'Populations', items: ['Abundant', 'Clustered', 'Numerous', 'Scattered', 'Several', 'Solitary'] },
        { label: 'Spore Prints', items: ['Black', 'Brown', 'Chocolate', 'Green', 'Purple', 'White'] }
      ]
    }
  ];

  const currentCat = categories.find(c => c.id === activeCategory);

  const handleSelectAttribute = () => {
    const elem = document.getElementById('classify');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="block guide" id="guide">
      <div className="site-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Botanical Stem Divider */}
        <div className="botanical-divider">
          <svg viewBox="0 0 100 20" width="120" height="24" fill="none" stroke="var(--sage)" strokeWidth="1">
            <path d="M0 10 Q 20 15, 50 10 T 100 10" />
            <circle cx="20" cy="15" r="3" fill="var(--sage)" />
          </svg>
        </div>

        <div className="kicker">05 — Specimen Guide</div>
        
        <div className="intro">
          <div>
            <h2>Supported botanical features.</h2>
          </div>
          <div>
            <p className="lead">
              The guide is grounded in the supplied project dataset. Observers can inspect supported botanical attribute combinations and jump directly to the observation journal.
            </p>
          </div>
        </div>

        {/* Category Nav Tabs */}
        <div className="guide-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`btn ${activeCategory === cat.id ? 'primary' : 'secondary'}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.number}</span> · {cat.title}
            </button>
          ))}
        </div>

        {/* Field Guide Page Layout */}
        <div className="guide-page">
          <div className="guide-page-header">
            <div className="plate-number">{currentCat.number}</div>
            <h3 className="plate-title">{currentCat.title}</h3>
            <p className="plate-desc">{currentCat.description}</p>
          </div>

          <div className="guide-grid">
            {currentCat.attributes.map((attr, idx) => (
              <article key={idx} className="guide-card">
                <h4>{attr.label}</h4>
                <div className="guide-tags">
                  {attr.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      type="button"
                      className="guide-tag"
                      onClick={handleSelectAttribute}
                      style={{ cursor: 'pointer', border: '1px solid rgba(88,124,99,0.3)', background: 'rgba(88,124,99,0.08)' }}
                      title={`Click to record ${item} in Field Journal`}
                    >
                      {item} →
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
