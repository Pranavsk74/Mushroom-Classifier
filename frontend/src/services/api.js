const API_BASE_URL = 
  import.meta.env.VITE_API_URL !== undefined 
    ? import.meta.env.VITE_API_URL 
    : (import.meta.env.DEV ? 'http://127.0.0.1:8000' : '/api');

export async function predictMushroom(observationData) {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(observationData),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Server returned HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Prediction Error:", error);
    throw error;
  }
}

export async function getModelMetadata() {
  try {
    const response = await fetch(`${API_BASE_URL}/metadata`);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    return await response.json();
  } catch (error) {
    console.warn("Could not fetch metadata from backend, using fallback:", error);
    return null;
  }
}

export async function generateReportPdf(specimenData, predictionResult) {
  try {
    const response = await fetch(`${API_BASE_URL}/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        specimen_data: specimenData,
        prediction_result: predictionResult
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Failed to generate PDF report (HTTP ${response.status})`);
    }

    return await response.blob();
  } catch (error) {
    console.error("API Report PDF Error:", error);
    throw error;
  }
}
