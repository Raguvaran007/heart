
import { Sex, ChestPainType, RestingECG, ExerciseAngina, ST_Slope } from './types';

export interface FormField {
  name: string;
  label: string;
  type: 'number' | 'select';
  placeholder?: string;
  options?: Record<string, string>;
  min?: number;
  max?: number;
  step?: number;
}

export const formFields: FormField[] = [
  { name: 'Age', label: 'Age', type: 'number', placeholder: 'e.g., 55', min: 1, max: 120 },
  { name: 'Sex', label: 'Sex', type: 'select', options: Sex },
  { name: 'RestingBP', label: 'Resting Blood Pressure (mm Hg)', type: 'number', placeholder: 'e.g., 120', min: 50, max: 250 },
  { name: 'Cholesterol', label: 'Cholesterol (mm/dl)', type: 'number', placeholder: 'e.g., 200', min: 50, max: 600 },
  { name: 'MaxHR', label: 'Maximum Heart Rate', type: 'number', placeholder: 'e.g., 150', min: 60, max: 220 },
  { name: 'Oldpeak', label: 'Oldpeak (ST)', type: 'number', placeholder: 'e.g., 1.0', min: -3, max: 7, step: 0.1 },
  { name: 'ChestPainType', label: 'Chest Pain Type', type: 'select', options: ChestPainType },
  { name: 'FastingBS', label: 'Fasting Blood Sugar > 120 mg/dl', type: 'select', options: { '0': 'No', '1': 'Yes' } },
  { name: 'RestingECG', label: 'Resting ECG', type: 'select', options: RestingECG },
  { name: 'ExerciseAngina', label: 'Exercise-Induced Angina', type: 'select', options: ExerciseAngina },
  { name: 'ST_Slope', label: 'ST Slope', type: 'select', options: ST_Slope },
];
