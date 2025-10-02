
export enum Sex {
  M = 'Male',
  F = 'Female'
}

export enum ChestPainType {
  TA = 'Typical Angina',
  ATA = 'Atypical Angina',
  NAP = 'Non-Anginal Pain',
  ASY = 'Asymptomatic'
}

export enum RestingECG {
  Normal = 'Normal',
  ST = 'ST-T Wave Abnormality',
  LVH = 'Left Ventricular Hypertrophy'
}

export enum ExerciseAngina {
  Y = 'Yes',
  N = 'No'
}

export enum ST_Slope {
  Up = 'Upsloping',
  Flat = 'Flat',
  Down = 'Downsloping'
}

export interface PredictionData {
  Age: number;
  Sex: Sex;
  ChestPainType: ChestPainType;
  RestingBP: number;
  Cholesterol: number;
  FastingBS: number; // 0 for false, 1 for true
  RestingECG: RestingECG;
  MaxHR: number;
  ExerciseAngina: ExerciseAngina;
  Oldpeak: number;
  ST_Slope: ST_Slope;
}

export enum PredictionRisk {
    Low = 'Low Risk',
    Moderate = 'Moderate Risk',
    High = 'High Risk'
}

export interface PredictionResult {
  prediction: PredictionRisk;
  confidence: number;
  explanation: string;
  recommendations: string[];
}
