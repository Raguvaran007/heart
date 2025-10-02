
import React, { useState } from 'react';
import { PredictionData, Sex, ChestPainType, RestingECG, ExerciseAngina, ST_Slope } from '../types';
import { formFields, FormField } from '../constants';

interface PredictionFormProps {
  onPredict: (formData: PredictionData) => void;
  isLoading: boolean;
}

const initialFormData: PredictionData = {
  Age: 50,
  Sex: Sex.M,
  ChestPainType: ChestPainType.ASY,
  RestingBP: 120,
  Cholesterol: 200,
  FastingBS: 0,
  RestingECG: RestingECG.Normal,
  MaxHR: 150,
  ExerciseAngina: ExerciseAngina.N,
  Oldpeak: 1.0,
  ST_Slope: ST_Slope.Flat,
};

const InputField: React.FC<{field: FormField, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}> = ({ field, value, onChange }) => (
    <div>
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
        </label>
        <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            step={field.step || 'any'}
            required
        />
    </div>
);

const SelectField: React.FC<{field: FormField, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void}> = ({ field, value, onChange }) => (
    <div>
        <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
        </label>
        <select
            id={field.name}
            name={field.name}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
            required
        >
            {field.options && Object.entries(field.options).map(([key, label]) => (
                <option key={key} value={label}>{label}</option>
            ))}
        </select>
    </div>
);


const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState<PredictionData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number = value;
    if (type === 'number') {
        processedValue = value === '' ? '' : parseFloat(value);
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 text-center">Enter Patient Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formFields.map(field => {
            const value = formData[field.name as keyof PredictionData];
            if (field.type === 'select') {
                return <SelectField key={field.name} field={field} value={String(value)} onChange={handleChange as any} />
            }
            return <InputField key={field.name} field={field} value={value} onChange={handleChange as any} />
        })}
      </div>
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Predict Risk'}
        </button>
      </div>
    </form>
  );
};

export default PredictionForm;
