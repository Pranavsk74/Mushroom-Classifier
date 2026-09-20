import os
from fastapi import FastAPI, HTTPException, status, Response
from fastapi.middleware.cors import CORSMiddleware
from backend.schemas import ObservationInput, PredictionResponse, ModelMetadataResponse, ReportRequest
from backend.model_service import model_service
from backend.analytics_service import analytics_service
from backend.report_generator import generate_pdf_report

app = FastAPI(
    title="MycoClassify API",
    description="Production ML Backend for Botanical Mushroom Classification",
    version="1.0.0"
)

# CORS configuration
cors_env = os.environ.get("CORS_ORIGINS", "")
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]
if cors_env:
    origins.extend([o.strip() for o in cors_env.split(",") if o.strip()])
else:
    origins.append("*")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {
        "status": "ok",
        "service": "MycoClassify ML Backend",
        "model_loaded": model_service.model is not None
    }

@app.get("/metadata", response_model=ModelMetadataResponse)
def get_model_metadata():
    if not model_service.metadata:
        raise HTTPException(status_code=500, detail="Model metadata uninitialized.")
    return model_service.metadata

@app.get("/analytics")
def get_dataset_analytics():
    try:
        data = analytics_service.compute_analytics()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to compute dataset analytics: {str(e)}")


@app.post("/predict", response_model=PredictionResponse)
def predict_mushroom(input_data: ObservationInput):
    try:
        raw_dict = input_data.dict(by_alias=True)
        result = model_service.predict(raw_dict)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unable to examine this specimen right now. Error: {str(e)}"
        )

@app.post("/report")
def generate_report(req: ReportRequest):
    try:
        pdf_bytes = generate_pdf_report(req.specimen_data, req.prediction_result)
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=mycoclassify_specimen_report.pdf"}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate specimen report PDF: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.app:app", host="0.0.0.0", port=port, reload=True)

