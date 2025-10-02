
import { GoogleGenAI, Type } from "@google/genai";
import { PredictionData, PredictionResult, PredictionRisk } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        prediction: {
            type: Type.STRING,
            enum: [PredictionRisk.Low, PredictionRisk.Moderate, PredictionRisk.High],
            description: "The predicted risk level for heart disease.",
        },
        confidence: {
            type: Type.NUMBER,
            description: "A confidence score for the prediction, from 0.0 to 1.0.",
        },
        explanation: {
            type: Type.STRING,
            description: "A detailed explanation of why this prediction was made, highlighting key factors from the input data.",
        },
        recommendations: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING,
            },
            description: "A list of 3-5 actionable recommendations for the patient based on the prediction.",
        },
    },
    required: ["prediction", "confidence", "explanation", "recommendations"],
};

export const predictHeartDisease = async (data: PredictionData): Promise<PredictionResult> => {
    const model = "gemini-2.5-flash";

    const prompt = `
        Analyze the following patient data to predict the risk of heart disease.
        The prediction should be one of "Low Risk", "Moderate Risk", or "High Risk".
        Provide a confidence score, a detailed explanation for your reasoning, and a list of actionable recommendations.
        
        Patient Data:
        - Age: ${data.Age}
        - Sex: ${data.Sex}
        - Chest Pain Type: ${data.ChestPainType}
        - Resting Blood Pressure (mm Hg): ${data.RestingBP}
        - Cholesterol (mm/dl): ${data.Cholesterol}
        - Fasting Blood Sugar > 120 mg/dl: ${data.FastingBS === 1 ? 'Yes' : 'No'}
        - Resting Electrocardiogram Results: ${data.RestingECG}
        - Maximum Heart Rate Achieved: ${data.MaxHR}
        - Exercise Induced Angina: ${data.ExerciseAngina}
        - Oldpeak (ST depression induced by exercise relative to rest): ${data.Oldpeak}
        - The slope of the peak exercise ST segment: ${data.ST_Slope}
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2,
            },
        });
        
        const jsonText = response.text.trim();
        const parsedResult = JSON.parse(jsonText) as PredictionResult;

        // Basic validation
        if (!parsedResult.prediction || !parsedResult.explanation) {
            throw new Error("Invalid response structure from API.");
        }

        return parsedResult;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a valid prediction from the AI model.");
    }
};
