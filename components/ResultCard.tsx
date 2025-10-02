
import React from 'react';
import { PredictionResult, PredictionRisk } from '../types';
import { CheckCircleIcon, ExclamationTriangleIcon, ShieldExclamationIcon } from './Icons';

interface ResultCardProps {
  result: PredictionResult;
  onClear: () => void;
}

const getRiskDetails = (risk: PredictionRisk) => {
  switch (risk) {
    case PredictionRisk.High:
      return {
        bgColor: 'bg-red-50',
        borderColor: 'border-red-500',
        textColor: 'text-red-800',
        icon: <ShieldExclamationIcon className="h-12 w-12 text-red-500" />,
        title: 'High Risk',
      };
    case PredictionRisk.Moderate:
      return {
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-800',
        icon: <ExclamationTriangleIcon className="h-12 w-12 text-yellow-500" />,
        title: 'Moderate Risk',
      };
    case PredictionRisk.Low:
    default:
      return {
        bgColor: 'bg-green-50',
        borderColor: 'border-green-500',
        textColor: 'text-green-800',
        icon: <CheckCircleIcon className="h-12 w-12 text-green-500" />,
        title: 'Low Risk',
      };
  }
};

const ResultCard: React.FC<ResultCardProps> = ({ result, onClear }) => {
  const { bgColor, borderColor, textColor, icon, title } = getRiskDetails(result.prediction);
  const confidencePercent = (result.confidence * 100).toFixed(0);

  return (
    <div className="animate-fade-in">
      <div className={`p-6 rounded-xl border-2 ${borderColor} ${bgColor}`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left sm:space-x-6">
          <div className="flex-shrink-0 mb-4 sm:mb-0">{icon}</div>
          <div>
            <h2 className={`text-3xl font-bold ${textColor}`}>{title} of Heart Disease</h2>
            <p className="text-lg text-gray-600 mt-1">
              AI Confidence: <span className="font-semibold">{confidencePercent}%</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Explanation</h3>
          <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">{result.explanation}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Recommendations</h3>
          <ul className="space-y-2 list-disc list-inside bg-gray-50 p-4 rounded-lg text-gray-600">
            {result.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t flex justify-end">
        <button
          onClick={onClear}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Make Another Prediction
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
