
import React, { useState, useCallback } from 'react';
import { PredictionData, PredictionResult } from './types';
import { predictHeartDisease } from './services/geminiService';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import Loader from './components/Loader';
import { HeartPulseIcon, GithubIcon } from './components/Icons';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = useCallback(async (formData: PredictionData) => {
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);
    try {
      const result = await predictHeartDisease(formData);
      setPredictionResult(result);
    } catch (err) {
      setError('An error occurred while making the prediction. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClear = () => {
    setPredictionResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <HeartPulseIcon className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Heart Disease Predictor
            </h1>
          </div>
          <a
            href="https://github.com/google-gemini-v2/create-frame-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <GithubIcon className="h-7 w-7" />
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-gray-600 mb-8 text-lg">
            Enter patient health metrics into the form below. Our AI, powered by Gemini, will analyze the data to predict the risk of heart disease.
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            {!predictionResult ? (
              <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
            ) : (
              <ResultCard result={predictionResult} onClear={handleClear} />
            )}

            {isLoading && (
              <div className="mt-6 flex flex-col items-center justify-center">
                <Loader />
                <p className="text-gray-600 mt-2">Analyzing data, please wait...</p>
              </div>
            )}

            {error && !isLoading && (
              <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                <p className="font-semibold">Prediction Failed</p>
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>This tool is for informational purposes only and is not a substitute for professional medical advice.</p>
      </footer>
    </div>
  );
};

export default App;
