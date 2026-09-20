from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class ObservationInput(BaseModel):
    # Cap characteristics
    cap_shape: str = Field(..., alias="cap-shape")
    cap_surface: str = Field(..., alias="cap-surface")
    cap_color: str = Field(..., alias="cap-color")
    bruises: str = Field(..., alias="bruises")
    number_of_bruises: float = Field(0.0, alias="number_of_bruises")
    
    # Odour & Gills
    odor: str = Field(..., alias="odor")
    gill_attachment: str = Field(..., alias="gill-attachment")
    gill_spacing: str = Field(..., alias="gill-spacing")
    gill_size: str = Field(..., alias="gill-size")
    gill_color: str = Field(..., alias="gill-color")
    
    # Stalk
    stalk_shape: str = Field(..., alias="stalk-shape")
    stalk_root: str = Field(..., alias="stalk-root")
    stalk_surface_above_ring: str = Field(..., alias="stalk-surface-above-ring")
    stalk_surface_below_ring: str = Field(..., alias="stalk-surface-below-ring")
    stalk_color_above_ring: str = Field(..., alias="stalk-color-above-ring")
    stalk_color_below_ring: str = Field(..., alias="stalk-color-below-ring")
    
    # Veil (Default values matching dataset)
    veil_type: Optional[str] = Field("partial", alias="veil-type")
    veil_color: Optional[str] = Field("white", alias="veil-color")
    
    # Ring & Spore
    ring_number: float = Field(1.0, alias="ring-number")
    ring_type: str = Field(..., alias="ring-type")
    spore_print_color: str = Field(..., alias="spore-print-color")
    
    # Population & Habitat
    population: str = Field(..., alias="population")
    habitat: str = Field(..., alias="habitat")

    class Config:
        populate_by_name = True

class FeatureImportanceItem(BaseModel):
    feature: str
    importance: float

class PredictionResponse(BaseModel):
    prediction: str
    class_code: str
    probability: float
    confidence_percentage: str
    is_edible: bool
    summary: str
    observations: Dict[str, Any]
    feature_importances: List[FeatureImportanceItem]
    model_name: str
    timestamp: str

class ModelMetrics(BaseModel):
    validation_accuracy: float
    precision: float
    recall: float
    f1_score: float
    roc_auc: float
    cross_val_mean_accuracy: float
    cross_val_std_accuracy: float

class ModelMetadataResponse(BaseModel):
    model_name: str
    target_mapping: Dict[str, str]
    training_samples: int
    metrics: ModelMetrics
    compared_models: List[Dict[str, Any]]
    feature_importances: List[FeatureImportanceItem]
    achievement: str
    author: str

class ReportRequest(BaseModel):
    specimen_data: Dict[str, Any]
    prediction_result: Dict[str, Any]

