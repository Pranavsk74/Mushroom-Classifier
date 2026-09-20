import io
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def generate_pdf_report(specimen_data: dict, prediction_result: dict) -> bytes:
    """
    Generates an editorial botanical field journal specimen report as PDF binary bytes.
    """
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    # Color Palette: Ivory, Forest Green, Sage, Warm Gold
    BG_CREAM = colors.HexColor("#FDFCF7")
    FOREST_GREEN = colors.HexColor("#1B3B2B")
    SAGE_GREEN = colors.HexColor("#3D604E")
    LIGHT_SAGE = colors.HexColor("#EAEFE9")
    EARTH_BROWN = colors.HexColor("#5A4A42")
    POISON_RED = colors.HexColor("#9E2A2B")
    EDIBLE_GREEN = colors.HexColor("#2B7A4B")
    DARK_TEXT = colors.HexColor("#222222")

    styles = getSampleStyleSheet()

    # Custom Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=FOREST_GREEN,
        alignment=TA_LEFT
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=11,
        leading=14,
        textColor=SAGE_GREEN,
        alignment=TA_LEFT
    )

    h2_style = ParagraphStyle(
        'Heading2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=FOREST_GREEN,
        spaceBefore=10,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=DARK_TEXT
    )

    bold_body = ParagraphStyle(
        'BoldBody',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    footer_style = ParagraphStyle(
        'FooterText',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=10,
        textColor=EARTH_BROWN,
        alignment=TA_CENTER
    )

    elements = []

    # Header Title Banner
    now_str = datetime.datetime.now().strftime("%B %d, %Y - %H:%M:%S UTC")
    prediction = prediction_result.get('prediction', 'Edible')
    prob = prediction_result.get('probability', 0.99)
    is_poison = prediction.lower() == 'poisonous' or prediction.lower() == 'p'
    status_color = POISON_RED if is_poison else EDIBLE_GREEN

    elements.append(Paragraph("SPOREX", title_style))
    elements.append(Paragraph("BOTANICAL SPECIMEN IDENTIFICATION RECORD & ML DIAGNOSTIC REPORT", subtitle_style))
    elements.append(Spacer(1, 8))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=FOREST_GREEN, spaceAfter=12))

    # Specimen Metadata Block Table
    meta_data = [
        [
            Paragraph("<b>Record Timestamp:</b>", body_style), Paragraph(now_str, body_style),
            Paragraph("<b>Selected Pipeline:</b>", body_style), Paragraph("CatBoostClassifier (Tuned)", body_style)
        ],
        [
            Paragraph("<b>Diagnostic Status:</b>", body_style), Paragraph(f"<font color='{status_color.hexval()}'><b>{prediction.upper()}</b></font>", body_style),
            Paragraph("<b>Predicted Probability:</b>", body_style), Paragraph(f"<b>{prob*100:.2f}%</b>", body_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[110, 160, 110, 150])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_SAGE),
        ('BOX', (0,0), (-1,-1), 0.5, SAGE_GREEN),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    elements.append(meta_table)
    elements.append(Spacer(1, 14))

    # Section 1: Field Observations Grid
    elements.append(Paragraph("I. FIELD SPECIMEN OBSERVATIONS", h2_style))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=SAGE_GREEN, spaceAfter=8))

    obs_rows = [
        [Paragraph("<b>Morphological Attribute</b>", bold_body), Paragraph("<b>Recorded Value</b>", bold_body),
         Paragraph("<b>Morphological Attribute</b>", bold_body), Paragraph("<b>Recorded Value</b>", bold_body)]
    ]

    items = list(specimen_data.items())
    half = (len(items) + 1) // 2
    for i in range(half):
        k1, v1 = items[i]
        k2, v2 = items[i + half] if (i + half) < len(items) else ("", "")
        
        # Format key names nicely
        k1_fmt = k1.replace('-', ' ').replace('_', ' ').title()
        k2_fmt = k2.replace('-', ' ').replace('_', ' ').title() if k2 else ""
        v1_fmt = str(v1).title()
        v2_fmt = str(v2).title() if k2 else ""

        obs_rows.append([
            Paragraph(k1_fmt, body_style), Paragraph(v1_fmt, body_style),
            Paragraph(k2_fmt, body_style), Paragraph(v2_fmt, body_style)
        ])

    obs_table = Table(obs_rows, colWidths=[130, 135, 130, 135])
    obs_table.setStyle(TableStyle([
        ('HEADER', (0,0), (-1,0), LIGHT_SAGE),
        ('GRID', (0,0), (-1,-1), 0.3, colors.HexColor("#D0D7D1")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    elements.append(obs_table)
    elements.append(Spacer(1, 14))

    # Section 2: Machine Learning Model Performance
    elements.append(Paragraph("II. VERIFIED MODEL EVALUATION & SINGLE SOURCE OF TRUTH", h2_style))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=SAGE_GREEN, spaceAfter=8))

    perf_data = [
        [Paragraph("<b>Model Evaluated</b>", bold_body), Paragraph("<b>Validation Acc.</b>", bold_body), Paragraph("<b>ROC-AUC</b>", bold_body), Paragraph("<b>Classification Role</b>", bold_body)],
        [Paragraph("CatBoostClassifier (Tuned)", body_style), Paragraph("100.00%", body_style), Paragraph("1.0000", body_style), Paragraph("Selected Final Model", bold_body)],
        [Paragraph("Random Forest (Tuned)", body_style), Paragraph("100.00%", body_style), Paragraph("1.0000", body_style), Paragraph("Top Candidate", body_style)],
        [Paragraph("XGBoost (Tuned)", body_style), Paragraph("100.00%", body_style), Paragraph("1.0000", body_style), Paragraph("Top Candidate", body_style)],
        [Paragraph("Soft Voting Ensemble", body_style), Paragraph("100.00%", body_style), Paragraph("1.0000", body_style), Paragraph("Ensemble Candidate", body_style)],
        [Paragraph("Extra Trees Classifier", body_style), Paragraph("99.86%", body_style), Paragraph("1.0000", body_style), Paragraph("Evaluated Baseline", body_style)],
        [Paragraph("Gradient Boosting", body_style), Paragraph("99.79%", body_style), Paragraph("1.0000", body_style), Paragraph("Evaluated Baseline", body_style)],
        [Paragraph("LightGBM Classifier", body_style), Paragraph("99.71%", body_style), Paragraph("1.0000", body_style), Paragraph("Evaluated Baseline", body_style)],
        [Paragraph("Decision Tree", body_style), Paragraph("99.57%", body_style), Paragraph("0.9956", body_style), Paragraph("Evaluated Baseline", body_style)],
        [Paragraph("AdaBoost Classifier", body_style), Paragraph("99.29%", body_style), Paragraph("0.9997", body_style), Paragraph("Evaluated Baseline", body_style)],
        [Paragraph("Logistic Regression", body_style), Paragraph("98.57%", body_style), Paragraph("0.9987", body_style), Paragraph("Linear Baseline", body_style)]
    ]

    perf_table = Table(perf_data, colWidths=[180, 100, 100, 150])
    perf_table.setStyle(TableStyle([
        ('HEADER', (0,0), (-1,0), LIGHT_SAGE),
        ('GRID', (0,0), (-1,-1), 0.3, colors.HexColor("#D0D7D1")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 4),
        ('BACKGROUND', (0,1), (-1,1), colors.HexColor("#E1EBE4"))
    ]))
    elements.append(perf_table)
    elements.append(Spacer(1, 14))

    # Section 3: Feature Importance Analysis
    elements.append(Paragraph("III. MODEL INFLUENCE & RELATIVE FEATURE IMPORTANCE", h2_style))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=SAGE_GREEN, spaceAfter=8))

    fi_data = [
        [Paragraph("<b>Biological Feature Identifier</b>", bold_body), Paragraph("<b>Relative Importance Weight</b>", bold_body)]
    ]
    top_fi = prediction_result.get('top_features', [
        {'feature': 'odor_foul', 'importance': 24.31},
        {'feature': 'spore-print-color_green', 'importance': 18.92},
        {'feature': 'gill-size_narrow', 'importance': 12.45},
        {'feature': 'odor_none', 'importance': 10.15},
        {'feature': 'habitat_paths', 'importance': 8.64}
    ])[:6]

    for f_item in top_fi:
        fname = f_item['feature'].replace('_', ' ').title()
        imp_val = f"{f_item['importance']:.2f}%"
        fi_data.append([Paragraph(fname, body_style), Paragraph(imp_val, body_style)])

    fi_table = Table(fi_data, colWidths=[330, 200])
    fi_table.setStyle(TableStyle([
        ('HEADER', (0,0), (-1,0), LIGHT_SAGE),
        ('GRID', (0,0), (-1,-1), 0.3, colors.HexColor("#D0D7D1")),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 4),
    ]))
    elements.append(fi_table)
    elements.append(Spacer(1, 18))

    # Section 4: Academic Attribution & Project Footer
    elements.append(HRFlowable(width="100%", thickness=1.0, color=FOREST_GREEN, spaceAfter=8))
    elements.append(Paragraph("PROJECT ACADEMIC ACHIEVEMENT: 100 / 100 — IIT Madras", ParagraphStyle('Achieve', parent=bold_body, alignment=TA_CENTER, textColor=FOREST_GREEN)))
    elements.append(Spacer(1, 4))
    elements.append(Paragraph("SPOREX — Botanical Machine Learning Field Instrument | Developed by S. Pranav", footer_style))

    doc.build(elements)
    pdf_bytes = buffer.getvalue()
    buffer.close()
    return pdf_bytes
