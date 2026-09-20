import unittest
from backend.model_service import model_service

class TestMycoClassifyBackend(unittest.TestCase):
    def test_edible_mushroom_prediction(self):
        # Real edible observation from dataset (ID=2)
        sample_edible = {
            'cap-shape': 'convex',
            'cap-surface': 'smooth',
            'cap-color': 'yellow',
            'bruises': 'bruises',
            'number_of_bruises': 20.0,
            'odor': 'almond',
            'gill-attachment': 'gills free from stalk',
            'gill-spacing': 'close',
            'gill-size': 'broad',
            'gill-color': 'black',
            'stalk-shape': 'stalk enlarges toward base',
            'stalk-root': 'club',
            'stalk-surface-above-ring': 'smooth',
            'stalk-surface-below-ring': 'smooth',
            'stalk-color-above-ring': 'white',
            'stalk-color-below-ring': 'white',
            'veil-type': 'partial',
            'veil-color': 'white',
            'ring-number': 1.0,
            'ring-type': 'pendant',
            'spore-print-color': 'brown',
            'population': 'numerous',
            'habitat': 'grasses'
        }
        res = model_service.predict(sample_edible)
        print("Edible test result:", res['prediction'], res['confidence_percentage'])
        self.assertEqual(res['class_code'], 'e')
        self.assertTrue(res['is_edible'])
        self.assertGreaterEqual(res['probability'], 0.5)

    def test_poisonous_mushroom_prediction(self):
        # Real poisonous observation from dataset (ID=1)
        sample_poisonous = {
            'cap-shape': 'convex',
            'cap-surface': 'smooth',
            'cap-color': 'brown',
            'bruises': 'bruises',
            'number_of_bruises': 7.0,
            'odor': 'pungent',
            'gill-attachment': 'gills free from stalk',
            'gill-spacing': 'close',
            'gill-size': 'narrow',
            'gill-color': 'black',
            'stalk-shape': 'stalk enlarges toward base',
            'stalk-root': 'equal',
            'stalk-surface-above-ring': 'smooth',
            'stalk-surface-below-ring': 'smooth',
            'stalk-color-above-ring': 'white',
            'stalk-color-below-ring': 'white',
            'veil-type': 'partial',
            'veil-color': 'white',
            'ring-number': 1.0,
            'ring-type': 'pendant',
            'spore-print-color': 'black',
            'population': 'scattered',
            'habitat': 'urban'
        }
        res = model_service.predict(sample_poisonous)
        print("Poisonous test result:", res['prediction'], res['confidence_percentage'])
        self.assertEqual(res['class_code'], 'p')
        self.assertFalse(res['is_edible'])
        self.assertGreaterEqual(res['probability'], 0.5)

    def test_report_pdf_generation(self):
        from backend.report_generator import generate_pdf_report
        sample_obs = {'cap-shape': 'convex', 'odor': 'almond', 'habitat': 'grasses'}
        sample_pred = {'prediction': 'Edible', 'probability': 0.9998, 'class_code': 'e'}
        pdf_bytes = generate_pdf_report(sample_obs, sample_pred)
        self.assertTrue(len(pdf_bytes) > 500)
        self.assertTrue(pdf_bytes.startswith(b'%PDF'))
        print(f"Generated valid PDF report: {len(pdf_bytes)} bytes")

if __name__ == '__main__':
    unittest.main()

