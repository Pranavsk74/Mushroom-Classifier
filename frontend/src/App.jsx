import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FieldExpeditionPresence from './components/FieldExpeditionPresence';
import EnterTheFieldSection from './components/EnterTheFieldSection';
import BigLeafPushInTransition from './components/BigLeafPushInTransition';
import ClassificationJourney from './components/ClassificationJourney';
import ExpandedEDASection from './components/ExpandedEDASection';
import ObservationForm from './components/ObservationForm';
import SpecimenResultCard from './components/SpecimenResultCard';
import DataExplorationSection from './components/DataExplorationSection';
import ValidationPredictedVsActualSection from './components/ValidationPredictedVsActualSection';
import ModelTheorySection from './components/ModelTheorySection';
import MethodologySection from './components/MethodologySection';
import SpecimenGuideSection from './components/SpecimenGuideSection';
import AchievementAndSafety from './components/AchievementAndSafety';
import HistoryDrawer from './components/HistoryDrawer';
import Footer from './components/Footer';
import { predictMushroom } from './services/api';

export default function App() {
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState([]);
  const [lastObservation, setLastObservation] = useState(null);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('sporex_history');
      if (savedHistory) {
        setHistoryItems(JSON.parse(savedHistory));
      }
    } catch (err) {
      console.warn("Failed to load classification history:", err);
    }
  }, []);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setApiError(null);
    setLastObservation(formData);

    try {
      const data = await predictMushroom(formData);
      setResultData(data);
      
      setTimeout(() => {
        const resultElem = document.getElementById('result');
        if (resultElem) {
          resultElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);

    } catch (err) {
      setApiError(err.message || "Unable to examine this specimen right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastObservation) {
      handleFormSubmit(lastObservation);
    }
  };

  const handleSaveHistory = (newRecord) => {
    const updated = [newRecord, ...historyItems];
    setHistoryItems(updated);
    try {
      localStorage.setItem('sporex_history', JSON.stringify(updated));
    } catch (err) {
      console.warn("Failed to save to local storage:", err);
    }
  };

  const handleClearHistory = () => {
    setHistoryItems([]);
    try {
      localStorage.removeItem('sporex_history');
    } catch (err) {
      console.warn("Failed to clear local storage history:", err);
    }
  };

  const handleResetForm = () => {
    setResultData(null);
    const formElem = document.getElementById('classify');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* FLOATING GLASSMORPHISM SPOREX NAVBAR */}
      <Navbar 
        onOpenHistory={() => setHistoryDrawerOpen(true)}
        historyCount={historyItems.length}
      />

      <FieldExpeditionPresence />
      
      {/* 4K CRISP FOREST VIDEO HERO SECTION */}
      <Hero />
      
      {/* ENTER THE FIELD — IMMERSIVE BOTANICAL REVEAL */}
      <EnterTheFieldSection />

      {/* TRANSITION 1: MASSIVE LEAF PUSH-IN TO JOURNEY */}
      <BigLeafPushInTransition imageSrc="/assets/ppt/media_image4.png" align="left" />

      {/* CINEMATIC EXPEDITION JOURNEY */}
      <ClassificationJourney />

      {/* READING THE FOREST: EXPANDED DATASET EDA & PCA CLUSTERING */}
      <ExpandedEDASection />

      {/* TRANSITION 2: MASSIVE LEAF PUSH-IN TO OBSERVATION FORM */}
      <BigLeafPushInTransition imageSrc="/assets/ppt/media_image1.png" align="right" />

      {/* CHOOSE A SPECIMEN & MANUAL OBSERVATION FORM */}
      <ObservationForm 
        onSubmit={handleFormSubmit}
        isLoading={isLoading}
        apiError={apiError}
        onRetry={handleRetry}
      />
      
      {/* REAL MODEL DISCOVERY RESULT CARD & PDF DOWNLOAD */}
      <SpecimenResultCard 
        resultData={resultData}
        onReset={handleResetForm}
        onSaveHistory={handleSaveHistory}
      />
      
      {/* INTERACTIVE DATA EXPLORATION & MODEL PERFORMANCE LANDSCAPE */}
      <DataExplorationSection />

      {/* TRANSITION 3: MASSIVE LEAF PUSH-IN TO VALIDATION & THEORY */}
      <BigLeafPushInTransition imageSrc="/assets/ppt/media_image8.png" align="left" />

      {/* CATBOOST VALIDATION PREDICTED VS ACTUAL & CONFUSION MATRIX */}
      <ValidationPredictedVsActualSection />

      {/* CATBOOST MATHEMATICAL INTUITION & MODEL THEORY */}
      <ModelTheorySection />

      {/* SCIENTIFIC METHODOLOGY & NINE CLASSIFIERS BENCHMARK */}
      <MethodologySection />
      
      {/* FIELD IDENTIFICATION GUIDE */}
      <SpecimenGuideSection />
      
      {/* PROJECT ACADEMIC ACHIEVEMENT */}
      <AchievementAndSafety />
      
      {/* FOOTER */}
      <Footer />

      {/* HISTORY DRAWER */}
      <HistoryDrawer 
        isOpen={historyDrawerOpen}
        onClose={() => setHistoryDrawerOpen(false)}
        historyItems={historyItems}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}
